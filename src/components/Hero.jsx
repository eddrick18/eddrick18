const profilePhoto = `${import.meta.env.BASE_URL}profile-photo.jpg`;

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-meta hero-meta-right reveal">
        <span>ESCALANTE CITY, NEGROS OCCIDENTAL, PH</span>
      </div>

      <div className="hero-grid">
        <div className="hero-identity reveal">
          <figure className="hero-portrait">
            <img
              src={profilePhoto}
              alt="Eddrick Miano in his Silliman University graduation attire"
              loading="eager"
              fetchPriority="high"
            />
          </figure>

          <div className="hero-copy">
            <p className="kicker">COMPUTER ENGINEER · FRONTEND DEVELOPER</p>

            <h1>
              Eddrick
              <br />
              Miano<span className="accent">.</span>
            </h1>
          </div>
        </div>

        <div className="hero-intro reveal">
          <p>
            I build responsive web and mobile applications using React,
            TypeScript, React Native, Expo, and practical software-engineering
            tools.
          </p>

          <p className="muted">
            Currently open to entry-level frontend, mobile, and
            software-development opportunities.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View projects <span>↓</span>
            </a>

            <a
              className="button"
              href={`${import.meta.env.BASE_URL}Eddrick_Miano_Resume_2026.pdf?v=25ccadc27551`}
              target="_blank"
              rel="noreferrer"
            >
              Download résumé <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="fact-grid reveal">
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
