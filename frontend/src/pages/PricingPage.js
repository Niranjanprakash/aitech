import React from "react";
import Seo from "../components/Seo";
import PricingCard from "../components/PricingCard";
import pricingItems, { extras } from "../data/pricing";

function PricingPage() {
  return (
    <section className="section page-section">
      <Seo
        title="Pricing | Affordable AI and Web Development Services"
        description="Check affordable pricing for frontend, backend, full stack, AI/ML, data analytics and hardware development services from AITechPulze."
        canonicalPath="/pricing"
      />
      <div className="container">
        <div className="section-head">
          <h1>Service Pricing</h1>
        </div>
        <div className="card-grid pricing-grid">
          {pricingItems.map((item) => (
            <PricingCard key={item.id} item={item} />
          ))}
        </div>

        <section className="extras-section">
          <h2>Extras</h2>
          <div className="extras-list">
            {extras.map((extra) => (
              <span key={extra} className="pill">
                {extra}
              </span>
            ))}
          </div>
          <p className="price-note">Final pricing may vary based on project complexity.</p>
        </section>
      </div>
    </section>
  );
}

export default PricingPage;
