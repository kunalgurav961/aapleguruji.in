import { useEffect, useState } from "react";
import { ArrowRight, BookOpenText } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../config/api";

const InsightsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;
    axiosInstance
      .get("public/blogs")
      .then(({ data }) => {
        if (!isMounted) return;
        setBlogs(data.blogs.slice(0, 3));
        setStatus("loaded");
      })
      .catch(() => {
        if (isMounted) setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="insights-section" id="guides">
      <div className="home-container">
        <div className="insights-heading">
          <div>
            <p className="home-eyebrow">Vedic knowledge hub</p>
            <h2>Panchang Insights & Puja Guides</h2>
            <p>
              Explore practical guides, traditions, and stories from the Aaple
              Guruji journal.
            </p>
          </div>
          <Link className="home-text-link" to="/blogs">
            Read All Articles <ArrowRight size={15} />
          </Link>
        </div>
        {status === "loading" ? (
          <p className="home-message" role="status">
            Loading the latest journal articles…
          </p>
        ) : status === "error" ? (
          <p className="home-message home-message-error" role="alert">
            We couldn’t load the latest journal articles.
          </p>
        ) : blogs.length === 0 ? (
          <p className="home-message">
            New stories and video guides are coming soon.
          </p>
        ) : (
          <div className="insights-grid">
            {blogs.map((blog) => (
              <article className="insight-card" key={blog._id}>
                <div className="insight-image">
                  {blog.coverImageUrl ? (
                    <img alt="" loading="lazy" src={blog.coverImageUrl} />
                  ) : (
                    <BookOpenText aria-hidden="true" size={34} />
                  )}
                  <span>{blog.category}</span>
                </div>
                <div className="insight-content">
                  <p className="insight-meta">
                    {blog.readTime} min read · video guide
                  </p>
                  <h3>{blog.title}</h3>
                  <p className="insight-description">{blog.excerpt}</p>
                  <Link to={`/blogs#${blog.slug}`}>
                    Read &amp; Watch <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InsightsSection;
