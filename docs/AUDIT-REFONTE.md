# Audit de refonte — Pléthore Réseaux

Audit réalisé le 2026-09-13 sur `/Volumes/T7 Shield/Plethores Réseaux /Website/`. Aucun fichier existant n'a été modifié. Les commandes `typecheck`, `lint`, `test` et `build` ont été exécutées (elles écrivent uniquement dans `.next/`, dossier de cache ignoré par git).

## A. Stack et lancement

**Framework et langage**
- Next.js **16.2.10** (App Router, dossier `src/app/`), React **19.2.4**, TypeScript strict (`tsconfig.json` : `"strict": true`, alias `@/*` → `./src/*`).
- Routeur : App Router de Next.js, avec trois groupes de routes : `(marketing)` (site public), `(auth)` (parcours inscription/connexion de démonstration), `demo/` (portail de démonstration).
- Styles : **Tailwind CSS v4** en mode CSS-first (`@import "tailwindcss"` + tokens dans `@theme inline` dans `src/app/globals.css`). Pas de `tailwind.config.js`. PostCSS via `@tailwindcss/postcss`. Utilitaire `cn()` = `clsx` + `tailwind-merge` (`src/lib/utils.ts`).
- Formulaires : React Hook Form + Zod (`@hookform/resolvers`). Icônes : `lucide-react`. Police : **Manrope** via `next/font/google` (`src/app/layout.tsx`), exposée en `--font-manrope` → `--font-sans`.
- Node attendu : **Node 20 ou plus** (README §1 ; `@types/node ^20`). Aucun fichier `.nvmrc`, `.node-version` ni champ `engines` dans `package.json`. Machine actuelle : Node v24.18.0, npm 11.16.0. `node_modules/` est présent (359 paquets).
- `next.config.ts` est vide (aucune option). Le `LISEZ-MOI.txt` de `version-partage/` explique qu'il faut ajouter temporairement `output: "export"` et `trailingSlash: true` pour régénérer l'export statique.

