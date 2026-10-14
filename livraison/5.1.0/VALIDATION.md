# Validation 5.1.0 — compilation 16

58 contrôles JVM, 11 contrôles du protocole de transfert, 13 tests du service Apps Script avec services Google simulés, 112 contrôles Android réussis. Compilation AAPT2 / Java 17 / D8, alignement et signatures v2/v3 vérifiés. Même package et même certificat que la 4.1.0 : mise à jour sans désinstallation.

Android testé sur émulateur API 26 : export réel Excel avec Code anomalie et Libelle anomalie, CSV et Excel des archives de sauvegarde, restauration compatible, chiffrement/déchiffrement Android Keystore, refus de compte non configuré, présence des menus, purge refusée sans mot de passe et mot PURGER, annulation sans perte, formulaires et régressions historiques.

Purge réelle effectuée uniquement sur l’émulateur de recette : scénario utilisateur avec mot de passe et PURGER, fermeture du processus par Android attendue ; le contrôleur externe a vérifié la suppression de la base, des marqueurs photos/sauvegardes/préférences et la conservation de l’APK. Le résultat d’instrumentation interrompu dans purge-test-results.txt est attendu pour cette action, et n’est pas présenté comme un succès de la suite normale.

Le service local simulé vérifie signatures, date périmée, clé inconnue, empreintes, taille, contenu non ZIP, requête invalide, déduplication et accusés. Le protocole Java vérifie un vecteur HMAC standard et la restriction du point d’entrée HTTPS Google. L’envoi réel vers Google Drive n’a pas été exécuté : déploiement et autorisations à effectuer par le propriétaire du compte. Un test réel de réception reste nécessaire avant des données personnelles.

Envoi direct : Excel uniquement, maximum 6 Mio, aucun fichier XLSX écrit sur le téléphone par ce flux, base et photos locales conservées. Configuration administrateur, clé individuelle chiffrée. Le service ne supprime pas les fichiers existants de Drive ; les exports identiques sont dédupliqués, les données modifiées donnent un nouvel export. La purge est indépendante, totale pour les données de l’application et tous les comptes ; elle n’efface pas Drive ni les fichiers exportés hors de l’application.

Limites : pas de test matériel sur Samsung S10e / Android 12, caméra/GPS/Drive réels ou Android 15 ; référence de mise en page 360 × 640. Signature de développement. Clé de signature et données privées de diagnostic exclues. Les documents 4.1.0 précédents restent des documents historiques ; lire INSTALLATION_DRIVE.md pour la 5.1.0.
