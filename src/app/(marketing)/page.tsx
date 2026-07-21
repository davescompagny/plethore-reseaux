import { Hero } from "@/components/marketing/Hero";
import { ProblemSection } from "@/components/marketing/ProblemSection";
import { DiagnosticTeaserSection } from "@/components/marketing/DiagnosticTeaserSection";
import { OffersSection } from "@/components/marketing/OffersSection";
import { PortalDemoSection } from "@/components/marketing/PortalDemoSection";
import { ProfilesSection } from "@/components/marketing/ProfilesSection";
import { MethodSection } from "@/components/marketing/MethodSection";
import { ImpactSection } from "@/components/marketing/ImpactSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { FaqSection } from "@/components/marketing/FaqSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <DiagnosticTeaserSection />
      <OffersSection />
      <PortalDemoSection />
      <ProfilesSection />
      <MethodSection />
      <ImpactSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
