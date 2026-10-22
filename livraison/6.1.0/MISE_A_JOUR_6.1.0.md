# SMB-Relève 6.1.0 — compilation 21

## Installation et conservation

Installer par-dessus la 5.1.4 sans désinstaller, avec le même package et certificat. La base passe du schéma 5 au schéma 6, en ajoutant nouveau_numero_compteur et decharge_drive ; les anciens champs ne sont pas supprimés. Le journal privé des archives passe à 16 colonnes en ajoutant le nouveau numéro du compteur. Les sauvegardes anciennes à 42 et 44 champs sont acceptées et complétées ; les nouvelles comportent 46 champs internes. Le fichier d'export métier comporte ces 46 champs et le libellé d'anomalie supplémentaire.

Conserver une sauvegarde 5.1.4 avant mise à jour. Android ne garantit pas la réinstallation d'une version plus ancienne et une désinstallation efface les données privées. Une sauvegarde 6.1.0 n'est pas restaurable par la 5.1.4. La livraison 5.1.4 reste disponible séparément.

## Options administrateur, communes au téléphone

Trois modes photo exclusifs : désactivées pour tous ; selon anomalie/contrôle consommation ; obligatoires pour tous. Le mode désactivé neutralise l'obligation et la prise, conserve les photos déjà présentes et ne neutralise pas la double saisie d'index. Le choix antérieur Photo obligatoire est repris si aucun nouveau mode n'a été enregistré.

Désactiver la collecte GPS : aucune nouvelle position demandée, y compris sur la carte ; les anciennes positions restent conservées. Pas de nouvel indicateur GPS configurable.

Commentaire obligatoire si consommation < 0 : activé par défaut ; décoché, seul le commentaire devient facultatif. Les contrôles de consommation, anomalie et index confirmé restent actifs.

## Numéro du compteur

Le crayon près du compteur ouvre le formulaire avec numéro d'origine, nouveau numéro et confirmation. Les deux saisies doivent être identiques. Le numéro d'origine reste intact. La correction n'est enregistrée qu'à la validation de la relève, et s'exporte dans Nouveau numero compteur et dans l'archive privée. L'anomalie de code 35 ouvre le même formulaire et exige un numéro différent de l'original. Les restrictions de modification des visites continuent à s'appliquer.

## Carte

L'icône de localisation près du compteur ouvre une carte native à deux points : compteur si les coordonnées enregistrées sont valides ; releveur si collecte autorisée, permission accordée et position fraîche obtenue pendant l'ouverture. L'affichage n'enregistre pas de trajet, ni la position courante dans la relève par le seul fait d'ouvrir la carte. La distance affichée est calculée à vol d'oiseau, pas par la route. Toucher le point compteur ouvre sa fiche avec Ouvrir la saisie ; fermer la carte retrouve le formulaire et son brouillon.

Zoom +/−, déplacement et Recentrer. Sans position compteur, seule la position du releveur peut apparaître ; pas de distance inventée. Sans les deux positions, pas de distance. Collecte GPS désactivée : position du releveur non demandée. En cas de permission refusée ou de GPS indisponible, les données de relève restent accessibles.

Fond OpenStreetMap en ligne, attribution visible et ouvrable. Le service de tuiles reçoit les demandes de fond pour la zone affichée. Cache limité, pas de téléchargement massif ni garantie de carte hors connexion ; le dessin des points reste possible sans fond réseau. Les conditions et la capacité du fournisseur de tuiles doivent être revues avant un déploiement à grande échelle.

## Déchargement

Le bilan préalable affiche les visites datées, les photos uniques et le nombre de ZIP prévus. Contrôle des photos avant envoi. Le flux envoie le XLSX puis les ZIP par lots, chacun limité à 6 Mio, au service Drive signé existant en protocole 3. Pas de changement du script Google requis si le déploiement est déjà en protocole 3.

Les envois historiques de la 5.1.4 ne sont pas marqués automatiquement comme déchargés à la migration, faute de preuve complète de réception de ce nouveau flux.

Les compteurs du lot sont masqués seulement après confirmation complète des fichiers attendus, et seulement si leur propriétaire, UUID et version correspondent encore au lot envoyé. Une interruption laisse tous les compteurs de ce lot accessibles pour reprise, même si certains fichiers ont déjà été reçus ; les contenus identiques sont dédupliqués par le service. Le bilan final indique visites, photos et fichiers confirmés.

Les déchargés sont exclus des listes, recherches, navigation, carte et exports du releveur, même si la modification des visites est autorisée. Les données restent dans la base jusqu'à purge, y compris lors d’un remplacement ultérieur de tournée ; un enregistrement déjà déchargé de même identité n’est pas écrasé par le rechargement. Les archives privées restent conservées selon les règles existantes. Une correction administrateur crée une nouvelle version historique mais conserve le masquage au releveur ; les valeurs corrigées restent accessibles dans l’export complet administrateur.

## Administration

Données et déchargés d'un releveur : sélectionner un compte ayant des données, consulter sa liste paginée et cocher Afficher les compteurs déchargés si souhaité. Exporter tous : lus et non lus crée un XLSX dans la destination choisie, de toutes les données de travail encore présentes pour ce releveur, y compris déjà déchargées. L'export complet est distinct de l'archive historique et n'exporte pas les photos dans ce bouton XLSX.

## Limites de recette

Aucun module de ratissage n'est intégré. Le problème Photo non valide sur Oppo Reno 7 n'est pas déclaré corrigé par cette version ; une recette caméra réelle reste nécessaire. Les confirmations réseau de tests sont simulées et ne certifient pas le Drive du propriétaire. Carte, GPS, caméra et migration doivent être vérifiés sur le parc réel avant généralisation.
