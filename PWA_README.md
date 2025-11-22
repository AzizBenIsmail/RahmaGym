# Rahma Service - Progressive Web App

## Installation de la PWA

### Sur Android:
1. Ouvrez le site dans Chrome ou Firefox
2. Appuyez sur le menu (⋮) → "Installer l'application"
3. Confirmez l'installation
4. L'app s'installera comme une application native

### Sur iOS:
1. Ouvrez le site dans Safari
2. Appuyez sur le bouton de partage (↗)
3. Sélectionnez "Sur l'écran d'accueil"
4. Confirmez l'installation

### Sur Desktop:
1. Ouvrez le site dans Chrome, Edge ou Brave
2. Cliquez sur l'icône d'installation (généralement dans la barre d'adresse)
3. Confirmez l'installation
4. L'app s'ouvrira dans sa propre fenêtre

## Caractéristiques PWA

✅ **Offline First** - Fonctionne sans connexion internet
✅ **Mode Standalone** - Fonctionne comme une app native
✅ **Service Worker** - Gestion du cache et synchronisation
✅ **Responsive** - Fonctionne sur tous les appareils
✅ **Installable** - Peut être installée sur l'écran d'accueil
✅ **Sécurisée** - HTTPS requis en production
✅ **Dark/Light Mode** - Thème adaptatif

## Fichiers PWA

- `/manifest.json` - Configuration de l'app
- `/service-worker.js` - Service worker pour le cache
- `/public/icon-192x192.png` - Icône 192x192
- `/public/icon-512x512.png` - Icône 512x512
- `/public/icon-maskable.png` - Icône pour fond adaptatif

## Déploiement

Pour un déploiement en production:
1. Générez les icônes PNG (192x192, 512x512)
2. Assurez-vous que le site fonctionne en HTTPS
3. Le manifest.json sera automatiquement servi
4. Le service worker sera enregistré automatiquement

## Note sur les Icônes

Veuillez remplacer les fichiers icône par des versions PNG réelles:
- `icon-192x192.png` - Logo carré 192x192px
- `icon-512x512.png` - Logo carré 512x512px
- `icon-maskable.png` - Logo avec marges (192x192px)

Ces fichiers doivent être placés dans le dossier `/public/`.
