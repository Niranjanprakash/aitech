import React from "react";

function PricingCard({ item }) {
  return (
    <article className="pricing-card">
      <h3>{item.name}</h3>
      <p className="price-line">{item.price}</p>
      <p>{item.note}</p>
    </article>
  );
}

export default PricingCard;
