import SectionHeader from "./SectionHeader";
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <SectionHeader number="03" label="EXPERIENCE" title="Learning by shipping and testing." />

      <div className="timeline">
        {experience.map((item) => (
          <article className="timeline-item reveal" key={`${item.role}-${item.organization}`}>
            <div className="timeline-period">{item.period}</div>
            <div>
              <h3>{item.role}</h3>
              <p className="timeline-org">{item.organization}</p>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
