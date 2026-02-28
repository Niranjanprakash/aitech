import React from "react";
import Seo from "../components/Seo";
import ServiceCard from "../components/ServiceCard";
import services from "../data/services";

function ServicesPage() {
  return (
    <section className="section page-section">
      <Seo
        title="Services | AI, Web, Data Analytics and Hardware Projects"
        description="Explore AITechPulze services including frontend, backend, full stack, AI/ML, analytics dashboards and hardware integrated projects."
        canonicalPath="/services"
      />
      <div className="container">
        <div className="section-head">
          <h1>Development Services Built for Real Project Outcomes</h1>
        </div>
        <div className="card-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesPage;
