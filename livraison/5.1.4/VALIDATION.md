# Validation 5.1.4 — compilation 20

60 tests JVM, 23 contrôles du protocole et de la confirmation de téléphone, 25 tests Apps Script avec services Google simulés. Android : 154 contrôles de régression, 32 contrôles des archives/UR et migrations, 32 contrôles ciblés de navigation et d’indicateur, 10 contrôles de charge sur 25 000 compteurs, 1 scénario visuel clavier compris. Total Android : 229 contrôles. Même package/certificat que 5.1.3, signatures v2/v3 et versionCode 20 vérifiés, installation de mise à jour en émulateur API 26.

Scénarios de navigation : une recherche à résultat unique ouvre la tournée complète ; Toutes les UR reste ouvert à l’UR suivante dans la même tournée ; un filtre UR explicite est respecté ; une autre tournée est exclue. Validation réellement exécutée et enregistrée dans SQLite, suivie du compteur suivant par ordre numérique, sans retour prématuré au premier non visité ; le suivant peut être déjà visité. Retour et reconnexion reprennent le premier non visité. Le clic sur une carte de liste filtrée retire aussi la restriction textuelle/de statut pour la navigation. La fin de tournée n’apparaît qu’après validation du dernier compteur réel de la sélection.

Fiche détaillée : contrat, nouvel index enregistré, libellé d’anomalie, omission des valeurs absentes, repli explicite sur un code inconnu sans libellé inventé, respect du masquage d’ancien index.

Indicateur : fenêtre visible pendant une tâche réellement bloquée sur un verrou de test en arrière-plan, navigation bloquée, pixels verts, variation entre images successives, fermeture avant rappel de succès ou d’erreur simulée réseau, fermeture après destruction effective de l’activité sans conserver la fenêtre. Captures réelles de l’émulateur avec données synthétiques. Aucun pourcentage ou délai de transfert n’est simulé dans l’application.

Régressions : archives privées conservées après purge/compte supprimé, droits administrateur, nouvelle UR, code/libellé type local, anciennes sauvegardes à 42 champs et nouvelles à 44 champs, migration SQLite v4 vers v5, photo, double saisie d’index/téléphone, anomalies, imports, sauvegardes, GPS simulé et formulaire avec clavier.

Charge : 25 000 compteurs synthétiques, comptages, pagination, identifiants de navigation, export des visites, alimentation de l’archive et notifications mémoire. Mesures dans performance-25000.txt. Ni l’import d’un XLSX de cette taille ni le débit réseau Google ne sont mesurés.

Limites : pas de test physique Samsung/Android 12, caméra/GPS/Drive réels. La réception Google réelle reste à vérifier par le propriétaire. Protocole 3 inchangé : les services 5.1.2 et 5.1.3 en protocole 3 restent compatibles. Schéma de données inchangé par rapport à 5.1.3. Les fichiers envoyés sont limités à 6 Mio, les données restent conservées en cas d’échec. Aucun fichier de client réel, clé de transfert réelle ou clé privée de signature n’est inclus.
