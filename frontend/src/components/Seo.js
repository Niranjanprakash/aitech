import React from "react";
import { Helmet } from "react-helmet-async";

const defaultKeywords =
  "ai project developer india, web development services tamil nadu, final year project developer india, affordable ai developer, react developer india, startup website development india";

function Seo({ title, description, keywords = defaultKeywords, canonicalPath = "", ogType = "website" }) {
  const siteUrl = process.env.REACT_APP_SITE_URL || "https://aitechpulze.com";
  const normalizedPath = canonicalPath
    ? canonicalPath.startsWith("/")
      ? canonicalPath
      : `/${canonicalPath}`
    : "";
  const canonicalUrl = `${siteUrl}${normalizedPath}`;
  const ogImage = `${siteUrl}/og-image.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AITechPulze",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "AI-Powered Development Solutions",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-95857-76088",
      "contactType": "Customer Service",
      "email": "aitechpulze@gmail.com"
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <link rel="canonical" href={canonicalUrl} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

export default Seo;
