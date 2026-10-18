# SMB-Relève 5.1.2 — mise à jour

Installez l’APK sur la version précédente sans désinstaller. Même package et certificat que 5.1.1. Sauvegardez vos relevés avant toute mise à jour. Ne purgez pas la base pour libérer de la mémoire.

## Options des releveurs

Administrateur → Options des releveurs. Les cases s’appliquent à tous les releveurs de ce téléphone. L’administrateur conserve ses accès.

- Menu principal : afficher Tableau de bord, Mes sauvegardes, Exporter Excel / CSV / photos.
- Charger mes données : afficher Importer depuis le téléphone, Importer les trois CSV ensemble.
- Confirmation du chargement : afficher Sauvegarder / Exporter et Envoyer les relèves.
- Autres : photo obligatoire pour tous les compteurs ; afficher l’ancien index ; autoriser la modification des compteurs déjà relevés.

Une relève est déjà effectuée lorsque sa date de relève est renseignée. Si la modification est interdite, le releveur peut consulter la fiche mais ne peut pas modifier les champs ni enregistrer une nouvelle photo. Un compteur non visité reste modifiable. L’administrateur peut toujours corriger une relève.

Par défaut les accès et la modification restent autorisés ; la photo globale reste désactivée. Les anciens réglages de sauvegarde, export et photo sont conservés. La désactivation de la photo globale conserve les obligations liées aux contrôles habituels et aux anomalies.

## Affichage et grands fichiers

En haut : SMB-Relève (5.1.2), puis Releveur Nom ou Administrateur Nom. Le formulaire conserve l’UR et la tournée.

La liste affiche 50 compteurs par page avec Précédent / Suivant. Les filtres et les totaux concernent toute la tournée, pas uniquement la page visible. La recherche de compteur présente au maximum 100 résultats et invite à préciser la recherche. La navigation de la tournée conserve tous les identifiants et l’ordre de relève numérique.

Les listes sont lues en arrière-plan et les statistiques calculées par SQLite, sans charger tous les champs des 25 000 compteurs. Les exports Drive sélectionnent directement les visites. Android déclenche automatiquement une libération des caches SQLite lorsqu’il demande de la mémoire ou que l’application devient invisible. Aucun effacement de relevé, photo, compte ou clé ; aucun arrêt forcé ni appel périodique à System.gc(). Ce mécanisme ne vide pas la RAM des autres applications.

## Fichiers déchargés et script Drive

Excel : Releveur_Nom_Releveur_ddmmyyyy_hhmmss_SSS.xlsx. SSS correspond aux millisecondes ; heure du Maroc (Africa/Casablanca). Les espaces deviennent des soulignés et les accents sont simplifiés. Pour un administrateur, le préfixe est Administrateur. Les ZIP associés utilisent le même préfixe et la même date, suivis de _Photos_001.zip, etc.

Le nom correspond au compte connecté qui décharge. Seuls ses contrats visités sont envoyés. Les données restent dans l’application ; aucune copie n’est créée dans Téléchargements par le déchargement Drive. Le stockage applicatif local reste nécessaire pour travailler hors connexion.

1. Ouvrir votre projet Apps Script existant.
2. Remplacer Code.gs par celui livré dans Service_Drive_SmartMobility_5.1.2.zip.
3. Conserver les propriétés FOLDER_ID et TOKEN_identifiant, sans transmettre ces clés.
4. Déployer → Gérer les déploiements → crayon → Nouvelle version → Déployer. Conserver l’application Web, l’exécution en tant que propriétaire et l’URL /exec existante.
5. Dans l’APK, conserver la configuration Drive existante. Un champ de clé vide lors de l’édition conserve la clé déjà enregistrée.
6. Tester une visite et vérifier l’Excel et les ZIP dans votre dossier Drive.

Le protocole 3 signe également le nom du fichier. Le serveur reste compatible avec les anciens protocoles 1 et 2. Un index limité de transferts et une description technique permettent de retrouver les fichiers identiques lors d’une nouvelle tentative, malgré une nouvelle heure proposée ; le premier nom reste alors conservé. Ne supprimez pas la description technique des fichiers. La recherche Drive peut avoir un délai d’indexation pour d’anciens transferts sortis du cache de 1 000 entrées. En cas d’erreur, les données locales sont conservées.

Le service réel de votre compte Google reste à tester après redéploiement. Les tests automatiques du service utilisent des services Google simulés.
