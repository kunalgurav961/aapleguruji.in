import { ArrowRight, BadgeCheck, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

const acharyas = [
  {
    name: "Pandit Sharma Ji",
    experience: "12+ Years Experience",
    rating: "4.9",
    pujas: "420+ Pujas",
    description:
      "Ved Murti Pathshala graduate specializing in Griha Pravesh, Vastu Shanti, and Navgraha Yagnas.",
    languages: ["Marathi", "Hindi", "Sanskrit"],
    location: "Pune & PCMC",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJxroPmM124v6fjgT3UtqUWz-qObt2p1Z2vi6HAuignpHiLezyyikTiX8up5bYw4amZQIFFHvDyKlGk-n7RjA5QqIm8QlBiDFIyFj-2TT4KHtrnCPOQoYNhhclNGzWi7zu2oA2JwhbhZV69RIold9shiFY7XinGk_go0WKkMQOzmZyNdVQ8TuBSIOhf0UB2Y_XHBGWn-vHnB6ZlPHlDkgjmsUH7SdO0ilbKGfj72du40nxY81gwwXW",
  },
  {
    name: "Guruji Dattatray Kulkarni",
    experience: "18+ Years Experience",
    rating: "4.98",
    pujas: "680+ Pujas",
    description:
      "Rigveda specialist and Jyotish Vidwan. Renowned for authentic Satyanarayan and Vivah Sanskar vidhis.",
    languages: ["Marathi", "Sanskrit"],
    location: "Kothrud, Pune",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmUm4HoGFq533cS0QjVhJHrEPMiD4WEKkEYDCv3o35fxu1a9VaIC98-_oy2KWBvBy8RwtAwlSe8uDRLfCZhp-29pzbgLkLsjI-JSyUKJkaoJZIwaP4u5dbIgDImoPIAv93sNCE4AFwBbT7EVpAV2_bYFffV_PKMAV_xdO_93nUCMkaWTPhDMkVzWXTAjwlNF-pLywJ2HqCeiDrKDjOFYmmtG8tvSCdie9rNy1OGflOgpUn7S7CLCnI",
  },
  {
    name: "Pandit Rameshwar Shastri",
    experience: "15+ Years Experience",
    rating: "4.92",
    pujas: "510+ Pujas",
    description:
      "Maha Rudrabhishek and Chandi Yagna specialist with deep Vedic expertise from Varanasi Sampurnanand University.",
    languages: ["Hindi", "Marathi", "Gujarati"],
    location: "Mumbai & Thane",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5iTdBZ64Z4BL-Yhk_FN-G8oN2nSFu6tLDpW43_Wxx3JbT0-tawIPmTLNswdAUV4SFy8_H9wDyJ9O6NcFCKM8BJdoMaaXG5hmywVf1mLSpEVPvpcKpvogmVlGFQtOcRp20KP6-H8HRbKhoYBtvCMSy4A5eXrHEWmuXKVVIB-N69qRZxfRmOJAJcyDppvZq0Epx00SxRiNjyUL5EMcWUS9Cz42dkMUEfmYOtK8U6_wNro_Zh-VKNuWL",
  },
];

const FeaturedAcharyas = () => (
  <section className="acharyas-section" id="acharyas">
    <div className="home-container">
      <header className="split-section-heading">
        <div>
          <p className="home-eyebrow">Vedic scholars</p>
          <h2>Meet Our Verified Acharyas</h2>
          <p>
            Experienced Purohits committed to preserving sacred traditions with
            humility, discipline, and exact ritual pronunciation.
          </p>
        </div>
        <a className="home-text-link" href="#quick-booking">
          View All 150+ Pandits <ArrowRight size={16} />
        </a>
      </header>
      <div className="acharya-grid">
        {acharyas.map((acharya) => (
          <article className="acharya-card" key={acharya.name}>
            <div className="acharya-photo-wrap">
              <img alt={acharya.name} loading="lazy" src={acharya.image} />
              <BadgeCheck aria-label="Verified Acharya" className="acharya-badge" />
            </div>
            <p className="acharya-rating">
              <Star aria-hidden="true" fill="currentColor" size={15} />
              {acharya.rating}
              <span>({acharya.pujas})</span>
            </p>
            <h3>{acharya.name}</h3>
            <p className="acharya-experience">{acharya.experience}</p>
            <p className="acharya-description">{acharya.description}</p>
            <div className="acharya-languages">
              {acharya.languages.map((language) => (
                <span key={language}>{language}</span>
              ))}
            </div>
            <div className="acharya-footer">
              <span>
                <MapPin aria-hidden="true" size={14} />
                {acharya.location}
              </span>
              <Link to="/book-pooja">Book Pandit</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedAcharyas;
