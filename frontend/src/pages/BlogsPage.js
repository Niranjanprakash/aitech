import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "AI in Web Development: Transforming Digital Experiences",
    excerpt: "Discover how artificial intelligence is revolutionizing web development and creating smarter, more intuitive user experiences.",
    date: "2024-01-15",
    category: "AI & Technology",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Full Stack Development Best Practices for 2024",
    excerpt: "Essential tips and strategies for building scalable, maintainable full-stack applications in the modern web ecosystem.",
    date: "2024-01-10",
    category: "Web Development",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Data Analytics: Turning Information into Business Insights",
    excerpt: "Learn how data analytics can drive business decisions and unlock growth opportunities for startups and enterprises.",
    date: "2024-01-05",
    category: "Data Analytics",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Building Scalable APIs with Modern Technologies",
    excerpt: "A comprehensive guide to designing and implementing robust APIs that can handle growth and complexity.",
    date: "2023-12-28",
    category: "Backend Development",
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "IoT and Hardware Integration for Smart Solutions",
    excerpt: "Explore the intersection of hardware and software in creating innovative IoT solutions for businesses.",
    date: "2023-12-20",
    category: "IoT & Hardware",
    readTime: "6 min read"
  },
  {
    id: 6,
    title: "React Performance Optimization Techniques",
    excerpt: "Master the art of building lightning-fast React applications with these proven optimization strategies.",
    date: "2023-12-15",
    category: "Frontend Development",
    readTime: "9 min read"
  }
];

function BlogsPage() {
  return (
    <>
      <Helmet>
        <title>Tech Blog - AI, Web Development & Data Analytics | AITechPulze</title>
        <meta name="description" content="Read expert insights on AI, web development, data analytics, and technology trends. Stay updated with the latest in software development and digital innovation." />
        <meta name="keywords" content="tech blog, AI development, web development blog, data analytics, software engineering, technology insights" />
      </Helmet>

      <div className="page-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our Blog</span>
              <h1>Latest Insights & Articles</h1>
              <p>Expert perspectives on AI, web development, and technology trends</p>
            </div>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-footer">
                  <span className="read-time">{post.readTime}</span>
                  <Link to={`/blog/${post.id}`} className="text-link">Read More →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogsPage;
