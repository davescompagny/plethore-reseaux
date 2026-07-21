# Handoff backend (Supabase ou équivalent)

Ce document liste ce qu'il reste à brancher pour rendre le portail réel. Aucun backend n'est développé à ce stade — c'est volontaire.

## Services simulés à remplacer

Chaque fichier de `src/lib/services/` a la même forme async qu'un futur appel Supabase ; remplacer son contenu suffit, les composants ne changent pas.

| Fichier | Rôle actuel (mock) | Deviendra |
|---|---|---|
| `mockAuthService.ts` | Simule inscription/connexion/déconnexion, ne stocke jamais de mot de passe | Supabase Auth (email/password ou magic link) |
| `mockProfileService.ts` | Lit/écrit un profil en mémoire selon le profil de démonstration choisi | Table(s) profil liées à `auth.users` |
| `mockDiagnosticService.ts` | Calcule une recommandation à partir des réponses (logique pure testée) | Peut rester côté client, ou être dupliquée côté fonction serveur si la recommandation doit être fiable/auditable |
| `mockRequestService.ts` | Liste/crée des demandes d'accompagnement ou d'atelier | Table `requests` |
| `mockWorkshopService.ts` | Liste les ateliers et le prochain atelier à venir | Table `workshops` |
| `mockDocumentService.ts` | Liste des documents par profil | Table `documents` + stockage de fichiers (Supabase Storage) |
| `mockNotificationService.ts` | Liste des notifications par profil | Table `notifications` + éventuellement temps réel (Supabase Realtime) |

## Types de données déjà définis

Voir `src/lib/types.ts` : `ProfileKind`, `DemoUser`, `SalonProfile` / `StructureProfile` / `BarberProfile` / `BeginnerProfile`, `DiagnosticAnswers` / `DiagnosticResult`, `WorkshopRequest`, `Workshop`, `DemoDocument`, `DemoNotification`. Ces types peuvent servir de base directe aux tables SQL.

## Futures tables (pistes)

- `profiles` (ou une table par type de profil, ou une table commune + colonnes spécifiques en JSON)
- `diagnostics` (réponses + résultat, liés à un profil salon)
- `requests` (demandes d'accompagnement/atelier, statut, historique)
- `workshops` (ateliers, dates, places disponibles)
- `documents` (métadonnées + référence de stockage)
- `notifications` (par utilisateur, lu/non lu)

## Routes à protéger

Tout `/demo/espace/**` doit devenir un espace authentifié une fois Supabase branché (aujourd'hui non protégé, car aucune donnée réelle n'y transite). Le reste du site (`(marketing)`) reste public.

## Besoins d'authentification

- Un vrai flux inscription/connexion (email + mot de passe, ou magic link) pour remplacer `/inscription` et `/connexion`.
- Une vraie confirmation d'e-mail pour remplacer la page `/confirmation-email` (actuellement purement informative).
- Une vraie réinitialisation de mot de passe pour remplacer `/mot-de-passe-oublie`.
- Le sélecteur `ProfileSwitcher` (voir `docs/FRONTEND_ARCHITECTURE.md`) doit être retiré ou conditionné à un rôle admin/démo une fois la vraie session utilisateur en place.
