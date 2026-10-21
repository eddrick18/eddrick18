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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
    <span aria-hidden="true">{count === null ? '—' : count.toLocaleString()}</span>
  </span>;
}
