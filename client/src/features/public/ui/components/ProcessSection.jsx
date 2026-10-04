import { BookOpenText, CalendarDays, Flame, Sparkles } from "lucide-react";

const steps = [
  {
    icon: BookOpenText,
    title: "Choose Your Puja",
    description:
      "Explore 25+ authentic rituals tailored to your occasion. Select between simple, standard, or comprehensive havan packages.",
    detail: "Customizable Samagri List",
  },
  {
    icon: CalendarDays,
    title: "Pick Date & Muhurat",
    description:
      "Input your location and preferred date. Our integrated Vedic Panchang tool helps pinpoint the most auspicious tithi and nakshatra.",
    detail: "Free Astrological Check",
  },
  {
    icon: Sparkles,
    title: "Matched with Guruji",
    description:
      "We assign a certified, background-verified Pandit from a premier Vedic Pathshala fluent in your preferred native language.",
    detail: "100% Background Verified",
  },
  {
    icon: Flame,
    title: "Divine Ritual at Home",
    description:
      "Guruji arrives punctually with the blessed, unadulterated samagri kit. Experience a deeply fulfilling and stress-free ritual.",
    detail: "Meaningful Explanations",
  },
];

const ProcessSection = () => (
  <section className="process-section">
    <div className="home-container">
      <header className="home-section-heading">
        <p className="home-eyebrow">Simple & sacred</p>
        <h2>How Aaple Guruji Works</h2>
        <p>
          From selecting the sacred shubh muhurat to the final aarti, we take
          care of every minute spiritual detail with utmost devotion.
        </p>
      </header>
      <div className="process-grid">
        {steps.map(({ icon: Icon, title, description, detail }, index) => (
          <article className="process-card" key={title}>
            <span className="step-number">{index + 1}</span>
            <h3>
              <Icon size={17} />
              {title}
            </h3>
            <p>{description}</p>
            <span className="process-detail">
              <span aria-hidden="true">⊙</span>
              {detail}
            </span>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
