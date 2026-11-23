'use client';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Coffee, Download, LogOut, Pencil, Phone, Play, Plus, Square, Star } from 'lucide-react';
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

function Shell({ user, onLogout, children, wide }) {
  return (
    <div className="min-h-screen bg-bg-alt">
      <header className="border-b border-slate-200 bg-white">
        <div className={`mx-auto flex items-center justify-between px-4 py-3 ${wide ? 'max-w-6xl' : 'max-w-xl'}`}>
          <Brand />
          {user && <button type="button" onClick={onLogout} className={quietBtn}><LogOut className="h-4 w-4" aria-hidden /> Log out</button>}
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
      onDone();
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

function CallerView({ data, reload, week, onWeek, onLogout }) {
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
    <Shell user={data.user} onLogout={onLogout}>
      <h1 className="text-xl font-bold text-primary">Hi, {data.user.name.split(' ')[0]}</h1>
      <ErrorText>{error}</ErrorText>
      <Clock status={data.status} onAction={act} busy={busy} />
      <Card title="My hours" action={<span className="font-bold tabular-nums text-star">{formatHours(person?.totalSeconds)}</span>}>
        <WeekNav week={week} onWeek={onWeek} />
        <ul className="mt-3 divide-y divide-slate-100">
          {(person?.days || []).filter((d) => d.shifts.length || d.calls).map((d) => (
            <li key={d.day} className="py-2.5 text-sm">
              <div className="flex justify-between font-semibold text-text-dark"><span>{formatDay(d.day)}</span><span className="tabular-nums">{formatHours(d.workedSeconds)}</span></div>
              {d.shifts.map((s) => <p key={s.id} className="text-text-muted">{formatTime(s.clockIn)} to {s.clockOut ? formatTime(s.clockOut) : 'now'}{s.breakSeconds ? `, ${Math.round(s.breakSeconds / 60)} min break` : ''}{s.edited ? ' (edited)' : ''}</p>)}
              {d.calls && <p className="text-text-muted">{d.calls.dials} calls, {d.calls.answered} reached, {d.calls.conversations} over 1 min</p>}
            </li>
          ))}
        </ul>
        {person && !person.days.some((d) => d.shifts.length || d.calls) && <p className="mt-3 text-sm text-text-muted">No hours this week yet.</p>}
      </Card>
      <Card title="Forgot to clock in or out?">
        <form onSubmit={sendFix} className="space-y-3">
          <Field label="Which day"><input className={input} type="date" required max={centralDay()} value={fix.day} onChange={(e) => setFix((v) => ({ ...v, day: e.target.value }))} /></Field>
          <Field label="What should it say?"><textarea className={input} required maxLength={500} rows={2} placeholder="I started at 9:00 and forgot to clock in" value={fix.note} onChange={(e) => { setSent(false); setFix((v) => ({ ...v, note: e.target.value })); }} /></Field>
          <button type="submit" className={quietBtn}>Send request</button>
          {sent && <p role="status" className="text-sm text-emerald-700">Sent. Brandon or Nate will review it.</p>}
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
        <Field label="Clock out (Central)"><input className={input} type="datetime-local" required value={f.clockOut} onChange={set('clockOut')} /></Field>
        <Field label="Total break minutes"><input className={input} type="number" min="0" step="1" required value={f.breakMinutes} onChange={set('breakMinutes')} /></Field>
        <Field label="Reason for change"><input className={input} required maxLength={300} value={f.reason} onChange={set('reason')} /></Field>
        <p className="text-xs text-text-muted">The original times stay on record.</p>
        <div className="flex justify-end gap-2"><button type="button" onClick={onClose} className={quietBtn}>Cancel</button><button type="submit" className={primaryBtn}>Save</button></div>
      </form>
    </div>
  );
}

function PersonWeek({ person, onEdit }) {
  const active = person.days.filter((d) => d.shifts.length || d.calls);
  const label = { out: 'Off the clock', in: 'On the clock', break: 'On break' }[person.status.state];
  const dot = { out: 'bg-slate-400', in: 'bg-emerald-500', break: 'bg-amber-500' }[person.status.state];
  return (
    <Card title={person.name} action={<span className="inline-flex items-center gap-2 text-sm text-text-muted"><span className={`h-2.5 w-2.5 rounded-full ${dot}`} />{label}</span>}>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-6">
        {[['Paid hours', formatHours(person.totalSeconds)], ['Est. pay', person.estimatedPay === null ? 'No rate' : `$${person.estimatedPay.toFixed(2)}`], ['Dials', person.totals.dials], ['Reached', person.totals.answered], ['Calls 1 min+', person.totals.conversations], ['Calls off the clock', person.totals.offClock]].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-bg-alt p-3"><dt className="text-xs text-text-muted">{k}</dt><dd className="text-lg font-bold tabular-nums text-primary">{v}</dd></div>
        ))}
      </dl>
      {active.length > 0 && <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="text-xs text-text-muted"><tr><th className="py-2 pr-3 font-medium">Day</th><th className="pr-3 font-medium">Clocked</th><th className="pr-3 font-medium">Break</th><th className="pr-3 font-medium">Paid</th><th className="pr-3 font-medium">First to last call</th><th className="pr-3 font-medium">Dials</th><th className="pr-3 font-medium">Reached</th><th className="pr-3 font-medium">1 min+</th><th className="pr-3 font-medium">On calls</th><th className="pr-3 font-medium">Longest gap</th><th /></tr></thead>
          <tbody className="divide-y divide-slate-100">
            {active.flatMap((d) => (d.shifts.length ? d.shifts : [null]).map((s, i) => (
              <tr key={s?.id || d.day}>
                <td className="whitespace-nowrap py-2 pr-3 font-medium">{i === 0 ? formatDay(d.day) : ''}</td>
                <td className="whitespace-nowrap pr-3">{s ? `${formatTime(s.clockIn)} to ${s.clockOut ? formatTime(s.clockOut) : 'now'}${s.edited ? ' (edited)' : ''}` : <span className="font-medium text-amber-700">Not clocked in</span>}</td>
                <td className="pr-3 tabular-nums">{s ? `${Math.round(s.breakSeconds / 60)}m` : '-'}</td>
                <td className="pr-3 tabular-nums">{s ? formatHours(s.workedSeconds) : '-'}</td>
                <td className="whitespace-nowrap pr-3">{i === 0 && d.calls ? `${formatTime(d.calls.firstCall)} to ${formatTime(d.calls.lastCall)}` : ''}</td>
                <td className="pr-3 tabular-nums">{i === 0 ? d.calls?.dials ?? 0 : ''}</td>
                <td className="pr-3 tabular-nums">{i === 0 ? d.calls?.answered ?? 0 : ''}</td>
                <td className="pr-3 tabular-nums">{i === 0 ? d.calls?.conversations ?? 0 : ''}</td>
                <td className="whitespace-nowrap pr-3">{i === 0 ? talkText(d.calls) : ''}</td>
                <td className="pr-3 tabular-nums">{i === 0 && d.calls?.longestGapSeconds ? `${Math.round(d.calls.longestGapSeconds / 60)}m` : ''}</td>
                <td className="text-right">{s?.clockOut && <button type="button" aria-label={`Edit ${formatDay(d.day)} shift`} onClick={() => onEdit(s, person)} className="rounded p-2 text-text-muted hover:bg-slate-100"><Pencil className="h-4 w-4" /></button>}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>}
      {!active.length && <p className="mt-3 text-sm text-text-muted">No shifts or calls this week.</p>}
    </Card>
  );
}

function TeamSetup({ me, users, presets, reload }) {
  const [f, setF] = useState({ preset: '', name: '', username: '', role: 'caller', hourlyRate: '' });
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
    if (await run({ action: 'add-user', ...f })) setF({ preset: '', name: '', username: '', role: 'caller', hourlyRate: '' });
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
            <span><span className="font-semibold">{u.name}</span> <span className="text-text-muted">@{u.username}, {u.role === 'admin' ? 'admin' : 'caller'}{u.active ? '' : ', off'}</span></span>
            <span className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1 text-text-muted">$/hr<input aria-label={`${u.name} hourly rate`} className="w-20 rounded border border-slate-300 px-2 py-1.5" type="number" min="0" step="0.01" defaultValue={u.hourly_rate ?? ''} onBlur={(e) => { if (e.target.value !== String(u.hourly_rate ?? '')) run({ action: 'set-rate', userId: u.id, hourlyRate: e.target.value }); }} /></label>
              {u.id !== me.id && <button type="button" className={quietBtn} onClick={() => run({ action: 'set-role', userId: u.id, role: u.role === 'admin' ? 'caller' : 'admin' })}>{u.role === 'admin' ? 'Remove admin' : 'Make admin'}</button>}
              <button type="button" className={quietBtn} onClick={() => run({ action: 'reset-password', userId: u.id })}>Reset password</button>
              {u.id !== me.id && <button type="button" className={quietBtn} onClick={() => run({ action: 'set-active', userId: u.id, active: !u.active })}>{u.active ? 'Turn off' : 'Turn on'}</button>}
            </span>
          </li>
        ))}
      </ul>
      <form onSubmit={add} className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-3 lg:grid-cols-6">
        <Field label="Add"><select className={input} value={f.preset} onChange={set('preset')}><option value="">Someone else</option>{available.map((p) => <option key={p.key} value={p.key}>{p.name}</option>)}</select></Field>
        {!f.preset && <Field label="Name"><input className={input} required onChange={set('name')} value={f.name} /></Field>}
        {!f.preset && <Field label="Username"><input className={input} required autoCapitalize="none" onChange={set('username')} value={f.username} /></Field>}
        <Field label="Access"><select className={input} value={f.role} onChange={set('role')}><option value="caller">Caller</option><option value="admin">Admin</option></select></Field>
        <Field label="Hourly rate"><input className={input} type="number" min="0" step="0.01" onChange={set('hourlyRate')} value={f.hourlyRate} /></Field>
        <div className="flex items-end"><button type="submit" className={`${primaryBtn} w-full`}><Plus className="h-4 w-4" aria-hidden /> Add</button></div>
      </form>
    </Card>
  );
}

