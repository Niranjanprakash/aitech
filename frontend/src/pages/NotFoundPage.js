import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

function NotFoundPage() {
  return (
    <section className="section page-section not-found-page">
      <Seo
        title="404 - Page Not Found | AITechPulze"
        description="The page you're looking for doesn't exist."
        canonicalPath="/404"
      />
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-code">404</div>
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <div className="cta-row">
            <Link to="/" className="btn btn-primary">
              Go to Homepage
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
