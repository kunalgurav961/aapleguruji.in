import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Clock3, Star, UsersRound } from "lucide-react";

const categories = [
  "All Pujas",
  "Griha & Vastu",
  "Festivals & Vrat",
  "Havans & Yagnas",
  "Naming & Sanskars",
  "Ancestral (Shraadh)",
];

const serviceImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBombxih0gXTusxKHOkC7CLxHfASP-pXWypqLFXNW0aOi52ukcUXTshbTWMGsAXK_68cSJLk3UOe0wYseiL3CsKFp6aUmZccDfj_rUEnIUPIvzwkioaaV3gfXrKjONg4lV0B2RrI3gnvZHHyN9z9LMqsoieQ37cwxtmaY5HCyO4tDP6PT9i64QMAdROQOUxbvNwFofh0YtjOkS47uCpOychp8djE9lHupyuiWR3wzErdzCL1QyIkzrW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBK8DudqUgwrYYNAsPZj5Kr6KhPGvkpMg1gr9uEBOsSnequCmIAyBU3gD0hJWxRwzUlxbVjMOqhZ1WRfr1zmckd5BZJfUPdAeILXS9JT98npW6C4K1mHx_4lRq2TFbC_m7OW6miXHvEwhFAVPC3N9pDmbtb3BWGpSnW3LVjnAinUsV5dNIyTfCgu9sPGMp2mlcCn19CAxQ-AsMSkxRkAoXOOLz8sqNW2mP5qN5g97SrFZ3Vx64PWAOP",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBNOcDvwZEUD9XRmfhoPr2bZziQ5FpxaYnJlmDaQafDfFdG9ZM2iXTr97cDRnQBnp8P3OiJsqGT0ghAsytyENtP531UfLZUMw4JSrWlkWfmgfuv83HWffVIGWxrXi9Z99pS0SdLEdUlJPCjnf5sI2R9skhhUTBG8XAtFWrWtComsIRlbFcBFxed6SSQYkSM_d3_a6WZt0SOtG_wbPN5Z8pwpGSfFMyP2GJDi3p8nwRjKm4NWoAeAtfz",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAS0JZE-ZBZ2sC-d5Nbm8ac3xl1ybnmZaiMEgF0vfdCDVTH_43jY2Ym827-WCbvxKeVO8UYd2SLFfAff1t1AgfRzd6vHp8taYaPexqxQfTSymCkP2V_VCQI7vWPWf6gstA0cQuEatzguSmEKZ5vlJAIeTm_1AJUgx7VXJ1D_Ey1HQUXeF4ToTltIEiJJJV65fKJqIIfztdckIFbMjKFX4RTecOLp431noLCoVnuKluslPuJi4qHOHfr",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC_aQsfLNO_ZtbA3F4k7bPEhmNwEGAx3xTjXBM5xvju09zN-XXyo0g-b-1wT0SfxWDRQ07twS5VJtcE-pKxZvEqS6VKc19zVIG_L-1v-6hWSFyx7z9HwHDKcrKdVQsssJL6g1JPGQY9eQF_DjRnErRZXC9RG4sTv57RGenXf5UUEgksPOC0K2u5lG1nLuLkE5kKX4H4_YWq0XW5NJeJtOWjoZyuMDDfA62Yu4MVvUb7DRiefJMV1E1K",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBgb7yXe4XvLyFjvlbzsYVEPFFD_p8--IlGmWzasGw8LcaWBtlOHIge204Lxedg9oE569U3EQ8slFY6f_C8cVtCEfswydxHz4AK2lRwNP5TpW1DNxTOza_VpKNn7uYhKMsiZdKTkqydCpmlenI3SmPHDKTUkcgm_R244AdqVVZZ9cvec19j9Bj6uV7cieI8eNbo9JMBLvV7F7nuwLll0X__kNGThMa2Ov71fX64nmvakP5F3C0hsBFo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBhoVX2FPN8eEIvO6U7isjEzlp77Q71yHsvDuFXlwgmcbWgGpSigLZrdMnNQ4hDK_jOcgkdNLCiPsRpXLeNa0hHWSAdoh1KWytgA6ZPMOBDTrvCuwJY_fL3YX7aVpelU86pAUNCnSYt7yMXm1oeQy9eXgxMzSiMSOkS-dfyYIuSrJh-GCntlqXoV_NxylaT3Iqio2kCikD9m9DiMY-OHIzN--gU3jNNrQ_GuhE6SDO40KBWBRicRQfR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuArj5BVcMhPKEIokmjBBuEfzW5HqxwhDEvrWiSO7gci_cJOxY1J_s-S2GkvkqXRIa3clWDseuU43-44l9cgQ0azGXp3HFu4hAEI-2uL8fsyJD3_EzYs0BuPbrrO7462nAugO6JKuCbY6bADsOfC4PjrcIck8w8QJrfC-tOVqfzlSc6vhCMNt6yOQOu1iNmXsCBgGdSUFhlVTJZm6nFOeHWQYLuBORx-M-0n5L2byN2wEiBkz9jPIavd",
];

