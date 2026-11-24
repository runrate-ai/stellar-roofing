'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Coffee, Download, LogOut, Pencil, Phone, Play, Plus, Square, Star } from 'lucide-react';
import { addDays, centralDay, formatDay, formatHours, formatTime, mondayOf, toCentralInput } from '../../lib/team/time';

async function api(path, body) {
  const res = await fetch(path, body ? {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  } : { cache: 'no-store' });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || 'Something went wrong. Try again.'), { data, status: res.status });
  return data;
}

const input = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-text-dark focus:border-star focus:outline-none focus:ring-2 focus:ring-star/20';
const primaryBtn = 'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-star px-4 py-2.5 font-semibold text-white transition-colors hover:bg-star-dark disabled:opacity-50';
const quietBtn = 'inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-text-dark transition-colors hover:bg-slate-50 disabled:opacity-50';

function Field({ label, children }) {
  return <label className="block text-sm font-medium text-text-dark"><span className="mb-1 block">{label}</span>{children}</label>;
}

function ErrorText({ children }) {
  return children ? <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{children}</p> : null;
}

function Brand() {
  return <div className="flex items-center gap-2 font-bold text-primary"><Star className="h-5 w-5 fill-star text-star" aria-hidden /> Stellar Team</div>;
}

function ActingBanner({ user, onBack }) {
  const [busy, setBusy] = useState(false);
  return (
    <div role="status" className="bg-amber-400 text-primary">
      <div className="mx-auto flex max-w-xl flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm">
        <span><b>You are acting as {user.name}.</b> Everything you do here is recorded under {user.actingAs.name}.</span>
        <button type="button" disabled={busy} onClick={async () => { setBusy(true); await onBack(); setBusy(false); }}
          className="inline-flex min-h-[40px] items-center gap-1 rounded-lg bg-primary px-3 py-2 font-semibold text-white hover:bg-primary-light disabled:opacity-50">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to admin
        </button>
      </div>
    </div>
  );
}

function Shell({ user, onLogout, onBack, children, wide }) {
  const acting = Boolean(user?.actingAs);
  return (
    <div className="min-h-screen bg-bg-alt">
      {acting && <ActingBanner user={user} onBack={onBack} />}
      <header className="border-b border-slate-200 bg-white">
        <div className={`mx-auto flex items-center justify-between px-4 py-3 ${wide ? 'max-w-6xl' : 'max-w-xl'}`}>
          <Brand />
          {user && !acting && <button type="button" onClick={onLogout} className={quietBtn}><LogOut className="h-4 w-4" aria-hidden /> Log out</button>}
        </div>
      </header>
      <div className={`mx-auto space-y-4 px-4 py-5 ${wide ? 'max-w-6xl' : 'max-w-xl'}`}>{children}</div>
    </div>
  );
}

function Card({ title, action, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      {(title || action) && <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h2 className="font-bold text-primary">{title}</h2>{action}</div>}
      {children}
    </section>
  );
}

