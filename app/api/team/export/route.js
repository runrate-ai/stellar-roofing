import { currentUser, failure, json } from '../../../../lib/team/auth';
import { weekReport } from '../../../../lib/team/store';
import { centralDay, formatTime, mondayOf, validDay } from '../../../../lib/team/time';

export const dynamic = 'force-dynamic';
// GHL can be slow; give background call refreshes room to finish.
export const maxDuration = 300;

function cell(value) {
  let text = String(value ?? '');
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}
const hours = (seconds) => (seconds / 3600).toFixed(2);

export async function GET(request) {
  try {
    const user = await currentUser();
    if (!user) return json({ error: 'Please log in.' }, 401);
    if (user.role !== 'admin' || user.must_change) return json({ error: 'Not allowed.' }, 403);
    const asked = new URL(request.url).searchParams.get('week');
    const week = validDay(asked) ? mondayOf(asked) : mondayOf(centralDay());
    const report = await weekReport(week);
    const lines = [['Person', 'Day', 'Clock in (CT)', 'Clock out (CT)', 'Break hours', 'Paid hours', 'Edited', 'Dials that day', 'Reached that day', 'Calls 1 min+', 'Time on calls (hours)']];
    for (const person of report.people) {
      for (const day of person.days) {
        const rows = day.shifts.length ? day.shifts : (day.calls ? [null] : []);
        rows.forEach((s, i) => lines.push([
          person.name, day.day, s ? formatTime(s.clockIn) : 'not clocked in', s?.clockOut ? formatTime(s.clockOut) : (s ? 'still on clock' : ''),
          s ? hours(s.breakSeconds) : '', s ? hours(s.workedSeconds) : '0.00', s?.edited ? 'yes' : '',
          i === 0 ? day.calls?.dials ?? 0 : '', i === 0 ? day.calls?.answered ?? 0 : '', i === 0 ? day.calls?.conversations ?? 0 : '', i === 0 ? hours(day.calls?.talkSeconds || 0) : '',
        ]));
      }
      lines.push([`${person.name} total`, '', '', '', '', hours(person.totalSeconds), '', person.totals.dials, person.totals.answered, person.totals.conversations, hours(person.totals.talkSeconds)]);
    }
    const csv = lines.map((row) => row.map(cell).join(',')).join('\r\n');
    return new Response(csv, { headers: {
      'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="stellar-timesheet-${week}.csv"`,
      'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow',
    } });
  } catch (err) {
    return failure(err);
  }
}
