import { useEffect, useMemo, useState } from "react";
import { ArrowDownWideNarrow, ArrowRight, Clock3, Flame, Search, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../config/api";
import HomeFooter from "../components/HomeFooter";
import "./PoojaPage.css";

const categories = [
  "All Pujas",
  "Griha & Vastu",
  "Festivals & Vrat",
  "Havans & Yagnas",
  "Naming & Sanskars",
  "Ancestral (Shraadh)",
];

const categoryForPooja = (pooja) => {
  const explicitCategory = pooja.category?.trim();
  if (categories.includes(explicitCategory)) return explicitCategory;
  const name = pooja.name?.toLowerCase() || "";
  if (/griha|vastu|house|pravesh/.test(name)) return "Griha & Vastu";
  if (/havan|yagna|homam|rudra|abhishek/.test(name)) return "Havans & Yagnas";
  if (/nam|sansk|wedding|vivah|marriage|upanayan/.test(name)) {
    return "Naming & Sanskars";
  }
  if (/shradh|shraadh|pitru|ancestral/.test(name)) return "Ancestral (Shraadh)";
  if (/festival|vrat|lakshmi|ganesh|navratri|satyanarayan/.test(name)) {
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

const PoojaPage = () => {
  const [poojas, setPoojas] = useState([]);
  const [status, setStatus] = useState("loading");
  const [activeCategory, setActiveCategory] = useState("All Pujas");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState("any");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    axiosInstance
      .get("booking/poojas")
      .then(({ data }) => {
        if (!isMounted) return;
        setPoojas(data.poojas);
        setStatus("loaded");
      })
      .catch(() => {
        if (isMounted) setStatus("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const visiblePoojas = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const filtered = poojas.filter((pooja) => {
      const inCategory =
        activeCategory === "All Pujas" ||
        categoryForPooja(pooja) === activeCategory;
      const matchesQuery =
        !query ||
        `${pooja.name} ${pooja.description || ""} ${pooja.category || ""}`
          .toLowerCase()
          .includes(query);
      const matchesPrice =
        maxPrice === "any" || Number(pooja.basePrice) <= Number(maxPrice);
      return inCategory && matchesQuery && matchesPrice;
    });

    if (sortOrder === "price-low") {
      return filtered.sort((first, second) => first.basePrice - second.basePrice);
    }
    if (sortOrder === "price-high") {
      return filtered.sort((first, second) => second.basePrice - first.basePrice);
    }
    if (sortOrder === "name") {
      return filtered.sort((first, second) => first.name.localeCompare(second.name));
    }
    return filtered;
  }, [activeCategory, maxPrice, poojas, searchTerm, sortOrder]);

  return (
    <main className="pooja-shop">
      <section className="pooja-shop-hero">
        <div className="pooja-shop-container pooja-shop-hero-inner">
          <div>
            <p className="public-eyebrow">Aaple Guruji · Puja services</p>
            <h1>Find the right puja for your sacred occasion.</h1>
            <p>
              Browse traditional ceremonies, compare details, and plan with an
              experienced Guruji for your family and home.
            </p>
            <a className="public-button" href="#puja-catalogue">
              Explore puja services <ArrowRight aria-hidden="true" size={17} />
            </a>
          </div>
          <div className="pooja-shop-hero-art" aria-hidden="true">
            <span className="pooja-shop-aura" />
            <span className="pooja-shop-lamp">🪔</span>
            <span className="pooja-shop-art-note">
              <Sparkles size={15} /> Authentic rituals, thoughtfully arranged
            </span>
          </div>
        </div>
      </section>

      <section className="pooja-shop-container pooja-shop-content" id="puja-catalogue">
        <header className="pooja-shop-heading">
          <div>
            <p className="public-eyebrow">The puja collection</p>
            <h2>Rituals for life’s meaningful moments</h2>
            <p>
              Choose a service to see its details and start planning. Final
              arrangements are confirmed with your Guruji.
            </p>
          </div>
          <span className="pooja-shop-count">
            {status === "loaded" ? `${poojas.length} services` : "Puja services"}
          </span>
        </header>

        <div className="pooja-shop-toolbar">
          <label className="pooja-shop-search">
            <Search aria-hidden="true" size={18} />
            <input
              aria-label="Search puja services"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by puja or occasion"
              type="search"
              value={searchTerm}
            />
          </label>
          <label className="pooja-shop-select">
            <ArrowDownWideNarrow aria-hidden="true" size={17} />
            <span className="sr-only">Sort puja services</span>
            <select
              onChange={(event) => setSortOrder(event.target.value)}
              value={sortOrder}
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
          <label className="pooja-shop-select pooja-shop-price">
            <span>Price</span>
            <select
              aria-label="Maximum price"
              onChange={(event) => setMaxPrice(event.target.value)}
              value={maxPrice}
            >
              <option value="any">Any price</option>
              <option value="2500">Under ₹2,500</option>
              <option value="5000">Under ₹5,000</option>
              <option value="10000">Under ₹10,000</option>
            </select>
          </label>
        </div>

        <div className="pooja-shop-layout">
          <aside aria-label="Filter by puja category" className="pooja-shop-sidebar">
            <h3>Categories</h3>
            <div>
              {categories.map((category) => (
                <button
                  aria-pressed={activeCategory === category}
                  className={`pooja-shop-category${activeCategory === category ? " is-active" : ""}`}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  <span>{category}</span>
                  {category === "All Pujas" && status === "loaded" && (
                    <span>{poojas.length}</span>
                  )}
                </button>
              ))}
            </div>
            <div className="pooja-shop-assurance">
              <Flame aria-hidden="true" size={18} />
              <strong>Guided by tradition</strong>
              <p>Discuss your family customs and preferences with your Guruji.</p>
            </div>
          </aside>

          <div className="pooja-shop-results" aria-live="polite">
            {status === "loading" ? (
              <p className="pooja-shop-message" role="status">
                Loading puja services…
              </p>
            ) : status === "error" ? (
              <p className="pooja-shop-message pooja-shop-error" role="alert">
                We couldn’t load puja services. Please refresh and try again.
              </p>
            ) : visiblePoojas.length === 0 ? (
              <p className="pooja-shop-message">
                No puja services match these filters. Try another category or
                search.
              </p>
            ) : (
              <div className="pooja-shop-grid">
                {visiblePoojas.map((pooja, index) => (
                  <article className="pooja-product-card" key={pooja._id}>
                    <div className="pooja-product-media">
                      {pooja.images?.[0] ? (
                        <img
                          alt={`${pooja.name} ceremony`}
                          loading={index > 3 ? "lazy" : "eager"}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                          src={pooja.images[0]}
                        />
                      ) : (
                        <span className="pooja-product-placeholder" aria-hidden="true">
                          🪔
                        </span>
                      )}
                      <span className="pooja-product-category">
                        {pooja.badge || categoryForPooja(pooja)}
                      </span>
                    </div>
                    <div className="pooja-product-details">
                      <p className="pooja-product-eyebrow">
                        {categoryForPooja(pooja)}
                      </p>
                      <h3>{pooja.name}</h3>
                      <p className="pooja-product-description">
                        {pooja.shortDescription ||
                          pooja.description ||
                          "A traditional Vedic ceremony performed with care by an experienced Guruji."}
                      </p>
                      <div className="pooja-product-meta">
                        {pooja.duration ? (
                          <span>
                            <Clock3 aria-hidden="true" size={14} />
                            {pooja.duration >= 60
                              ? `${(pooja.duration / 60).toFixed(pooja.duration % 60 ? 1 : 0)} hr`
                              : `${pooja.duration} min`}
                          </span>
                        ) : null}
                        {pooja.languages?.length > 0 && (
                          <span>{pooja.languages.slice(0, 2).join(" · ")}</span>
                        )}
                      </div>
                      <div className="pooja-product-footer">
                        <div>
                          <span>Starting from</span>
                          <strong>{formatPrice(pooja.basePrice)}</strong>
                        </div>
                        <button
                          className="pooja-product-button"
                          onClick={() =>
                            navigate("/book-pooja", {
                              state: { poojaId: pooja._id },
                            })
                          }
                          type="button"
                        >
                          Book now <ArrowRight aria-hidden="true" size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="pooja-shop-bottom">
          <p>Not sure which ceremony is right for your occasion?</p>
          <Link to="/book-pooja">
            We can help you choose <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
};

export default PoojaPage;
