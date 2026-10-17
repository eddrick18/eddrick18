import GalleryScreen from "./GalleryScreen";
import { useEffect, useRef, useState } from "react";
import ModelWorkflow from "./ModelWorkflow";
import QueueWiseBreakdown from "./QueueWiseBreakdown";
import SectionHeader from "./SectionHeader";
import { projects } from "../data/projects";
import { projectStories } from "../data/projectStories";
import "../showcase.css";

const asset = (name) => `${import.meta.env.BASE_URL}projects/${name}`;

function ProjectImage({ screen, ...props }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [screen.file]);
  return failed ? (
    <div className="media-unavailable" role="status">
      Preview unavailable. You can still read the project details below.
    </div>
  ) : (
    <img
      {...props}
      src={asset(screen.file)}
      alt={screen.alt}
      onError={() => setFailed(true)}
    />
  );
}

function DevicePreview({ story, project, onOpen }) {
  const [index, setIndex] = useState(0);
  const screen = story.screens[index];
  return (
    <div className="preview-shell">
      <button
        className="preview-open"
        type="button"
        aria-label={`View ${project.title} screenshots and project details`}
        onClick={(event) => onOpen(event, false, index)}
      >
        <div className={`device-stage device-stage-${story.device}`}>
          <div className={`device-frame device-${story.device}`}>
            <ProjectImage
              screen={screen}
              loading="lazy"
              width={story.device === "phone" ? 828 : 1440}
              height={story.device === "phone" ? 1792 : 900}
            />
          </div>
          <span className="device-caption">{story.previewLabel}</span>
        </div>
        <span className="preview-hint">
          Explore project{" "}
          <span className="action-arrow arrow-diagonal" aria-hidden="true">
            ↗
          </span>
        </span>
      </button>
      <div
        className="inline-preview-controls"
        role="group"
        aria-label={`${project.title} preview controls`}
      >
        <div className="inline-preview-toolbar">
          <button
            type="button"
            className="showcase-button"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
            aria-label={`Previous ${project.title} preview`}
          >
            <span className="action-arrow arrow-left" aria-hidden="true">
              ←
            </span>
          </button>
          <p aria-live="polite" aria-atomic="true">
            {index + 1} / {story.screens.length} · {screen.label}
          </p>
          <button
            type="button"
            className="showcase-button"
            disabled={index === story.screens.length - 1}
            onClick={() => setIndex(index + 1)}
            aria-label={`Next ${project.title} preview`}
          >
            <span className="action-arrow arrow-right" aria-hidden="true">
              →
            </span>
          </button>
        </div>
        <div className="inline-preview-choices">
          {story.screens.map((item, itemIndex) => (
            <button
              type="button"
              key={item.file}
              className="inline-preview-choice"
              aria-label={`Show ${project.title}: ${item.label}`}
              aria-pressed={index === itemIndex}
              onClick={() => setIndex(itemIndex)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectLinks({ project }) {
  return (
    project.links.length > 0 && (
      <div className="project-links">
        {project.links.map((link) => (
          <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
            {link.label}{" "}
            <span className="action-arrow arrow-diagonal" aria-hidden="true">
              ↗
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    )
  );
}

function ProjectDialog({ selection, onClose }) {
  const dialog = useRef(null);
  const video = useRef(null);
  const { project, story, startWithVideo } = selection;
  const [index, setIndex] = useState(selection.startIndex || 0);
  const [showVideo, setShowVideo] = useState(startWithVideo);
  const [videoError, setVideoError] = useState(false);
  const screen = story.screens[index];

  useEffect(() => {
    const previousFocus = selection.opener;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.showModal();
    return () => {
      dialog.current?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  const selectScreen = (next) => {
    video.current?.pause();
    setShowVideo(false);
    setIndex(next);
  };

  return (
    <dialog
      className="project-dialog"
      ref={dialog}
      aria-labelledby="project-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) {
          const bounds = dialog.current.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <header className="project-dialog-header">
        <div>
          <p className="showcase-eyebrow">PROJECT DETAILS · {project.period}</p>
          <h2 id="project-dialog-title">{project.title}</h2>
        </div>
        <button
          className="showcase-button close-project"
          type="button"
          onClick={onClose}
          autoFocus
        >
          Close <span aria-hidden="true">×</span>
        </button>
      </header>
      <div className="project-dialog-content">
        <div className={`gallery-view gallery-view-${story.device}`}>
          {showVideo ? (
            <div className="demo-video-wrap">
              <video
                ref={video}
                aria-label="PAPI expense entry and budgeting demonstration"
                controls
                playsInline
                preload="none"
                poster={asset(story.screens[0].file)}
                onError={() => setVideoError(true)}
              >
                <source src={asset(story.video)} type="video/mp4" />
                Your browser does not support this video.
              </video>
              {videoError && (
                <p role="alert">
                  The video could not load. Please try again later or explore
                  the screenshots.
                </p>
              )}
            </div>
          ) : (
            <figure className="gallery-figure">
              <GalleryScreen screen={screen} />
              <figcaption>{screen.caption}</figcaption>
            </figure>
          )}
        </div>
        <div className="gallery-toolbar">
          <p aria-live="polite" aria-atomic="true">
            {showVideo
              ? "Video demonstration"
              : `${index + 1} / ${story.screens.length} — ${screen.label}`}
          </p>
          <div className="gallery-arrows">
            <button
              className="showcase-button"
              type="button"
              disabled={showVideo || index === 0}
              onClick={() => selectScreen(index - 1)}
              aria-label="Previous screenshot"
            >
              <span className="action-arrow arrow-left" aria-hidden="true">
                ←
              </span>
            </button>
            <button
              className="showcase-button"
              type="button"
              disabled={showVideo || index === story.screens.length - 1}
              onClick={() => selectScreen(index + 1)}
              aria-label="Next screenshot"
            >
              <span className="action-arrow arrow-right" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
        <div
          className="gallery-choices"
          aria-label="Choose a project screenshot"
        >
          {story.screens.map((item, itemIndex) => (
            <button
              className="showcase-button"
              type="button"
              key={item.file}
              aria-pressed={!showVideo && index === itemIndex}
              onClick={() => selectScreen(itemIndex)}
            >
              {item.label}
            </button>
          ))}
          {story.video && (
            <button
              className="showcase-button"
              type="button"
              aria-pressed={showVideo}
              onClick={() => setShowVideo(true)}
            >
              Watch demo
            </button>
          )}
        </div>
        <p className="media-note">{story.mediaNote}</p>
        <dl className="project-story-grid">
          <div>
            <dt>The problem</dt>
            <dd>{story.problem}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{story.role}</dd>
          </div>
          <div>
            <dt>{story.challengeLabel || "Engineering challenge"}</dt>
            <dd>{story.challenge}</dd>
          </div>
          <div>
            <dt>{story.outcomeLabel || "What I built"}</dt>
            <dd>{story.outcome}</dd>
          </div>
        </dl>
        {project.title === "Smart Stethoscope System" && <ModelWorkflow />}
        {project.title === "QueueWise" && <QueueWiseBreakdown />}
        <h3 className="story-heading">My contributions</h3>
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
        <ProjectLinks project={project} />
      </div>
    </dialog>
  );
}

export default function Projects() {
  const [selection, setSelection] = useState(null);
  const featured = projects.filter((project) => projectStories[project.title]);
  const additional = projects.filter(
    (project) => !projectStories[project.title],
  );
  return (
    <>
      <section className="section selected-work" id="projects">
        <SectionHeader
          number="01"
          label="SELECTED PROJECTS"
          title="Built to be used."
        />
        <p className="work-intro">
          Web applications, mobile interfaces, and applied machine learning.
          Explore the software and the work behind it.
        </p>
        <div className="featured-projects">
          {featured.map((project) => {
            const story = projectStories[project.title];
            const open = (event, startWithVideo = false, startIndex = 0) =>
              setSelection({
                project,
                story,
                startWithVideo,
                startIndex,
                opener: event.currentTarget,
              });
            return (
              <article
                id={`project-${project.title.toLowerCase().replaceAll(" ", "-")}`}
                className={`featured-project featured-project-${story.device} reveal`}
                key={project.title}
              >
                <header className="project-editorial-heading">
                  <div className="project-topline"><span>{story.category}</span><span>{project.period}</span></div>
                  <h3>{project.title}</h3>
                </header>
                <div className="project-visual">
                  <DevicePreview
                    story={story}
                    project={project}
                    onOpen={open}
                  />
                </div>
                <div className="featured-project-copy">
                  <p className="featured-role">{story.roleLabel}</p>
                  <p className="project-summary">{project.summary}</p>
                  <ul className="featured-highlights">
                    {story.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div
                    className="tag-list"
                    aria-label={`${project.title} technologies`}
                  >
                    {project.stack.map((item) => (
                      <span className="tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="showcase-actions">
                    <button
                      className="showcase-button showcase-button-primary"
                      type="button"
                      onClick={open}
                    >
                      View project{" "}
                      <span
                        className="action-arrow arrow-diagonal"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </button>
                    {story.video && (
                      <button
                        className="showcase-button"
                        type="button"
                        onClick={(event) => open(event, true)}
                      >
                        Watch demo
                      </button>
                    )}
                  </div>
                  <ProjectLinks project={project} />
                </div>
              </article>
            );
          })}
        </div>
        <div className="more-projects">
          <h3>More projects</h3>
          <div className="more-projects-grid">
            {additional.map((project) => (
              <article className="compact-project" key={project.title}>
                <p className="showcase-eyebrow">{project.category}</p>
                <h4>{project.title}</h4>
                <p>{project.summary}</p>
                <div className="tag-list">
                  {project.stack.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <ProjectLinks project={project} />
              </article>
            ))}
          </div>
        </div>
      </section>
      {selection && (
        <ProjectDialog
          selection={selection}
          onClose={() => setSelection(null)}
        />
      )}
    </>
  );
}
