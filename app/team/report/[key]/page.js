import { notFound } from 'next/navigation';
import { validReportKey } from '../../../../lib/team/report-key';
import { callReport } from '../../../../lib/team/store';
import { addDays, centralDay, formatDay, formatHours, formatTime, mondayOf, validDay } from '../../../../lib/team/time';
import Refresh from './Refresh';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Cold Call Report',
  referrer: 'no-referrer',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

const MAX_DAYS = 14;
const RANGES = [['today', 'Today'], ['yesterday', 'Yesterday'], ['week', 'This week'], ['last-week', 'Last week']];

function pickRange({ range, from, to }) {
  const today = centralDay();
  const monday = mondayOf(today);
  if (range === 'custom' && validDay(from) && validDay(to) && from <= to && to <= today) {
    let days = 1;
    for (let d = from; d < to && days <= MAX_DAYS; d = addDays(d, 1)) days += 1;
    if (days <= MAX_DAYS) return { range, from, to };
    return { range, from: addDays(to, 1 - MAX_DAYS), to, clipped: true };
  }
  if (range === 'yesterday') { const d = addDays(today, -1); return { range, from: d, to: d }; }
  if (range === 'week') return { range, from: monday, to: today };
  if (range === 'last-week') return { range, from: addDays(monday, -7), to: addDays(monday, -1) };
  return { range: 'today', from: today, to: today };
}

const number = (n) => Number(n || 0).toLocaleString('en-US');
const percent = (part, whole) => (whole ? `${((part / whole) * 100).toFixed(1)}%` : '0%');
const perHour = (dials, seconds) => (seconds ? Math.round(dials / (seconds / 3600)).toLocaleString('en-US') : 'n/a');

function Stat({ label, value, note }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums text-[#3D4EDB]">{value}</div>
      {note ? <div className="mt-0.5 text-xs text-slate-500">{note}</div> : null}
    </div>
  );
}

