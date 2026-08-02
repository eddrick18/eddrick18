import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section className="section about" id="about">
      <SectionHeader number="04" label="ABOUT" title="Engineering discipline, user-focused execution." />

      <div className="about-grid reveal">
        <div className="about-lead">
          <p>
            I am a Computer Engineering graduate from Silliman University focused on
            frontend and application development.
          </p>
        </div>

        <div className="about-copy">
          <p>
            My experience includes building responsive web interfaces, developing
            mobile applications with React Native and Expo, integrating REST APIs,
            debugging software, testing systems, and contributing to AI-enabled projects.
          </p>
          <p>
            I approach development from both an engineering and interface perspective:
            understand the requirement, reduce unnecessary complexity, build a usable
            solution, and test it carefully.
          </p>

          <div className="education-card">
            <span className="fact-label">EDUCATION</span>
            <strong>Bachelor of Science in Computer Engineering</strong>
            <span>Silliman University · March 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
