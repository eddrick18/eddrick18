import "../queuewise-breakdown.css";

const repo = "https://github.com/eddrick18/queuewise/blob/main/";
const sources = [
  ["API & role boundaries", "backend/routes/api.php"],
  [
    "Booking validation",
    "backend/app/Http/Controllers/AppointmentController.php",
  ],
  ["Queue refresh logic", "frontend/src/pages/DashboardPage.tsx"],
  ["Booking feature tests", "backend/tests/Feature/AppointmentTest.php"],
];

export default function QueueWiseBreakdown() {
  return (
    <section
      className="queuewise-breakdown"
      aria-labelledby="queuewise-technical-heading"
    >
      <p className="showcase-eyebrow">UNDER THE HOOD</p>
      <h3 id="queuewise-technical-heading">
        From booking to the service counter.
      </h3>
      <p className="queuewise-intro">
        I built the customer, staff, and administrator workflows across a React
        frontend and Laravel API. The server owns booking rules and queue
        transitions; each interface presents the actions its role can use.
      </p>
      <ol
        className="queuewise-architecture"
        aria-label="Application request path"
      >
        <li>
          <span className="showcase-eyebrow">BROWSER</span>
          <h4>React + TypeScript</h4>
          <p>
            Role-based screens send requests through a shared Axios client and
            display appointments, queue status, and validation feedback.
          </p>
        </li>
        <li>
          <span className="showcase-eyebrow">HTTP / JSON</span>
          <h4>Laravel + Sanctum</h4>
          <p>
            Session authentication, active-account and role middleware,
            validation, and controllers enforce access and business rules.
          </p>
        </li>
        <li>
          <span className="showcase-eyebrow">PERSISTENCE</span>
          <h4>Relational data</h4>
          <p>
            Eloquent connects users, services, appointments, and queue entries.
            Transactions and database constraints protect booking updates. Local
            captures use SQLite.
          </p>
        </li>
      </ol>
      <dl className="queuewise-decisions">
        <div>
          <dt>Authentication & access</dt>
          <dd>
            The frontend obtains a CSRF cookie before signing in and sends
            credentials with API requests. Protected endpoints use Sanctum, with
            server-side role checks for customer, staff, and admin operations.
          </dd>
        </div>
        <div>
          <dt>Engineering challenge: competing bookings</dt>
          <dd>
            Two customers can see the same available slot. Booking rechecks
            availability inside a transaction, locks the relevant user and
            service, and relies on a unique service-and-slot constraint. An
            occupied slot returns a conflict so the customer can choose another
            time.
          </dd>
        </div>
        <div>
          <dt>Decision: poll for queue updates</dt>
          <dd>
            The dashboard periodically fetches queue state and also supports
            manual refresh. Request and mutation guards prevent overlapping
            refreshes; a revision check ignores responses made stale by a local
            action. Polling keeps the implementation straightforward, with a
            refresh delay and recurring HTTP requests as the tradeoff.
          </dd>
        </div>
        <div>
          <dt>What the tests cover</dt>
          <dd>
            Backend feature tests cover slot conflicts, cancellation releasing a
            slot, Philippine booking time, role restrictions, and check-in
            creating a single queue entry. Queue lifecycle tests cover service
            transitions and duplicate active entries. This describes the
            existing test coverage, not a new test-run result.
          </dd>
        </div>
      </dl>
      <h4 className="queuewise-source-heading">Explore the implementation</h4>
      <ul className="queuewise-sources">
        {sources.map(([label, path]) => (
          <li key={path}>
            <a href={repo + path} target="_blank" rel="noreferrer">
              {label}
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only"> (GitHub, opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