function AuthForm({ mode, onDone }) {
  const [f, setF] = useState({});
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      await api('/api/team/auth', { action: mode, ...f });
      // Stay on "One moment" until the next screen is ready.
      await onDone();
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };
  const titles = { login: 'Log in', setup: 'Create the owner login', 'change-password': 'Choose your own password' };
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-alt px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <Brand />
        <h1 className="text-xl font-bold text-primary">{titles[mode]}</h1>
        <ErrorText>{error}</ErrorText>
        {mode === 'setup' && <>
          <Field label="Setup code"><input className={input} type="password" required autoComplete="off" onChange={set('code')} /></Field>
          <Field label="Your name"><input className={input} required autoComplete="name" onChange={set('name')} /></Field>
        </>}
        {mode !== 'change-password' && <Field label="Username"><input className={input} required autoCapitalize="none" autoComplete="username" onChange={set('username')} /></Field>}
        {mode === 'change-password' && <>
          <Field label="Temporary password"><input className={input} type="password" required autoComplete="current-password" onChange={set('current')} /></Field>
          <Field label="New password (10+ characters)"><input className={input} type="password" required minLength={10} autoComplete="new-password" onChange={set('next')} /></Field>
        </>}
        {mode !== 'change-password' && <Field label={mode === 'setup' ? 'Password (10+ characters)' : 'Password'}><input className={input} type="password" required autoComplete={mode === 'setup' ? 'new-password' : 'current-password'} onChange={set('password')} /></Field>}
        <button type="submit" disabled={busy} className={`${primaryBtn} w-full`}>{busy ? 'One moment...' : 'Continue'}</button>
      </form>
    </div>
  );
}

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function Clock({ status, onAction, busy }) {
  const now = useNow();
  const since = status.state === 'break' ? status.breakStart : status.clockIn;
  const seconds = since ? Math.max(0, Math.floor((now - new Date(since)) / 1000)) : 0;
  const clock = `${Math.floor(seconds / 3600)}:${String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const label = { out: 'Off the clock', in: 'On the clock', break: 'On break' }[status.state];
  const dot = { out: 'bg-slate-400', in: 'bg-emerald-500', break: 'bg-amber-500' }[status.state];
  return (
    <Card>
      <div className="py-3 text-center">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted"><span className={`h-2.5 w-2.5 rounded-full ${dot}`} /> {label}</p>
        {status.state !== 'out' && <>
          <p className="mt-2 text-5xl font-bold tabular-nums text-primary">{clock}</p>
          <p className="mt-1 text-sm text-text-muted">{status.state === 'break' ? 'Break started' : 'Clocked in'} at {formatTime(since)} Central</p>
        </>}
      </div>
      {status.state === 'out' && <button type="button" disabled={busy} onClick={() => onAction('in')} className={`${primaryBtn} min-h-[60px] w-full text-lg`}><Play className="h-5 w-5" aria-hidden /> Clock In</button>}
      {status.state === 'in' && <div className="grid grid-cols-2 gap-3">
        <button type="button" disabled={busy} onClick={() => onAction('break')} className={`${quietBtn} min-h-[60px] text-base`}><Coffee className="h-5 w-5" aria-hidden /> Start Break</button>
        <button type="button" disabled={busy} onClick={() => onAction('out')} className="inline-flex min-h-[60px] items-center justify-center gap-2 rounded-lg bg-primary px-4 font-semibold text-white hover:bg-primary-light disabled:opacity-50"><Square className="h-4 w-4" aria-hidden /> Clock Out</button>
      </div>}
      {status.state === 'break' && <button type="button" disabled={busy} onClick={() => onAction('resume')} className={`${primaryBtn} min-h-[60px] w-full text-lg`}><Play className="h-5 w-5" aria-hidden /> End Break</button>}
    </Card>
  );
}

function talkText(calls) {
  if (!calls) return '-';
  // WAVV records usually arrive without a duration, so a partial total would mislead.
  if (calls.talkMissing * 2 > calls.answered) return 'Not logged';
  return `${formatHours(calls.talkSeconds)}${calls.talkMissing ? '+' : ''}`;
}

const hrs = (seconds) => ((seconds || 0) / 3600).toFixed(2);
const money = (n) => (n === null || n === undefined ? 'No rate' : `$${n.toFixed(2)}`);
const worked = (d) => d.shifts.length > 0 || Boolean(d.calls) || d.workedSeconds > 0;
const thisMonth = () => centralDay().slice(0, 7);
function monthLabel(month) {
  const [y, m] = month.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric' }).format(new Date(Date.UTC(y, m - 1, 1)));
}
function shiftMonth(month, n) {
  const [y, m] = month.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 7);
}
function saved(key, fallback) {
  try { const v = window.localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; }
}
function remember(key, value) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* private window */ }
}

function MonthNav({ month, onMonth, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <button type="button" aria-label="Previous month" onClick={() => onMonth(shiftMonth(month, -1))} className={quietBtn}><ChevronLeft className="h-4 w-4" /></button>
        <span className="min-w-[150px] px-2 text-center text-sm font-semibold text-primary">{monthLabel(month)}</span>
        <button type="button" aria-label="Next month" disabled={month >= thisMonth()} onClick={() => onMonth(shiftMonth(month, 1))} className={quietBtn}><ChevronRight className="h-4 w-4" /></button>
      </div>
      {children}
    </div>
  );
}

function MonthView({ report, month, onOpenWeek }) {
  const [who, setWho] = useState('all');
  const people = report.people.filter((p) => who === 'all' || p.id === who);
  const first = (name) => name.split(' ')[0];
  const dayOf = (p, day) => p.days.find((d) => d.day === day);
  const inMonth = (day) => day.slice(0, 7) === month;
  const sum = (field) => people.reduce((n, p) => n + (p[field] || 0), 0);
  const total = people.every((p) => p.estimatedPay === null) ? null : people.reduce((n, p) => n + (p.estimatedPay || 0), 0);
  const end = addDays(report.mondays[report.mondays.length - 1], 6);
  return (
    <>
      <Card title="Payroll summary" action={report.people.length > 1 && <select aria-label="Show person" className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm" value={who} onChange={(e) => setWho(e.target.value)}><option value="all">Everyone</option>{report.people.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>}>
        <p className="-mt-1 mb-3 text-xs text-text-muted">Work weeks ending in {monthLabel(month)}: {formatDay(report.mondays[0])} to {formatDay(end)}. Weeks run Monday to Sunday, Central time, so no week is split between months.</p>
        {!people.length && <p className="text-sm text-text-muted">Nobody worked in these weeks.</p>}
        {people.length > 0 && <ul className="space-y-3 md:hidden">
          {people.map((p) => (
            <li key={p.id} className="rounded-lg bg-bg-alt p-3 text-sm">
              <div className="flex items-baseline justify-between gap-2"><span className="font-semibold text-text-dark">{p.name.split(' ').slice(0, 2).join(' ')}</span><span className="text-lg font-bold tabular-nums text-primary">{hrs(p.totalSeconds)} hrs</span></div>
              <p className="mt-1 text-text-muted">{p.daysWorked} days worked</p>
              <p className="text-text-muted">Pay: <span className="font-semibold text-text-dark">{money(p.estimatedPay)}</span>{p.hourlyRate !== null && ` at $${p.hourlyRate.toFixed(2)}/hr`}</p>
              {p.weeks.map((w) => <button key={w.monday} type="button" onClick={() => onOpenWeek(w.monday)} className="mt-1 flex w-full justify-between text-left text-xs text-text-muted"><span>Week of {formatDay(w.monday).replace(/^\w+, /, '')}</span><span className="tabular-nums">{hrs(w.paidSeconds)} hrs</span></button>)}
            </li>
          ))}
        </ul>}
        {people.length > 0 && <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs text-text-muted"><tr><th className="py-2 pr-3 font-medium">Employee</th><th className="pr-3 text-right font-medium">Days worked</th><th className="pr-3 text-right font-medium">Paid hours</th><th className="pr-3 text-right font-medium">Rate</th><th className="text-right font-medium">Pay</th></tr></thead>
            <tbody>
              {people.map((p) => [
                <tr key={p.id} className="border-t border-slate-200 font-semibold text-text-dark">
                  <td className="py-2 pr-3">{p.name}{p.startDate && p.startDate > report.mondays[0] && <span className="ml-2 text-xs font-normal text-text-muted">started {formatDay(p.startDate)}</span>}</td>
                  <td className="pr-3 text-right tabular-nums">{p.daysWorked}</td>
                  <td className="pr-3 text-right tabular-nums text-primary">{hrs(p.totalSeconds)}</td>
                  <td className="pr-3 text-right tabular-nums">{p.hourlyRate === null ? 'No rate' : `$${p.hourlyRate.toFixed(2)}`}</td>
                  <td className="text-right tabular-nums">{money(p.estimatedPay)}</td>
                </tr>,
                ...p.weeks.map((w) => (
                  <tr key={`${p.id}-${w.monday}`} className="text-text-muted">
                    <td className="py-1.5 pl-4 pr-3"><button type="button" className="underline-offset-2 hover:text-primary hover:underline" onClick={() => onOpenWeek(w.monday)}>Week of {formatDay(w.monday).replace(/^\w+, /, '')} to {formatDay(w.ending).replace(/^\w+, /, '')}</button></td>
                    <td className="pr-3 text-right tabular-nums">{w.daysWorked}</td>
                    <td className="pr-3 text-right tabular-nums">{hrs(w.paidSeconds)}</td>
                    <td />
                    <td className="text-right tabular-nums">{w.estimatedPay === null ? '' : `$${w.estimatedPay.toFixed(2)}`}</td>
                  </tr>
                )),
              ])}
            </tbody>
            {people.length > 1 && <tfoot><tr className="border-t-2 border-slate-300 font-bold text-primary"><td className="py-2 pr-3">Total</td><td className="pr-3 text-right tabular-nums">{sum('daysWorked')}</td><td className="pr-3 text-right tabular-nums">{hrs(sum('totalSeconds'))}</td><td /><td className="text-right tabular-nums">{total === null ? '' : `$${total.toFixed(2)}`}</td></tr></tfoot>}
          </table>
        </div>}
        <p className="mt-3 text-xs text-text-muted">Pay = hourly rate × paid hours. Paid hours are the clocked hours, or the hours set by hand for a day.</p>
      </Card>

      <Card title="Calendar">
        <div className="hidden md:block">
          <div className="grid grid-cols-[repeat(7,minmax(0,1fr))_minmax(0,1.1fr)] gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 text-sm">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Week total'].map((h) => <div key={h} className="bg-bg-alt px-2 py-1.5 text-xs font-semibold text-text-muted">{h}</div>)}
            {report.mondays.map((monday) => [
              ...Array.from({ length: 7 }, (_, i) => addDays(monday, i)).map((day) => {
                const rows = people.map((p) => ({ p, d: dayOf(p, day) })).filter((x) => x.d && x.d.workedSeconds > 0);
                const missing = people.filter((p) => { const d = dayOf(p, day); return d && d.calls && !d.workedSeconds; });
                return (
                  <button type="button" key={day} onClick={() => onOpenWeek(monday)} aria-label={`${formatDay(day)}, open that week`}
                    className={`min-h-[84px] p-2 text-left align-top hover:bg-blue-50 ${inMonth(day) ? 'bg-white' : 'bg-slate-50'} ${day === centralDay() ? 'ring-2 ring-inset ring-star' : ''}`}>
                    <span className={`text-xs font-semibold ${inMonth(day) ? 'text-text-dark' : 'text-text-muted'}`}>{Number(day.slice(8))}{day.endsWith('-01') || day === report.mondays[0] ? ` ${formatDay(day).split(' ')[1]}` : ''}</span>
                    {rows.map(({ p, d }) => <span key={p.id} className="mt-1 flex items-center justify-between gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-xs text-primary"><span className="truncate">{people.length > 1 ? first(p.name) : 'Paid'}</span><span className="shrink-0 font-semibold tabular-nums">{hrs(d.workedSeconds)}{d.paidOverride && <span title="Set by hand" className="ml-0.5 text-amber-600">*</span>}</span></span>)}
                    {missing.map((p) => <span key={p.id} className="mt-1 block truncate rounded bg-amber-50 px-1.5 py-0.5 text-xs text-amber-800">{people.length > 1 ? `${first(p.name)}: ` : ''}calls, no hours</span>)}
                  </button>
                );
              }),
              <div key={`${monday}-total`} className="bg-white p-2">
                {people.map((p) => { const w = p.weeks.find((x) => x.monday === monday); return w ? <span key={p.id} className="mt-1 flex justify-between gap-1 text-xs"><span className="truncate text-text-muted">{people.length > 1 ? first(p.name) : 'Paid'}</span><span className={`font-semibold tabular-nums text-primary`}>{hrs(w.paidSeconds)}</span></span> : null; })}
              </div>,
            ])}
          </div>
          <p className="mt-2 text-xs text-text-muted">Hours are paid hours. * = set by hand. Click a day to open that week and edit it. Yellow = calls made but no hours entered.</p>
        </div>
        <div className="space-y-4 md:hidden">
          {report.mondays.map((monday) => {
            const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i)).filter((day) => people.some((p) => { const d = dayOf(p, day); return d && worked(d); }));
            return (
              <div key={monday}>
                <button type="button" onClick={() => onOpenWeek(monday)} className="text-sm font-semibold text-primary underline-offset-2 hover:underline">Week of {formatDay(monday)}</button>
                {!days.length && <p className="text-sm text-text-muted">No days worked.</p>}
                <ul className="divide-y divide-slate-100">
                  {days.map((day) => (
                    <li key={day} className="py-2 text-sm">
                      <p className="font-medium text-text-dark">{formatDay(day)}</p>
                      {people.map((p) => { const d = dayOf(p, day); return d && worked(d) ? <p key={p.id} className="flex justify-between text-text-muted"><span>{first(p.name)}</span><span className="tabular-nums">{d.workedSeconds ? `${hrs(d.workedSeconds)} hrs${d.paidOverride ? ' *' : ''}` : 'calls, no hours'}</span></p> : null; })}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

function WeekNav({ week, onWeek, children }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-1">
        <button type="button" aria-label="Previous week" onClick={() => onWeek(addDays(week, -7))} className={quietBtn}><ChevronLeft className="h-4 w-4" /></button>
        <span className="min-w-[150px] px-2 text-center text-sm font-semibold text-primary">{formatDay(week)} to {formatDay(addDays(week, 6)).replace(/^\w+, /, '')}</span>
        <button type="button" aria-label="Next week" disabled={week >= mondayOf(centralDay())} onClick={() => onWeek(addDays(week, 7))} className={quietBtn}><ChevronRight className="h-4 w-4" /></button>
      </div>
      {children}
    </div>
  );
}

function CallerView({ data, reload, week, onWeek, onLogout, onBack }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [fix, setFix] = useState({ day: centralDay(), note: '' });
  const [sent, setSent] = useState(false);
  const person = data.report.people[0];
  const act = async (action) => {
    setBusy(true); setError('');
    try { await api('/api/team/clock', { action }); } catch (err) { setError(err.message); }
    await reload(); setBusy(false);
  };
  const sendFix = async (e) => {
    e.preventDefault(); setError('');
    try {
      await api('/api/team/clock', { action: 'request-fix', ...fix });
      setFix({ day: centralDay(), note: '' }); setSent(true); await reload();
    } catch (err) { setError(err.message); }
  };
  return (
    <Shell user={data.user} onLogout={onLogout} onBack={onBack}>
      <h1 className="text-xl font-bold text-primary">Hi, {data.user.name.split(' ')[0]}</h1>
      <ErrorText>{error}</ErrorText>
      <Clock status={data.status} onAction={act} busy={busy} />
      <Card title="My hours">
        <WeekNav week={week} onWeek={onWeek} />
        <dl className={`mt-3 grid gap-3 ${data.user.showPay ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {[['Paid hours', formatHours(person?.totalSeconds)], ['Days worked', person?.daysWorked ?? 0], ...(data.user.showPay ? [['Pay', person?.hourlyRate == null ? 'Not set' : money(person.estimatedPay)]] : [])].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-bg-alt p-3"><dt className="text-xs text-text-muted">{k}</dt><dd className="text-lg font-bold tabular-nums text-primary">{v}</dd></div>
          ))}
        </dl>
        {data.user.showPay && person?.hourlyRate != null && <p className="mt-2 text-xs text-text-muted">${person.hourlyRate.toFixed(2)}/hr × paid hours.</p>}
        <ul className="mt-3 divide-y divide-slate-100">
          {(person?.days || []).filter(worked).map((d) => (
            <li key={d.day} className="py-2.5 text-sm">
              <div className="flex justify-between font-semibold text-text-dark"><span>{formatDay(d.day)}</span><span className="tabular-nums">{formatHours(d.workedSeconds)}</span></div>
              {d.paidOverride && <p className="text-text-muted">Paid hours set by your manager</p>}
              {!d.shifts.length && !d.paidOverride && <p className="text-amber-700">Not clocked in. Send a fix request below.</p>}
              {d.shifts.map((s) => <p key={s.id} className="text-text-muted">{formatTime(s.clockIn)} to {s.clockOut ? formatTime(s.clockOut) : 'now'} CT{s.breakSeconds ? `, ${Math.round(s.breakSeconds / 60)} min break` : ''}{s.edited ? ' (edited)' : ''}</p>)}
              {d.calls && <p className="text-text-muted">{d.calls.dials} calls, {d.calls.answered} reached, {d.calls.conversations} over 1 min</p>}
            </li>
          ))}
        </ul>
        {(!person || !person.days.some(worked)) && <p className="mt-3 text-sm text-text-muted">No hours this week.</p>}
      </Card>
      <Card title="Forgot to clock in or out?">
        <form onSubmit={sendFix} className="space-y-3">
          <Field label="Which day"><input className={input} type="date" required max={centralDay()} value={fix.day} onChange={(e) => setFix((v) => ({ ...v, day: e.target.value }))} /></Field>
          <Field label="What should it say? (use Central time)"><textarea className={input} required maxLength={500} rows={2} placeholder="I started at 9:00 AM Central and forgot to clock in" value={fix.note} onChange={(e) => { setSent(false); setFix((v) => ({ ...v, note: e.target.value })); }} /></Field>
          <button type="submit" className={quietBtn}>Send request</button>
          {sent && <p role="status" className="text-sm text-emerald-700">{data.user.actingAs ? `Sent for ${data.user.name}. It shows under Fix requests on the admin board.` : 'Sent. Brandon or Nate will review it.'}</p>}
        </form>
      </Card>
    </Shell>
  );
}

