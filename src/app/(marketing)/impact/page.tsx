import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { ImpactSection } from "@/components/marketing/ImpactSection";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "Impact social — Coupes solidaires, image de soi, réseau de talents",
  description:
    "Pléthore Réseaux relie salons, barbers et structures sociales autour de l'image de soi, de la confiance et de l'orientation métier.",
};

export default function ImpactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Impact social"
        title="Un projet business avec une dimension utile."
        description="L'impact social ne remplace pas la performance commerciale : il la rend plus crédible."
      />
      <ImpactSection />
      <FinalCtaSection />
    </>
  );
}
