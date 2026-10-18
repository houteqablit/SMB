# SMB-Relève 5.1.4 — compilation 20

Installer par-dessus 5.1.3 ou 5.1.2 sans désinstaller. Même package et même certificat. Aucun nouveau droit Android. Le schéma de données et le protocole Drive restent ceux de 5.1.3 : pas de nouvelle configuration Drive pour un service déjà en protocole 3.

## Recherche et navigation après validation

Le résultat d’une recherche sert à choisir le compteur à ouvrir. Il ne limite plus la navigation à ce seul résultat.

Après ouverture d’un résultat, la recherche textuelle et le filtre de statut sont retirés de la navigation. La tournée de saisie est celle du numéro de tournée et de la campagne du compteur trouvé, dans les données accessibles au compte connecté. Si Toutes les UR était choisi, la navigation conserve toutes les UR de cette tournée, y compris lorsque la suivante a une autre UR. Un filtre UR explicitement choisi reste respecté ; si la recherche ouvre un compteur d’une autre UR, la sélection est adaptée à cette UR. Le compteur de progression en haut concerne cette tournée.

Après validation et enregistrement, le formulaire ouvre le compteur suivant dans l’ordre numérique de relève. Il ne revient pas au premier non visité à chaque validation. Le compteur suivant peut avoir déjà été visité ; les restrictions de modification de 5.1.3 restent applicables. L’ordre en cas d’égalité est celui de l’identifiant technique interne, comme auparavant.

Exemple : ordre 2 non visité, ordre 10 recherché, ordre 30 suivant déjà visité, ordre 40 non visité. Valider l’ordre 10 ouvre l’ordre 30. Quitter ensuite le formulaire par Retour, ou se déconnecter puis se reconnecter, reprend l’ordre 2, premier non visité dans la tournée sélectionnée.

Le message Fin de tournée ne s’affiche qu’après l’enregistrement du dernier compteur réel de cette tournée. Il confirme l’enregistrement ; il ne signale pas un échec de validation. Le menu permet toujours de revenir à la liste ou de changer de sélection.

Un compteur non visité est celui dont la date de relève est vide. Une visite enregistrée sans index avec anomalie n’est pas proposée de nouveau comme non visitée. La campagne de la dernière tournée consultée est mémorisée avec les autres filtres du compte pour la reconnexion.

## Fiche au clic sur le compteur

Cliquer sur le bloc d’informations du compteur ouvre une fiche détaillée avec les données déjà présentes, plus :

- Contrat, ou Hors liste lorsqu’il n’existe pas de contrat.
- Nouvel index enregistré, s’il existe.
- Libellé de l’anomalie enregistrée, si une anomalie existe. Si son code ne figure plus dans le catalogue, le code est conservé avec la mention libellé indisponible.

Les valeurs affichées correspondent à l’enregistrement, pas à une nouvelle saisie non validée. L’ancien index reste masqué lorsque cette option administrateur est désactivée. Les autres informations (client, adresse, UR, tournée, compteur, ancienne date, téléphone et type local importés) restent présentes.

## Indicateur vert pendant les opérations

Un cercle animé à 12 segments verts s’affiche pendant le chargement, le remplacement d’une tournée et le déchargement. Il est accompagné de Chargement en cours… ou Déchargement en cours… selon l’opération. Les autres tâches en arrière-plan affichent Opération en cours… ; l’envoi d’une archive indique Déchargement de l’archive en cours…

L’indicateur tourne pendant toute l’opération, puis se ferme avant le message de réussite ou d’erreur. Il ne représente pas un pourcentage : la durée réelle dépend du fichier, des photos, du téléphone et du réseau. La navigation est bloquée pendant l’opération, pour éviter les modifications concurrentes et les envois répétés. Les traitements restent exécutés en arrière-plan.

Les règles de conservation des données en cas d’échec restent inchangées. Les archives privées, leurs droits administrateur, le code/libellé du nouveau type local, la nouvelle UR, les options des releveurs et les sauvegardes de 5.1.3 sont conservés. Lire aussi MISE_A_JOUR_5.1.3.md pour ces fonctions.

## Vérification Drive

Le service 5.1.2/5.1.3 en protocole 3 reste compatible ; aucune modification du script n’est nécessaire pour ces trois correctifs. La réception réelle sur le compte Google reste à vérifier par son propriétaire. Les tests du service sont simulés et les captures montrent des données fictives en émulateur.
