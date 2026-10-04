import { ArrowRight, BookOpenText, Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosInstance from "../../../../config/api";
import HomeFooter from "../components/HomeFooter";
import "./PublicPages.css";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeCategory, setActiveCategory] = useState("All stories");
  const [expandedBlog, setExpandedBlog] = useState(null);
  const location = useLocation();
  const categories = useMemo(
    () => ["All stories", ...new Set(blogs.map((blog) => blog.category))],
    [blogs],
  );
  const visibleBlogs =
    activeCategory === "All stories"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  useEffect(() => {
    let isMounted = true;
    axiosInstance
      .get("public/blogs")
      .then(({ data }) => {
        if (!isMounted) return;
        setBlogs(data.blogs);
        setStatus("loaded");
      })
      .catch(() => {
        if (isMounted) setStatus("error");
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const slug = location.hash.slice(1);
    const blog = blogs.find((item) => item.slug === slug);
    if (!blog) return undefined;
    setExpandedBlog(blog._id);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [blogs, location.hash]);

  return (
    <main className="public-page">
      <section className="public-hero public-blog-hero">
        <div className="public-container public-hero-grid">
          <div className="public-hero-copy">
            <p className="public-eyebrow">The Aaple Guruji journal</p>
            <h1>Stories, rituals, and wisdom for your sacred moments.</h1>
            <p>
              Explore practical guides and thoughtful introductions to the
              traditions that bring families together.
            </p>
            <a className="public-button" href="#latest-stories">
              Browse the journal <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>
          <div className="public-blog-art" aria-hidden="true">
            <BookOpenText size={58} strokeWidth={1.2} />
            <span>परंपरा • संस्कृती • श्रद्धा</span>
          </div>
        </div>
      </section>

      <section className="public-container public-journal" id="latest-stories">
        <header className="public-section-heading public-journal-heading">
          <div>
            <p className="public-eyebrow">Read and reflect</p>
            <h2>From the journal</h2>
          </div>
          <p>Clear, considered guides for ceremonies and everyday devotion.</p>
        </header>
        {status === "loaded" && blogs.length > 0 && (
          <div className="public-filter-row" aria-label="Filter journal stories">
            {categories.map((category) => (
              <button
                aria-pressed={activeCategory === category}
                className={`public-filter${activeCategory === category ? " is-active" : ""}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        )}
        {status === "loading" ? (
          <p className="public-journal-message" role="status">
            Loading articles…
          </p>
        ) : status === "error" ? (
          <p className="public-journal-message public-journal-error" role="alert">
            We couldn’t load the journal right now. Please refresh to try again.
          </p>
        ) : visibleBlogs.length === 0 ? (
          <p className="public-journal-message">
            {blogs.length
              ? "There are no stories in this category yet."
              : "New stories and video guides are coming soon."}
          </p>
        ) : (
          <div className="public-article-grid">
            {visibleBlogs.map((blog) => {
              const isExpanded = expandedBlog === blog._id;
              return (
                <article className="public-article-card" id={blog.slug} key={blog._id}>
                  <div className="public-article-art">
                    {blog.coverImageUrl ? (
                      <img alt="" loading="lazy" src={blog.coverImageUrl} />
                    ) : (
                      <BookOpenText
                        aria-hidden="true"
                        size={34}
                        strokeWidth={1.4}
                      />
                    )}
                    <span>{blog.category}</span>
                  </div>
                  <div className="public-article-content">
                    <p className="public-article-meta">
                      {formatDate(blog.createdAt)} <span>·</span>
                      <Clock3 aria-hidden="true" size={14} /> {blog.readTime} min read
                    </p>
                    <h3>{blog.title}</h3>
                    <p className="public-article-description">{blog.excerpt}</p>
                    {isExpanded && (
                      <div className="public-article-expanded">
                        <video
                          className="public-article-video"
                          controls
                          preload="metadata"
                          src={blog.videoUrl}
                        >
                          Your browser does not support video playback.
                        </video>
                        <p className="public-article-full">{blog.content}</p>
                      </div>
                    )}
                    <button
                      aria-expanded={isExpanded}
                      className="public-text-button"
                      onClick={() =>
                        setExpandedBlog(isExpanded ? null : blog._id)
                      }
                      type="button"
                    >
                      {isExpanded ? "Close article" : "Read & watch"}
                      <ArrowRight aria-hidden="true" size={15} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="public-journal-cta">
        <div className="public-container public-journal-cta-inner">
          <div>
            <p className="public-eyebrow">Planning a ceremony?</p>
            <h2>Find the right guidance for your occasion.</h2>
            <p>Explore our puja services and plan with a trusted Guruji.</p>
          </div>
          <Link className="public-button" to="/book-pooja">
            Explore puja services <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
};

export default BlogPage;
