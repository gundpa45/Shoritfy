import { Navbar } from "../../components/layout/Navbar";
import { HeroSection } from "./components/HeroSection";
import { SocialProofSection } from "./components/SocialProofSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ComparisonSection } from "./components/ComparisonSection";
import { PricingSection } from "./components/PricingSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { FooterSection } from "./components/FooterSection";

/**
 * Shortify Landing Page Orchestrator
 * High-level architecture structured into isolated, modular section components
 * following the Linear / Runner / Nordcraft design aesthetic (#0A0A0B + #D4FF3F).
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F5F5F5] overflow-x-hidden selection:bg-[#D4FF3F] selection:text-[#0A0A0B]">
      <Navbar />

      <main className="relative">
        {/* STEP 1: HERO (Active) */}
        <HeroSection />

        {/* STEP 2: SOCIAL PROOF STRIP (Pending Review) */}
        <SocialProofSection />

        {/* STEP 3: FEATURES (Pending Review) */}
        <FeaturesSection />

        {/* STEP 4: COMPARISON TABLE (Pending Review) */}
        <ComparisonSection />

        {/* STEP 5: PRICING (Pending Review) */}
        <PricingSection />

        {/* STEP 6: FINAL CTA (Pending Review) */}
        <FinalCtaSection />
      </main>

      <FooterSection />
    </div>
  );
}
