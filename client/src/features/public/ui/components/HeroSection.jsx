import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Languages,
  LockKeyhole,
  MapPin,
  Star,
  Utensils,
  BadgeCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBooking } from "../../../booking/state/bookingSlice";

const getLocalDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const HeroSection = ({ poojas, poojaState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [selectedPooja, setSelectedPooja] = useState("");
  const [city, setCity] = useState("Pune & PCMC");
  const [language, setLanguage] = useState("Marathi");
  const [date, setDate] = useState(getLocalDate);
  const [includeSamagri, setIncludeSamagri] = useState(true);
  const [isPreparingBooking, setIsPreparingBooking] = useState(false);

  useEffect(() => {
    if (!isPreparingBooking) return undefined;

    const transitionTimer = window.setTimeout(() => {
      navigate("/book-pooja", {
        state: {
          poojaId: selectedPooja,
          booking: { bookingDate: date, city, language, includeSamagri },
        },
      });
    }, 1600);

    return () => window.clearTimeout(transitionTimer);
  }, [
    city,
    date,
    includeSamagri,
    isPreparingBooking,
    language,
    navigate,
    selectedPooja,
  ]);

  useEffect(() => {
    if (!selectedPooja && poojas.length > 0) {
      setSelectedPooja(poojas[0]._id);
    }
  }, [poojas, selectedPooja]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addBooking({
        puja: selectedPooja,
        bookingDate: date,
        city,
        language,
        includeSamagri,
      }),
    );
    if (isAuthenticated) {
      navigate("/home/book-pooja", { state: { poojaId: selectedPooja } });
      return;
    }

    setIsPreparingBooking(true);
  };

  return (
    <section className="landing-hero" id="home">
      <div className="hero-aura hero-aura-one" />
      <div className="hero-aura hero-aura-two" />
      <div className="home-container hero-layout">
        <div className="hero-copy">
          <span className="hero-trust-pill">
            <span aria-hidden="true">🕉️</span>
            Maharashtra&apos;s Most Trusted Spiritual Platform • 50,000+ Blessings
          </span>
          <h1>
            Bring Divine Blessings to Your Home with{" "}
            <em>Trusted Vedic Pandits</em>
          </h1>
          <p className="hero-description">
            Experience authentic Vedic ceremonies performed by
            background-verified, pathshala-trained Gurujis. Complete, 100%
            consecrated samagri kits delivered fresh to your doorstep.
          </p>
          <div className="hero-actions">
            <a className="hero-primary-link" href="#quick-booking">
              Book a Puja <ArrowRight size={18} />
            </a>
            <a className="hero-secondary-link" href="#services-grid">
              <span aria-hidden="true">🛕</span> Explore Services
            </a>
          </div>
          <div className="hero-trust-grid">
            <div className="hero-trust-tile">
              <BadgeCheck aria-hidden="true" />
              <span>
                <strong>100% Certified</strong>
                <small>Vedic Gurujis</small>
              </span>
            </div>
            <div className="hero-trust-tile">
              <Star aria-hidden="true" fill="currentColor" />
              <span>
                <strong>4.9 / 5 Rating</strong>
                <small>12,400+ Families</small>
              </span>
            </div>
            <div className="hero-trust-tile">
              <Utensils aria-hidden="true" />
              <span>
                <strong>Pure Samagri</strong>
                <small>100% Kit Included</small>
              </span>
            </div>
          </div>
        </div>

        <div className="quick-booking-card" id="quick-booking">
          <div className="booking-card-ribbon" />
          <div className="quick-booking-heading">
            <div>
              <span aria-hidden="true">🪔</span>
              <h2>Quick Pandit Booking</h2>
            </div>
            <span className="instant-check">Instant Check</span>
          </div>
          <p className="quick-booking-copy">
            Check authentic Pandit availability and auspicious muhurats in
            under 60 seconds.
          </p>
          <form className="quick-booking-form" onSubmit={handleSubmit}>
            <label>
              <span className="field-label-row">
                <strong>Select Sacred Puja</strong>
                <span>{Math.max(poojas.length, 25)}+ Rituals</span>
              </span>
              <span className="select-wrap">
                <select
                  onChange={(event) => setSelectedPooja(event.target.value)}
                  required
                  value={selectedPooja}
                >
                  <option value="">
                    {poojaState === "loading"
                      ? "Loading pujas…"
                      : "Select a Puja"}
                  </option>
                  {poojas.map((pooja) => (
                    <option key={pooja._id} value={pooja._id}>
                      {pooja.name}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" />
              </span>
            </label>

            <div className="quick-booking-row">
              <label>
                <span className="field-label-row">
                  <strong>Your City</strong>
                </span>
                <span className="select-wrap">
                  <select
                    onChange={(event) => setCity(event.target.value)}
                    value={city}
                  >
                    <option>Pune & PCMC</option>
                    <option>Mumbai & Suburbs</option>
                    <option>Thane & Navi Mumbai</option>
                    <option>Nashik</option>
                    <option>Nagpur</option>
                  </select>
                  <MapPin aria-hidden="true" />
                </span>
              </label>
              <label>
                <span className="field-label-row">
                  <strong>Language</strong>
                </span>
                <span className="select-wrap">
                  <select
                    onChange={(event) => setLanguage(event.target.value)}
                    value={language}
                  >
                    <option>Marathi</option>
                    <option>Hindi</option>
                    <option>Sanskrit</option>
                    <option>Gujarati</option>
                  </select>
                  <Languages aria-hidden="true" />
                </span>
              </label>
            </div>

            <label>
              <span className="field-label-row">
                <strong>Auspicious Date / Muhurat</strong>
                <span className="muhurat-link">Free Panchang check</span>
              </span>
              <span className="date-wrap">
                <input
                  min={getLocalDate()}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  type="date"
                  value={date}
                />
                <CalendarDays aria-hidden="true" />
              </span>
            </label>

            <label className="samagri-toggle">
              <span>
                <Utensils aria-hidden="true" />
                Include 100% Consecrated Samagri Kit
              </span>
              <input
                checked={includeSamagri}
                onChange={(event) => setIncludeSamagri(event.target.checked)}
                type="checkbox"
              />
            </label>
            <button
              className="availability-button"
              disabled={
                isPreparingBooking ||
                poojaState !== "loaded" ||
                poojas.length === 0
              }
              type="submit"
            >
              Check Pandit Availability <CalendarDays aria-hidden="true" />
            </button>
            <p className="booking-reassurance">
              <LockKeyhole aria-hidden="true" />
              No advance payment required for verification
            </p>
          </form>
        </div>
      </div>
      {isPreparingBooking && (
        <div
          className="booking-devotional-transition"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="booking-devotional-transition__glow" aria-hidden="true" />
          <div className="booking-devotional-transition__content">
            <div className="booking-devotional-transition__lamp" aria-hidden="true">
              🪔
            </div>
            <span className="booking-devotional-transition__eyebrow">
              आपल्या पूजेचा संकल्प
            </span>
            <h2>कृपया आपली माहिती द्या</h2>
            <p>
              तुमच्यासाठी योग्य गुरुजी आणि शुभ मुहूर्त शोधण्यासाठी, बुकिंगची
              पुढची पायरी पाहा.
            </p>
            <span className="booking-devotional-transition__next">
              <span aria-hidden="true" />
              बुकिंग पृष्ठावर जात आहोत
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
