import SectionHeader from "./SectionHeader";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="section" id="projects">
      <SectionHeader number="02" label="SELECTED PROJECTS" title="Work built around real problems." />

      <div className="project-list">
        {projects.map((project) => (
          <article className={project.featured ? "project featured reveal" : "project reveal"} key={project.title}>
            <div className="project-number">{project.number}</div>
            <div className="project-body">
              <div className="project-topline">
                <span>{project.category}</span>
                <span>{project.period}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-summary">{project.summary}</p>

              <ul className="project-points">
                {project.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="tag-list" aria-label={`${project.title} technologies`}>
                {project.stack.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>

              {project.links.length > 0 && (
                <div className="project-links">
                  {project.links.map((link) => (
                    <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
