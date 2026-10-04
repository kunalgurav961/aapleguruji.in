import {
  ArrowRight,
  BadgeCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import gajananGuruji from "../../../../assets/gajanan-guruji.jpg";
import HomeFooter from "../components/HomeFooter";
import "./PublicPages.css";

const values = [
  {
    icon: ShieldCheck,
    title: "Tradition you can trust",
    description:
      "We connect families with verified, experienced Vedic pandits who honour the customs and language that matter to you.",
  },
  {
    icon: HeartHandshake,
    title: "Care at every step",
    description:
      "From your first question to the final aarti, our team helps make planning a meaningful ceremony feel simple.",
  },
  {
    icon: Sparkles,
    title: "A more thoughtful experience",
    description:
      "Clear service details, careful coordination, and optional puja samagri help you focus on the moment.",
  },
];

const AboutPage = () => (
  <main className="public-page">
    <section className="public-hero public-about-hero">
      <div className="public-container public-hero-grid">
        <div className="public-hero-copy">
          <p className="public-eyebrow">About Aaple Guruji</p>
          <h1>Bringing families closer to the traditions they cherish.</h1>
          <p>
            We make it easier to welcome trusted Vedic guidance into your home
            — with respect for every family, every occasion, and every ritual.
          </p>
          <div className="public-actions">
            <Link className="public-button" to="/book-pooja">
              Find a Guruji <ArrowRight aria-hidden="true" size={17} />
            </Link>
            <a className="public-button public-button-secondary" href="#our-values">
              What guides us
            </a>
          </div>
        </div>
        <div className="public-hero-art" aria-hidden="true">
          <span className="public-art-orbit public-art-orbit-one" />
          <span className="public-art-orbit public-art-orbit-two" />
          <span className="public-art-lamp">🪔</span>
          <span className="public-art-caption">Faith, made closer to home</span>
        </div>
      </div>
    </section>

    <section className="public-story public-container">
      <div className="public-story-mark" aria-hidden="true">
        <span>ॐ</span>
      </div>
      <div className="public-story-copy">
        <p className="public-eyebrow">Our purpose</p>
        <h2>Making space for what matters most.</h2>
        <p>
          A puja is more than a date on the calendar. It is a moment to gather,
          to give thanks, and to begin again with intention. Aaple Guruji helps
          families plan these moments with knowledgeable pandits, clear
          communication, and a little less uncertainty.
        </p>
        <p>
          Rooted in Maharashtra and open to every family, we bring together
          the convenience of thoughtful service and the care of time-honoured
          Vedic practice.
        </p>
      </div>
    </section>

    <section aria-labelledby="public-founder-title" className="public-founder">
      <div className="public-container public-founder-grid">
        <figure className="public-founder-portrait">
          <img
            alt="Pandit Gajanan Kulkarni, founder of Aaple Guruji, in traditional attire"
            loading="lazy"
            src={gajananGuruji}
          />
          <figcaption>
            <span className="public-founder-caption-mark" aria-hidden="true">
              ॐ
            </span>
            <span>
              <strong>Pandit Gajanan Kulkarni</strong>
              <small>Founder, Aaple Guruji</small>
            </span>
          </figcaption>
        </figure>
        <div className="public-founder-copy">
          <p className="public-eyebrow">The person behind the purpose</p>
          <h2 id="public-founder-title">
            A pandit at heart. Aaple Guruji by purpose.
          </h2>
          <p>
            Aaple Guruji was founded by Pandit Gajanan Kulkarni, a practising
            pandit who believes that every family deserves a thoughtful,
            welcoming connection to its traditions.
          </p>
          <p>
            His work brings the care of a personal Guruji relationship to a
            more accessible experience: helping families find trusted ritual
            guidance, understand the details, and make space for what matters
            on the day of their puja.
          </p>
          <p>
            For Gajanan, the purpose is simple: preserve the meaning of Vedic
            ceremonies while making it easier for families to take part with
            confidence, devotion, and peace of mind.
          </p>
          <div className="public-founder-signature">
            <span aria-hidden="true">शुभं भवतु</span>
            <small>May every beginning be auspicious</small>
          </div>
          <Link className="public-button" to="/book-pooja">
            Meet your Guruji <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </div>
    </section>

    <section className="public-values">
      <div className="public-container">
        <header className="public-section-heading" id="our-values">
          <p className="public-eyebrow">What matters to us</p>
          <h2>Faithful to tradition. Thoughtful about every detail.</h2>
        </header>
        <div className="public-value-grid">
          {values.map(({ icon: Icon, title, description }) => (
            <article className="public-value-card" key={title}>
              <span className="public-icon-tile">
                <Icon aria-hidden="true" size={22} />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="public-cta public-container">
      <span className="public-cta-icon" aria-hidden="true">
        <BadgeCheck size={24} />
      </span>
      <div>
        <p className="public-eyebrow">Your tradition, your way</p>
        <h2>Let’s make your next sacred occasion a little simpler.</h2>
      </div>
      <Link className="public-button" to="/book-pooja">
        Explore booking <ArrowRight aria-hidden="true" size={17} />
      </Link>
    </section>
    <HomeFooter />
  </main>
);

export default AboutPage;
