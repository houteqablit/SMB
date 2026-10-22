# Validation 6.1.0 — compilation 21

60 contrôles JVM ; 23 contrôles protocole/téléphone ; 25 contrôles Apps Script simulés.

- full-device : 154 contrôles Android.
- features : 32 contrôles Android.
- navigation : 32 contrôles Android.
- large-data : 10 contrôles Android.
- visual : 1 contrôles Android.
- release : 63 contrôles Android.

Total : 292 contrôles Android. APK recompilé, signé, installation de mise à jour en émulateur. Migration SQLite v4/v5 vers v6 ; anciennes sauvegardes 42/44 champs ; archive historique étendue sans perte ; nouveaux exports ; masquage après réception complète, non après échec ; conservation au rechargement puis purge explicite ; droits administrateur ; carte et distance à partir de positions injectées.

Tests exécutés en émulateur API 26, positions et données fictives. Confirmations de transfert réseau et Google simulés : pas de certification de la réception dans le Drive réel. GPS, permissions, fond cartographique et photo doivent être vérifiés sur les téléphones du parc. Le problème photo Oppo Reno 7 n’est pas déclaré corrigé. La charge synthétique 25 000 compteurs ne mesure pas l’import du XLSX réel. Les anciens rapports 5.1.4 restent distincts. Aucun ratissage inclus.
