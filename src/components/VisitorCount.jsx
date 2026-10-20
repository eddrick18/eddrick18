import { useEffect, useState } from 'react';
import { createVisitRequest } from '../lib/visitors';
import '../visitor-count.css';

export default function VisitorCount() {
  const [count, setCount] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    let options = {method:'GET'};
    try {
      options = createVisitRequest({storage:window.localStorage, hostname:location.hostname, search:location.search, production:import.meta.env.PROD});
    } catch { /* Browsers without storage can still read the total. */ }
    fetch(`${import.meta.env.BASE_URL}api/visitors`, {...options, cache:'no-store', signal:controller.signal})
      .then(async response => {
        if (!response.ok) throw Error('Unavailable');
        const data = await response.json();
        if (!Number.isSafeInteger(data.count) || data.count < 0) throw Error('Invalid count');
        setCount(data.count);
      })
      .catch(() => { if (!controller.signal.aborted) setFailed(true); });
    return () => controller.abort();
  }, []);
  const label = failed ? 'Visitor count unavailable' : count === null ? 'Loading unique visitor count' : `${count.toLocaleString()} unique visitors — anonymous browsers counted once`;
  return <span className="visitor-count" role="status" aria-label={label} title={label}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></svg>
    <span aria-hidden="true">{count === null ? '—' : count.toLocaleString()}</span>
  </span>;
}
