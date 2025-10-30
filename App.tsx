import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ChatBox } from "./components/ChatBox";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { QuickLinksSection } from "./components/QuickLinksSection";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="h-16" />
      <HeroSection />
      <ServicesSection />
      <QuickLinksSection />
      <Footer />
      <ChatBox />
    </div>
  );
}