function ShiftEditor({ editor, people, onClose, onSaved }) {
  const [f, setF] = useState(editor);
  const [error, setError] = useState('');
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const save = async (e) => {
    e.preventDefault(); setError('');
    try { await api('/api/team/admin', { action: 'save-shift', ...f }); onSaved(); } catch (err) { setError(err.message); }
  };
  return (
    <div role="dialog" aria-modal="true" aria-label="Edit shift" className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 p-4">
      <form onSubmit={save} className="max-h-full w-full max-w-md space-y-3 overflow-auto rounded-xl bg-white p-5">
        <h2 className="text-lg font-bold text-primary">{f.shiftId ? 'Edit shift' : 'Add shift'}</h2>
        <ErrorText>{error}</ErrorText>
        {!f.shiftId && <Field label="Person"><select className={input} required value={f.userId || ''} onChange={set('userId')}><option value="">Choose</option>{people.filter((u) => u.active).map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}</select></Field>}
        <Field label="Clock in (Central)"><input className={input} type="datetime-local" required value={f.clockIn} onChange={set('clockIn')} /></Field>
        <Field label="Clock out (Central)"><input className={input} type="datetime-local" required={!f.open} value={f.clockOut} onChange={set('clockOut')} /></Field>
        {f.open && <p className="-mt-1 text-xs text-text-muted">They are still on the clock. Leave clock out empty to keep them clocked in.</p>}
        {!(f.open && !f.clockOut) && <Field label="Total break minutes"><input className={input} type="number" min="0" step="1" required value={f.breakMinutes} onChange={set('breakMinutes')} /></Field>}
        <Field label="Reason for change"><input className={input} required maxLength={300} value={f.reason} onChange={set('reason')} /></Field>
        <p className="text-xs text-text-muted">The original times stay on record.</p>
        <div className="flex justify-end gap-2"><button type="button" onClick={onClose} className={quietBtn}>Cancel</button><button type="submit" className={primaryBtn}>Save</button></div>
      </form>
    </div>
  );
}

