# SmartMobility Terrain 5.1.0 — compilation 16

Installer par-dessus la 4.1.0 avec le même certificat, sans désinstaller. Android 8 minimum.

## Envoi direct de l’Excel dans Drive

Menu → Envoyer les relevés vers Drive. Excel du compte connecté en mémoire, pas de copie dans Téléchargements, accusé de réception vérifié. Base locale et photos conservées ; aucune purge automatique, aucune photo envoyée dans ce flux. Les exports manuels restent disponibles.

Le propriétaire doit d’abord déployer Code.gs dans son compte Google et configurer URL et clés individuelles dans Administration → Configurer l’envoi Drive. Aucun mot de passe Google à communiquer. Lire INSTALLATION_DRIVE.md ou Installation_Drive_et_purge_5.1.0.docx. Le service n’a pas été déployé ni testé contre votre Drive réel dans cette livraison.

## Anomalies exportées

Code anomalie et Libelle anomalie dans l’Excel/CSV exporté, l’envoi direct et les fichiers de relève des archives de sauvegarde. Un fichier de démonstration fictif est fourni pour vérifier les deux colonnes. Les sauvegardes restent restaurables.

## Purge complète

Menu releveur et Administration → Purger la base de données. Mot de passe du compte connecté + mot PURGER avant Tout effacer. Tous les comptes, relevés, photos, sauvegardes privées et réglages de l’application sont supprimés sur ce téléphone. L’application se ferme ; recréer l’administrateur à la prochaine ouverture. Les fichiers de Drive et les exports extérieurs à l’application ne sont pas supprimés. Vérifier les transferts avant purge.

## Vérifications

58 tests JVM, 11 tests du protocole, 13 tests du service avec Google simulé, 112 contrôles Android. Purge Android réelle testée sur émulateur uniquement, avec contrôle de la suppression de la base et des fichiers privés et conservation de l’APK. Écran de référence 360 × 640 / API 26. Pas de validation matérielle sur Samsung ni d’envoi réel Google avant configuration du propriétaire.
