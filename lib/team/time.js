// All timesheet days and weeks are Central time, Monday through Sunday.
export const TZ = 'America/Chicago';

function parts(date) {
  const out = {};
  new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(date).forEach((p) => { out[p.type] = p.value; });
  return out;
}

export function centralDay(date = new Date()) {
  const p = parts(new Date(date));
  return `${p.year}-${p.month}-${p.day}`;
}

export function toCentralInput(date) {
  if (!date) return '';
  const p = parts(new Date(date));
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

function offsetMs(date) {
  const p = parts(date);
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return asUtc - Math.floor(date.getTime() / 1000) * 1000;
}

// "2026-11-23T09:30" read as Central time, returned as a real instant.
export function fromCentralInput(value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value || '');
  if (!m) return null;
  const wall = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  let t = wall - offsetMs(new Date(wall));
  t = wall - offsetMs(new Date(t));
  const d = new Date(t);
  return toCentralInput(d) === value ? d : null;
}

export function addDays(ymd, n) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

export function mondayOf(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return addDays(ymd, dow === 0 ? -6 : 1 - dow);
}

export function validDay(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
  return addDays(value, 0) === value;
}

export function dayStart(ymd) {
  return fromCentralInput(`${ymd}T00:00`) || fromCentralInput(`${ymd}T01:00`);
}

export function weekDays(monday) {
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

export function formatTime(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

export function formatDay(ymd) {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' })
    .format(new Date(Date.UTC(y, m - 1, d)));
}

export function formatHours(seconds) {
  const mins = Math.floor((seconds || 0) / 60);
  return `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`;
}
