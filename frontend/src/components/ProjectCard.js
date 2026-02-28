import React, { useState, useEffect } from "react";

function ProjectCard({ project, forceRevealed = false, onRevealChange }) {
  const [revealed, setRevealed] = useState(false);

  /* Sync with external forceRevealed (fan click) */
  useEffect(() => {
    setRevealed(forceRevealed);
  }, [forceRevealed]);

  const toggle = () => {
    const next = !revealed;
    setRevealed(next);
    onRevealChange?.(project.id, next);
  };

  return (
    <article
      className={`project-card${revealed ? " revealed" : ""}`}
      onClick={toggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && toggle()}
      aria-expanded={revealed}
      title={revealed ? "Click to collapse" : "Click to reveal details"}
    >
      {/* ── Full-bleed image ── */}
      <div className="pc-image">
        <img src={project.image} alt={project.title} />

        {/* Always-visible gradient footer strip */}
        <div className="pc-footer">
          <span className="pc-badge">{project.category}</span>
          <h3>{project.title}</h3>
          <span className="pc-hint">
            {revealed ? "Click to close ↑" : "Click to explore →"}
          </span>
        </div>
      </div>

      {/* ── Slide-up reveal panel ── */}
      <div className="pc-reveal" aria-hidden={!revealed}>
        <p>{project.description}</p>

        <div className="pc-tech">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>

        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary pc-demo-btn"
          onClick={(e) => e.stopPropagation()}
        >
          View Live Demo
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;
