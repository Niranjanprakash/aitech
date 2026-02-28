import React from "react";
import { Link } from "react-router-dom";

function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <p className="card-kicker">{service.subtitle}</p>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="card-footer">
        <span className="price-tag">Starting {service.startingPrice}</span>
        <Link to="/get-quote" className="text-link">
          Contact CTA
        </Link>
      </div>
    </article>
  );
}

export default ServiceCard;
