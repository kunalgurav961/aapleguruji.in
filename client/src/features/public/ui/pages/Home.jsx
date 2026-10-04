import { useEffect, useState } from "react";
import axiosInstance from "../../../../config/api";
import PujaCatalog from "../components/PujaCatalog";
import ProcessSection from "../components/ProcessSection";
import TrustSection from "../components/TrustSection";
import ReviewsSection from "../components/ReviewsSection";
import InsightsSection from "../components/InsightsSection";
import HomeFooter from "../components/HomeFooter";
import MetricsBar from "../components/MetricsBar";
import FeaturedAcharyas from "../components/FeaturedAcharyas";
import HomeCallToAction from "../components/HomeCallToAction";
import "./Home.css";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const [poojas, setPoojas] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [poojaState, setPoojaState] = useState("loading");
  const [reviewState, setReviewState] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    axiosInstance
      .get("booking/poojas")
      .then(({ data }) => {
        if (!isMounted) return;
        setPoojas(data.poojas);
        setPoojaState("loaded");
      })
      .catch(() => {
        if (isMounted) setPoojaState("error");
      });

    axiosInstance
      .get("public/reviews")
      .then(({ data }) => {
        if (!isMounted) return;
        setReviews(data.reviews);
        setReviewState("loaded");
      })
      .catch(() => {
        if (isMounted) setReviewState("error");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="home-page">
      <HeroSection poojas={poojas} poojaState={poojaState} />
      <MetricsBar />
      <PujaCatalog poojas={poojas} state={poojaState} />
      <ProcessSection />
      <TrustSection />
      <FeaturedAcharyas />
      <ReviewsSection reviews={reviews} state={reviewState} />
      <InsightsSection />
      <HomeCallToAction />
      <HomeFooter />
    </main>
  );
};

export default Home;
