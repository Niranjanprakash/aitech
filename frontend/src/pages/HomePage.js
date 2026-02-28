import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import ServiceCard from "../components/ServiceCard";
import PricingCard from "../components/PricingCard";
import { useCountUp } from "../hooks/useCountUp";
import services from "../data/services";
import pricingItems from "../data/pricing";
import testimonials from "../data/testimonials";
import { callLink, whatsappLink, mailLink } from "../data/contact";

function HomePage() {
  const [projects, projectsRef] = useCountUp(50);
  const [clients, clientsRef] = useCountUp(30);
  const [models, modelsRef] = useCountUp(15);
  const [satisfaction, satisfactionRef] = useCountUp(100);

  return (
    <>
      <Seo
        title="AITechPulze | AI, Web & Project Development Services in India"
        description="AITechPulze provides affordable AI, web development, data analytics and hardware project solutions for startups, businesses and final year students across India."
        canonicalPath="/"
      />

      {/* ── HERO ── */}
      <section className="hp-hero">
        {/* Decorative right-side visual — gradient orb instead of 3D (robot now on splash) */}
        <div className="hp-hero-visual">
          <div className="hp-hero-orb hp-hero-orb-1" />
          <div className="hp-hero-orb hp-hero-orb-2" />
          <div className="hp-hero-orb hp-hero-orb-3" />
          <div className="hp-hero-grid-lines" />
        </div>

        {/* Left gradient fade so glass card blends into page */}
        <div className="hp-hero-fade" />

        {/* Glass text card — left column */}
        <div className="hp-hero-card">
          <span className="hp-eyebrow">AI-Powered Development</span>
          <h1 className="hp-hero-title">
            Build Smart Systems with <span className="hp-accent-text">AI &amp; ML</span>
          </h1>
          <p className="hp-hero-sub">
            Custom AI solutions, ML models, and intelligent automation for
            startups, businesses, and final-year students — delivered fast.
          </p>
          <div className="hp-cta-row">
            <Link to="/get-quote" className="btn btn-primary">
              Get a Free Quote
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Right side feature cards */}
        <div className="hp-hero-features">
          <div className="hp-feature-card">
            <div className="hp-feature-icon">🤖</div>
            <h3>AI/ML Models</h3>
            <p>Custom trained models for your specific needs</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon">🌐</div>
            <h3>Web Apps</h3>
            <p>Full-stack applications with modern tech</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon">⚡</div>
            <h3>Fast Delivery</h3>
            <p>Quick turnaround without compromising quality</p>
          </div>
          <div className="hp-feature-card">
            <div className="hp-feature-icon">🎓</div>
            <h3>Student Projects</h3>
            <p>Final year projects with documentation</p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="hp-stats-bar">
        <div className="container">
          <div className="hp-stats-row">
            <div className="hp-stat" ref={projectsRef}>
              <span className="hp-stat-num">{projects}+</span>
              <span className="hp-stat-label">Projects Delivered</span>
            </div>
            <div className="hp-stat-divider" />
            <div className="hp-stat" ref={clientsRef}>
              <span className="hp-stat-num">{clients}+</span>
              <span className="hp-stat-label">Happy Clients</span>
            </div>
            <div className="hp-stat-divider" />
            <div className="hp-stat" ref={modelsRef}>
              <span className="hp-stat-num">{models}+</span>
              <span className="hp-stat-label">AI Models Deployed</span>
            </div>
            <div className="hp-stat-divider" />
            <div className="hp-stat" ref={satisfactionRef}>
              <span className="hp-stat-num">{satisfaction}%</span>
              <span className="hp-stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section hp-services-section">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <p className="hp-section-tag">What We Do</p>
              <h2>AI &amp; Technical Capabilities</h2>
              <p className="hp-section-sub">Advanced technology stack for intelligent solutions</p>
            </div>
            <Link to="/services" className="text-link">Explore All →</Link>
          </div>
          <div className="card-grid">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section hp-process-section">
        <div className="container">
          <div className="hp-section-head centered">
            <div>
              <p className="hp-section-tag">Our Process</p>
              <h2>How It Works</h2>
              <p className="hp-section-sub">Simple 4-step process from idea to deployment</p>
            </div>
          </div>
          <div className="hp-steps-row">
            {[
              { num: "01", title: "Requirement Analysis", desc: "Share your AI/ML requirements and business objectives with our technical team." },
              { num: "02", title: "Architecture Design", desc: "We design scalable system architecture and select optimal tech stack." },
              { num: "03", title: "Build & Train", desc: "Build models, train algorithms, and develop production-ready systems." },
              { num: "04", title: "Deploy & Support", desc: "Deploy to cloud infrastructure with monitoring and continuous support." },
            ].map((step) => (
              <div className="hp-step-card" key={step.num}>
                <span className="hp-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="section hp-tech-section">
        <div className="container">
          <div className="hp-section-head centered">
            <div>
              <p className="hp-section-tag">Technology</p>
              <h2>Technology Stack</h2>
              <p className="hp-section-sub">Powered by cutting-edge AI frameworks and tools</p>
            </div>
          </div>
          <div className="hp-tech-grid">
            {[
              { icon: "🧠", label: "AI/ML", items: "TensorFlow • PyTorch • Scikit-learn • Keras • OpenCV" },
              { icon: "⚙️", label: "Backend", items: "Flask • FastAPI • Node.js • REST APIs • GraphQL" },
              { icon: "💻", label: "Frontend", items: "React JS • Next.js • TypeScript • Tailwind • Redux" },
              { icon: "☁️", label: "Cloud & Data", items: "PostgreSQL • MongoDB • AWS • Docker • Kubernetes" },
            ].map((t) => (
              <div className="hp-tech-card" key={t.label}>
                <span className="hp-tech-icon">{t.icon}</span>
                <h3>{t.label}</h3>
                <p>{t.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <p className="hp-section-tag">Pricing</p>
              <h2>Pricing Preview</h2>
              <p className="hp-section-sub">Transparent pricing with no hidden costs</p>
            </div>
            <Link to="/pricing" className="text-link">Full pricing →</Link>
          </div>
          <div className="card-grid pricing-grid">
            {pricingItems.slice(0, 3).map((item) => (
              <PricingCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section hp-testimonials-section">
        <div className="container">
          <div className="hp-section-head centered">
            <div>
              <p className="hp-section-tag">Reviews</p>
              <h2>Client Testimonials</h2>
              <p className="hp-section-sub">What our clients say about working with us</p>
            </div>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role} - {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section">
        <div className="container">
          <div className="hp-section-head centered">
            <div>
              <p className="hp-section-tag">Contact</p>
              <h2>Get In Touch</h2>
              <p className="hp-section-sub">Connect with our team through your preferred channel</p>
            </div>
          </div>
          <div className="contact-methods-grid">
            <a href={callLink} className="contact-method-card">
              <div className="contact-icon">📞</div>
              <h3>Phone Support</h3>
              <p className="contact-label">Direct line to our experts</p>
              <span className="contact-value">+91 95857 76088</span>
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-method-card">
              <div className="contact-icon">💬</div>
              <h3>WhatsApp Chat</h3>
              <p className="contact-label">Instant messaging support</p>
              <span className="contact-value">Start Conversation</span>
            </a>
            <a href={mailLink} className="contact-method-card">
              <div className="contact-icon">✉️</div>
              <h3>Email Us</h3>
              <p className="contact-label">Detailed inquiries welcome</p>
              <span className="contact-value">aitechpulze@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section hp-cta-banner-section">
        <div className="container">
          <div className="hp-cta-banner">
            <div className="hp-cta-banner-content">
              <h2>Ready to Build AI Solutions?</h2>
              <p>Let's discuss your project requirements and create intelligent systems that deliver real results.</p>
            </div>
            <div className="hp-cta-banner-actions">
              <Link to="/get-quote" className="btn btn-primary">Request Consultation</Link>
              <Link to="/services" className="btn btn-ghost">View Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