function PaidEditor({ editor, onClose, onSaved }) {
  const [f, setF] = useState(editor);
  const [error, setError] = useState('');
  const send = async (hours) => {
    setError('');
    try { await api('/api/team/admin', { action: 'set-day-hours', userId: f.userId, day: f.day, hours, reason: f.reason }); onSaved(); } catch (err) { setError(err.message); }
  };
  return (
    <div role="dialog" aria-modal="true" aria-label="Set paid hours" className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 p-4">
      <form onSubmit={(e) => { e.preventDefault(); send(f.hours); }} className="max-h-full w-full max-w-md space-y-3 overflow-auto rounded-xl bg-white p-5">
        <h2 className="text-lg font-bold text-primary">Paid hours: {f.name}, {formatDay(f.day)}</h2>
        <p className="text-sm text-text-muted">Clocked: {formatHours(f.clockedSeconds)}. Working from calls: {formatHours(f.activeSeconds)}. The hours you enter are paid instead of the clocked hours. Clock times stay as they are.</p>
        <ErrorText>{error}</ErrorText>
        <Field label="Paid hours for the day"><input className={input} type="number" min="0" max="24" step="0.25" required autoFocus value={f.hours} onChange={(e) => setF((v) => ({ ...v, hours: e.target.value }))} /></Field>
        <Field label="Reason"><input className={input} required maxLength={300} value={f.reason} onChange={(e) => setF((v) => ({ ...v, reason: e.target.value }))} /></Field>
        <div className="flex flex-wrap justify-end gap-2">
          {f.hasOverride && <button type="button" onClick={() => (f.reason.trim() ? send('') : setError('Say why this is being changed.'))} className={quietBtn}>Use clocked hours</button>}
          <button type="button" onClick={onClose} className={quietBtn}>Cancel</button><button type="submit" className={primaryBtn}>Save</button>
        </div>
      </form>
    </div>
  );
}

