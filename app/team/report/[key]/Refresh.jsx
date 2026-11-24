'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { formatTime } from '../../../../lib/team/time';

const EVERY_MS = 120000;

export default function Refresh({ reportKey, from, to, updatedAt, complete }) {
  const router = useRouter();
  const [state, setState] = useState('updating');
  const [, startTransition] = useTransition();
  const shown = useRef({ updatedAt, complete });
  shown.current = { updatedAt, complete };

  useEffect(() => {
    let active = true;
    const update = async () => {
      setState('updating');
      try {
        const res = await fetch('/api/team/report-refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: reportKey, from, to }),
        });
        const data = await res.json();
        if (!active) return;
        if (!res.ok || !data.ok) { setState('failed'); return; }
        const changed = data.updatedAt !== shown.current.updatedAt || !shown.current.complete;
        if (changed) startTransition(() => router.refresh());
        setState(data.ghlOk && data.wavvOk ? 'done' : 'failed');
      } catch {
        if (active) setState('failed');
      }
    };
    update();
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') update();
    }, EVERY_MS);
    return () => { active = false; clearInterval(timer); };
  }, [reportKey, from, to, router]);

  let text = updatedAt ? `Calls updated ${formatTime(updatedAt)} Central` : '';
  if (state === 'updating') text = 'Updating calls...';
  if (state === 'failed') text = 'Could not update calls. Showing the last saved numbers.';
  return <p role="status" className="text-xs text-slate-500">{text}</p>;
}
