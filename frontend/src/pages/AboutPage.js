import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

function AboutPage() {
  return (
    <>
      <Seo
        title="About AITechPulze | AI and Web Development Company"
        description="Professional AI and web development company helping startups, businesses and final year students build complete solutions."
        canonicalPath="/about"
      />

      <section className="section page-section about-page">
        <div className="container">
          <div className="about-hero-shell">
            <div className="about-hero-main">
              <p className="eyebrow">About AITechPulze</p>
              <h1>Professional AI and Web Development Company - AITechPulze</h1>
              <p>
                AITechPulze delivers affordable and high-quality software, AI/ML solutions, and project
                development services. We help startups, students, and businesses turn ideas into working
                products using React JS, Python Flask, AI models, and cloud deployment.
              </p>
              <div className="cta-row">
                <Link to="/get-quote" className="btn btn-primary">
                  Get Instant Quote
                </Link>
                <Link to="/services" className="btn btn-ghost">
                  Explore Services
                </Link>
              </div>
            </div>

            <aside className="about-hero-panel">
              <h2>What You Get</h2>
              <ul>
                <li>Fast project planning and clear scope discussion</li>
                <li>Affordable packages for students and startups</li>
                <li>Modern stack delivery with deployment support</li>
                <li>Direct communication till final handover</li>
              </ul>
            </aside>
          </div>

          <section className="about-metrics">
            <article className="metric-card">
              <h3>120+</h3>
              <p>Projects Delivered</p>
            </article>
            <article className="metric-card">
              <h3>24h</h3>
              <p>First Response Window</p>
            </article>
            <article className="metric-card">
              <h3>7+</h3>
              <p>Core Service Categories</p>
            </article>
            <article className="metric-card">
              <h3>95%</h3>
              <p>Repeat and Referral Clients</p>
            </article>
          </section>

          <section className="about-section">
            <div className="section-head">
              <h2>Our Delivery Model</h2>
            </div>
            <div className="about-process-grid">
              <article className="about-process-card">
                <span>01</span>
                <h3>Requirement Discovery</h3>
                <p>We collect your objective, features, timeline, and expected outcome.</p>
              </article>
              <article className="about-process-card">
                <span>02</span>
                <h3>Roadmap and Milestones</h3>
                <p>We define milestones with realistic timelines and budget clarity.</p>
              </article>
              <article className="about-process-card">
                <span>03</span>
                <h3>Build and Iterate</h3>
                <p>Development happens in tracked phases with regular communication.</p>
              </article>
              <article className="about-process-card">
                <span>04</span>
                <h3>Delivery and Support</h3>
                <p>You receive final output, documentation, and post-delivery guidance.</p>
              </article>
            </div>
          </section>

          <section className="about-section">
            <div className="section-head">
              <h2>Technology Stack</h2>
            </div>
            <div className="about-stack-list">
              <span>React JS</span>
              <span>Python Flask</span>
              <span>PostgreSQL</span>
              <span>MySQL</span>
              <span>REST APIs</span>
              <span>TensorFlow</span>
              <span>Scikit-learn</span>
              <span>Cloud Deployment</span>
              <span>Arduino</span>
              <span>Raspberry Pi</span>
            </div>
          </section>

          <section className="about-section">
            <div className="section-head">
              <h2>Who We Work With</h2>
            </div>
            <div className="about-audience-grid">
              <article className="about-audience-card">
                <h3>Startups</h3>
                <p>MVPs, product websites, and scalable web platforms for early growth.</p>
              </article>
              <article className="about-audience-card">
                <h3>Final Year Students</h3>
                <p>Project development with documentation support and practical execution.</p>
              </article>
              <article className="about-audience-card">
                <h3>Small Businesses</h3>
                <p>Operational dashboards, automation tools, and custom software systems.</p>
              </article>
            </div>
          </section>

          <section className="about-cta-panel">
            <h2>Have a Project Idea?</h2>
            <p>
              Share your requirement and we will suggest the best development plan for your budget and timeline.
            </p>
            <div className="cta-row">
              <Link to="/get-quote" className="btn btn-primary">
                Submit Requirement
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Contact Team
              </Link>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
