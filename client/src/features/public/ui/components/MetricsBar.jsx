const metrics = [
  {
    value: "150+",
    title: "Verified Vedic Pandits",
    detail: "Rigorous 4-tier vetting",
  },
  {
    value: "25+",
    title: "Vedic Pujas & Havans",
    detail: "Customizable Vidhis",
  },
  {
    value: "12+",
    title: "Maharashtra Cities",
    detail: "Pune, Mumbai, Nashik & more",
  },
  {
    value: "99.4%",
    title: "Punctual Muhurat Rate",
    detail: "Guaranteed on-time arrival",
  },
];

const MetricsBar = () => (
  <section aria-label="Aaple Guruji at a glance" className="metrics-section">
    <div className="home-container metrics-grid">
      {metrics.map((metric) => (
        <article className="metric-card" key={metric.title}>
          <strong>{metric.value}</strong>
          <span>{metric.title}</span>
          <small>{metric.detail}</small>
        </article>
      ))}
    </div>
  </section>
);

export default MetricsBar;
