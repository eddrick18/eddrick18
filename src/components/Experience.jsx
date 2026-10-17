import SectionHeader from "./SectionHeader";
import { experience } from "../data/experience";
import "../experience-timeline.css";

export default function Experience() {
  return <section className="section" id="experience">
    <SectionHeader number="03" label="EXPERIENCE" title="Learning by shipping and testing." />
    <div className="experience-list">
      {experience.map(item => <article className="experience-entry reveal" key={item.organization}>
        <a className={`experience-mark experience-mark-${item.logoKind}`} href={item.website} target="_blank" rel="noreferrer"><img src={`${import.meta.env.BASE_URL}organizations/${item.logo}`} alt={item.organization} loading="lazy" width={item.logoKind === "university" ? 64 : 88} height={64} /><span className="sr-only"> (official website, opens in a new tab)</span></a>
        <div className="experience-body"><h3>{item.role}</h3><p className="experience-employer">{item.organization}</p><p className="experience-date">{item.period}</p>{item.location && <p className="experience-location">{item.location}</p>}<p className="experience-description">{item.description}</p><ul className="experience-contributions">{item.highlights.map(text => <li key={text}>{text}</li>)}</ul><a className="experience-project-link" href={`#project-${item.project.toLowerCase().replaceAll(" ", "-")}`}>Explore {item.project}<span className="action-arrow arrow-diagonal" aria-hidden="true">↗</span></a></div>
      </article>)}
    </div>
  </section>;
}