function Person({ person, showDays, unavailable, appointmentsOk }) {
  if (unavailable) {
    return (
      <section className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-lg font-bold text-[#0B1547]">{person.name}</h2>
        <p className="mt-3 rounded-lg bg-white p-3 text-sm text-slate-600">Calls for this date range are not loaded yet.</p>
      </section>
    );
  }
  const t = person.totals;
  const single = person.rows.length === 1 ? person.rows[0].calls : null;
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold text-[#0B1547]">{person.name}</h2>
        <span className="text-xs text-slate-500">
          {single ? `${formatTime(single.firstCall)} to ${formatTime(single.lastCall)} CT` : person.key === 'juan' ? 'WAVV calls' : 'GHL calls'}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat label="Dials" value={number(t.dials)} />
        <Stat label="People reached" value={number(t.reached)} note={`${percent(t.reached, t.dials)} of dials`} />
        <Stat label="Appointments booked" value={appointmentsOk ? number(t.appointments) : 'n/a'} note={appointmentsOk ? null : 'Calendar unavailable'} />
        <Stat label="Still upcoming" value={appointmentsOk ? number(t.upcoming) : 'n/a'} />
        <Stat label="Dials per appointment" value={appointmentsOk && t.appointments ? number(Math.round(t.dials / t.appointments)) : 'n/a'} />
        <Stat label="Calls 1 min+" value={number(t.oneMinute)} />
        <Stat label="Time on calls" value={formatHours(t.talkSeconds)} />
        <Stat label="Hours clocked" value={person.onTimesheet ? formatHours(t.workedSeconds) : 'n/a'} note={person.onTimesheet ? null : 'Not on timesheet yet'} />
        <Stat label="Dials per clocked hour" value={perHour(t.dials, t.workedSeconds)} note={person.onTimesheet && t.offClock ? `${number(t.offClock)} dials off the clock` : null} />
      </div>
      {showDays ? (
        <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[400px] whitespace-nowrap text-left text-xs">
            <thead className="bg-slate-100 text-xs text-slate-600">
              <tr><th className="px-1.5 py-2">Day</th><th className="px-1.5 py-2 text-right">Dials</th><th className="px-1.5 py-2 text-right">Reached</th><th className="px-1.5 py-2 text-right">Appts</th><th className="px-1.5 py-2 text-right">1 min+</th><th className="px-1.5 py-2 text-right">On calls</th><th className="px-1.5 py-2 text-right">Clocked</th></tr>
            </thead>
            <tbody>
              {person.rows.map((r) => (
                <tr key={r.day} className="border-t border-slate-100 tabular-nums">
                  <td className="px-1.5 py-2 font-medium text-[#0B1547]">{formatDay(r.day)}</td>
                  <td className="px-1.5 py-2 text-right">{number(r.calls?.dials)}</td>
                  <td className="px-1.5 py-2 text-right">{number(r.calls?.answered)}</td>
                  <td className="px-1.5 py-2 text-right">{appointmentsOk ? number(r.appointments) : 'n/a'}</td>
                  <td className="px-1.5 py-2 text-right">{number(r.calls?.conversations)}</td>
                  <td className="px-1.5 py-2 text-right">{formatHours(r.calls?.talkSeconds)}</td>
                  <td className="px-1.5 py-2 text-right">{person.onTimesheet ? formatHours(r.workedSeconds) : 'n/a'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default async function CallReportPage({ params, searchParams }) {
  if (!validReportKey(params.key)) notFound();
  const picked = pickRange(searchParams || {});
  let report = null;
  try {
    report = await callReport(picked.from, picked.to);
  } catch {
    report = null;
  }
  const label = picked.from === picked.to ? formatDay(picked.from) : `${formatDay(picked.from)} to ${formatDay(picked.to)}`;
  const problems = report ? [
    report.partial ? 'This range is very large, so some calls may be missing.' : null,
    picked.clipped ? `Custom ranges show up to ${MAX_DAYS} days.` : null,
  ].filter(Boolean) : [];

  return (
    <main className="min-h-screen bg-white p-4 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#0B1547]">Cold Call Report</h1>
            <p className="text-sm text-slate-500">{label} (Central time)</p>
            <Refresh reportKey={params.key} from={picked.from} to={picked.to} updatedAt={report?.updatedAt || null} complete={Boolean(report?.ghlOk && report?.wavvOk)} />
          </div>
          <nav className="flex flex-wrap gap-1" aria-label="Date range">
            {RANGES.map(([value, text]) => (
              <a key={value} href={`?range=${value}`} aria-current={picked.range === value ? 'page' : undefined}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${picked.range === value ? 'bg-[#3D4EDB] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                {text}
              </a>
            ))}
          </nav>
        </div>
        <form method="get" className="mt-3 flex flex-wrap items-end gap-2 text-sm">
          <input type="hidden" name="range" value="custom" />
          <label className="text-xs text-slate-500">From<input required type="date" name="from" defaultValue={picked.from} max={centralDay()} className="mt-0.5 block rounded border border-slate-300 px-2 py-1 text-sm text-slate-800" /></label>
          <label className="text-xs text-slate-500">To<input required type="date" name="to" defaultValue={picked.to} max={centralDay()} className="mt-0.5 block rounded border border-slate-300 px-2 py-1 text-sm text-slate-800" /></label>
          <button type="submit" className="rounded-md bg-[#0B1547] px-3 py-1.5 font-medium text-white">Show</button>
        </form>
        {!report ? <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">The report could not load. Refresh in a minute.</p> : null}
        {problems.map((text) => <p key={text} role="alert" className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{text}</p>)}
        {report ? (
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {report.people.map((person) => (
              <Person key={person.key} person={person} showDays={report.days.length > 1}
                unavailable={person.key === 'juan' ? !report.wavvOk : !report.ghlOk} appointmentsOk={report.appointmentsOk} />
            ))}
          </div>
        ) : null}
        <p className="mt-4 text-xs text-slate-500">
          People reached is not an even comparison: WAVV counts calls it marked human, while GHL counts answered calls and can include voicemail. Time on calls can include voicemails. Appointments count on the day booked, leave out cancelled ones, and are credited by the caller&apos;s calendar, who booked it, or who owns the contact. Checks for new calls every 2 minutes while open.
        </p>
      </div>
    </main>
  );
}
