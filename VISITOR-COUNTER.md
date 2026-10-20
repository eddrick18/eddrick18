# Unique visitor counter

The person icon beside the header name displays the shared count of anonymous browser IDs, since tracking began. It estimates browsers, not physical devices or people. Another browser, private browsing, or cleared storage may count again. The counter starts empty; earlier traffic cannot be recovered. No fingerprints, names, or raw IP addresses are stored. Rate-limit buckets use keyed hashes and expire after 60 seconds; anonymous visitor hashes remain in a Redis set for deduplication.

## Connect the new database

1. In this portfolio's Vercel project, open Storage and create/connect an Upstash Redis database. Review the provider's terms and current plan before accepting or purchasing anything.
2. In the project's Environment Variables, configure **server-only** `KV_REST_API_URL` and `KV_REST_API_TOKEN` (the Vercel integration names), or `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` using the database REST credentials. Enter them directly in Vercel; do not commit credentials or paste them into chat. Do not prefix them with `VITE_`.
3. Redeploy the updated source on Vercel once configuration is complete. `api/visitors.js` is a Vercel Node function; a static GitHub Pages deployment cannot run it.
4. Before opening your own production portfolio normally, visit `https://eddrickmiano.vercel.app/?exclude_visits=1` on each browser you want excluded. This persists an owner exclusion in that browser. You can then use the clean URL. `?exclude_visits=0` reverses the exclusion. This does not remove any earlier recorded visit.
5. Check the live result on a different browser/device: the first visit adds one; refreshes reuse the same ID. Verify Redis/database behavior after connection; automated tests currently substitute the external HTTP service and do not prove a live Upstash deployment.

The frontend requests the count once per page load. Only production visits register; Vercel previews and local browsers only read. Browsers that block local storage only read, so ephemeral IDs cannot inflate the count. Production requests validate IDs and origin and use Redis's atomic SADD/SCARD operation to deduplicate. Registration is limited to 20 requests per hashed IP per minute. This deters accidental/simple abuse, but cannot prove a request represents a human or prevent determined distributed inflation.

Missing credentials, blocked networks, or failed storage show an em dash and accessible unavailable status, never a fake count. The UI remains usable. No credentials are bundled in browser code.

## Local checks

`npm test` checks browser identity persistence, owner exclusion, preview/local exclusion, request validation, atomic storage request format, and failures/rate-limit responses. `npm run build` checks the frontend production bundle. Plain Vite development/preview servers do not execute `/api`; use `vercel dev` with your ignored local environment file for an end-to-end check against a real test database. Do not use a production database for test traffic.
