import { failure, json, sameOrigin } from '../../../../lib/team/auth';
import { fetchCalls } from '../../../../lib/team/calls';
import { validReportKey } from '../../../../lib/team/report-key';
import { addDays, centralDay, dayStart, validDay } from '../../../../lib/team/time';

export const dynamic = 'force-dynamic';
// GHL can be slow; give background call refreshes room to finish.
export const maxDuration = 300;
const MAX_DAYS = 14;

// Pulls new calls after the report has already shown its saved numbers.
export async function POST(request) {
  if (!sameOrigin(request)) return json({ error: 'Not allowed.' }, 403);
  try {
    const body = await request.json().catch(() => ({}));
    if (!validReportKey(body.key)) return json({ error: 'Not found.' }, 404);
    const { from, to } = body;
    if (!validDay(from) || !validDay(to) || from > to || to > centralDay() || addDays(from, MAX_DAYS - 1) < to) {
      return json({ error: 'Pick a valid date range.' }, 400);
    }
    const data = await fetchCalls(dayStart(from), dayStart(addDays(to, 1)), { refresh: true });
    return json({ ok: data.ok, ghlOk: data.ghlOk, wavvOk: data.wavvOk, updatedAt: data.updatedAt });
  } catch (err) {
    return failure(err);
  }
}
