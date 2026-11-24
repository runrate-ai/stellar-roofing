import { currentUser, failure, json } from '../../../../lib/team/auth';
import { monthReport, weekReport } from '../../../../lib/team/store';
import { addDays, centralDay, formatTime, mondayOf, validDay } from '../../../../lib/team/time';

export const dynamic = 'force-dynamic';
// GHL can be slow; give background call refreshes room to finish.
export const maxDuration = 300;

function cell(value) {
  let text = String(value ?? '');
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}
const hours = (seconds) => (seconds / 3600).toFixed(2);
const money = (n) => (n === null || n === undefined ? '' : n.toFixed(2));
const send = (lines, name) => new Response(lines.map((row) => row.map(cell).join(',')).join('\r\n'), { headers: {
  'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${name}"`,
  'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow',
} });

// Payroll file for a month: one line per person per work week, then each day.
async function payroll(month) {
  const report = await monthReport(month, { refresh: false });
  const lines = [[`Stellar Roofing payroll, work weeks ending in ${month} (Monday to Sunday, Central time). Pay = hourly rate x paid hours.`], [],
    ['Employee', 'Week start', 'Week end', 'Days worked', 'Paid hours', 'Hourly rate', 'Pay']];
  for (const p of report.people) {
    for (const w of p.weeks) lines.push([p.name, w.monday, w.ending, w.daysWorked, hours(w.paidSeconds), money(p.hourlyRate), money(w.estimatedPay)]);
    lines.push([`${p.name} total`, report.mondays[0], addDays(report.mondays[report.mondays.length - 1], 6), p.daysWorked, hours(p.totalSeconds), money(p.hourlyRate), money(p.estimatedPay)]);
  }
  lines.push([], ['Daily detail'], ['Employee', 'Date', 'Clock in (CT)', 'Clock out (CT)', 'Break hours', 'Clocked hours', 'Paid hours', 'Paid hours set by hand']);
  for (const p of report.people) {
    for (const d of p.days.filter((x) => x.workedSeconds > 0 || x.shifts.length)) {
      lines.push([p.name, d.day, d.shifts.map((x) => formatTime(x.clockIn)).join(' / '), d.shifts.map((x) => (x.clockOut ? formatTime(x.clockOut) : 'still on clock')).join(' / '),
        hours(d.shifts.reduce((n, x) => n + x.breakSeconds, 0)), hours(d.clockedSeconds), hours(d.workedSeconds), d.paidOverride ? `yes: ${d.paidOverride.reason}` : '']);
    }
  }
  return send(lines, `stellar-payroll-${month}.csv`);
}

export async function GET(request) {
  try {
    const user = await currentUser();
    if (!user) return json({ error: 'Please log in.' }, 401);
    if (user.role !== 'admin' || user.must_change) return json({ error: 'Not allowed.' }, 403);
    const params = new URL(request.url).searchParams;
    const month = params.get('month');
    if (/^\d{4}-(0[1-9]|1[0-2])$/.test(month || '')) return await payroll(month);
    const asked = params.get('week');
    const week = validDay(asked) ? mondayOf(asked) : mondayOf(centralDay());
    const report = await weekReport(week);
    const lines = [['Person', 'Day', 'Clock in (CT)', 'Clock out (CT)', 'Break hours', 'Clocked hours', 'Edited', 'Paid hours that day', 'Paid hours set by hand', 'Working hours (from calls)', 'Dials that day', 'Reached that day', 'Calls 1 min+', 'Time on calls (hours)']];
    for (const person of report.people) {
      for (const day of person.days) {
        const rows = day.shifts.length ? day.shifts : (day.calls || day.paidOverride ? [null] : []);
        rows.forEach((s, i) => lines.push([
          person.name, day.day, s ? formatTime(s.clockIn) : 'not clocked in', s?.clockOut ? formatTime(s.clockOut) : (s ? 'still on clock' : ''),
          s ? hours(s.breakSeconds) : '', s ? hours(s.workedSeconds) : '0.00', s?.edited ? 'yes' : '',
          i === 0 ? hours(day.workedSeconds) : '', i === 0 && day.paidOverride ? `yes: ${day.paidOverride.reason}` : '', i === 0 ? hours(day.activeSeconds) : '',
          i === 0 ? day.calls?.dials ?? 0 : '', i === 0 ? day.calls?.answered ?? 0 : '', i === 0 ? day.calls?.conversations ?? 0 : '', i === 0 ? hours(day.calls?.talkSeconds || 0) : '',
        ]));
      }
      lines.push([`${person.name} total`, '', '', '', '', hours(person.clockedSeconds), '', hours(person.totalSeconds), '', hours(person.activeSeconds), person.totals.dials, person.totals.answered, person.totals.conversations, hours(person.totals.talkSeconds)]);
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