function AdminView({ me, onLogout, week, onWeek }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [editor, setEditor] = useState(null);
  const load = useCallback(async () => {
    try { setData(await api(`/api/team/admin?week=${week}`)); setError(''); } catch (err) { setError(err.message); }
  }, [week]);
  useEffect(() => { load(); const t = setInterval(load, 60000); return () => clearInterval(t); }, [load]);
  const closeRequest = async (id) => { try { await api('/api/team/admin', { action: 'close-request', requestId: id }); await load(); } catch (err) { setError(err.message); } };
  const editShift = (s) => setEditor({ shiftId: s.id, clockIn: toCentralInput(s.clockIn), clockOut: toCentralInput(s.clockOut), breakMinutes: Math.round(s.breakSeconds / 60), reason: '' });
  return (
    <Shell user={me} onLogout={onLogout} wide>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-primary">Timesheets</h1>
        <WeekNav week={week} onWeek={onWeek}>
          <span className="flex gap-2">
            <button type="button" className={quietBtn} onClick={() => setEditor({ shiftId: null, userId: '', clockIn: `${centralDay()}T09:00`, clockOut: `${centralDay()}T17:00`, breakMinutes: 0, reason: '' })}><Plus className="h-4 w-4" aria-hidden /> Add shift</button>
            <a className={quietBtn} href={`/api/team/export?week=${week}`}><Download className="h-4 w-4" aria-hidden /> CSV</a>
          </span>
        </WeekNav>
      </div>
      <ErrorText>{error}</ErrorText>
      {!data && !error && <p className="text-sm text-text-muted">Loading the week and call records...</p>}
      {data && <>
        {!data.report.callsConnected && <ErrorText>Call records could not be loaded right now. Hours are still correct.</ErrorText>}
        {data.report.callsConnected && !data.report.ghlConnected && <ErrorText>GHL call records could not be loaded, so GHL dialer calls may be missing. Hours are still correct.</ErrorText>}
        {data.report.callsConnected && !data.report.wavvConnected && <ErrorText>WAVV is not connected right now, so WAVV call counts are incomplete. Hours are still correct.</ErrorText>}
        {data.report.callsPartial && <ErrorText>Only part of this week&apos;s call records loaded.</ErrorText>}
        {data.requests.length > 0 && <Card title={`Fix requests (${data.requests.length})`}>
          <ul className="divide-y divide-slate-100">{data.requests.map((r) => <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm"><span><b>{r.name}</b>, {formatDay(r.day)}: {r.note}</span><button type="button" className={quietBtn} onClick={() => closeRequest(r.id)}>Done</button></li>)}</ul>
        </Card>}
        {data.report.people.map((p) => <PersonWeek key={p.id} person={p} onEdit={editShift} />)}
        {!data.report.people.length && <Card><p className="text-sm text-text-muted">Add your callers below to get started.</p></Card>}
        <p className="flex items-start gap-2 text-xs text-text-muted"><Phone className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /> Calls come live from WAVV and the GHL dialer. For WAVV, Reached means a real person answered. For GHL, it can include voicemail pickups. On calls is connected time, including voicemails.</p>
        <TeamSetup me={me} users={data.users} presets={data.presets} reload={load} />
      </>}
      {editor && data && <ShiftEditor editor={editor} people={data.users} onClose={() => setEditor(null)} onSaved={() => { setEditor(null); load(); }} />}
    </Shell>
  );
}

export default function TeamApp() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [week, setWeek] = useState(() => mondayOf(centralDay()));
  const load = useCallback(async () => {
    try { setData(await api(`/api/team/me?week=${week}`)); setError(''); } catch (err) { setError(err.message); }
  }, [week]);
  useEffect(() => { load(); }, [load]);
  const logout = async () => { await api('/api/team/auth', { action: 'logout' }).catch(() => {}); setData(null); load(); };

  if (error && !data) return <Shell><ErrorText>{error}</ErrorText></Shell>;
  if (!data) return <Shell><p className="text-sm text-text-muted">Loading...</p></Shell>;
  if (!data.user) return <AuthForm mode={data.setupNeeded ? 'setup' : 'login'} onDone={load} />;
  if (data.user.mustChange) return <AuthForm mode="change-password" onDone={load} />;
  if (data.user.role === 'admin') return <AdminView me={data.user} onLogout={logout} week={week} onWeek={setWeek} />;
  return <CallerView data={data} reload={load} week={week} onWeek={setWeek} onLogout={logout} />;
}
