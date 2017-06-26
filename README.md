Saegus PHP Boilerplate
===

Mode d'emploi
---

[Télécharger `caddy`](https://caddyserver.com/download) avec le script `bash` ou depuis le "direct link" et déposer l'exécutable `caddy` à la racine du projet. S'assurer que `php-fpm` est installé (`php-fpm --version`), il devrait l'être par défaut sur Mac.

### Sans transpilation
Il est possible de développer sans transpilation PHP 7 à 5.6 en lançant `php-fpm -y ./php-fpm.conf -n -p ./` et `./caddy`. Modifier le `Caddyfile` pour diriger les routes vers `src` plutôt que `dist`.

### Transpilation PHP 7 à 5.6
Pour mettre en place la transpilation automatique :

0. S'assurer que `node` est installé (`node --version`)
1. Télécharger [Composer](https://getcomposer.org/download/)
2. Installer `Transphpile` et ses dépendances
```sh
cd Transphpile
git pull
php ../composer.phar install
```
3. `npm install`

Pour démarrer l'environnement de dev, `npm start`.  

Guidelines
---

Ce boilerplate utilise [Transphpile](https://github.com/jaytaph/Transphpile) pour prendre avantage de certaines fonctionnalités PHP 7 tout en supportant PHP 5.6. Se référer au dépôt pour savoir lesquelles. Le PHP qui se trouve dans `src` est automatiquement transpilé à chaque sauvegarde vers `dist`.  

À partir de là, 2 approches sont possibles :  
* Backend PHP, frontend React (ou autre framework JS) : les routes PHP ne renvoient que du JSON, le frontend se charge du templating.
* Full PHP avec [Twig 1](https://twig.sensiolabs.org/doc/1.x/intro.html) : `php composer.phar require "twig/twig:~1.0"`. Les templates pourraient se placer dans un dossier `templates`; pour le CSS, `gulp` peut [se configurer de cette manière là](https://github.com/saegus/boilerplates/tree/html-scss).
