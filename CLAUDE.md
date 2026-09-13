# Règles du projet Pléthore Réseaux

## Langue et forme
- Réponds en français.
- Termine chaque tâche par : (1) la liste exacte des fichiers créés/modifiés, (2) la commande pour lancer le site, (3) ce que l'utilisateur doit vérifier à l'écran.

## Périmètre
- Modifications ciblées uniquement. Aucune refonte structurelle, aucun refactoring non demandé, aucun "nettoyage" spontané, aucune "amélioration" hors demande.
- Ne jamais toucher sans demande explicite : package.json, dépendances, URLs et routes existantes, mécanisme de bascule entre les 4 profils (Salon, Structure, Barber, Débutant), système dark/light, localStorage, fichiers de configuration (vite/next/tsconfig/eslint…).
- Ne jamais reformater un fichier non concerné par la tâche.
- Ne jamais supprimer ni renommer un composant ou un fichier sans demande explicite.
- Ne jamais exécuter git commit, git checkout, git reset, git stash : l'utilisateur gère Git.
- Le travail se fait uniquement dans src/, puis régénération de l'export. Jamais de modification directe des HTML de version-partage/.

## Design
- Palette : vert profond #153f35, bronze #9b6b35, off-white #f7f5ef. Typographie : Inter.
- Réutiliser les composants, classes et icônes existants. Pas de nouveau système de style, pas de nouvelle bibliothèque d'icônes, pas de nouveau fichier CSS global.
- Dark et light mode doivent rester corrects après chaque modification.

## Contenu
- Le mot "bootcamp" est interdit : on dit "atelier".
- Aucune durée (1 jour, 3 jours) ne doit apparaître dans les titres ou descriptions d'ateliers.
- Badges de statut conservés tels quels : À venir / Complet / Terminé.

## Méthode
- Lire docs/AUDIT-REFONTE.md avant toute tâche.
- Si une information manque pour agir sans deviner : poser la question AVANT de modifier quoi que ce soit (3 questions max, groupées).
- Ne jamais annoncer qu'une tâche est terminée sans avoir exécuté la vérification demandée et montré son résultat.

## Règles existantes — toujours en vigueur

@AGENTS.md

### Contexte projet

Site vitrine + portail SaaS de démonstration pour Pléthore Réseaux (ateliers barber pour salons de coiffure indépendants). Voir `docs/FRONTEND_ARCHITECTURE.md` pour l'organisation du code et `docs/BACKEND_HANDOFF.md` pour ce qui reste à brancher côté backend (Supabase).

### Règles à respecter dans ce dépôt

- Jamais de vraie authentification, base de données ou clé API : la couche `src/lib/services/mock*.ts` simule tout, avec une latence artificielle pour préparer l'UI aux vrais appels réseau.
- Jamais de mot de passe stocké, même dans les fixtures ou le localStorage/sessionStorage.
- N'invente jamais de partenaire, chiffre, résultat commercial ou témoignage. Utilise `[À valider]` si une information manque.
- Le sélecteur de profil de démonstration (`src/lib/demo/DemoProfileContext.tsx`, `src/components/portal/ProfileSwitcher.tsx`) doit rester isolé : c'est la première chose à retirer/remplacer lors du branchement de la vraie authentification.
- Avant tout changement, lance `npm run typecheck`, `npm run lint`, `npm test` et `npm run build` : les quatre doivent passer.
