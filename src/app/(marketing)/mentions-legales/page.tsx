import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { CONTACT } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Pléthore Réseaux.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageIntro eyebrow="Informations légales" title="Mentions légales" />
      <section className="py-16">
        <div className="mx-auto max-w-[760px] px-5">
          <div className="grid gap-8 text-ink">
            <div>
              <h2 className="mb-2 text-lg font-bold">Éditeur du site</h2>
              <p className="text-muted">
                Raison sociale, forme juridique, adresse du siège et numéro SIRET :{" "}
                <span className="font-semibold text-ink">[À valider par Pléthore Réseaux]</span>.
              </p>
              <p className="mt-2 text-muted">
                Contact : <a className="font-semibold hover:text-green" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> —{" "}
                <a className="font-semibold hover:text-green" href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a> — {CONTACT.zone}
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">Directeur de la publication</h2>
              <p className="text-muted">
                <span className="font-semibold text-ink">[À valider par Pléthore Réseaux]</span>
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">Hébergement</h2>
              <p className="text-muted">
                Nom, adresse et contact de l&apos;hébergeur :{" "}
                <span className="font-semibold text-ink">[À valider par Pléthore Réseaux]</span>.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">Propriété intellectuelle</h2>
              <p className="text-muted">
                L&apos;ensemble des contenus de ce site (textes, logo, mise en page) est la propriété de Pléthore
                Réseaux, sauf mention contraire. Toute reproduction sans autorisation est interdite.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">Nature du site</h2>
              <p className="text-muted">
                Ce site présente des ateliers pratiques de type barber. Il ne s&apos;agit pas de formations
                diplômantes ou certifiantes. Le portail « démonstration » accessible depuis « Créer mon espace »
                est un parcours illustratif : aucun compte réel n&apos;est créé à ce stade.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
