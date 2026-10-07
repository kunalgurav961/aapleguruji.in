import LandingNavbar from "../components/landing/LandingNavbar";
import LandingHero from "../components/landing/LandingHero";
import TrustSection from "../components/landing/TrustSection";
import PujaServices from "../components/landing/PujaServices";
import HowItWorks from "../components/landing/HowItWorks";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import PujaSamagri from "../components/landing/PujaSamagri";
import PrasadSection from "../components/landing/PrasadSection";
import LivePuja from "../components/landing/LivePuja";
import AstrologySection from "../components/landing/AstrologySection";
import HomePuja from "../components/landing/HomePuja";
import VerifiedPandits from "../components/landing/VerifiedPandits";
import Testimonials from "../components/landing/Testimonials";
import StatsSection from "../components/landing/StatsSection";
import FinalCTA from "../components/landing/FinalCTA";
import LandingFooter from "../components/landing/LandingFooter";

const PremiumLanding = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <LandingNavbar />
      <LandingHero />
      <TrustSection />
      <PujaServices />
      <HowItWorks />
      <WhyChooseUs />
      <PujaSamagri />
      <PrasadSection />
      <LivePuja />
      <AstrologySection />
      <HomePuja />
      <VerifiedPandits />
      <Testimonials />
      <StatsSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
};

export default PremiumLanding;
