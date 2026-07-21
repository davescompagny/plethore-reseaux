import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { Card } from "@/components/ui/Card";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";

export const metadata: Metadata = {
  title: "À propos",
  description: "Pléthore Réseaux : ateliers barber pour salons de coiffure indépendants, avec une dimension d'impact social.",
};

export default function AProposPage() {
  return (
    <>
      <PageIntro
        eyebrow="À propos"
        title="Un projet à la croisée du business et de l'utile."
        description="Pléthore Réseaux aide les salons de coiffure indépendants à capter la demande barber moderne, avec une méthode terrain plutôt que des promesses."
      />
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1160px] gap-6 px-5 lg:grid-cols-2">
          <Card>
            <h2 className="mb-2.5 text-xl font-bold">Notre approche</h2>
            <p>
              Nous partons du principe que la demande barber existe déjà chez la plupart des salons indépendants.
              Notre rôle est de clarifier le potentiel réel du salon (diagnostic), de faire monter l&apos;équipe en
              compétence sur le terrain (bootcamps) et d&apos;assurer un suivi concret (réseaux sociaux, profils de
              barbers, pratique sur modèles).
            </p>
          </Card>
          <Card>
            <h2 className="mb-2.5 text-xl font-bold">Notre dimension sociale</h2>
            <p>
              En parallèle de l&apos;activité commerciale, Pléthore Réseaux travaille avec des structures sociales
              autour de l&apos;image de soi, de la confiance et de l&apos;orientation métier, selon les moyens
              disponibles et un cadre défini avec chaque partenaire.
            </p>
          </Card>
          <Card className="lg:col-span-2">
            <h2 className="mb-2.5 text-xl font-bold">Qui sommes-nous</h2>
            <p>
              Les informations détaillées sur l&apos;équipe et l&apos;historique de Pléthore Réseaux seront ajoutées
              prochainement. <span className="font-semibold text-ink">[À valider par Pléthore Réseaux]</span>
            </p>
          </Card>
        </div>
      </section>
      <FinalCtaSection />
    </>
  );
}
