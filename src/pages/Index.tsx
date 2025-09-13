import Header from "@/components/layout/Header";
import DevelopmentNotice from "@/components/layout/DevelopmentNotice";
import HeroSection from "@/components/sections/HeroSection";
import IslamicToolsGrid from "@/components/islamic-tools/IslamicToolsGrid";
import ContentSections from "@/components/sections/ContentSections";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DevelopmentNotice />
      <main>
        <HeroSection />
        <IslamicToolsGrid />
        <ContentSections />
      </main>
    </div>
  );
};

export default Index;