**Script "démarrer le site"**
- Fichier : `version-partage/démarrer-le-site.command` (le fichier `démarrer-le-site.command` sur le Bureau de l'utilisateur est un alias macOS qui pointe dessus).
- Commande exacte lancée : `npx --yes serve . -l 8899` depuis le dossier du script (`cd "$(dirname "$0")"`), puis attente (curl, max 30 s) et `open "http://127.0.0.1:8899/"`.
- Port : **8899**. Dossier servi : **`version-partage/`** (export statique Next.js figé, non modifié après build).
- Vérifié en live : le processus `node …/serve . -l 8899` en cours a pour répertoire de travail `…/Website/version-partage` et sert le build ID `LktittMEz_EuWgwGZeiiW` (celui de `version-partage/_next/`).

**Scripts `package.json`**

| Script | Commande | Rôle |
|---|---|---|
| `dev` | `next dev` | Serveur de développement (port 3000 par défaut) |
| `build` | `next build` | Build de production dans `.next/` |
| `start` | `next start` | Sert le build de production |
| `lint` | `eslint` | ESLint (config `eslint.config.mjs`, flat config) |
| `test` | `vitest run` | Tests unitaires (jsdom + Testing Library) |
| `typecheck` | `tsc --noEmit` | Vérification TypeScript |

Pas de script `preview`, `export`, `format` ni `e2e`.

## B. Arborescence et versions

**Arborescence sur 2 niveaux** (hors `node_modules/`, `.next/`, `out/`, `.git/`, fichiers `.DS_Store` / `._*`) :

```
Website/
├── .claude/settings.local.json     (permissions Claude Code + MCP "playwright")
├── .gitignore
├── AGENTS.md                       (avertissement Next.js 16, importé par CLAUDE.md)
├── CLAUDE.md                       (règles existantes du dépôt — voir I. Questions ouvertes)
├── README.md
├── docs/
│   ├── BACKEND_HANDOFF.md
│   └── FRONTEND_ARCHITECTURE.md
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json / package-lock.json
├── postcss.config.mjs
├── tsconfig.json / tsconfig.tsbuildinfo
├── vitest.config.ts / vitest.setup.ts
├── public/                         (VIDE)
├── image website/                  (VIDE)
├── src/
│   ├── app/                        (routes : (marketing), (auth), demo, layout, globals.css, sitemap, robots)
│   ├── components/                 (forms, layout, marketing, portal, ui)
│   ├── hooks/                      (useAsync, useDismiss)
│   └── lib/                        (data, demo, services, site-content, types, utils, validations)
├── legacy/
│   ├── index-8.html
│   └── other-versions/             (barber.html, index-7.html, index.html, plethore-reseaux-complet-4.html + .zip)
├── barber.html                     (doublon racine)
├── index-7.html                    (doublon racine)
├── index-8.html                    (doublon racine)
├── plethore-reseaux-complet-4.html (doublon racine)
├── plethore-reseaux-complet-4.html.zip (doublon racine)
├── out/                            (build export Next.js, ignoré par git)
├── version-partage/                (export statique SERVI sur 127.0.0.1:8899 + démarrer-le-site.command + LISEZ-MOI.txt)
└── version-partage-old/            (ancienne tentative : .nojekyll, LISEZ-MOI.txt, démarrer-le-site.command, out-fixed/)
```

**Dossier réellement servi** : `version-partage/` (voir A).

**Autres versions / copies du site présentes dans le dépôt** (rien n'a été supprimé) :

| Chemin | Taille | Dernière modif. | Nature |
|---|---|---|---|
| `version-partage/` | 41 Mo | 2026-08-18 18:05 | Export statique Next.js (build `LktittMEz_EuWgwGZeiiW`). **C'est la version servie.** Ignoré par git. |
| `out/` | 41 Mo | 2026-08-18 17:55 | Export statique identique à `version-partage/` (vérifié par `diff -rq` : seules différences = `démarrer-le-site.command` et `LISEZ-MOI.txt` absents). Ignoré par git. |
| `version-partage-old/` | 41 Mo | 2026-08-18 18:05 | Ancienne tentative d'export avec réécriture des chemins en relatif (`out-fixed/`, build `caBtzy_W9yR_1XU6A8g2x`), servie par `python3 -m http.server 8899`. Décrite comme cassée (hydratation React) dans `version-partage/LISEZ-MOI.txt`. **Non suivi par git** (`??`). |
| `legacy/index-8.html` | 128 Ko | 2026-07-20 21:50 | Ancienne version HTML statique (source du contenu de `site-content.ts` selon FRONTEND_ARCHITECTURE.md). Suivi par git. |
| `legacy/other-versions/index.html` | 128 Ko | 2025-12-25 05:11 | Ancienne version HTML (différente de `index-8.html`). Ignoré par git. |
| `legacy/other-versions/barber.html` | 128 Ko | 2025-12-25 11:46 | Ancienne version HTML. Ignoré par git. |
| `legacy/other-versions/index-7.html` | 128 Ko | 2026-07-05 13:42 | Ancienne version HTML. Ignoré par git. |
| `legacy/other-versions/plethore-reseaux-complet-4.html` | 20 Mo | 2026-01-04 18:54 | Ancienne version HTML monolithique (images embarquées). Ignoré par git. |
| `legacy/other-versions/plethore-reseaux-complet-4.html.zip` | 15 Mo | 2026-02-07 14:16 | Archive de la précédente. Ignoré par git. |
| `barber.html` (racine) | 128 Ko | 2025-12-25 11:46 | **Copie identique** (`cmp`) de `legacy/other-versions/barber.html`. Non suivi par git. |
| `index-7.html` (racine) | 128 Ko | 2026-07-05 13:42 | **Copie identique** de `legacy/other-versions/index-7.html`. Non suivi par git. |
| `index-8.html` (racine) | 128 Ko | 2026-07-05 14:00 | **Copie identique** de `legacy/index-8.html` (contenu identique, date différente). Non suivi par git. |
| `plethore-reseaux-complet-4.html` (racine) | 20 Mo | 2026-01-04 18:54 | **Copie identique** de `legacy/other-versions/plethore-reseaux-complet-4.html`. Non suivi par git. |
| `plethore-reseaux-complet-4.html.zip` (racine) | 15 Mo | 2026-02-07 14:16 | **Copie identique** du zip de `legacy/other-versions/`. Non suivi par git. |

**Version la plus récente** : `version-partage/` et `version-partage-old/` portent la même date de modification de dossier (2026-08-18 18:05), mais le script de lancement de `version-partage/` (13 août 00:59) est plus récent que celui de `version-partage-old/` (12 août 19:41), et son build ID correspond à `.next/BUILD_ID`. **C'est bien `version-partage/` qui est servie.** Parmi les HTML historiques, le plus récent est `index-8.html` (20 juillet 2026) ; aucun HTML historique n'est utilisé par l'application.

**Snapshot figé** : `version-partage/` contient les mêmes textes que le code source au moment du build (donc les occurrences de la section C). Toute modification de `src/` devra être suivie d'une régénération (procédure dans `version-partage/LISEZ-MOI.txt`) pour être visible sur `127.0.0.1:8899`.

## C. Occurrences à traiter

Recherche insensible à la casse de `bootcamp`, `1 jour`, `3 jours`, `jours`, `durée`/`duree`, `intensif`, `découverte`/`decouverte` dans `src/**/*.ts(x)` (fichiers de test exclus, voir note en fin de section). **62 lignes trouvées** : 47 textes affichés et 15 identifiants techniques (valeurs de type, `id`, `href`, `kind`, comparaisons) qui ne sont pas visibles à l'écran mais qu'un renommage global toucherait. `durée` : **0 occurrence**.

Légende colonne 3 : **Public** = site vitrine ; **Démo** = portail `/demo/espace` ; **Public (widget démo)** = aperçu du portail sur la page d'accueil.

| fichier:ligne | phrase complète | site public ou espace démo | profil concerné |
|---|---|---|---|
| `src/app/layout.tsx:18` | « Pléthore Réseaux aide les salons de coiffure indépendants à capter la demande barber moderne grâce au diagnostic salon, au bootcamp découverte 1 jour, au bootcamp intensif 3 jours et aux options de suivi. » (**meta description par défaut de tout le site**) | Public (SEO) | tous |
| `src/app/(marketing)/offres/page.tsx:7` | `title: "Offres — Diagnostic, bootcamp découverte et bootcamp intensif"` (**balise title**) | Public (SEO) | tous |
| `src/app/(marketing)/offres/page.tsx:9` | « Découvrez les trois offres Pléthore Réseaux : diagnostic salon, bootcamp découverte 1 jour et bootcamp intensif 3 jours pour structurer votre offre barber. » (**meta description**) | Public (SEO) | tous |
| `src/app/(marketing)/offres/page.tsx:18` | « Du premier échange au bootcamp intensif, chaque étape est pensée pour rester utile même si vous ne réservez qu'un diagnostic. » (intro de page) | Public | tous |
| `src/app/(marketing)/methode/page.tsx:8` | `title: "Méthode — Diagnostic, bootcamp terrain, suivi"` (**balise title**) | Public (SEO) | tous |
| `src/app/(marketing)/methode/page.tsx:10` | « La méthode Pléthore Réseaux en trois étapes : diagnostic et recommandation, bootcamp terrain, suivi et amélioration continue. » (**meta description**) | Public (SEO) | tous |
| `src/app/(marketing)/diagnostic/page.tsx:7` | « Répondez à huit questions courtes pour obtenir une recommandation indicative entre bootcamp découverte et bootcamp intensif. » (**meta description**) | Public (SEO) | Salon |
| `src/app/(marketing)/a-propos/page.tsx:26` | « Notre rôle est de clarifier le potentiel réel du salon (diagnostic), de faire monter l'équipe en compétence sur le terrain (bootcamps) et d'assurer un suivi concret (réseaux sociaux, profils de barbers, pratique sur modèles). » | Public | tous |
| `src/app/(marketing)/profils/salons/page.tsx:10` | « Salons de coiffure et professionnels : diagnostic, bootcamps et suivi pour structurer votre offre barber. » (**meta description**) | Public (SEO) | Salon |
| `src/app/(marketing)/profils/salons/page.tsx:15` | « Une recommandation entre bootcamp découverte et bootcamp intensif » (liste STEPS) | Public | Salon |
| `src/app/(marketing)/profils/barbers/page.tsx:10` | « Barbers professionnels et partenaires terrain : rejoignez le réseau Pléthore Réseaux pour encadrer des ateliers et des bootcamps. » (**meta description**) | Public (SEO) | Barber |
| `src/app/(marketing)/profils/barbers/page.tsx:15` | « Des propositions de mission sur des bootcamps et ateliers » (liste STEPS) | Public | Barber |
| `src/app/(marketing)/profils/barbers/page.tsx:26` | « Vous êtes barber professionnel, indépendant ou en montée en compétence, et vous souhaitez intervenir sur des bootcamps et ateliers Pléthore Réseaux. » (intro de page) | Public | Barber |
| `src/app/(marketing)/profils/debutants/page.tsx:14` | « Un atelier découverte pour tester votre intérêt et vos gestes de base » (liste STEPS — déjà formulé « atelier », seul « découverte » matche) | Public | Débutant |
| `src/components/marketing/OffersSection.tsx:19` | « Le parcours reste volontairement simple : on clarifie le besoin, on teste une journée sur le terrain, puis on passe au bootcamp intensif si le salon veut structurer une vraie offre barber. » | Public (accueil) | tous |
| `src/components/marketing/OffersSection.tsx:29` | `offer.id === "intensif" ? "border-bronze bg-band-card" : …` (**identifiant technique** : met en avant la carte de l'offre principale) | Public (accueil) | tous |
| `src/components/marketing/DiagnosticTeaserSection.tsx:16` | « Huit questions sur votre salon, votre équipe et votre clientèle suffisent pour obtenir une recommandation indicative : bootcamp découverte ou bootcamp intensif. La recommandation finale est toujours confirmée par Pléthore Réseaux. » | Public (accueil) | Salon |
| `src/components/marketing/DiagnosticTeaserSection.tsx:43` | « Recommandation indicative : Bootcamp intensif 3 jours » | Public (accueil) | Salon |
| `src/components/marketing/PortalPreview.tsx:22` | « Confirmer les 2 places au bootcamp du 18 août » (NEXT_STEPS) | Public (widget démo) | Salon |
| `src/components/marketing/PortalPreview.tsx:25` | « Confirmer la place au bootcamp découverte » (NEXT_STEPS) | Public (widget démo) | Débutant |
| `src/components/forms/DiagnosticWizard.tsx:260` | « Quelle est votre disponibilité pour un bootcamp ? » (libellé de champ du formulaire de diagnostic) | Public | Salon |
| `src/lib/site-content.ts:25` | `title: "Bootcamp découverte 1 jour"` (SOLUTIONS_PANEL — menu « Solutions » du header) | Public | tous |
| `src/lib/site-content.ts:27` | `href: "/offres#decouverte"` (**identifiant technique** : ancre) | Public | tous |
| `src/lib/site-content.ts:30` | `title: "Bootcamp intensif 3 jours"` (SOLUTIONS_PANEL — menu « Solutions ») | Public | tous |
| `src/lib/site-content.ts:32` | `href: "/offres#intensif"` (**identifiant technique** : ancre) | Public | tous |
| `src/lib/site-content.ts:112` | `id: "decouverte"` (**identifiant technique** : id de l'offre, sert d'ancre `#decouverte`) | Public | tous |
| `src/lib/site-content.ts:113` | `tag: "Offre découverte"` (OFFERS — étiquette de la carte d'offre) | Public | tous |
| `src/lib/site-content.ts:114` | `title: "Bootcamp découverte 1 jour"` (OFFERS — titre de la carte d'offre) | Public | tous |
| `src/lib/site-content.ts:122` | `cta: "Recevoir l'offre découverte"` (OFFERS — bouton) | Public | tous |
| `src/lib/site-content.ts:125` | `id: "intensif"` (**identifiant technique** : id de l'offre, ancre `#intensif`, comparé dans OffersSection.tsx:29) | Public | tous |
| `src/lib/site-content.ts:127` | `title: "Bootcamp intensif 3 jours"` (OFFERS — titre de la carte d'offre) | Public | tous |
| `src/lib/site-content.ts:165` | « On choisit le bon format : diagnostic seul, bootcamp découverte ou bootcamp intensif selon votre situation. » (METHOD_STEPS) | Public | tous |
| `src/lib/site-content.ts:168` | `title: "Bootcamp terrain"` (METHOD_STEPS — titre d'étape) | Public | tous |
| `src/lib/site-content.ts:219` | « Non, ce n'est pas nécessaire pour démarrer. Le diagnostic et les bootcamps permettent à votre équipe actuelle de monter en compétence sur les prestations barber, avant d'envisager un recrutement si besoin. » (**FAQ**) | Public | Salon |
| `src/lib/site-content.ts:227` | « Quelle est la différence entre le bootcamp découverte et le bootcamp intensif ? » (**FAQ — question**) | Public | tous |
| `src/lib/site-content.ts:229` | « Le bootcamp découverte est une journée pour tester l'intérêt du salon et initier l'équipe. Le bootcamp intensif (3 jours) est le format principal pour structurer une vraie offre barber avec une pratique plus poussée. » (**FAQ — réponse**) | Public | tous |
| `src/lib/types.ts:78` | `recommendation: "diagnostic" \| "decouverte" \| "intensif";` (**identifiant technique** : type) | Public + Démo | tous |
| `src/lib/types.ts:96` | `\| "decouverte"` (**identifiant technique** : `WorkshopKind`) | Démo | tous |
| `src/lib/types.ts:97` | `\| "intensif"` (**identifiant technique** : `WorkshopKind`) | Démo | tous |
| `src/lib/services/mockDiagnosticService.ts:47` | `recommendation = "intensif";` (**identifiant technique**) | Public | Salon |
| `src/lib/services/mockDiagnosticService.ts:48` | `recommendationLabel = "Bootcamp intensif 3 jours";` (libellé affiché en résultat de diagnostic) | Public | Salon |
| `src/lib/services/mockDiagnosticService.ts:51` | `recommendation = "decouverte";` (**identifiant technique**) | Public | Salon |
| `src/lib/services/mockDiagnosticService.ts:52` | `recommendationLabel = "Bootcamp découverte 1 jour";` | Public | Salon |
| `src/lib/services/mockDiagnosticService.ts:54` | `recommendation = "intensif";` (**identifiant technique**) | Public | Salon |
| `src/lib/services/mockDiagnosticService.ts:55` | `recommendationLabel = "Bootcamp intensif 3 jours";` | Public | Salon |
| `src/lib/services/mockDiagnosticService.ts:58` | `recommendation = "decouverte";` (**identifiant technique**) | Public | Salon |
| `src/lib/services/mockDiagnosticService.ts:59` | `recommendationLabel = "Bootcamp découverte 1 jour";` | Public | Salon |
| `src/lib/data/demoWorkshops.ts:6` | `title: "Bootcamp intensif 3 jours — Skin fade & barbe"` (**donnée démo** : atelier w-1, visible page Ateliers + « Prochain atelier ») | Démo + Public (widget démo) | tous |
| `src/lib/data/demoWorkshops.ts:7` | `kind: "intensif"` (**identifiant technique**) | Démo | tous |
| `src/lib/data/demoWorkshops.ts:16` | `title: "Bootcamp découverte 1 jour"` (**donnée démo** : atelier w-2) | Démo | tous (filtré par Débutant dans BeginnerDashboard) |
| `src/lib/data/demoWorkshops.ts:17` | `kind: "decouverte"` (**identifiant technique** : comparé dans BeginnerDashboard.tsx:36) | Démo | Débutant |
| `src/lib/data/demoRequests.ts:8` | `label: "Bootcamp intensif 3 jours"` (**donnée démo** : demande r-salon-1, visible page Demandes, dashboard Salon et widget accueil) | Démo + Public (widget démo) | Salon |
| `src/lib/data/demoRequests.ts:39` | `label: "Proposition de mission — Bootcamp Créteil"` (**donnée démo** : r-barber-1) | Démo + Public (widget démo) | Barber |
| `src/lib/data/demoRequests.ts:50` | `label: "Demande de participation — Bootcamp découverte"` (**donnée démo** : r-debutant-1) | Démo + Public (widget démo) | Débutant |
| `src/lib/data/demoNotifications.ts:7` | `title: "Bootcamp confirmé"` (**notification démo** n-salon-1) | Démo | Salon |
| `src/lib/data/demoNotifications.ts:42` | « Votre demande de participation au bootcamp découverte a été acceptée. » (**notification démo** n-debutant-1) | Démo | Débutant |
| `src/lib/data/demoDocuments.ts:13` | `title: "Support bootcamp intensif — techniques prioritaires"` (**document démo** doc-salon-2) | Démo | Salon |
| `src/lib/data/demoProfiles.ts:72` | `availability: "Week-ends et certains jours en semaine"` (matche « jours » mais **n'est pas une durée d'atelier** — disponibilité du barber) | Démo | Barber |
| `src/components/portal/dashboards/SalonDashboard.tsx:50` | « Bootcamp intensif 3 jours — objectif : {profile.goal} » (InfoCard « Recommandation ») | Démo | Salon |
| `src/components/portal/dashboards/SalonDashboard.tsx:72` | « Confirmer les places au bootcamp intensif » (InfoCard « Prochaines étapes ») | Démo | Salon |
| `src/components/portal/dashboards/BeginnerDashboard.tsx:36` | `.filter((w) => w.kind === "decouverte" && w.status === "a_venir")` (**identifiant technique** : filtre des ateliers accessibles) | Démo | Débutant |
| `src/components/portal/dashboards/BeginnerDashboard.tsx:58` | « Aucun bootcamp découverte disponible pour l'instant. » (état vide) | Démo | Débutant |

**Notes complémentaires**
- Aucune balise `alt` d'image ne contient ces mots : le site n'a **aucune image** (`public/` vide, aucun `<img>` / `next/image` dans `src/`). Les seules métadonnées SEO concernées sont listées ci-dessus (`title` et `description` de `layout.tsx`, `offres`, `methode`, `diagnostic`, `profils/salons`, `profils/barbers`).
- Hors périmètre strict de la recherche mais à signaler car ce sont aussi des **durées** : le mot « journée » apparaît 4 fois (`OffersSection.tsx:18`, `site-content.ts:26`, `site-content.ts:116`, `site-content.ts:229`).
- Fichiers de test : `src/lib/services/mockDiagnosticService.test.ts:23` et `:36` vérifient les **identifiants** `"decouverte"` / `"intensif"` (pas les libellés). Renommer les identifiants casserait ces tests ; changer uniquement les libellés (`recommendationLabel`, titres) ne les casse pas.
- Le snapshot `version-partage/` (servi en local) et `out/` contiennent ces mêmes textes compilés ; ils ne changeront qu'après régénération.

## D. Mécanisme des 4 profils

**Stockage du profil actif**
- Contexte React : `DemoProfileContext` dans `src/lib/demo/DemoProfileContext.tsx`, exposé par le hook `useDemoProfile()` qui retourne `{ profileKind, setProfileKind }`.
- Nom exact de la variable d'état : **`profileKind`** (type `ProfileKind`), mutée par **`setProfileKind(kind)`**.
- Persistance : **`sessionStorage`** (pas localStorage), clé = `` `${STORAGE_KEY_PREFIX}:${storageKey}` `` avec `STORAGE_KEY_PREFIX = "plethore-demo-profile"`. Pour le portail réel, `storageKey = "portal"` (constante `PORTAL_PROFILE_STORAGE_KEY` dans `src/lib/demo/constants.ts`), soit la clé complète **`plethore-demo-profile:portal`** (constante `DEMO_PROFILE_SESSION_KEY`). Valeur par défaut : `"salon"`.
- Le provider est instancié dans `src/app/demo/layout.tsx` (autour de tout `/demo/espace/*`). Le widget `PortalPreview` de la page d'accueil **n'utilise pas ce contexte** : il a son propre `useState<ProfileKind>("salon")` local, non persisté (contrairement à ce qu'indique `docs/FRONTEND_ARCHITECTURE.md`).
- Seul composant qui écrit dans le contexte : `src/components/portal/ProfileSwitcher.tsx` (utilisé dans la Sidebar et le menu mobile du portail).

**Les 4 valeurs exactes** (`src/lib/types.ts:1`) :
```ts
export type ProfileKind = "salon" | "structure" | "barber" | "debutant";
```
Libellés affichés (ProfileSwitcher.tsx:7-12) : Salon / Structure / Barber / Débutant.

**Affichage conditionnel selon le profil** — extrait réel de `src/app/demo/espace/page.tsx:9-16` :
```tsx
export default function EspacePage() {
  const { profileKind } = useDemoProfile();

  if (profileKind === "salon") return <SalonDashboard />;
  if (profileKind === "structure") return <StructureDashboard />;
  if (profileKind === "barber") return <BarberDashboard />;
  return <BeginnerDashboard />;
}
```
Les autres pages du portail (Demandes, Notifications, Documents, Profil) passent `profileKind` aux services mock, qui lisent des fixtures indexées par profil (`Record<ProfileKind, …>`), ex. `demandes/page.tsx:19` : `useAsync(() => listRequests(profileKind), [profileKind])`.

**Thème dark/light**
- Clé localStorage exacte : **`plethore-theme`** (valeurs `"dark"` / `"light"`).
- Écriture : `src/components/layout/ThemeToggle.tsx:5` (`const STORAGE_KEY = "plethore-theme"`), qui bascule l'attribut `data-theme` sur `<html>`.
- Lecture avant hydratation : script inline `themeInitScript` dans `src/app/layout.tsx:21-26` (`localStorage.getItem("plethore-theme")` → `document.documentElement.setAttribute("data-theme", …)`). Défaut : `light`.
- Les tokens sombres sont redéfinis dans `src/app/globals.css` sous `[data-theme="dark"]` (lignes 25-34).

## E. Données de démo

| Donnée | Fichier | Export | Forme |
|---|---|---|---|
| Ateliers | `src/lib/data/demoWorkshops.ts` | `DEMO_WORKSHOPS: Workshop[]` | Liste plate (4 ateliers), commune à tous les profils |
| Demandes | `src/lib/data/demoRequests.ts` | `DEMO_REQUESTS: Record<ProfileKind, WorkshopRequest[]>` | Indexé par profil |
| Profils / utilisateurs | `src/lib/data/demoProfiles.ts` | `DEMO_USERS`, `DEMO_SALON_PROFILE`, `DEMO_STRUCTURE_PROFILE`, `DEMO_BARBER_PROFILE`, `DEMO_BEGINNER_PROFILE`, `DEMO_PROFILES` | Un objet par profil |
| Notifications | `src/lib/data/demoNotifications.ts` | `DEMO_NOTIFICATIONS: Record<ProfileKind, DemoNotification[]>` | Indexé par profil |
| Documents | `src/lib/data/demoDocuments.ts` | `DEMO_DOCUMENTS: Record<ProfileKind, DemoDocument[]>` | Indexé par profil |

Les composants n'importent pas ces fichiers directement (sauf `PortalPreview.tsx` qui importe `DEMO_PROFILES`, `DEMO_USERS`, `DEMO_REQUESTS`, `DEMO_WORKSHOPS` en direct) ; ils passent par `src/lib/services/mock*Service.ts` (latence simulée via `delay()`).

**Objet « atelier » réel** (`demoWorkshops.ts:4-13`, type `Workshop` dans `types.ts:100-109`) :
```ts
{
  id: "w-1",
  title: "Bootcamp intensif 3 jours — Skin fade & barbe",
  kind: "intensif",            // "diagnostic" | "decouverte" | "intensif" | "atelier_structure"
  date: "2026-08-18",
  city: "Créteil",
  seatsTotal: 6,
  seatsTaken: 4,
  status: "a_venir",           // "a_venir" | "complet" | "termine"
}
```

**Objet « demande » réel** (`demoRequests.ts:5-13`, type `WorkshopRequest` dans `types.ts:84-92`) :
```ts
{
  id: "r-salon-1",
  profileKind: "salon",
  label: "Bootcamp intensif 3 jours",
  detail: "Demande envoyée pour 2 membres de l'équipe, session du 18 août à Créteil.",
  status: "planifiee",         // "en_attente" | "acceptee" | "planifiee" | "terminee"
  createdAt: "2026-07-01T10:00:00.000Z",
  updatedAt: "2026-07-05T14:00:00.000Z",
}
```

## F. Composants à réutiliser

**Carte d'atelier (page Ateliers)** — il n'existe **pas de composant dédié** : la carte est écrite en ligne dans `src/app/demo/espace/ateliers/page.tsx:31-47`. Elle assemble :
- `Card` (`src/components/ui/Card.tsx`, props : `HTMLAttributes<HTMLDivElement>` dont `className`) ;
- `StatusBadge` (`status={w.status}`) ;
- trois lignes icône + texte (`CalendarDays` + `formatDate(w.date)`, `MapPin` + `w.city`, `Users` + `{seatsTaken} / {seatsTotal} places`).
Le dashboard Débutant (`BeginnerDashboard.tsx:54`) affiche les ateliers sous une autre forme (`<li>{w.title} — {formatDate(w.date)}</li>`), et le widget d'accueil via `PreviewRow` (composant privé de `PortalPreview.tsx:114-132`, props `icon`, `title`, `detail`).

**Élément de la liste Demandes** — pas de composant dédié non plus : en ligne dans `src/app/demo/espace/demandes/page.tsx:51-58` : `Card` (`className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"`) contenant `req.label` (gras), `req.detail`, « Créée le {formatDate(req.createdAt)} » et `<StatusBadge status={req.status} />`. Création via `NewRequestModal` (`src/components/portal/NewRequestModal.tsx`, props : `open`, `onClose`, `profileKind`, `defaultLabel`, `onCreated`). Le dashboard Barber (`BarberDashboard.tsx:76-79`) réaffiche les demandes avec un bloc `div` similaire mais **sans** StatusBadge.

**Bloc « Profil barber »** (`src/components/portal/dashboards/BarberDashboard.tsx`, composant `BarberDashboard`, sans props) :
- En-tête + barre « Profil complété » (lignes 35-39) : `<ProgressBar value={profile.profileCompletion} label="Profil complété" />` — `ProgressBar` dans `src/components/ui/ProgressBar.tsx`, props `value: number`, `label?: string`, `className?: string`.
- Tags de compétences (lignes 42-50) : `InfoCard` titre « Compétences » contenant des `<span className="rounded-full bg-surface-strong px-2.5 py-1 text-xs font-semibold text-ink">` par spécialité — **pas le composant `Tag`** (qui existe dans `src/components/ui/Tag.tsx` avec le style vert `bg-green-soft text-green`, props `children`, `className`).
- Bloc « Aperçu du portfolio » (lignes 59-67) : `InfoCard` icône `ImageIcon` ; lien `profile.portfolioUrl` si renseigné, sinon texte « Aucun portfolio renseigné pour le moment. ».
- `InfoCard` : `src/components/portal/InfoCard.tsx`, props `icon: LucideIcon`, `title: string`, `children: ReactNode`.
- Autres briques du même fichier : `DemoBadge` (`ui/Tag.tsx`, étiquette « Démonstration »), `SkeletonCard` (`ui/Skeleton.tsx`).

**Badge de statut** — `src/components/portal/StatusBadge.tsx`, composant `StatusBadge`, prop unique `status: string`. Un seul composant couvre demandes et ateliers :

| Valeur | Libellé | Classes (tonalité) |
|---|---|---|
| `a_venir` | À venir | `bg-green-soft text-green` |
| `complet` | Complet | `bg-bronze-soft text-bronze-strong` |
| `termine` | Terminé | `bg-surface-strong text-muted` |
| `en_attente` | En attente | `bg-bronze-soft text-bronze-strong` |
| `acceptee` | Acceptée | `bg-green-soft text-green` |
| `planifiee` | Planifiée | `bg-green-soft text-green` |
| `terminee` | Terminée | `bg-surface-strong text-muted` |

Valeur inconnue → affichée telle quelle, sans classe de couleur. Base : `inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-extrabold`.

**Icônes** — bibliothèque **`lucide-react`** (v1.25), importée dans 35 fichiers. Icônes déjà importées (dédupliquées) :
`AlertCircle, ArrowLeft, ArrowRight, ArrowUp, Bell, Briefcase, CalendarDays, Check, CheckCircle2, ChevronDown, ClipboardList, Compass, FileText, GraduationCap, Image (alias ImageIcon), LayoutDashboard, Lightbulb, LogOut, MailCheck, MapPin, Menu, MessageSquareQuote, Moon, Plus, RotateCcw, Scissors, Settings, ShieldCheck, Sparkles, Sun, TrendingUp, Users, Users2, X` — plus le type `LucideIcon`.

## G. Vérification disponible

Commandes exécutées le 2026-09-13 depuis `Website/` (Node v24.18.0) :

| Commande | État | Détail |
|---|---|---|
| `npm run typecheck` | **Passe** | `tsc --noEmit` sans erreur. |
| `npm run lint` | **Échoue** (exit 1) | `✖ 2495 problems (10 errors, 2485 warnings)`. **Tous** proviennent de `version-partage-old/out-fixed/_next/static/**/*.js` (bundles minifiés) : 10 × `@typescript-eslint/no-this-alias`, le reste `no-unused-expressions` / `no-unused-vars`. **0 problème dans `src/`.** Cause : `eslint.config.mjs` ignore `.next/`, `out/`, `version-partage/`, `build/` mais pas `version-partage-old/`. |
| `npm test` | **Passe** | Vitest : 3 fichiers, 16 tests, 12 s. |
| `npm run build` | **Passe** | `next build` : 30 pages statiques générées, compilation 19,7 s. Aucun avertissement. |

**Playwright** : **non configuré dans le projet** — aucun `playwright.config.*`, aucun dossier `e2e/` ou `tests/`, aucune dépendance `@playwright/test` ni `playwright` dans `package.json` ou `node_modules/`, aucun script npm associé. Il n'existe donc pas de commande projet pour lancer une capture d'écran. Seule trace : `.claude/settings.local.json` active un serveur MCP nommé `playwright` (`"enabledMcpjsonServers": ["playwright"]`) — c'est un outil de l'assistant Claude Code, pas une configuration du projet, et sa disponibilité dépend du poste.

## H. Observations de nettoyage (aucune action)

- `out/` — 41 Mo, copie byte-à-byte de `version-partage/` (moins le script et le LISEZ-MOI) ; résidu du build d'export, ignoré par git.
- `version-partage-old/` — 41 Mo, ancienne tentative d'export documentée comme cassée dans `version-partage/LISEZ-MOI.txt` ; non suivi par git ; **c'est aussi la source unique des 2495 problèmes ESLint**.
- `image website/` — dossier vide, non référencé.
- `public/` — dossier vide (Next.js le tolère ; aucun asset statique n'est utilisé).
- `barber.html`, `index-7.html`, `index-8.html`, `plethore-reseaux-complet-4.html`, `plethore-reseaux-complet-4.html.zip` (racine) — copies identiques (vérifiées `cmp`) de fichiers déjà présents dans `legacy/` ; non suivis par git ; ~35 Mo de doublons.
- `legacy/other-versions/` — 36 Mo d'anciens HTML monolithiques ; ignoré par git ; non utilisé par l'application (le README le dit explicitement).
- `legacy/index-8.html` — seul HTML historique suivi par git ; référence du contenu d'origine de `site-content.ts`. **Candidat au nettoyage, à laisser en place jusqu'à l'étape 8** (décision utilisateur du 2026-09-13).
- Fichiers `._*` (AppleDouble) à la racine et dans `legacy/` (`._README.md`, `._barber.html`, `._index-7.html`, `._index-8.html`, `._plethore-reseaux-complet-4.html(.zip)`, `._.DS_Store`, `legacy/._index-8.html`) — artefacts macOS créés par le disque exFAT, non suivis, sans valeur.
- `tsconfig.tsbuildinfo` — cache TypeScript incrémental, ignoré par git (`*.tsbuildinfo`).
- `.next/` — 841 Mo de cache de build/dev, ignoré par git ; régénérable.
- Dépendance npm **`motion`** (`^12.42.2`) — **0 import dans `src/`** ; dépendance non utilisée.
- Export `DarkCard` (`src/components/ui/Card.tsx:16`) — défini mais jamais importé ailleurs.
- `src/lib/demo/constants.ts` : `DEMO_PROFILE_SESSION_KEY` — exporté, importé nulle part dans `src/` (seul `PORTAL_PROFILE_STORAGE_KEY` est utilisé, dans `demo/layout.tsx`) ; à vérifier dans les tests avant toute décision.
- `docs/FRONTEND_ARCHITECTURE.md` §« Le sélecteur de profil de démonstration » — indique que `DemoProfileProvider` entoure `PortalPreview` sur l'accueil ; **inexact** : `PortalPreview` utilise un `useState` local. Documentation à corriger, pas du code.
- `eslint.config.mjs` — la liste `globalIgnores` n'inclut pas `version-partage-old/` (cause de l'échec du lint).
- Git : 116 fichiers apparaissent modifiés, mais `git diff --shortstat` donne `0 insertions, 0 deletions` — ce sont uniquement des **changements de mode `100644 → 100755`** dus au disque externe exFAT (tous les fichiers y sont exécutables). Aucune modification de contenu non commitée.

## I. Questions ouvertes

1. **`CLAUDE.md` existe déjà** à la racine (14 lignes : `@AGENTS.md` + règles « jamais de vraie auth/BDD/clé API », « jamais de mot de passe stocké », « n'invente jamais partenaire/chiffre/témoignage — utiliser `[À valider]` », « ProfileSwitcher isolé », « lancer typecheck/lint/test/build avant tout changement »). La consigne d'audit demande de le *créer* avec un contenu exact tout en ne modifiant *aucun* fichier existant : les deux sont incompatibles. Faut-il **remplacer** l'ancien contenu, le **fusionner** (nouveau contenu + anciennes règles conservées), ou **garder** l'ancien ? En attendant la réponse, `CLAUDE.md` n'a pas été touché.
2. **Palette et typographie** : les couleurs demandées (`#153f35`, `#9b6b35`, `#f7f5ef`) correspondent bien à `--color-green`, `--color-bronze`, `--color-cream` de `globals.css`. En revanche la police du projet est **Manrope** (`next/font/google`, `src/app/layout.tsx:2-9`), pas **Inter**. Le futur `CLAUDE.md` mentionne Inter : est-ce une consigne de changement de police (à traiter comme une tâche à part) ou une erreur à corriger dans le CLAUDE.md ?
3. **Identifiants techniques** `"decouverte"` / `"intensif"` (types `WorkshopKind` et `DiagnosticResult.recommendation`, `id` des offres, ancres `#decouverte` / `#intensif`, filtre du dashboard Débutant, assertions dans `mockDiagnosticService.test.ts`) : la future réécriture concerne-t-elle uniquement les textes affichés, ou aussi ces identifiants ? Les renommer touche les URLs (ancres) et les tests.
4. **Le mot « journée »** (4 occurrences, voir C) est une durée sans être dans la liste demandée : à traiter avec les durées ou à conserver ?
5. **Titre « Bootcamp terrain »** de l'étape 2 de la méthode (`site-content.ts:168`) et titre de page « Méthode — Diagnostic, bootcamp terrain, suivi » : le remplacement attendu est-il « Atelier terrain » ?
6. **Régénération de `version-partage/`** : les modifications de `src/` ne seront visibles sur `127.0.0.1:8899` qu'après la procédure du `LISEZ-MOI.txt` (ajout temporaire de `output: "export"` + `trailingSlash: true` dans `next.config.ts`, `npm run build`, copie de `out/`). Or le futur `CLAUDE.md` interdit de toucher aux fichiers de configuration sans demande explicite. Qui régénère le snapshot, et cette étape est-elle considérée comme autorisée ?
7. **Playwright** : le serveur MCP `playwright` activé dans `.claude/settings.local.json` est-il réellement installé sur ce poste ? Non vérifiable depuis le projet (aucune configuration ni dépendance).
8. ~~**`legacy/index-8.html`** est le seul HTML historique suivi par git : doit-il rester comme référence de contenu, ou est-il candidat au nettoyage comme les autres ?~~ **Répondu le 2026-09-13** : ne pas toucher, laisser en place ; candidat au nettoyage traité à l'étape 8 (noté en section H).
9. ~~Le dossier `Website/` contient à la fois le code source et les exports (`out/`, `version-partage*/`) : la cible du travail futur est bien `src/` (puis régénération), et non les fichiers HTML de `version-partage/` directement ?~~ **Répondu le 2026-09-13** : oui, uniquement `src/` puis régénération, jamais les HTML de `version-partage/`. Règle ajoutée dans `CLAUDE.md`, section Périmètre.
