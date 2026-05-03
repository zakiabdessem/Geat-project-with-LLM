import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import OurValues from "@/components/OurValues";
import StatsSection from "@/components/StatsSection";
import EngineersSection from "@/components/EngineersSection";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import SubscribeSection from "@/components/SubscribeSection";
import CareersSection from "@/components/CareersSection";
import PortalSection from "@/components/PortalSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <AnnouncementsSection />
      <WhoWeAre />
      <WhatWeDo />
      <OurValues />
      <StatsSection />
      <EngineersSection />
      <SubscribeSection />
      <CareersSection />
      <PortalSection />
      <Footer />
    </div>
  );
};

export default Index;
