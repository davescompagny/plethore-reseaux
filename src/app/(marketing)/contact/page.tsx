import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { CONTACT } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Pléthore Réseaux pour un diagnostic salon, une proposition d'atelier ou toute autre question.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Vous voulez savoir si votre salon peut capter plus de demande ?"
        description="Envoyez un message court avec votre projet : nom du salon, ville, taille d'équipe et prestations actuelles."
      />
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1160px] gap-10 px-5 lg:grid-cols-[1fr_.8fr]">
          <Card>
            <ContactForm />
          </Card>
          <div className="grid gap-4">
            <Card>
              <h2 className="mb-3 text-lg font-bold">Coordonnées directes</h2>
              <div className="grid gap-2 text-sm">
                <a className="focus-ring w-fit font-semibold hover:text-green" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
                <a className="focus-ring w-fit font-semibold hover:text-green" href={`tel:${CONTACT.phoneHref}`}>
                  {CONTACT.phone}
                </a>
                <span className="text-muted">{CONTACT.zone}</span>
              </div>
            </Card>
            <Card>
              <h2 className="mb-2 text-lg font-bold">Avant de nous écrire</h2>
              <p className="text-sm">
                Un diagnostic express suffit souvent pour orienter votre demande. Vous pouvez aussi{" "}
                <a href="/diagnostic" className="focus-ring font-semibold text-bronze hover:underline">
                  démarrer le diagnostic en ligne
                </a>{" "}
                avant de nous contacter.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
