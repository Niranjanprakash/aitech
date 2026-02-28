import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { callLink, displayEmail, displayPhone, mailLink, whatsappLink } from "../data/contact";

function ContactPage() {
  return (
    <>
      <Seo
        title="Contact AITechPulze | AI and Web Development Support"
        description="Contact AITechPulze through WhatsApp, phone or email to discuss AI, web development and project requirements."
        canonicalPath="/contact"
      />
      <section className="section page-section contact-page">
        <div className="container">
          <div className="contact-hero-shell">
            <div className="contact-hero-main">
              <p className="eyebrow">Contact AITechPulze</p>
              <h1>Talk to Our Development Team</h1>
              <p>
                Share your requirement through WhatsApp, call, or email. We provide quick guidance on scope,
                timeline, and pricing for AI, web, analytics, and full-stack projects.
              </p>
              <div className="cta-row">
                <Link to="/get-quote" className="btn btn-primary">
                  Get Instant Quote
                </Link>
                <Link to="/services" className="btn btn-ghost">
                  View Services
                </Link>
              </div>
            </div>

            <aside className="contact-hero-panel">
              <h2>Quick Response Promise</h2>
              <ul>
                <li>Fast first response for new project requests</li>
                <li>Clear estimate based on your project needs</li>
                <li>Direct support from planning to delivery</li>
                <li>Flexible communication via WhatsApp and call</li>
              </ul>
            </aside>
          </div>

          <section className="contact-channels">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-card contact-card-whatsapp">
              <p className="contact-kicker">Preferred</p>
              <h2>WhatsApp</h2>
              <p>Start a direct chat with our team for immediate project discussion.</p>
              <span className="text-link">Open WhatsApp</span>
            </a>

            <a href={mailLink} className="contact-card">
              <p className="contact-kicker">Official</p>
              <h2>Email</h2>
              <p>Send your requirement and attachments for formal quotation.</p>
              <span className="contact-value">{displayEmail}</span>
            </a>

            <a href={callLink} className="contact-card">
              <p className="contact-kicker">Direct</p>
              <h2>Call</h2>
              <p>Speak with us directly for urgent project timelines and execution.</p>
              <span className="contact-value">{displayPhone}</span>
            </a>
          </section>

          <section className="contact-support-grid">
            <article className="contact-support-card">
              <h3>Best For Startups</h3>
              <p>Discuss MVP feature scope, release priorities, and development plan.</p>
            </article>
            <article className="contact-support-card">
              <h3>Best For Students</h3>
              <p>Get guidance for final-year projects with documentation-friendly delivery.</p>
            </article>
            <article className="contact-support-card">
              <h3>Best For Businesses</h3>
              <p>Plan dashboards, custom applications, and automation requirements.</p>
            </article>
          </section>

          <section className="contact-bottom-panel">
            <h2>Ready to Submit Your Requirement?</h2>
            <p>Use the quote form to send complete details including optional PDF documents.</p>
            <Link to="/get-quote" className="btn btn-primary">
              Go to Get Quote
            </Link>
          </section>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
