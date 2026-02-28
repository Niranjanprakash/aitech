import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import blogPosts from "../data/blog";

function BlogPage() {
  return (
    <section className="section page-section">
      <Seo
        title="Blog | AI, Web Development and Startup Project Insights"
        description="Read practical blog posts from AITechPulze on website costs, AI final year projects, and startup website planning."
        canonicalPath="/blog"
      />
      <div className="container">
        <div className="section-head">
          <h1>Blog</h1>
        </div>
        <div className="card-grid blog-grid">
          {blogPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <p className="blog-meta">
                {post.date} | {post.readTime} read
              </p>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link to="/get-quote" className="text-link">
                Discuss this project
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogPage;
