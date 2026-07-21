# Pléthore Réseaux — Site et portail de démonstration

Site vitrine + portail SaaS de démonstration pour Pléthore Réseaux, construit avec Next.js, TypeScript, Tailwind CSS et React Hook Form / Zod.

Ce guide est écrit pour une personne **non développeuse** : il explique comment installer, lancer et utiliser le projet sans connaissances techniques préalables.

## 1. Installer le projet (une seule fois)

Il faut avoir [Node.js](https://nodejs.org) (version 20 ou plus) installé sur l'ordinateur. Une fois Node.js installé, ouvrez un terminal dans le dossier du projet et lancez :

```bash
npm install
```

Cette commande télécharge tout ce dont le site a besoin pour fonctionner. Elle ne doit être relancée que si de nouvelles dépendances sont ajoutées.

## 2. Démarrer le site en local

```bash
npm run dev
```

Puis ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur. Le site se met à jour automatiquement à chaque modification de code.

## 3. Ouvrir le portail de démonstration

- Depuis la page d'accueil, cliquez sur **« Créer mon espace »** (ou **« Se connecter »**) dans le menu.
- Suivez les étapes du formulaire — aucun compte réel n'est créé, c'est indiqué à l'écran.
- Vous arrivez sur `/demo/espace`, le tableau de bord du portail.

### Changer de profil dans le portail

En haut de la barre latérale (ou dans le menu mobile), un sélecteur **Salon / Structure / Barber / Débutant** permet de voir instantanément à quoi ressemble le portail pour chacun des quatre profils. C'est un outil de démonstration : il sera retiré (ou remplacé par la vraie session utilisateur) une fois le projet connecté à une vraie base de données.

## 4. Lancer les vérifications automatiques

```bash
npm run typecheck   # vérifie les types TypeScript
npm run lint         # vérifie le style et les erreurs de code
npm test             # exécute les tests automatiques
npm run build        # construit la version de production
```

Ces quatre commandes doivent toutes se terminer sans erreur avant de considérer une modification comme terminée.

## 5. Construire et lancer la version de production

```bash
npm run build
npm run start
```

Le site tourne alors comme il tournerait une fois mis en ligne.

## Documentation complémentaire

- [`docs/FRONTEND_ARCHITECTURE.md`](docs/FRONTEND_ARCHITECTURE.md) — organisation du code, pages, composants.
- [`docs/BACKEND_HANDOFF.md`](docs/BACKEND_HANDOFF.md) — ce qu'il faudra brancher à Supabase (ou un autre backend) pour rendre le portail réel.
- [`CLAUDE.md`](CLAUDE.md) — notes pour un futur assistant IA travaillant sur ce dépôt.
- [`legacy/`](legacy/) — anciennes versions HTML du site, conservées pour référence (non utilisées par l'application).

## Ce que ce projet n'est pas (à ce stade)

- Il n'y a **aucune base de données** ni backend réel : toutes les données du portail viennent de fixtures de démonstration (`src/lib/data/`).
- Les parcours « Créer mon espace » et « Se connecter » sont des **démonstrations** : aucun mot de passe n'est jamais stocké.
- Rien n'est envoyé à un serveur Pléthore Réseaux, à l'exception du formulaire de contact qui ouvre votre client mail.
