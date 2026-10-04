import { Star } from "lucide-react";

const initialsFor = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const ReviewsSection = ({ reviews, state }) => (
  <section className="reviews-section" id="reviews">
    <div className="home-container">
      <header className="home-section-heading">
        <p className="home-eyebrow">Heartfelt devotion</p>
        <h2>What Families Say About Aaple Guruji</h2>
        <p>
          Read real reviews from homeowners and families who celebrated their
          life milestones with us.
        </p>
      </header>
      {state === "loading" ? (
        <p className="home-message" role="status">
          Loading family reviews…
        </p>
      ) : state === "error" ? (
        <p className="home-message home-message-error" role="alert">
          We couldn’t load family reviews right now.
        </p>
      ) : reviews.length === 0 ? (
        <p className="home-message">Our first family stories are coming soon.</p>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review._id}>
              <div
                aria-label={`${review.rating} out of 5 stars`}
                className="review-stars"
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    aria-hidden="true"
                    fill={index < review.rating ? "currentColor" : "none"}
                    key={index}
                    size={16}
                  />
                ))}
              </div>
              <blockquote>“{review.content}”</blockquote>
              <div className="review-author">
                <span className="review-avatar">{initialsFor(review.name)}</span>
                <div>
                  <strong>{review.name}</strong>
                  <span>
                    {review.poojaName}
                    {review.city ? ` • ${review.city}` : ""}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  </section>
);

export default ReviewsSection;
