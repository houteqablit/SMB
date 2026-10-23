# SMB-Relève 6.1.1 — compilation 22

## Installation

Faire une sauvegarde avec la version actuelle, puis installer par-dessus sans désinstaller. Même package et certificat que 6.1.0 et 5.1.4. Les livraisons précédentes restent conservées. Schéma SQLite 7 ; 49 champs internes, export métier 50 colonnes. La mise à jour préserve les comptes, données, archives et options. Les sauvegardes 42, 44 et 46 champs restent lisibles ; les nouvelles comportent 49 champs. Un retour à un ancien APK n'est pas automatique et une sauvegarde 6.1.1 ne doit pas être considérée compatible avec l'ancien logiciel.

## Charger le GPS du mois précédent

Dans la feuille Releve du modèle à trois feuilles, deux colonnes facultatives sont ajoutées après Identifiant releveur :

- GPS X precedent (longitude)
- GPS Y precedent (latitude)

Les titres courts GPS X precedent / GPS Y precedent sont aussi acceptés, ainsi que les accents et variations de casse habituelles. X est la longitude, Y la latitude. Exemple fictif : X = -6,1234567 et Y = 34,1234567. Virgule et point décimal sont acceptés. Le GPS n'est pas arrondi aux deux décimales de la moyenne journalière.

Les fichiers historiques sans ces colonnes restent importables, avec une référence GPS absente. Une paire incomplète, non numérique, hors des bornes géographiques ou égale à 0,0 est traitée comme absente sans refuser les autres données du contrat. Les deux composantes de la paire invalide sont laissées vides, pas remplacées par zéro. Ne pas intervertir latitude et longitude : deux valeurs inversées peuvent rester dans les bornes et ne sont pas corrigées automatiquement.

Cette évolution concerne aussi le lot CSV : Releve.csv peut comporter ces deux colonnes facultatives ; Anomalie et type_local sont inchangés. Le nom du classeur ou du ZIP est libre ; conserver les trois noms de feuilles/fichiers requis.

## Carte et coordonnées de la visite

Après recherche du contrat ou du compteur, l'icône GPS utilise en priorité le GPS précédent chargé. La carte indique sa provenance. Si cette référence manque, elle peut encore utiliser le GPS déjà enregistré lors de la dernière visite, avec un libellé distinct ; cela conserve l'usage des anciennes données/sauvegardes.

La position du releveur et la distance à vol d'oiseau sont proposées uniquement si la collecte est autorisée, la permission accordée et une position disponible. La carte ne mémorise pas de trajet et son ouverture ne modifie pas la fiche du compteur. Le fond en ligne OpenStreetMap dépend du réseau.

À chaque validation, le GPS mesuré pour cette nouvelle visite est enregistré dans GPS X (longitude), GPS Y (latitude) et Precision GPS (m), sans modifier GPS X/Y precedent. Si aucune nouvelle position n'est collectée, les coordonnées de cette nouvelle visite restent vides : une ancienne position ne doit pas être présentée comme une mesure actuelle. Les anciennes validations demeurent dans l'historique privé selon les règles d'archive existantes. La migration seule ne supprime ni ne déplace les anciens X/Y.

## Modifier l'identifiant

Toucher l'identifiant dans le formulaire de saisie ouvre Modifier l'identifiant, comme la modification d'UR. La fenêtre affiche l'identifiant d'origine et un seul champ Nouvel identifiant. Confirmer prépare la correction ; Valider la relève l'enregistre. Annuler ne change rien. L'identifiant d'origine reste conservé ; le nouvel identifiant s'affiche dans l'en-tête avec l'ordre et devient aussi recherchable. La fiche détaillée permet de consulter les deux valeurs.

Administration → Options des releveurs → Masque de saisie de l'identifiant :

1. Forcer le format 000-0000-00 : neuf chiffres, tirets automatiques après les troisième et septième chiffres. Exemple 001234500 devient 001-2345-00 ; les zéros initiaux sont conservés. Une saisie incomplète est refusée.
2. Champ libre — sans format : lettres, chiffres et séparateurs, 128 caractères maximum, sans caractères de contrôle.

Le mode libre est le défaut pour respecter les identifiants historiques. Le format imposé concerne une nouvelle saisie ; les identifiants importés ou déjà enregistrés ne sont pas reformatés rétroactivement. Les restrictions de modification des visites déjà relevées et le masquage des déchargés restent applicables.

## Déchargement : 50 colonnes

Les 46 premières colonnes de travail de la 6.1.0 sont conservées. Les trois ajouts précèdent le libellé d'anomalie :

47. GPS X precedent (longitude)
48. GPS Y precedent (latitude)
49. Nouvel identifiant
50. Libelle anomalie

Identifiant (colonne 22) conserve l'origine ; Nouvel identifiant reste vide en l'absence de correction. GPS X/Y (colonnes 12/13) concernent la visite et les colonnes 47/48 la référence chargée. Excel, CSV et export complet administrateur reprennent les ajouts. Les photos restent dans les ZIP séparés. Les règles de visites datées, confirmation complète de réception et masquage des déchargés sont inchangées.

L'archive privée administrateur comporte désormais 19 colonnes : les 16 précédentes, puis GPS X precedent, GPS Y precedent, Nouvel identifiant. Les anciens contenus historiques sont conservés ; les nouvelles colonnes inconnues pour les anciennes validations restent vides.

## Drive et vérifications terrain

Code.gs et le protocole 3 ne changent pas. Même URL /exec, dossier et clés configurées ; pas de redéploiement requis pour un service déjà compatible. Les confirmations réseau automatisées sont simulées ; la réception réelle doit être vérifiée par le responsable.

Tester sur téléphone : ancien fichier et nouveau modèle, coordonnées avec virgule, recherche puis carte, double conservation du GPS après relève, masque et saisie libre, reprise après fermeture, déchargement et archive. Le problème Photo non valide sur Oppo Reno 7 n'est pas déclaré corrigé. Aucun module de ratissage ajouté.
