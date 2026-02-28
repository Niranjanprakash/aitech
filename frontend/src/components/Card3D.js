import React, { useState } from "react";
import "./Card3D.css";

function Card3D({ project }) {
  const [flipped, setFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="card3d-container" onClick={() => setFlipped(!flipped)}>
      <div className={`card3d ${flipped ? "flipped" : ""}`}>
        <div className="card3d-front">
          {!imageLoaded && <div className="card3d-skeleton" />}
          <img 
            src={project.image} 
            alt={project.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
          <div className="card3d-overlay">
            <span className="card3d-badge">{project.category}</span>
            <h3>{project.title}</h3>
          </div>
        </div>
        <div className="card3d-back">
          <span className="card3d-badge">{project.category}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="card3d-tech">
            {project.technologies?.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            View Demo ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card3D;
