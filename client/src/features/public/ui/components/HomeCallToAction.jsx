import { ArrowRight, Check, Phone } from "lucide-react";

const HomeCallToAction = () => (
  <section className="home-cta">
    <div className="home-container home-cta-content">
      <p className="home-eyebrow">Your sacred moment awaits</p>
      <h2>Ready to Bring Peace, Prosperity, and Divine Grace to Your Sacred Home?</h2>
      <p>
        Join over 50,000 satisfied families across Pune, Mumbai, and Maharashtra
        who trust Aaple Guruji for authentic, hassle-free Vedic ceremonies.
      </p>
      <div className="home-cta-actions">
        <a href="#quick-booking">
          Book a Puja Now <ArrowRight aria-hidden="true" size={17} />
        </a>
        <a href="tel:+918888333430">
          <Phone aria-hidden="true" size={16} />
          Speak with Our Acharya (+91 8888333430)
        </a>
      </div>
      <div className="home-cta-promises">
        {[
          "Guaranteed Verified Pandits",
          "Consecrated Samagri",
          "Transparent Dakshina",
        ].map((promise) => (
          <span key={promise}>
            <Check aria-hidden="true" size={14} />
            {promise}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default HomeCallToAction;
