# Mise à jour Drive 5.1.1 — procédure courte

La 5.1.1 décharge uniquement les contrats ayant une date de relève. Elle envoie un Excel (code et libellé d’anomalie compris) puis les photos de ces contrats dans des ZIP. Les contrats non visités et leurs photos sont exclus. L’envoi est réalisé en mémoire, sans copie dans Téléchargements ; les données de l’application restent présentes après déchargement.

## Vous avez déjà configuré la 5.1.0

1. Dans votre projet Google Apps Script existant, ouvrir Code.gs.
2. Remplacer son contenu par le nouveau Code.gs fourni avec la 5.1.1, puis enregistrer. Aucun mot de passe Google à communiquer.
3. Conserver les propriétés FOLDER_ID et TOKEN_<identifiant> déjà configurées. La clé reste privée.
4. Déployer → Gérer les déploiements → sélectionner le déploiement existant → Modifier (crayon) → Version : Nouvelle version → Déployer. Conserver « Exécuter en tant que Moi » et « Tout le monde ». Cette opération conserve la même URL /exec.
5. Ouvrir l’URL /exec dans un navigateur : la réponse doit indiquer version 5.1.1, protocol 2 et formats xlsx/zip. Si elle indique 5.1.0, le déploiement n’a pas encore été mis à jour.
6. Installer l’APK 5.1.1 par-dessus la 5.1.0 sans désinstaller. Vos comptes et la configuration Drive sont conservés.
7. Avec des données de test, Menu → Décharger les relevés. Vérifier l’Excel ET les ZIP dans le dossier Drive avant de purger quoi que ce soit.

Si l’ancienne version du service est encore active, la 5.1.1 le signale avant d’envoyer un ZIP. Pas besoin de changer les clés ni de créer un nouveau dossier. Une clé laissée vide lors de l’édition de la configuration conserve la clé existante pour ce compte ; un compte jamais configuré exige toujours une clé.

## Menus et saisie

- Charger mes données : ancien menu Ma tournée / Synchroniser.
- Décharger les relevés : ancien envoi vers Drive. Seuls les contrats visités, date renseignée, sont envoyés. Une visite avec anomalie sans index reste une visite.
- L’anomalie doit être choisie avant la photo et la validation, même après confirmation d’un index anormal. Fournir dans le catalogue un code approprié aux relèves normales si nécessaire ; aucun code fictif « normal » n’est ajouté automatiquement.
- Pour un nouveau téléphone ou un numéro modifié : deux saisies consécutives identiques. Si la ressaisie est différente, elle devient la référence suivante ; une troisième saisie identique à la seconde confirme. Le téléphone d’origine inchangé n’exige pas de ressaisie.
- Administrateur → Options des releveurs : activer/désactiver Mes sauvegardes et Exporter Excel / CSV / photos pour tous les releveurs de ce téléphone. L’administrateur conserve ces accès. Le déchargement direct reste disponible.
- Photo obligatoire pour tous les compteurs : activée, la photo est requise à chaque validation indépendamment du cas de consommation ou de l’anomalie. Désactivée, règles habituelles de photo. Les contrôles d’index et l’obligation de choisir une anomalie restent actifs.

## Purge et suppression de compte

Purger la base de données conserve TOUS les comptes, mots de passe, catalogues, options et configuration Drive. Le releveur purge seulement ses données ; l’administrateur purge les tournées de tous les comptes du téléphone. Les compteurs chargés, visités ou non, et leurs photos/sources/sauvegardes associées sont supprimés. Une photo encore référencée par un autre releveur est conservée lors d’une purge individuelle. Les fichiers Drive et exports externes restent présents.

La purge demande le mot de passe du compte connecté et le mot PURGER. Les changements en base sont transactionnels. Si un fichier n’a pas pu être supprimé, un avertissement le signale.

Administrateur → Supprimer le releveur : choisir un compte RELEVEUR, confirmer avec le mot de passe administrateur et SUPPRIMER. Le compte et ses données associées sont supprimés ; les autres comptes sont conservés. La suppression d’un administrateur est refusée. La clé locale du releveur est supprimée ; révoquer aussi sa propriété TOKEN_ dans Apps Script pour désactiver les autres téléphones utilisant cette clé.

## Gros volumes et interruptions

L’Excel est limité à 6 Mio. Les photos sont réparties automatiquement en lots ZIP inférieurs à 6 Mio (budget de 5 Mio de photos par lot). Une photo individuelle de plus de 5 Mio doit être reprise avant l’envoi. Les photos produites par l’application sont redimensionnées selon les règles existantes.

Le succès n’est annoncé qu’après confirmation de l’Excel et de tous les ZIP. En cas d’interruption, le message indique combien de fichiers ont été confirmés. Réessayer avec les mêmes données retrouve les fichiers identiques et ne les duplique pas. Aucune purge automatique.

## Erreurs Drive désormais identifiées

- CLOCK : date/heure du téléphone décalée de plus de dix minutes.
- TOKEN_MISSING : propriété TOKEN_<identifiant> absente ou clé trop courte.
- SIGNATURE : clé ou identifiant différent entre le téléphone et Apps Script.
- FOLDER : FOLDER_ID incorrect, dossier inaccessible ou accès Drive non autorisé.
- WRITE : écriture Drive, verrou, espace ou quota indisponible ; consulter le compte propriétaire.
- DIGEST / ID / FORMAT / CONTENT : fichier ou protocole invalide.

Aucune clé ni donnée de relève n’est inscrite dans les messages de diagnostic. Le point d’entrée Web reste soumis aux quotas Google. Le dossier doit rester privé.

## Première configuration

Créer le dossier privé Drive et le projet Apps Script. Copier Code.gs. Dans les propriétés du script, ajouter FOLDER_ID (identifiant du dossier, sans URL ni ?paramètres) et TOKEN_<identifiant> (clé aléatoire de 32 à 256 caractères). Déployer comme application Web, en tant que propriétaire, accès Tout le monde. Autoriser les accès Drive de votre propre projet. Configurer URL /exec, identifiant exact et valeur de la clé dans Administration → Configurer l’envoi Drive. Ne pas utiliser un mot de passe Google ou celui du releveur comme clé.

Les tests livrés avec le projet simulent Google ; ils ne valident pas votre dossier réel. Il faut contrôler une réception réelle avant utilisation terrain et avant toute purge.
