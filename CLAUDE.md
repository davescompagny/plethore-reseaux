@AGENTS.md

## Contexte projet

Site vitrine + portail SaaS de démonstration pour Pléthore Réseaux (ateliers barber pour salons de coiffure indépendants). Voir `docs/FRONTEND_ARCHITECTURE.md` pour l'organisation du code et `docs/BACKEND_HANDOFF.md` pour ce qui reste à brancher côté backend (Supabase).

## Règles à respecter dans ce dépôt

- Jamais de vraie authentification, base de données ou clé API : la couche `src/lib/services/mock*.ts` simule tout, avec une latence artificielle pour préparer l'UI aux vrais appels réseau.
- Jamais de mot de passe stocké, même dans les fixtures ou le localStorage/sessionStorage.
- N'invente jamais de partenaire, chiffre, résultat commercial ou témoignage. Utilise `[À valider]` si une information manque.
- Le sélecteur de profil de démonstration (`src/lib/demo/DemoProfileContext.tsx`, `src/components/portal/ProfileSwitcher.tsx`) doit rester isolé : c'est la première chose à retirer/remplacer lors du branchement de la vraie authentification.
- Avant tout changement, lance `npm run typecheck`, `npm run lint`, `npm test` et `npm run build` : les quatre doivent passer.
