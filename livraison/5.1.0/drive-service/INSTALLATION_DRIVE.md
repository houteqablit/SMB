# Envoi direct Drive — SmartMobility Terrain 5.1.0

Cette configuration appartient au propriétaire du Drive. Ne communiquer aucun mot de passe Google. Le service déposé ici est prêt à déployer ; il n’est pas encore connecté à votre compte. Les tests locaux simulent Google et ne prouvent pas un transfert dans votre Drive réel.

## 1. Préparer le dossier privé

Dans Google Drive, créer un dossier « SmartMobility / Relevés reçus ». Garder son accès limité. Copier l’identifiant du dossier dans son URL : `https://drive.google.com/drive/folders/IDENTIFIANT_DOSSIER`.

## 2. Créer le service

1. Ouvrir https://script.google.com avec le compte propriétaire du dossier.
2. Créer un nouveau projet « SmartMobility 5.1.0 ».
3. Remplacer le contenu de Code.gs par le fichier Code.gs livré ; enregistrer.
4. Paramètres du projet → Propriétés du script → ajouter :
   - `FOLDER_ID` : identifiant du dossier privé.
   - `TOKEN_identifiant` : une clé de transfert aléatoire propre à chaque compte. Exemple de nom : `TOKEN_releveur01`. La valeur doit contenir au moins 32 caractères aléatoires ; ne pas utiliser le mot de passe Google ni celui du releveur. Utiliser un générateur de mots de passe fiable.
5. Ne placer aucune clé dans le code public, un lien de téléchargement ou une capture. Ne pas envoyer les clés dans la conversation.

Le nom du compte est sensible à la casse et doit correspondre exactement à celui de l’application. Pour révoquer un compte, supprimer sa propriété TOKEN_. Pour changer sa clé, remplacer la propriété et reconfigurer le téléphone.

## 3. Déployer

1. Déployer → Nouveau déploiement → Application Web.
2. Exécuter en tant que : Moi (propriétaire du Drive).
3. Accès : Tout le monde, pour permettre l’appel du téléphone sans connexion Google. Le service reste protégé par les signatures de transfert propres aux comptes ; le dossier Drive reste privé. Un compte Workspace peut interdire ce mode : consulter alors son administrateur.
4. Autoriser les accès Drive demandés pour votre propre projet. Vérifier le code avant de l’autoriser ; ne pas contourner une interdiction de votre organisation.
5. Copier l’URL HTTPS se terminant par `/exec`, et non `/dev`.
6. Ouvrir le lien `/exec` dans le navigateur : un message JSON doit afficher SmartMobilityTerrain et 5.1.0. Cette page confirme uniquement que le service répond, pas qu’un fichier a été reçu.
7. Après une modification du code, mettre à jour le déploiement avec une nouvelle version.

Le point d’entrée Web est public et soumis aux quotas Apps Script : les signatures bloquent les écritures non autorisées, sans supprimer le risque de consommation des quotas par des requêtes abusives. Cette solution convient à un usage maîtrisé ; elle ne promet pas une disponibilité illimitée. Les quotas Google peuvent évoluer.

## 4. Configurer l’APK (administrateur)

1. Installer l’APK 5.1.0 par-dessus la 4.1.0, sans désinstaller.
2. Ouvrir Administration → Configurer l’envoi Drive.
3. Coller l’URL `/exec`.
4. Saisir l’identifiant du compte releveur local à autoriser.
5. Saisir sa clé de transfert, identique à la propriété `TOKEN_identifiant`.
6. Enregistrer. Répéter pour les autres comptes du téléphone. Le même point d’entrée est commun aux comptes ; la clé est individuelle.

La clé est stockée chiffrée avec Android Keystore. Elle n’est pas affichée à nouveau et n’est pas exportée dans les sauvegardes. Reconfigurer après purge, restauration sur un autre téléphone ou réinstallation. Le releveur ne peut pas ouvrir cette configuration sans authentification administrateur.

## 5. Envoyer et contrôler

1. Se connecter comme releveur ; enregistrer les saisies en cours.
2. Menu → Envoyer les relevés vers Drive → Envoyer.
3. Attendre le message « Excel reçu dans Drive ». Le fichier contient les compteurs du compte connecté, toutes campagnes, avec les 42 champs et la colonne supplémentaire « Libelle anomalie » ; « Code anomalie » est conservé.
4. Vérifier le premier envoi dans le dossier Drive et ouvrir l’Excel. Comparer compteurs, codes et libellés des anomalies.
5. Le nom `Releves_<identifiant de transfert>.xlsx` est volontairement unique et stable. Le compte est inscrit dans la description Drive. Un nouvel essai du même fichier retrouve le fichier au lieu de le dupliquer ; des données modifiées produisent un nouvel export.

L’Excel est construit en mémoire et envoyé en HTTPS : aucune copie XLSX temporaire ou dans Téléchargements n’est créée par cet envoi direct. Les relevés et photos restent dans la base privée pour permettre le travail hors connexion. Les photos ne sont pas transmises par ce flux Excel. L’export manuel existant reste disponible et crée une copie uniquement à votre demande. L’APK n’empêche pas une personne disposant d’un accès privilégié au téléphone d’accéder aux données locales.

## 6. Échecs et limites

- Réseau absent, clé incorrecte, horloge décalée de plus de dix minutes, quotas dépassés, dossier inaccessible ou service non déployé : pas de confirmation de réception, données locales conservées.
- Si la réponse est perdue après création du fichier, réessayer avec les mêmes données : le transfert est dédupliqué.
- Taille maximale du fichier Excel : 6 Mio. Pas d’envoi des photos par ce service.
- Le message de succès nécessite un accusé contenant identifiant de fichier, empreinte et identifiant de transfert correspondant à l’envoi.
- Le service ne remplace pas les données de Drive déjà reçues et ne rend pas les fichiers publics ; conserver le dossier avec des droits limités.
- Un dossier partagé hérite de ses autorisations : contrôler ses membres avant usage avec des données réelles.

## 7. Purger le téléphone (indépendant de l’envoi)

Menu releveur ou Administration → Purger la base de données. Lire le périmètre, saisir le mot de passe du compte connecté et `PURGER`, puis Tout effacer.

Cette action utilise la remise à zéro Android des données de l’application : TOUS les comptes et données de cette application sur le téléphone sont supprimés (tournées, relevés, photos, sources, sauvegardes locales, cache et configurations). L’application se ferme ; à la prochaine ouverture, recréer l’administrateur. Les fichiers exportés vers un dossier externe et les fichiers Drive ne sont pas effacés. Ce n’est pas une garantie d’effacement physique des cellules de stockage. Annuler ou un mot de passe incorrect n’efface rien. Le bouton n’est pas une purge limitée au releveur connecté.

## Recette avant les premières données réelles

Utiliser une tournée fictive. Tester l’envoi et sa réception, le nouvel essai sans doublon, les anomalies code/libellé, une clé incorrecte, le réseau coupé et la conservation des données. Puis tester la purge sur ce téléphone de recette seulement après export confirmé. Ne purger une tournée réelle qu’après contrôle de sa réception et de ses sauvegardes nécessaires.
