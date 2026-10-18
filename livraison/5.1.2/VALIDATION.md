# Validation 5.1.2 — compilation 18

58 tests JVM, 23 contrôles du protocole, des noms et de la confirmation de téléphone, 25 tests du service Apps Script simulé, 154 contrôles Android et 9 contrôles de charge sur 25 000 compteurs réussis. Contrôle visuel clavier compris : 1 scénario. Installation de mise à jour sur émulateur API 26 ; signatures v2/v3 et certificat identique à 5.1.1 vérifiés.

Contrôles : options des releveurs et accès administrateur, masquage de l’ancien index, consultation seule des visites, identité rôle/nom, conservation des données lors des notifications de mémoire. Régressions : import et remplacement, sauvegarde, anomalies, double saisie index et téléphone, GPS simulé, photo globale, exports, purge ciblée sans suppression des comptes, formulaire avec clavier.

Charge : base SQLite isolée avec 25 000 contrats synthétiques. Comptage, pagination, ordre numérique, filtre UR, identifiants de navigation, export des seules visites, affichage asynchrone et mémoire faible. Mesures dans performance-25000.txt. Ce test porte sur la consultation d’une base chargée ; il ne mesure pas l’import XLSX de 25 000 lignes, la caméra ni la transmission réelle à Drive.

Protocole 3 : nom signé, refus des chemins et altérations, déduplication après changement de nom et récupération par description après éviction du cache. Rétrocompatibilité des protocoles 1/2 testée. Script Drive réel à redéployer et tester par son propriétaire ; aucune réception Google réelle vérifiée.

Limites : émulateur API 26 sans accélération matérielle ; pas de test physique Samsung S10/Android 12. Aucune garantie de temps sur un autre appareil. Les caches sont libérés sur demande d’Android sans supprimer les données et sans forcer le ramasse-miettes. Signature de développement ; aucune clé privée, donnée de relève réelle ou clé Google incluse.
