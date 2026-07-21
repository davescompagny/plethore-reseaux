import type { Metadata } from "next";
import { PageIntro } from "@/components/marketing/PageIntro";
import { CONTACT } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Politique de confidentialité du site Pléthore Réseaux et du portail de démonstration.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <PageIntro eyebrow="Vos données" title="Politique de confidentialité" />
      <section className="py-16">
        <div className="mx-auto grid max-w-[760px] gap-8 px-5 text-ink">
          <div>
            <h2 className="mb-2 text-lg font-bold">Formulaire de contact</h2>
            <p className="text-muted">
              Le formulaire de contact ouvre votre client mail avec un message pré-rempli ; les informations saisies
              ne transitent pas par un serveur Pléthore Réseaux avant l&apos;envoi de l&apos;e-mail.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold">Portail de démonstration</h2>
            <p className="text-muted">
              Les parcours « Créer mon espace » et « Se connecter » sont des démonstrations. Aucun compte réel
              n&apos;est créé et aucun mot de passe n&apos;est stocké : les informations éventuellement saisies ne
              sont conservées que dans votre navigateur, le temps de la session, pour simuler le fonctionnement du
              futur espace.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold">Cookies et stockage local</h2>
            <p className="text-muted">
              Le site utilise le stockage local de votre navigateur uniquement pour mémoriser votre préférence
              d&apos;affichage (mode clair / nuit) et, dans le portail de démonstration, le profil sélectionné.
              Aucun cookie de suivi publicitaire n&apos;est utilisé à ce stade.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-lg font-bold">Vos droits</h2>
            <p className="text-muted">
              Pour toute question sur vos données ou pour exercer vos droits (accès, rectification, suppression),
              contactez-nous à{" "}
              <a className="font-semibold hover:text-green" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
              . Coordonnées complètes du responsable de traitement :{" "}
              <span className="font-semibold text-ink">[À valider par Pléthore Réseaux]</span>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
