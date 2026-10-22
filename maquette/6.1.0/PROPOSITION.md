# SMB-Relève 6.1.0 — proposition récapitulative

Statut : spécification et maquette à valider ; aucun développement ni compilation 6.1.0 réalisés à ce stade.

## Options releveur

- Conserver les options existantes (menus, imports, exports, ancien index et modification des visites).
- Remplacer le réglage photo par trois modes exclusifs : désactivées pour tous ; selon anomalie et contrôle de consommation (actuel) ; obligatoires pour tous. Le mode désactivé neutralise prise et obligation ; les photos existantes ne sont pas supprimées.
- Ajouter Désactiver la collecte GPS. Si actif, aucune nouvelle localisation du releveur n'est demandée, y compris sur la carte ; les coordonnées enregistrées restent conservées.
- Ajouter Commentaire obligatoire si consommation < 0, activé par défaut pour conserver la règle actuelle. Décoché : commentaire facultatif, autres contrôles inchangés.
- L'option Afficher les indicateurs GPS est annulée et ne sera pas ajoutée. Aucun seuil de fraîcheur/précision issu de cette proposition n'est retenu comme règle de blocage.

## Nouveau numéro compteur

- Accès manuel par crayon à côté du numéro ; même formulaire au choix de l'anomalie de code 35.
- Afficher le numéro d'origine ; saisir et confirmer le nouveau numéro.
- Sauvegarder seulement à la validation de la relève ; conserver le numéro d'origine.
- Exporter le nouveau numéro dans le fichier métier et l'archive administrateur.
- Respecter les restrictions de modification des visites déjà enregistrées.

## Carte

- Ouvrir depuis l'icône GPS près du compteur.
- Afficher la position enregistrée du compteur si disponible et la position actuelle du releveur si collecte active, autorisation accordée et position disponible.
- Afficher la distance à vol d'oiseau uniquement lorsque les deux positions sont disponibles. Ce n'est ni un trajet routier ni une distance réellement parcourue.
- Toucher le point compteur propose Ouvrir la saisie, dans les droits du compte.
- Ne pas substituer 0,0 à une position manquante ; expliquer l'indisponibilité. Aucune piste de déplacement du releveur n'est conservée.
- Fond cartographique envisagé : OpenStreetMap, accès réseau et attribution selon les conditions du fournisseur retenu ; aucune carte hors connexion promise.

## Déchargement et administration

- Avant envoi : bilan des visites datées et photos réellement à envoyer.
- Après envoi : bilan des confirmations et échecs. Attendre la confirmation complète du XLSX et des photos attendues du lot avant son masquage. Envoi partiel ou non confirmé : conserver le lot accessible pour reprise.
- Les visites non datées ne sont pas incluses dans le déchargement habituel.
- Masquer les compteurs déchargés au releveur dans recherche, listes, saisie et carte, même si modification des relevés autorisée.
- Garder leurs données jusqu'à purge ; les archives privées conservent leurs règles d'accès administrateur.
- L'administrateur peut afficher les déchargés, choisir un releveur et exporter toutes ses données de travail encore présentes : visitées, non visitées et déchargées. Cet export complet est distinct de l'archive historique.

## Périmètre distinct

- Le ratissage n'est pas inclus dans ces modifications.
- Le problème Photo non valide sur Oppo Reno 7 reste un incident à diagnostiquer ; aucune correction n'est déclarée par la maquette.
- Essais sur téléphones réels à prévoir pour carte, GPS, caméra, reprise d'envoi, gros volumes et migration de données.
