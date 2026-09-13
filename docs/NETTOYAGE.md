# Inventaire de nettoyage — Pléthore Réseaux

Inventaire réalisé le 2026-09-13 (après le commit `7c79c66`, étape 7). **Exécution le 2026-09-14 (étape 9)** : les lignes validées OUI ont été déplacées dans `_quarantaine/` (commandes de retour dans `_quarantaine/RESTAURER.md`), les 8 exports morts supprimés, `motion` désinstallé, les caches régénérables (`.next/`, `tsconfig.tsbuildinfo`, `.DS_Store`, `._*`) supprimés. Aucune ligne n'a dû être restaurée. `version-partage-old/.nojekyll` (NON) est resté en place. La suppression définitive de `_quarantaine/` appartient au propriétaire.

**Référence** : le site utile est celui lancé par `version-partage/démarrer-le-site.command` (`npx serve . -l 8899` sur `version-partage/`, export statique Next.js régénéré depuis `src/`). Est nécessaire tout ce qui sert à le lancer, le builder (`npm run build`), le vérifier (`typecheck`, `lint`, `test`, captures) et le déployer.

**Exclusions absolues (jamais candidats)** : `.git/`, `node_modules/`, `CLAUDE.md`, `README.md`, `docs/`, `package.json`, `package-lock.json`, `version-partage/` et son `démarrer-le-site.command` / `LISEZ-MOI.txt`, `.env*`, `.gitignore`, `captures-controle/`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `AGENTS.md` (importé par `CLAUDE.md` via `@AGENTS.md`), `.claude/settings.local.json` (config de l'assistant, ignoré par git).

## Méthode

1. **Point d'entrée.** Commande de lancement : `npx --yes serve . -l 8899` dans `version-partage/` → fichier servi `version-partage/index.html` (+ une page `index.html` par route). Ce dossier est un export Next.js (`output: "export"`, `trailingSlash: true`, ajoutés temporairement à `next.config.ts`). Le bundler est Next.js 16 / Turbopack : il découvre lui-même les points d'entrée dans `src/app/**` (`layout.tsx`, `page.tsx`, `robots.ts`, `sitemap.ts`, `globals.css`, `favicon.ico`) — 33 points d'entrée.
2. **Graphe d'usage.** Script Node maison (`graph.cjs`, exécuté hors dépôt) : à partir des 33 entrées, suit récursivement `import … from`, `export … from`, `import "…"`, `require()`, `@import` CSS et `url()` CSS, en résolvant l'alias `@/` → `src/` et les chemins relatifs. Résultat : **102 fichiers atteints sur 105 dans `src/`** ; les 3 non atteints sont les fichiers `*.test.*` (utilisés par `npm test`). **Aucune résolution en échec** (pas d'import cassé). Recoupement avec `npx --yes knip@5` et `npx --yes depcheck` (exécutés via le cache npx, `package.json`/lockfile inchangés — vérifié par `git status`).
3. **Assets / CSS.** `public/` est vide (0 fichier), aucun `<img>`, `next/image` ni `url()` dans le code ; la police Manrope vient de `next/font/google` ; le seul CSS est `src/app/globals.css`, importé par `src/app/layout.tsx`.
4. **Autres versions.** Recensées par `find` + `du -sh` + `stat`, comparées par `cmp`/`diff -rq`, build IDs lus dans `_next/static/`.
5. **Dépendances.** `grep -rlE "from ['\"]<paquet>(/|['\"])" src` pour chaque entrée de `package.json`, plus lecture des configs (`postcss.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `eslint.config.mjs`, `tsconfig.json`).
6. **Git.** `git ls-files` hors `src/` et `docs/`, filtré sur les motifs générés (`.DS_Store`, `.tsbuildinfo`, `next-env`, `._*`, `out/`, `.next/`, `version-partage*`, `captures`).

**Version servie = la plus récente : OUI.** `version-partage/_next/static/` = build `rpLFi49TNh1qHj5j1Mx1_` = `out/` = `.next/BUILD_ID`, généré le 2026-09-13 23:43 après le dernier commit source (`7c79c66`, 23:55 — commit des mêmes fichiers) ; `find src -newer version-partage/index.html` → 0 fichier. Aucune autre version n'est plus récente : `version-partage-old/` date du 18 août (build `caBtzy_W9yR_1XU6A8g2x`, antérieur), les HTML historiques de décembre 2025 à juillet 2026.

Tailles : mesurées par `du -sh` (espace occupé sur le disque exFAT, unité d'allocation 128 Ko — un fichier de 4 Ko occupe 128 Ko).

## 1. Versions du site non servies

| chemin | taille | preuve (commande + résultat résumé) | risque | recommandation | VALIDATION |
|---|---|---|---|---|---|
| `version-partage-old/` (`.nojekyll`, `LISEZ-MOI.txt`, `démarrer-le-site.command`, `out-fixed/`) | 41 Mo — 2026-08-18 | Ancienne tentative d'export avec réécriture des chemins, build `caBtzy_W9yR_1XU6A8g2x`, décrite comme cassée (hydratation) dans `version-partage/LISEZ-MOI.txt`. Non suivi par git (`/version-partage-old/` ignoré). Seule source des 2 495 problèmes de `npm run lint` (`eslint.config.mjs` ne l'ignore pas). | SÛR | Supprimer le dossier (le lint global redeviendra vert sans toucher à `eslint.config.mjs`). | OUI (sauf `.nojekyll`, laissé en place) |
| `out/` | 41 Mo — 2026-09-13 | `diff -rq out version-partage` → identique à `version-partage/` sauf les 2 fichiers conservés. Résultat intermédiaire de `next build` en mode export, recréé à chaque régénération. Ignoré par git (`/out/`). | SÛR | Supprimer (recréé automatiquement à la prochaine régénération). | OUI (étape 0 : aucun script ni lanceur ne lit out/) |
| `legacy/other-versions/` (`barber.html`, `index-7.html`, `index.html`, `plethore-reseaux-complet-4.html`, `.zip`) | 36 Mo — 2025-12 à 2026-07 | Anciens HTML monolithiques d'avant la migration Next.js. Ignoré par git (`/legacy/other-versions/`). `grep -rn "legacy" src` → 0 référence. README : « conservées pour référence, non utilisées par l'application ». | SÛR | Archiver hors dépôt (un zip sur le T7 Shield) puis supprimer. | OUI |
| `legacy/index-8.html` | 128 Ko — 2026-07-20 | Seul HTML historique **suivi par git** (blob `2041a494`). Source d'origine des textes de `site-content.ts` (FRONTEND_ARCHITECTURE.md), désormais tous réécrits (étapes 2-3). `grep -rn "index-8" src` → 0. | SÛR | `git rm legacy/index-8.html` (reste consultable dans l'historique git). | OUI |
| `index-8.html` (racine) | 128 Ko — 2026-07-05 | **Suivi par git**, même blob que `legacy/index-8.html` (`cmp` identique). Doublon pur. | SÛR | `git rm index-8.html`. | OUI |
| `barber.html` (racine) | 128 Ko | Non suivi ; `cmp` identique à `legacy/other-versions/barber.html`. | SÛR | Supprimer. | OUI |
| `index-7.html` (racine) | 128 Ko | Non suivi ; `cmp` identique à `legacy/other-versions/index-7.html`. | SÛR | Supprimer. | OUI |
| `plethore-reseaux-complet-4.html` (racine) | 20 Mo | Non suivi ; `cmp` identique à `legacy/other-versions/…`. | SÛR | Supprimer. | OUI |
| `plethore-reseaux-complet-4.html.zip` (racine) | 15 Mo | Non suivi ; `cmp` identique à `legacy/other-versions/….zip`. | SÛR | Supprimer. | OUI |

## 2. Sources non importées (hors graphe)

| chemin | taille | preuve | risque | recommandation | VALIDATION |
|---|---|---|---|---|---|
| — (aucun fichier source hors graphe) | — | `graph.cjs` : 102/105 fichiers atteints ; les 3 restants sont `src/components/portal/ProfileSwitcher.test.tsx`, `src/lib/services/mockDiagnosticService.test.ts`, `src/lib/validations.test.ts` = tests exécutés par `npm test` (16 tests) → **à conserver**. | — | Rien à supprimer au niveau fichier. | |

**Code mort à l'intérieur de fichiers vivants** (exports jamais importés ailleurs — `grep -rw` + recoupé par knip « Unused exports ») :

| chemin | taille | preuve | risque | recommandation | VALIDATION |
|---|---|---|---|---|---|
| `src/lib/site-content.ts` : `SOLUTIONS_PANEL` (l. 18-39) | ~0,8 Ko | 1 seule occurrence dans `src/` (sa définition). Alimentait le menu « Solutions » retiré à l'étape 2. Contient encore « Atelier découverte / intensif » et les ancres `#decouverte` / `#intensif` orphelines. knip : unused export. | SÛR | Supprimer le bloc. | RESTAURÉ (build cassé) |
| `src/lib/site-content.ts` : `BRAND` (l. 1) | ~0,05 Ko | 1 occurrence (définition). knip : unused. | SÛR | Supprimer. | RESTAURÉ (build cassé) |
| `src/components/ui/Card.tsx` : `DarkCard` | ~0,4 Ko | 1 occurrence (définition). knip : unused. | SÛR | Supprimer la fonction. | RESTAURÉ (build cassé) |
| `src/components/ui/form.tsx` : `Select` | ~0,5 Ko | 1 occurrence (définition, l. 64). knip : unused. | SÛR | Supprimer la fonction (et l'import de type `SelectHTMLAttributes` qui ne servira plus). | RESTAURÉ (build cassé) |
| `src/lib/validations.ts` : `profileKindSchema` | ~0,1 Ko | 1 occurrence (définition, l. 41). knip : unused. | SÛR | Supprimer. | RESTAURÉ (build cassé) |
| `src/components/ui/Skeleton.tsx` : `export` de `Skeleton` | 0 | Utilisé uniquement dans son propre fichier par `SkeletonCard`. knip : unused export. | SÛR | Retirer le mot-clé `export` seulement (la fonction reste). | RESTAURÉ (build cassé) |
| `src/lib/data/demoProfiles.ts` : `export` de `DEMO_SALON_PROFILE`, `DEMO_STRUCTURE_PROFILE`, `DEMO_BARBER_PROFILE`, `DEMO_BEGINNER_PROFILE` | 0 | Utilisés dans le fichier par `DEMO_PROFILES`, jamais importés directement. knip : unused exports. | SÛR | Retirer les `export` seulement. | RESTAURÉ (build cassé) |
| `src/components/layout/NavPanel.tsx` : `export type NavPanelItem` ; `src/lib/services/mockAuthService.ts` : `export type SignUpInput` | 0 | Types utilisés dans leur fichier uniquement. knip : unused exported types. | SÛR | Retirer les `export` seulement. | RESTAURÉ (build cassé) |

## 3. Assets orphelins

| chemin | taille | preuve | risque | recommandation | VALIDATION |
|---|---|---|---|---|---|
| `public/` | 128 Ko (dossier vide, 0 fichier) | `find public -type f` → 0. Aucun `<img>`/`next/image`/`url()` dans `src/`. Next.js tolère l'absence du dossier. | SÛR | Supprimer le dossier (ou le laisser vide, sans effet). | OUI |
| `image website/` | 128 Ko (dossier vide, 0 fichier) | `find "image website" -type f` → 0 ; aucune référence (`grep -rn "image website"` → 0). Non suivi par git. | SÛR | Supprimer. | OUI |
| `src/app/favicon.ico` | — | **Utilisé** (convention Next.js, servi en `/favicon.ico`, présent dans l'export). | — | Conserver. | |

## 4. CSS non importé

| chemin | taille | preuve | risque | recommandation | VALIDATION |
|---|---|---|---|---|---|
| — (aucun) | — | Un seul fichier CSS dans le dépôt : `src/app/globals.css`, importé par `src/app/layout.tsx` (`import "./globals.css"`), qui importe lui-même `tailwindcss`. Aucun `*.css`, `*.scss`, `*.module.css` ailleurs. | — | Rien. | |

## 5. Dépendances npm

| chemin | taille | preuve | risque | recommandation | VALIDATION |
|---|---|---|---|---|---|
| `package.json` → `dependencies.motion` (`^12.42.2`) | 5,4 Mo (+ 57 Mo `framer-motion` entraîné) dans `node_modules/` | `grep -rlE "from ['\"]motion(/|['\"])" src` → 0 fichier ; absent des configs et scripts ; knip **et** depcheck : « Unused dependencies: motion ». | SÛR | `npm uninstall motion` (modifie `package.json` + lockfile — à faire par vous, règle CLAUDE.md). | OUI |
| `dependencies.react-dom` | — | 0 import direct dans `src/`, mais **requis par Next.js** (peer dependency, rendu client/serveur). | — | Conserver. | |
| `devDependencies.@tailwindcss/postcss`, `tailwindcss` | — | depcheck les signale, **à tort** : utilisés par `postcss.config.mjs` et `@import "tailwindcss"` dans `globals.css`. | — | Conserver. | |
| `devDependencies.@types/node`, `@types/react`, `@types/react-dom` | — | Pas d'import explicite (normal pour des types ambiants) ; nécessaires à `tsc --noEmit`. | — | Conserver. | |
| Toutes les autres entrées | — | Importées dans `src/` (`@hookform/resolvers` 5 fichiers, `clsx` 1, `lucide-react` 36, `next` 43, `react` 31, `react-hook-form` 5, `tailwind-merge` 1, `zod` 2) ou utilisées par une config (`@testing-library/*`, `@vitejs/plugin-react`, `jsdom`, `vitest`, `eslint`, `eslint-config-next`, `typescript`). | — | Conserver. | |

Note knip : « Unlisted dependencies: postcss (postcss.config.mjs) » — `postcss` est fourni par Next.js, pas un candidat.

## 6. Fichiers générés / temporaires

| chemin | taille | preuve | risque | recommandation | VALIDATION |
|---|---|---|---|---|---|
| `.next/` (dont `.next/dev/` 1,1 Go, `.next/server/` 127 Mo) | **1,2 Go** | Cache de build/dev Next.js, ignoré par git (`/.next/`). Régénéré par `npm run dev` / `npm run build`. Le serveur `npm run dev` en cours l'utilise. | SÛR | Supprimer **après avoir arrêté `npm run dev`** ; le prochain `build` le recrée (≈ 30 s). | OUI |
| `tsconfig.tsbuildinfo` | 256 Ko (182 Ko réels) | Cache incrémental TypeScript, ignoré (`*.tsbuildinfo`), recréé par `tsc`. | SÛR | Supprimer (facultatif). | OUI |
| `next-env.d.ts` | 128 Ko (251 o réels) | Généré par Next.js à chaque `dev`/`build`, ignoré (`next-env.d.ts`), **nécessaire à `typecheck`**. | — | Conserver (régénéré de toute façon). | |
| `.DS_Store` (racine) | 128 Ko (6 Ko réels) | Fichier Finder, ignoré (`.DS_Store`). | SÛR | Supprimer. | OUI |
| `._.DS_Store`, `._README.md`, `._barber.html`, `._index-7.html`, `._index-8.html`, `._plethore-reseaux-complet-4.html`, `._plethore-reseaux-complet-4.html.zip`, `legacy/._index-8.html`, `legacy/other-versions/._*` (5), `version-partage-old/._démarrer-le-site.command` | ≈ 15 fichiers × 4 Ko réels (128 Ko occupés chacun) | Fichiers AppleDouble créés par macOS sur le volume exFAT, ignorés (`._*`). Recréés par macOS à chaque écriture Finder. | SÛR | Supprimer (`dot_clean -m .` sur le dossier) ; ils reviendront tant que le projet est sur exFAT. | OUI |
| `captures-controle/` | — | Exclusion absolue (ignoré par git depuis l'étape 4). | — | Conserver. | |

**Suivi par git alors qu'il devrait être ignoré** : `git ls-files` filtré sur `.DS_Store`, `.tsbuildinfo`, `next-env`, `._*`, `out/`, `.next/`, `version-partage*`, `captures` → **aucun**. Le `.gitignore` couvre déjà tout ce qui est généré. Seuls `index-8.html` et `legacy/index-8.html` (HTML historiques, section 1) sont suivis sans être utiles.

**Lignes `.gitignore` proposées** (facultatives, pour verrouiller l'état après nettoyage) :
```
# HTML historiques d'avant la migration (si conservés hors dépôt, rien à ajouter)
/legacy/
# dossiers vides résiduels
/image website/
```
Aucune ligne n'est strictement nécessaire.

## 7. Configs et scripts orphelins

| chemin | taille | preuve | risque | recommandation | VALIDATION |
|---|---|---|---|---|---|
| Scripts `package.json` (`dev`, `build`, `start`, `lint`, `test`, `typecheck`) | — | Binaires `next`, `eslint`, `vitest`, `tsc` présents dans `node_modules/.bin/` ; aucun script ne pointe vers un fichier absent. | — | Rien. | |
| `eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `tsconfig.json`, `next.config.ts` | — | Tous utilisés (lint / build CSS / tests / typecheck / build). Exclusions absolues. | — | Conserver. | |
| `version-partage-old/.nojekyll` | 0 o | Marqueur GitHub Pages sans objet (le site n'est pas déployé sur Pages), dans un dossier déjà candidat (section 1). | SÛR | Part avec `version-partage-old/`. | NON |
| `.claude/settings.local.json` | 256 Ko | Config de l'assistant (permissions + MCP `playwright`), ignorée par git. Exclusion absolue. | — | Conserver. | |
| Playwright | — | Aucune config ni dépendance dans le projet (captures réalisées via le cache npx externe). Rien à nettoyer. | — | Rien. | |

## Récapitulatif chiffré

| Catégorie | Candidats | Espace récupérable |
|---|---|---|
| Versions du site non servies | 9 (dont 2 suivis par git) | ≈ 154 Mo (41 + 41 + 36 + 35 + 0,4) |
| Sources non importées (fichiers) | 0 | 0 |
| Code mort dans fichiers vivants | 8 entrées (5 suppressions, 3 dé-exports) | ≈ 2 Ko |
| Assets orphelins | 2 dossiers vides | ≈ 0,3 Mo |
| CSS non importé | 0 | 0 |
| Dépendances npm | 1 (`motion`) | ≈ 62 Mo dans `node_modules/` |
| Générés / temporaires | 4 groupes (`.next/`, `tsconfig.tsbuildinfo`, `.DS_Store`, `._*`) | ≈ 1,2 Go (dont 1,1 Go de cache dev) |
| Configs / scripts orphelins | 0 (hors `.nojekyll` déjà compté) | 0 |
| **Total** | **24 lignes** | **≈ 1,4 Go**, dont ≈ 216 Mo hors caches régénérables |

Ordre suggéré : (1) arrêter `npm run dev` et `serve` ; (2) supprimer `version-partage-old/`, `out/`, `.next/`, dossiers vides, `.DS_Store`, `._*` ; (3) archiver puis supprimer `legacy/other-versions/` et les 4 HTML doublons racine ; (4) `git rm index-8.html legacy/index-8.html` ; (5) `npm uninstall motion` ; (6) code mort (section 2) ; (7) `npm run typecheck && npm run lint && npm test && npm run build`, régénérer `version-partage/`, vérifier 8899.
