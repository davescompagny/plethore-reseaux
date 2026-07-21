import Link from "next/link";
import { CONTACT, FOOTER } from "@/lib/site-content";

const columns = [
  {
    title: "Solutions",
    links: [
      { label: "Diagnostic salon", href: "/diagnostic" },
      { label: "Offres", href: "/offres" },
      { label: "Méthode", href: "/methode" },
      { label: "Impact social", href: "/impact" },
    ],
  },
  {
    title: "Pour qui ?",
    links: [
      { label: "Salons", href: "/profils/salons" },
      { label: "Structures", href: "/profils/structures" },
      { label: "Barbers", href: "/profils/barbers" },
      { label: "Débutants", href: "/profils/debutants" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { label: "À propos", href: "/a-propos" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/confidentialite" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1160px] px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Link href="/" className="focus-ring mb-3 flex w-fit items-center gap-2.5 font-black">
              <span className="grid size-9 place-items-center rounded-lg bg-green font-black text-white">P</span>
              Pléthore Réseaux
            </Link>
            <p className="max-w-xs text-sm text-muted">{FOOTER.tagline}</p>
            <div className="mt-4 grid gap-1 text-sm font-semibold text-ink">
              <a className="focus-ring w-fit hover:text-green" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
              <a className="focus-ring w-fit hover:text-green" href={`tel:${CONTACT.phoneHref}`}>
                {CONTACT.phone}
              </a>
              <span className="text-muted">{CONTACT.zone}</span>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-wide text-muted">{col.title}</p>
              <ul className="grid gap-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="focus-ring text-ink hover:text-green">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:justify-between">
          <span>{FOOTER.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
