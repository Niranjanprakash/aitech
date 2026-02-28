import React from "react";
import Seo from "../components/Seo";
import Card3D from "../components/Card3D";
import projects from "../data/projects";
import "./ProjectsPage.css";

function ProjectsPage() {
  return (
    <section className="section page-section" style={{ padding: "3rem 0 4rem" }}>
      <Seo
        title="Our Projects | AITechPulze Portfolio"
        description="Explore our completed projects including business websites, e-commerce platforms, and custom web applications."
        canonicalPath="/projects"
      />

      <div className="container" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1rem" }}>
        <div className="section-head" style={{ marginBottom: "3rem", textAlign: "center" }}>
          <div>
            <span className="eyebrow">Our Portfolio</span>
            <h1>Featured Projects</h1>
            <p style={{ maxWidth: "700px", margin: "0.5rem auto 0", fontSize: "1.1rem" }}>
              Discover our latest work showcasing innovative solutions across various industries.
              Click any card to explore project details and technologies.
            </p>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <Card3D key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsPage;