function PersonWeek({ person, onEdit, onAdd, onPaid, onlyWorked }) {
  const today = centralDay();
  const active = person.days.filter((d) => (onlyWorked ? worked(d) : d.day <= today || worked(d)));
  const label = { out: 'Off the clock', in: 'On the clock', break: 'On break' }[person.status.state];
  const dot = { out: 'bg-slate-400', in: 'bg-emerald-500', break: 'bg-amber-500' }[person.status.state];
  const rowBtn = 'ml-1 inline-flex items-center gap-1 rounded px-1.5 py-1 align-middle text-xs font-medium text-star hover:bg-slate-100';
  return (
    <Card title={person.name} action={<span className="inline-flex items-center gap-2 text-sm text-text-muted"><span className={`h-2.5 w-2.5 rounded-full ${dot}`} />{label}</span>}>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {[['Paid hours', formatHours(person.totalSeconds)], ['Working hours', formatHours(person.activeSeconds)], ['Clocked hours', formatHours(person.clockedSeconds)], ['Pay', money(person.estimatedPay)], ['Dials', person.totals.dials], ['Reached', person.totals.answered], ['Calls 1 min+', person.totals.conversations], ['Calls off the clock', person.totals.offClock]].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-bg-alt p-3"><dt className="text-xs text-text-muted">{k}</dt><dd className="text-lg font-bold tabular-nums text-primary">{v}</dd></div>
        ))}
      </dl>
      {active.length > 0 && <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="text-xs text-text-muted"><tr><th className="py-2 pr-3 font-medium">Day</th><th className="pr-3 font-medium">Clocked</th><th className="pr-3 font-medium">Break</th><th className="pr-3 font-medium">Clocked hrs</th><th className="pr-3 font-medium">Working</th><th className="pr-3 font-medium">Paid</th><th className="pr-3 font-medium">First to last call</th><th className="pr-3 font-medium">Dials</th><th className="pr-3 font-medium">Reached</th><th className="pr-3 font-medium">1 min+</th><th className="pr-3 font-medium">On calls</th><th className="pr-3 font-medium">Longest gap</th></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {active.flatMap((d) => (d.shifts.length ? d.shifts : [null]).map((s, i) => (
              <tr key={s?.id || d.day}>
                <td className="whitespace-nowrap py-2 pr-3 font-medium">{i === 0 ? formatDay(d.day) : ''}</td>
                <td className="whitespace-nowrap pr-3">
                  {s ? `${formatTime(s.clockIn)} to ${s.clockOut ? formatTime(s.clockOut) : 'now'}${s.edited ? ' (edited)' : ''}` : <span className="font-medium text-amber-700">Not clocked in</span>}
                  {s
                    ? <button type="button" aria-label={`Edit ${person.name} ${formatDay(d.day)} clock times`} title="Edit clock times" onClick={() => onEdit(s, person)} className={rowBtn}><Pencil className="h-3.5 w-3.5" aria-hidden /></button>
                    : <button type="button" aria-label={`Add ${person.name} clock times for ${formatDay(d.day)}`} title="Add clock times" onClick={() => onAdd(d, person)} className={rowBtn}><Plus className="h-3.5 w-3.5" aria-hidden /> Add</button>}
                </td>
                <td className="pr-3 tabular-nums">{s ? `${Math.round(s.breakSeconds / 60)}m` : '-'}</td>
                <td className="whitespace-nowrap pr-3 tabular-nums">{s ? formatHours(s.workedSeconds) : '-'}</td>
                <td className="whitespace-nowrap pr-3 tabular-nums">{i === 0 && d.activeSeconds ? formatHours(d.activeSeconds) : ''}</td>
                <td className="whitespace-nowrap pr-3 font-semibold tabular-nums text-primary">{i === 0 ? <>{formatHours(d.workedSeconds)}{d.paidOverride && <span title={`Set by ${d.paidOverride.editor}: ${d.paidOverride.reason}`} className="ml-1 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">set</span>}
                  <button type="button" aria-label={`Set ${person.name} paid hours for ${formatDay(d.day)}`} title="Set paid hours" onClick={() => onPaid(d, person)} className={rowBtn}><Pencil className="h-3.5 w-3.5" aria-hidden /></button></> : ''}</td>
                <td className="whitespace-nowrap pr-3">{i === 0 && d.calls ? `${formatTime(d.calls.firstCall)} to ${formatTime(d.calls.lastCall)}` : ''}</td>
                <td className="pr-3 tabular-nums">{i === 0 ? d.calls?.dials ?? 0 : ''}</td>
                <td className="pr-3 tabular-nums">{i === 0 ? d.calls?.answered ?? 0 : ''}</td>
                <td className="pr-3 tabular-nums">{i === 0 ? d.calls?.conversations ?? 0 : ''}</td>
                <td className="whitespace-nowrap pr-3">{i === 0 ? talkText(d.calls) : ''}</td>
                <td className="pr-3 tabular-nums">{i === 0 && d.calls?.longestGapSeconds ? `${Math.round(d.calls.longestGapSeconds / 60)}m` : ''}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>}
      {!active.length && <p className="mt-3 text-sm text-text-muted">{onlyWorked ? 'No days worked this week. Turn off "Only days worked" to add hours.' : 'No shifts or calls this week.'}</p>}
      <p className="mt-2 text-xs text-text-muted">Pencil next to Clocked changes clock times; pencil next to Paid sets the hours paid for that day. Working = first call to last call, leaving out any 15+ minute stretch with no dialing. Paid = clocked hours, or the hours you set for that day.</p>
    </Card>
  );
}

function TeamSetup({ me, users, presets, reload, onActed }) {
  const blank = () => ({ preset: '', name: '', username: '', role: 'caller', hourlyRate: '', startDate: centralDay() });
  const [f, setF] = useState(blank);
  const [credential, setCredential] = useState(null);
  const [error, setError] = useState('');
  const available = presets.filter((p) => !users.some((u) => u.username === p.username));
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const run = async (body) => {
    setError(''); setCredential(null);
    try {
      const r = await api('/api/team/admin', body);
      if (r.temporaryPassword) setCredential(r);
      await reload();
      return true;
    } catch (err) { setError(err.message); return false; }
  };
  const add = async (e) => {
    e.preventDefault();
    if (await run({ action: 'add-user', ...f })) setF(blank());
  };
  return (
    <Card title="People and logins">
      <ErrorText>{error}</ErrorText>
      {credential && <div role="status" className="mb-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
        <p className="font-semibold">Send this login privately. It only shows once.</p>
        <p className="mt-1">Page: <code>team.thestellarroofing.com</code></p><p>Username: <code>{credential.username}</code></p><p>Temporary password: <code className="select-all font-bold">{credential.temporaryPassword}</code></p>
      </div>}
      <ul className="divide-y divide-slate-100">
        {users.map((u) => (
          <li key={u.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
            <span><span className="font-semibold">{u.name}</span> <span className="text-text-muted">@{u.username}, {u.role === 'admin' ? 'admin' : 'caller'}{u.active ? '' : ', off'}</span><span className="block text-xs text-text-muted">Days before the start date stay off their timesheet.</span></span>
            <span className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1 text-text-muted">Start<input aria-label={`${u.name} start date`} className="rounded border border-slate-300 px-2 py-1" type="date" max={centralDay()} defaultValue={u.start_date || ''} onChange={(e) => { if (e.target.value !== (u.start_date || '')) run({ action: 'set-start', userId: u.id, startDate: e.target.value }); }} /></label>
              <label className="flex items-center gap-1 text-text-muted">$/hr<input aria-label={`${u.name} hourly rate`} className="w-20 rounded border border-slate-300 px-2 py-1.5" type="number" min="0" step="0.01" defaultValue={u.hourly_rate ?? ''} onBlur={(e) => { if (e.target.value !== String(u.hourly_rate ?? '')) run({ action: 'set-rate', userId: u.id, hourlyRate: e.target.value }); }} /></label>
              {u.role === 'caller' && u.active && <button type="button" className={quietBtn} onClick={async () => { setError(''); try { await api('/api/team/admin', { action: 'act-as', userId: u.id }); await onActed(); } catch (err) { setError(err.message); } }}>Act as {u.name.split(' ')[0]}</button>}
              {u.id !== me.id && <button type="button" className={quietBtn} onClick={() => run({ action: 'set-role', userId: u.id, role: u.role === 'admin' ? 'caller' : 'admin' })}>{u.role === 'admin' ? 'Remove admin' : 'Make admin'}</button>}
              <button type="button" className={quietBtn} onClick={() => run({ action: 'reset-password', userId: u.id })}>Reset password</button>
              {u.id !== me.id && <button type="button" className={quietBtn} onClick={() => run({ action: 'set-active', userId: u.id, active: !u.active })}>{u.active ? 'Turn off' : 'Turn on'}</button>}
            </span>
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-3 lg:grid-cols-7">
        <Field label="Add"><select className={input} value={f.preset} onChange={set('preset')}><option value="">Someone else</option>{available.map((p) => <option key={p.key} value={p.key}>{p.name}</option>)}</select></Field>
        {!f.preset && <Field label="Name"><input className={input} required onChange={set('name')} value={f.name} /></Field>}
        {!f.preset && <Field label="Username"><input className={input} required autoCapitalize="none" onChange={set('username')} value={f.username} /></Field>}
        <Field label="Access"><select className={input} value={f.role} onChange={set('role')}><option value="caller">Caller</option><option value="admin">Admin</option></select></Field>
        <Field label="Hourly rate"><input className={input} type="number" min="0" step="0.01" onChange={set('hourlyRate')} value={f.hourlyRate} /></Field>
        <Field label="Start date"><input className={input} type="date" required max={centralDay()} onChange={set('startDate')} value={f.startDate} /></Field>
        <div className="flex items-end"><button type="submit" className={`${primaryBtn} w-full`}><Plus className="h-4 w-4" aria-hidden /> Add</button></div>
      </form>
    </Card>
  );
}

function AdminView({ me, onLogout, week, onWeek, onActed }) {
  const [view, setViewState] = useState(() => saved('team-view', 'week'));
  const [month, setMonth] = useState(thisMonth);
  const [onlyWorked, setOnlyWorkedState] = useState(() => saved('team-only-worked', true));
  const setView = (v) => { setViewState(v); remember('team-view', v); };
  const setOnlyWorked = (v) => { setOnlyWorkedState(v); remember('team-only-worked', v); };
  const openWeek = (monday) => { onWeek(monday); setView('week'); };
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [editor, setEditor] = useState(null);
  const [paid, setPaid] = useState(null);
  const [updating, setUpdating] = useState(true);
  const latest = useRef(0);
  const load = useCallback(async () => {
    const id = latest.current + 1;
    latest.current = id;
    // Hours and saved calls show right away; new calls fill in behind them.
    const query = view === 'month' ? `month=${month}` : `week=${week}`;
    try {
      const fast = await api(`/api/team/admin?${query}`);
      if (id !== latest.current) return;
      setData(fast); setError('');
    } catch (err) { if (id === latest.current) setError(err.message); return; }
    // The month view shows hours only, which never wait on call records.
    if (view === 'month') { setUpdating(false); return; }
    setUpdating(true);
    api(`/api/team/admin?week=${week}&refresh=1`)
      .then((fresh) => { if (id === latest.current) setData(fresh); })
      .catch(() => {})
      .finally(() => { if (id === latest.current) setUpdating(false); });
  }, [week, month, view]);
  useEffect(() => { setData(null); }, [view]);
  useEffect(() => { load(); const t = setInterval(load, 60000); return () => clearInterval(t); }, [load]);
  // Take the request off the list right away; put it back if saving fails.
  const closeRequest = async (id) => {
    const before = data;
    setData((v) => ({ ...v, requests: v.requests.filter((r) => r.id !== id) }));
    try { await api('/api/team/admin', { action: 'close-request', requestId: id }); load(); } catch (err) { setData(before); setError(err.message); }
  };
  const editShift = (s) => setEditor({ shiftId: s.id, open: !s.clockOut, clockIn: toCentralInput(s.clockIn), clockOut: toCentralInput(s.clockOut), breakMinutes: Math.round(s.breakSeconds / 60), reason: '' });
  const editPaid = (d, person) => setPaid({
    userId: person.id, name: person.name.split(' ')[0], day: d.day, clockedSeconds: d.clockedSeconds, activeSeconds: d.activeSeconds,
    hours: d.paidOverride ? String(+(d.paidOverride.seconds / 3600).toFixed(2)) : '', hasOverride: Boolean(d.paidOverride), reason: '',
  });
  // A day with no shift starts from their first and last call, else 9 to 5.
  const addHours = (d, person) => setEditor({
    shiftId: null, userId: person.id,
    clockIn: d.calls?.firstCall ? toCentralInput(d.calls.firstCall) : `${d.day}T09:00`,
    clockOut: d.calls?.lastCall ? toCentralInput(d.calls.lastCall) : `${d.day}T17:00`,
    breakMinutes: 0, reason: '',
  });
  return (
    <Shell user={me} onLogout={onLogout} wide>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div><h1 className="text-xl font-bold text-primary">Timesheets</h1><p className="text-xs text-text-muted">All times are Central (Nashville).</p></div>
          <div role="group" aria-label="View" className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 text-sm">
            {[['week', 'Week'], ['month', 'Month']].map(([k, l]) => <button key={k} type="button" aria-pressed={view === k} onClick={() => setView(k)} className={`rounded-md px-3 py-1.5 font-semibold ${view === k ? 'bg-primary text-white' : 'text-text-muted hover:text-primary'}`}>{l}</button>)}
          </div>
        </div>
        {view === 'week'
          ? <WeekNav week={week} onWeek={onWeek}>
            <span className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-2 text-sm text-text-muted"><input type="checkbox" className="h-4 w-4 accent-primary" checked={onlyWorked} onChange={(e) => setOnlyWorked(e.target.checked)} /> Only days worked</label>
              <button type="button" className={quietBtn} onClick={() => setEditor({ shiftId: null, userId: '', clockIn: `${centralDay()}T09:00`, clockOut: `${centralDay()}T17:00`, breakMinutes: 0, reason: '' })}><Plus className="h-4 w-4" aria-hidden /> Add shift</button>
              <a className={quietBtn} href={`/api/team/export?week=${week}`}><Download className="h-4 w-4" aria-hidden /> CSV</a>
            </span>
          </WeekNav>
          : <MonthNav month={month} onMonth={setMonth}>
            <a className={quietBtn} href={`/api/team/export?month=${month}`}><Download className="h-4 w-4" aria-hidden /> Payroll CSV</a>
          </MonthNav>}
      </div>
      <ErrorText>{error}</ErrorText>
      {!data && !error && <p className="text-sm text-text-muted">Loading the {view}...</p>}
      {data && view === 'month' && data.report.mondays && <MonthView report={data.report} month={month} onOpenWeek={openWeek} />}
      {data && view === 'month' && data.requests.length > 0 && <p className="text-sm text-amber-800">{data.requests.length} open fix request{data.requests.length > 1 ? 's' : ''}. Switch to Week to see {data.requests.length > 1 ? 'them' : 'it'}.</p>}
      {data && view === 'month' && <TeamSetup me={me} users={data.users} presets={data.presets} reload={load} onActed={onActed} />}
      {data && view === 'week' && !data.report.mondays && <>
        <p role="status" className="text-xs text-text-muted">{updating ? 'Updating calls...' : data.report.callsUpdatedAt ? `Calls updated ${formatTime(data.report.callsUpdatedAt)} Central` : ''}</p>
        {!updating && !data.report.callsConnected && <ErrorText>Call records could not be loaded right now. Hours are still correct.</ErrorText>}
        {!updating && data.report.callsConnected && !data.report.ghlConnected && <ErrorText>GHL call records could not be loaded, so GHL dialer calls may be missing. Hours are still correct.</ErrorText>}
        {!updating && data.report.callsConnected && !data.report.wavvConnected && <ErrorText>WAVV is not connected right now, so WAVV call counts are incomplete. Hours are still correct.</ErrorText>}
        {!updating && data.report.callsPartial && <ErrorText>Only part of this week&apos;s call records loaded.</ErrorText>}
        {data.requests.length > 0 && <Card title={`Fix requests (${data.requests.length})`}>
          <ul className="divide-y divide-slate-100">{data.requests.map((r) => <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm"><span><b>{r.name}</b>, {formatDay(r.day)}: {r.note}</span><button type="button" className={quietBtn} onClick={() => closeRequest(r.id)}>Done</button></li>)}</ul>
        </Card>}
        {data.report.people.map((p) => <PersonWeek key={p.id} person={p} onEdit={editShift} onAdd={addHours} onPaid={editPaid} onlyWorked={onlyWorked} />)}
        {!data.report.people.length && <Card><p className="text-sm text-text-muted">Nobody on the timesheet this week. People show from their start date.</p></Card>}
        <p className="flex items-start gap-2 text-xs text-text-muted"><Phone className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> Calls come live from WAVV and the GHL dialer. For WAVV, Reached means a real person answered. For GHL, it can include voicemail pickups. On calls is connected time, including voicemails.</p>
        <TeamSetup me={me} users={data.users} presets={data.presets} reload={load} onActed={onActed} />
      </>}
      {paid && <PaidEditor editor={paid} onClose={() => setPaid(null)} onSaved={() => { setPaid(null); load(); }} />}
      {editor && data && <ShiftEditor editor={editor} people={data.users} onClose={() => setEditor(null)} onSaved={() => { setEditor(null); load(); }} />}
    </Shell>
  );
}

export default function TeamApp() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [week, setWeek] = useState(() => mondayOf(centralDay()));
  const latest = useRef(0);
  const load = useCallback(async () => {
    const id = latest.current + 1;
    latest.current = id;
    let fast;
    try {
      fast = await api(`/api/team/me?week=${week}`);
      if (id !== latest.current) return;
      setData(fast); setError('');
    } catch (err) { if (id === latest.current) setError(err.message); return; }
    // Callers see their clock at once; new call counts fill in afterward.
    if (fast.user && fast.user.role !== 'admin' && !fast.user.mustChange) {
      api(`/api/team/me?week=${week}&refresh=1`)
        .then((fresh) => { if (id === latest.current) setData(fresh); })
        .catch(() => {});
    }
  }, [week]);
  useEffect(() => { load(); }, [load]);
  const logout = async () => { await api('/api/team/auth', { action: 'logout' }).catch(() => {}); setData(null); load(); };
  // Switching between the admin board and a caller's screen.
  const switchView = async () => { setData(null); await load(); };
  const stopActing = async () => { await api('/api/team/auth', { action: 'stop-acting' }).catch(() => {}); await switchView(); };

  if (error && !data) return <Shell><ErrorText>{error}</ErrorText></Shell>;
  if (!data) return <Shell><p className="text-sm text-text-muted">Loading...</p></Shell>;
  if (!data.user) return <AuthForm mode={data.setupNeeded ? 'setup' : 'login'} onDone={load} />;
  if (data.user.mustChange) return <AuthForm mode="change-password" onDone={load} />;
  if (data.user.role === 'admin') return <AdminView me={data.user} onLogout={logout} week={week} onWeek={setWeek} onActed={switchView} />;
  return <CallerView data={data} reload={load} week={week} onWeek={setWeek} onLogout={logout} onBack={stopActing} />;
}