const categoryLabels = [
  "Samagri Kit Included",
  "Most Popular",
  "Obstacle Removal",
  "Energy Harmony",
  "Shiva Blessings",
  "Planetary Peace",
  "Abundance & Prosperity",
  "Auspicious Beginnings",
];

const sampleRatings = ["4.9 (1,240)", "4.95 (3,120)", "4.88 (950)", "4.92 (810)"];

const categoryForPooja = (name = "") => {
  const value = name.toLowerCase();
  if (/griha|vastu|house|pravesh/.test(value)) return "Griha & Vastu";
  if (/havan|yagna|homam|rudra|abhishek/.test(value)) return "Havans & Yagnas";
  if (/nam|sansk|wedding|vivah|marriage|upanayan/.test(value)) {
    return "Naming & Sanskars";
  }
  if (/shradh|shraadh|pitru|ancestral/.test(value)) return "Ancestral (Shraadh)";
  if (/festival|vrat|lakshmi|ganesh|navratri|satyanarayan/.test(value)) {
    return "Festivals & Vrat";
  }
  return "All Pujas";
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price || 0);

const PujaCatalog = ({ poojas, state }) => {
  const [activeCategory, setActiveCategory] = useState("All Pujas");
  const navigate = useNavigate();
  const visiblePoojas =
    activeCategory === "All Pujas"
      ? poojas
      : poojas.filter((pooja) => categoryForPooja(pooja.name) === activeCategory);

  return (
    <section className="home-catalog" id="services-grid">
      <div className="home-container">
        <div className="split-section-heading catalog-heading">
          <div>
            <p className="home-eyebrow">🪷 Auspicious offerings</p>
            <h2>Sacred Services For Every Auspicious Occasion</h2>
            <p className="catalog-intro">
              तुमच्या प्रत्येक धार्मिक कार्यक्रमासाठी — Authentic Vedic rituals
              performed with devotion, exact mantras, and pure ingredients.
            </p>
          </div>
          <a className="home-text-link" href="#services-grid">
            View All {Math.max(poojas.length, 25)}+ Pujas <ArrowRight size={16} />
          </a>
        </div>

        <div className="catalog-categories" aria-label="Filter pujas by category">
          {categories.map((category) => (
            <button
              aria-pressed={activeCategory === category}
              className={`category-pill${activeCategory === category ? " is-active" : ""}`}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        {state === "loading" ? (
          <p className="home-message" role="status">
            Loading sacred services…
          </p>
        ) : state === "error" ? (
          <p className="home-message home-message-error" role="alert">
            We couldn’t load the puja catalogue. Please refresh to try again.
          </p>
        ) : visiblePoojas.length === 0 ? (
          <p className="home-message">
            {poojas.length
              ? "There are no pujas in this category yet."
              : "Our puja catalogue is being prepared. Please check back soon."}
          </p>
        ) : (
          <div className="puja-grid">
            {visiblePoojas.map((pooja, index) => {
              const category = categoryForPooja(pooja.name);
              const image = pooja.images?.[0] || serviceImages[index % serviceImages.length];

              return (
                <article className="puja-card" key={pooja._id}>
                  <div className="puja-card-image">
                    <img
                      alt={`${pooja.name} ritual`}
                      loading={index > 3 ? "lazy" : "eager"}
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                      src={image}
                    />
                    <span className="puja-rating">
                      <Star aria-hidden="true" fill="currentColor" size={13} />
                      {pooja.rating
                        ? `${pooja.rating} (${pooja.reviewCount || 0})`
                        : sampleRatings[index % sampleRatings.length]}
                    </span>
                    <span className="puja-card-tag">
                      {pooja.badge || categoryLabels[index % categoryLabels.length]}
                    </span>
                  </div>
                  <div className="puja-card-content">
                    <h2>{pooja.name}</h2>
                    <p className="puja-description">
                      {pooja.shortDescription ||
                        pooja.description ||
                        "A traditional Vedic ceremony performed with care by an experienced Guruji."}
                    </p>
                    <div className="puja-meta">
                      {pooja.duration ? (
                        <span>
                          <Clock3 size={13} />
                          {pooja.duration >= 60
                            ? `${(pooja.duration / 60).toFixed(pooja.duration % 60 ? 1 : 0)} Hrs`
                            : `${pooja.duration} Mins`}
                        </span>
                      ) : null}
                      <span>
                        <UsersRound size={13} />
                        {pooja.panditCount
                          ? `${pooja.panditCount} Vedic Pandit${pooja.panditCount === 1 ? "" : "s"}`
                          : "1 Vedic Pandit"}
                      </span>
                    </div>
                    <div className="puja-card-footer">
                      <div>
                        <span className="starting-label">Starting from</span>
                        <strong>{formatPrice(pooja.basePrice)}</strong>
                      </div>
                      <button
                        className="home-button"
                        onClick={() =>
                          navigate("/book-pooja", {
                            state: { poojaId: pooja._id },
                          })
                        }
                        type="button"
                      >
                        Book Now <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PujaCatalog;
