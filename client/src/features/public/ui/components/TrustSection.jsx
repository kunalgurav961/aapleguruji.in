import {
  BadgeCheck,
  Banknote,
  Flower2,
  Gauge,
  Languages,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const promises = [
  {
    icon: ShieldCheck,
    title: "Certified Vedic Gurujis",
    description:
      "Every Guruji undergoes strict background checks, identity audits, and Vedic knowledge verification from prestigious Ved Pathshalas across Pune, Nashik, and Varanasi.",
  },
  {
    icon: Flower2,
    title: "100% Pure Samagri Kit",
    description:
      "No running to the market at the last minute. We provide consecrated Desi cow ghee, organic havan samagri, dry fruits, fresh flowers, and pure kumkum in sealed kits.",
  },
  {
    icon: Banknote,
    title: "Transparent Dakshina",
    description:
      "Fixed, upfront packages with no awkward negotiations or unexpected demands. The Pandit dakshina is all-inclusive and clearly specified before booking.",
  },
  {
    icon: Languages,
    title: "Language of Your Devotion",
    description:
      "Whether your family prefers Marathi, Hindi, Sanskrit, or Gujarati, our Gurujis narrate the shlokas with clear contextual explanations so all generations connect deeply.",
  },
  {
    icon: Sparkles,
    title: "Complimentary Muhurat Guide",
    description:
      "Get personalized astrological guidance to identify the most propitious tithi, choghadiya, and laganam according to your family’s gotra and rashi.",
  },
  {
    icon: Gauge,
    title: "Devotee Care & Flex Rescheduling",
    description:
      "Life happens. Reschedule your ceremony date anytime up to 24 hours prior with zero penalty fees. Our dedicated support team is available 7 days a week.",
  },
];

const TrustSection = () => (
  <section className="trust-section">
    <div className="home-container">
      <header className="home-section-heading">
        <p className="home-eyebrow">Our sacred promise</p>
        <h2>Why 50,000+ Devotees Trust Aaple Guruji</h2>
        <p>
          We bring complete transparency, authentic Vedic rigor, and unmatched
          convenience to your holy ceremonies.
        </p>
      </header>
      <div className="trust-grid">
        {promises.map(({ icon: Icon, title, description }) => (
          <article className="trust-card" key={title}>
            <span className="trust-icon">
              <Icon size={20} />
            </span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="trust-proof">
        <BadgeCheck size={18} />
        Trusted by families across Maharashtra
      </div>
    </div>
  </section>
);

export default TrustSection;
