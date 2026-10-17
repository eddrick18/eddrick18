const profilePhoto = `${import.meta.env.BASE_URL}profile-photo-transparent.png`;

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-meta hero-meta-right hero-enter hero-enter-meta">
        <span>ESCALANTE CITY, NEGROS OCCIDENTAL, PH</span>
      </div>

      <div className="hero-grid">
        <div className="hero-identity">
          <figure className="hero-portrait hero-enter hero-enter-portrait">
            <img src={profilePhoto} alt="Eddrick Miano in his Silliman University graduation attire" loading="eager" fetchpriority="high" />
          </figure>

          <div className="hero-copy">
            <p className="kicker hero-enter hero-enter-role">
              COMPUTER ENGINEER · FRONTEND DEVELOPER
            </p>

            <h1 aria-label="Eddrick Miano.">
              <span className="hero-name-line" aria-hidden="true">
                <span>Eddrick</span>
              </span>
              <span className="hero-name-line" aria-hidden="true">
                <span>
                  Miano<span className="accent">.</span>
                </span>
              </span>
            </h1>
          </div>
        </div>

        <div className="hero-intro">
          <p className="hero-enter hero-enter-description">
            I build responsive web and mobile applications using React,
            TypeScript, React Native, Expo, and practical software-engineering
            tools.
          </p>

          <p className="muted hero-enter hero-enter-description">
            Currently open to entry-level frontend, mobile, and
            software-development opportunities.
          </p>

          <div className="hero-actions hero-enter hero-enter-actions">
            <span className="magnetic-target"><a className="button button-primary" href="#projects">
              View projects{" "}
              <span className="action-arrow arrow-down" aria-hidden="true">
                ↓
              </span>
            </a></span>

            <span className="magnetic-target"><a
              className="button"
              href={`${import.meta.env.BASE_URL}Eddrick_Miano_Resume_2026.pdf?v=25ccadc27551`}
              target="_blank"
              rel="noreferrer"
            >
              Download résumé{" "}
              <span className="action-arrow arrow-diagonal" aria-hidden="true">
                ↗
              </span>
            </a></span>
          </div>
        </div>
      </div>

      <div className="fact-grid hero-enter hero-enter-facts">
        <article>
          <span className="fact-label">EDUCATION</span>
          <strong>BS Computer Engineering</strong>
          <span>Silliman University · 2026</span>
        </article>

        <article>
          <span className="fact-label">EXPERIENCE</span>
          <strong>Software Development Intern</strong>
          <span>Bluebeans System Inc.</span>
        </article>

        <article>
          <span className="fact-label">FOCUS</span>
          <strong>Frontend &amp; Mobile Development</strong>
          <span>React · React Native · TypeScript</span>
        </article>
      </div>
    </section>
  );
}
