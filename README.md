# Saegus React with Office 365 SSO Boilerplate

## Mode d'emploi

Il est fortement recommandé d'utiliser une version de `node` supérieure ou égale à `8.x.x`. 

Installation des dépendances : `npm install`
Environnement de développement : `npm start` (`http://localhost:8080`)  
Construction pour la production : `npm run build` (dossier de destination : `build`)

## Office 365 SSO

**Big warning pour les SPA en général :** les hash routers posent souci dans le post-login, car la redirection
de Office 365 post-login ajoute des informations (token, etc...) dans le hash de l'URL. Il faut donc privilégier
les **browser routers**.

1. Ajouter l'application sur l'[Application Registration Portal](https://apps.dev.microsoft.com/)
2. Dans les paramètres de l'application, configurer la *"Redirect URL"* qui doit être ici par défaut `http://localhost:8080` et cocher *"Allow Implicit Flow"*
3. Remplacer la valeur d'`appId` dans `sso.config.json`

La partie intéressante pour le SSO se trouve dans [`AuthStore.js`](src/stores/AuthStore.js).
