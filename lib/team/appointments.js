import { CALLER_PRESETS, SHARED_CALENDAR_IDS } from './callers';

const GHL_API = 'https://services.leadconnectorhq.com';
const CACHE_MS = 60000;
const TIMEOUT_MS = 20000;
const LOOK_AHEAD_MS = 180 * 24 * 60 * 60 * 1000;
const LOOK_BACK_MS = 24 * 60 * 60 * 1000;
const NOT_COUNTED = new Set(['cancelled', 'canceled', 'invalid']);
const cache = new Map();

async function ghlGet(path, version, token) {
  const res = await fetch(`${GHL_API}${path}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { Authorization: `Bearer ${token}`, Version: version, Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`GHL ${res.status}`);
  return res.json();
}

// Appointments count on the day they were booked. Only the caller id, dates
// and status leave this file; customer details are never returned.
export async function fetchAppointments(start, end) {
  const cacheKey = `${start.toISOString()}|${end.toISOString()}`;
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.value;

  const token = process.env.TEAM_GHL_TOKEN || process.env.GHL_API_TOKEN;
  const location = process.env.GHL_LOCATION_ID;
  if (!token || !location) return { ok: false, appointments: [] };
  const callerByCalendar = new Map();
  CALLER_PRESETS.forEach((c) => c.calendarIds.forEach((id) => callerByCalendar.set(id, c.ghlUserId)));
  const callerIds = new Set(CALLER_PRESETS.map((c) => c.ghlUserId));
  const from = start.getTime() - LOOK_BACK_MS;
  const to = end.getTime() + LOOK_AHEAD_MS;

  try {
    const lists = await Promise.all([...callerByCalendar.keys(), ...SHARED_CALENDAR_IDS].map(async (calendarId) => {
      const params = new URLSearchParams({ locationId: location, calendarId, startTime: String(from), endTime: String(to) });
      const data = await ghlGet(`/calendars/events?${params}`, '2021-04-15', token);
      return data.events || [];
    }));
    const events = new Map();
    lists.flat().forEach((event) => {
      const booked = new Date(event.dateAdded);
      if (!event.deleted && booked >= start && booked < end) events.set(event.id, event);
    });

    const owners = new Map();
    const ownerOf = async (contactId) => {
      if (!contactId) return null;
      if (!owners.has(contactId)) {
        const data = await ghlGet(`/contacts/${encodeURIComponent(contactId)}`, '2021-07-28', token);
        owners.set(contactId, data.contact?.assignedTo || null);
      }
      return owners.get(contactId);
    };

    const appointments = [];
    for (const event of events.values()) {
      const status = String(event.appointmentStatus || event.appoinmentStatus || '').toLowerCase();
      if (NOT_COUNTED.has(status)) continue;
      let userId = callerByCalendar.get(event.calendarId) || null;
      if (!userId && callerIds.has(event.createdBy?.userId)) userId = event.createdBy.userId;
      if (!userId) {
        const owner = await ownerOf(event.contactId);
        if (callerIds.has(owner)) userId = owner;
      }
      if (userId) appointments.push({ userId, bookedAt: new Date(event.dateAdded).toISOString(), startsAt: new Date(event.startTime).toISOString() });
    }
    const value = { ok: true, appointments };
    cache.set(cacheKey, { at: Date.now(), value });
    return value;
  } catch {
    return { ok: false, appointments: [] };
  }
}
