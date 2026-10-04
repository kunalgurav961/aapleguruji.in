import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  CircleHelp,
  Flame,
  Languages,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import HomeFooter from "../components/HomeFooter";
import "./PublicPages.css";

const bookingSteps = [
  {
    icon: Flame,
    title: "Choose your puja",
    description:
      "Explore ceremonies for your family, home, and special occasions.",
  },
  {
    icon: CalendarDays,
    title: "Share your preferred date",
    description:
      "Tell us when and where you would like to hold the ceremony.",
  },
  {
    icon: BadgeCheck,
    title: "We help coordinate",
    description:
      "A verified Guruji is matched to your requirements and traditions.",
  },
];

const BookPujaPage = () => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  const location = useLocation();
  const canBook = isAuthenticated && user?.role === "devotee";
  const bookingPath =
    canBook ? "/home/book-pooja" : isAuthenticated ? "/pooja" : "/register";
  const bookingState = location.state || {};

  return (
    <main className="public-page">
      <section className="public-hero public-booking-hero">
        <div className="public-container public-hero-grid">
          <div className="public-hero-copy">
            <p className="public-eyebrow">A more meaningful way to celebrate</p>
            <h1>Book a puja with a Guruji your family can trust.</h1>
            <p>
              Tell us about your occasion, choose a preferred date, and we’ll
              help you plan an authentic Vedic ceremony at home.
            </p>
            <div className="public-actions">
              <Link
                className="public-button"
                state={bookingState}
                to={bookingPath}
              >
                {canBook
                  ? "Continue booking"
                  : isAuthenticated
                    ? "Browse puja services"
                    : "Create an account"}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              {!isAuthenticated && (
                <Link
                  className="public-button public-button-secondary"
                  state={bookingState}
                  to="/login"
                >
                  Already have an account?
                </Link>
              )}
            </div>
            <p className="public-booking-reassurance">
              <ShieldCheck aria-hidden="true" size={17} />
              No advance payment is required to get started.
            </p>
          </div>
          <div className="public-booking-art" aria-hidden="true">
            <span className="public-booking-sun" />
            <span className="public-booking-flame">🪔</span>
            <span className="public-booking-art-note">
              <Sparkles size={16} />
              A sacred moment, thoughtfully planned
            </span>
          </div>
        </div>
      </section>

      <section className="public-container public-booking-process">
        <header className="public-section-heading">
          <p className="public-eyebrow">Simple from the first step</p>
          <h2>How booking works</h2>
          <p>
            We’ll help with the details, so you can focus on being present with
            your family.
          </p>
        </header>
        <div className="public-step-grid">
          {bookingSteps.map(({ icon: Icon, title, description }, index) => (
            <article className="public-step-card" key={title}>
              <span className="public-step-number">{index + 1}</span>
              <span className="public-icon-tile">
                <Icon aria-hidden="true" size={22} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="public-booking-assurance">
        <div className="public-container public-assurance-grid">
          <div>
            <p className="public-eyebrow">Care you can count on</p>
            <h2>Rooted in tradition, supported by people.</h2>
            <p>
              Every family and ceremony is different. We help make the
              arrangements clearer, while leaving room for the customs that
              make your puja yours.
            </p>
          </div>
          <ul>
            <li>
              <Check aria-hidden="true" size={18} />
              Verified and experienced Vedic pandits
            </li>
            <li>
              <Check aria-hidden="true" size={18} />
              Language preferences considered
            </li>
            <li>
              <Check aria-hidden="true" size={18} />
              Clear puja details and coordination
            </li>
            <li>
              <Check aria-hidden="true" size={18} />
              Optional samagri arrangements
            </li>
          </ul>
        </div>
      </section>

      <section className="public-booking-bottom public-container">
        <span className="public-icon-tile">
          <CircleHelp aria-hidden="true" size={22} />
        </span>
        <div>
          <p className="public-eyebrow">Need help deciding?</p>
          <h2>We’re happy to help you find the right service.</h2>
          <p>
            Browse our puja catalogue or speak with our team about your
            occasion.
          </p>
        </div>
        <div className="public-actions">
          <Link className="public-button public-button-secondary" to="/pooja">
            View puja services
          </Link>
          <a className="public-text-button" href="tel:+918888333430">
            <Languages aria-hidden="true" size={16} />
            Call +91 8888333430
          </a>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
};

export default BookPujaPage;
