# SMB-Relève 5.1.3 — compilation 19

Installer par-dessus 5.1.2 sans désinstaller. Le package et le certificat restent identiques. La base est migrée sans supprimer les tournées, comptes, clés Drive ou anciens réglages. Les sauvegardes à 42 champs des anciennes versions sont restaurables ; les nouvelles sauvegardes contiennent 44 champs internes.

## Formulaire

- L’ordre de relève est affiché à côté de l’identifiant.
- Le nombre de jours est déplacé vers la droite. Ses couleurs et sa police 40 gras sont conservées.
- Les boutons photo et consultation de photo ont le même fond vert, avec des pictogrammes blancs centrés.
- Cliquer sur la ligne UR / Tournée permet de saisir une nouvelle unité de relève en majuscules. Confirmer ferme la fenêtre ; la nouvelle UR est réellement enregistrée lors de la validation de la relève. Annuler ne change rien. L’UR d’origine reste conservée pour le filtrage et l’historique.
- Les restrictions sur la modification des visites déjà enregistrées restent applicables à l’UR.
- Le fichier XLSX déchargé vers Drive comprend Nouvelle unite de releve et Libelle du nouveau type local. Le code du nouveau type local reste dans Nouveau type local. Il n’y a pas de nouveaux champs de saisie de ces libellés dans le formulaire.

## Reprise

Après une reconnexion explicite ou une sortie du formulaire par Retour, l’application ouvre le premier compteur dont la date de relève est vide, dans l’ordre numérique de relève. Une visite enregistrée avec anomalie sans index est considérée visitée : elle ne bloque pas la reprise. Les filtres UR, tournée et recherche du releveur sont conservés pour cette reprise ; le filtre Relevés / Non relevés est réinitialisé. Sans compteur restant, la liste s’affiche avec un message. La liste complète reste accessible depuis le menu.

Un changement de configuration Android peut encore restaurer une saisie en cours ; une déconnexion explicite efface cette reprise de brouillon et reprend le premier non lu. Les filtres sont mémorisés séparément par compte. La campagne est celle du compte connecté.

## Archive privée des releveurs

Chaque validation avec date de relève est copiée dans un journal privé indépendant de la tournée, dans la même transaction SQLite que l’enregistrement. Les visites existantes sont reprises lors de la migration. Une nouvelle validation du même compteur ajoute une version au journal ; il s’agit donc d’un historique de validations, pas uniquement du dernier état de chaque contrat.

Un fichier TXT UTF-8 à séparateur point-virgule est conservé dans le stockage privé de l’application, sous reader_archives. Ce dossier n’est pas exposé par les fonctions de partage du releveur et n’apparaît pas dans Téléchargements. Le fichier est reconstruit à partir du journal au démarrage et avant envoi ; si l’écriture du miroir TXT échoue, le journal transactionnel conserve les données pour une nouvelle tentative. Le journal mémorise les libellés au moment de la validation, même si les catalogues changent ensuite.

Colonnes de cette archive :

- Réseau ; Tournée ; Contrat ; UR d’origine.
- Identifiant releveur et Nom releveur effectifs : compte ayant validé la relève, avec repli sur le compte affectataire pour les anciennes données.
- Nouvel index ; Libellé anomalie ; Date et heure de relève.
- GPS X (longitude) ; GPS Y (latitude).
- Nouveau téléphone ; Nouveau type local (code) ; Libellé du nouveau type local ; Nouvelle unité de relève.

Les champs Nouveau téléphone / type local / UR sont vides lorsqu’aucune modification n’a été enregistrée. Les libellés manquants pour des anciens codes absents du catalogue ne peuvent pas être reconstitués automatiquement. L’archive ne contient pas de photos. Elle ne remplace pas la sauvegarde de restauration de l’application ni le modèle d’import à trois feuilles.

Une mise à jour installée par-dessus conserve cette archive. Une désinstallation ou Effacer les données dans Android supprime aussi le journal et ses fichiers privés. Les copies déjà reçues dans Drive restent dans Drive.

## Actions administrateur

Envoyer l’archive d’un releveur : choisir le releveur puis confirmer Envoyer. L’application produit un XLSX privé et l’envoie avec le lien Apps Script et la clé déjà configurés pour ce releveur. Le fichier est nommé Archive_Releveur_Nom_ddmmyyyy_hhmmss_SSS.xlsx. L’archive et son journal local restent conservés après envoi. Un ancien releveur supprimé reste sélectionnable tant que son archive existe.

Supprimer l’archive d’un releveur : choisir le releveur, saisir le mot de passe administrateur et SUPPRIMER. Seuls son journal privé et ses fichiers TXT/XLSX d’archive sont supprimés. Sa tournée, son compte, sa configuration et les copies déjà reçues dans Drive restent conservés. De futures validations ou une restauration de sauvegarde peuvent créer une nouvelle archive ; les autres archives restent intactes.

Supprimer les données d’un releveur : choisir le releveur puis confirmer avec le mot de passe et SUPPRIMER. Sa tournée, ses photos non partagées, sources et sauvegardes de tournée associées sont supprimées. Son compte, son archive privée et sa configuration Drive sont conservés.

Supprimer le releveur : supprime le compte et ses données de tournée après confirmation. Son archive privée et sa clé Drive chiffrée sont conservées pour permettre l’envoi final par l’administrateur. Ne révoquer TOKEN_identifiant dans Apps Script qu’après les envois souhaités. Un compte administrateur ne peut pas être supprimé par cette action.

Le profil releveur ne peut ni envoyer ni supprimer les archives, y compris la sienne. Les contrôles d’accès sont vérifiés sur le rôle enregistré dans la base.

## Drive

Le protocole signé reste le protocole 3 de 5.1.2 : si votre service est déjà en protocole 3, aucun redéploiement n’est nécessaire pour ces nouvelles colonnes et l’archive. Pour un ancien service, remplacer Code.gs par le fichier livré et mettre à jour le déploiement existant, sans changer FOLDER_ID ni TOKEN_identifiant. Conserver l’URL /exec existante.

Maximum 6 Mio par fichier XLSX, comme pour les déchargements précédents. Un échec ne supprime pas l’archive locale. Les archives sont envoyées sans photos et sans copie dans Téléchargements. Les déchargements habituels du releveur conservent leurs ZIP de photos et ne sont pas remplacés par cette fonction administrateur.

La réception réelle sur le compte Google du propriétaire reste à vérifier. Les tests du service sont exécutés avec Google simulé.
