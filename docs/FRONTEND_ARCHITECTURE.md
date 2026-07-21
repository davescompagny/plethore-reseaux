# Architecture front-end

Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4 + React Hook Form + Zod + Lucide Icons.

## Arborescence

```
src/
  app/
    (marketing)/        Site public — layout avec header/footer premium
      page.tsx           Accueil (hero + aperçu interactif du portail)
      diagnostic/        Diagnostic interactif multi-étapes
      offres/ impact/ methode/ faq/
      profils/{salons,structures,barbers,debutants}/
      a-propos/ contact/ mentions-legales/ confidentialite/
    (auth)/              Parcours de démonstration — layout minimal
      inscription/        Inscription multi-étapes (4 étapes)
      connexion/
      mot-de-passe-oublie/
      confirmation-email/
    demo/                 Portail SaaS de démonstration (layout sidebar + topbar)
      espace/
        page.tsx           Tableau de bord (contenu différent par profil)
        profil/ demandes/ ateliers/ documents/ notifications/ parametres/
    sitemap.ts robots.ts   SEO — /demo et l'auth sont exclus de l'indexation

  components/
    layout/    Header, footer, navigation, toggle de thème
    marketing/ Sections de la page d'accueil et pages publiques
    forms/     DiagnosticWizard, SignupWizard, LoginForm, ContactForm, ForgotPasswordForm
    portal/    Sidebar, Topbar, ProfileSwitcher, dashboards par profil, StatusBadge...
    ui/        Primitives réutilisables (Button, Card, Modal, Toast, Accordion...)

  lib/
    types.ts          Types partagés (profils, diagnostics, demandes, ateliers...)
    validations.ts    Schémas Zod
    site-content.ts   Contenu texte du site public (extrait de index-8.html)
    utils.ts          Helper cn() + formatDate()
    data/             Fixtures de démonstration (une par domaine)
    services/         Couche mockXxxService — voir docs/BACKEND_HANDOFF.md
    demo/             Contexte + constantes du sélecteur de profil de démonstration

  hooks/
    useAsync.ts    Charge une donnée async avec états loading/success/error
    useDismiss.ts  Ferme un menu au clic extérieur ou à la touche Échap
```

## Pourquoi une couche de services

Les composants n'importent jamais les fixtures directement : ils passent toujours par `src/lib/services/mock*.ts`. Ces fonctions ont la même signature (async, retournent une Promise) que les futurs appels Supabase — remplacer l'intérieur d'un fichier de service suffira à brancher un vrai backend, sans toucher aux composants.

## Le sélecteur de profil de démonstration

`DemoProfileProvider` (dans `src/lib/demo/DemoProfileContext.tsx`) fournit un contexte React avec le profil actif (`salon` / `structure` / `barber` / `debutant`), persisté en `sessionStorage` (jamais de mot de passe). Il est instancié deux fois :

- Autour du widget `PortalPreview` sur la page d'accueil (démonstration autonome).
- Autour de tout `/demo/espace/*` dans `src/app/demo/layout.tsx` (le vrai portail de démonstration).

`ProfileSwitcher` est le seul composant qui lit/écrit ce contexte pour changer de profil ; c'est le point d'entrée à retirer en premier lors du passage à une vraie session utilisateur.

## Style et thème

- Palette et tokens définis en CSS dans `src/app/globals.css` (`@theme inline`), pas dans un fichier `tailwind.config.js` (Tailwind v4 est CSS-first).
- Mode sombre géré via l'attribut `data-theme` sur `<html>`, activé par `ThemeToggle` et persisté en `localStorage`. Un script inline dans `layout.tsx` applique le thème avant l'hydratation pour éviter un flash.
- `prefers-reduced-motion` est respecté globalement dans `globals.css`.

## Point d'attention CSS rencontré pendant le développement

`backdrop-blur` (ou tout `filter`/`backdrop-filter`) sur un ancêtre crée un nouveau *containing block* pour ses descendants en `position: fixed`. Le header du site utilise `backdrop-blur-md` : le menu mobile plein écran (`fixed inset-0`) doit donc être un **frère** du `<header>`, jamais un enfant, sous peine de se retrouver dimensionné à la hauteur du header au lieu de tout l'écran. Voir `SiteHeader.tsx`.

## Tests

Vitest + React Testing Library. Voir `src/lib/services/mockDiagnosticService.test.ts` (logique de scoring), `src/lib/validations.test.ts` (schémas Zod) et `src/components/portal/ProfileSwitcher.test.tsx` (comportement du sélecteur de profil).
