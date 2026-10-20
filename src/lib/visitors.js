const identityKey = 'portfolio-visitor-id';
const ownerKey = 'portfolio-exclude-visits';

export function createVisitRequest({storage, hostname, search, production}) {
  const readOnly = {method:'GET'};
  try {
    const exclude = new URLSearchParams(search).get('exclude_visits');
    if (exclude === '1') storage.setItem(ownerKey, '1');
    if (exclude === '0') storage.removeItem(ownerKey);
    if (!production || ['localhost','127.0.0.1','[::1]','::1'].includes(hostname) || storage.getItem(ownerKey) === '1') return readOnly;
    let visitorId = storage.getItem(identityKey);
    if (!/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(visitorId || '')) {
      visitorId = crypto.randomUUID();
      storage.setItem(identityKey, visitorId);
    }
    return {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitorId})};
  } catch { return readOnly; }
}
