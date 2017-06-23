Saegus HTML + SCSS Boilerplate
===

Mode d'emploi
---

En ayant Node.js d'installé, entrer `npm install` dans une ligne de commande pour installer les dépendances. Une fois les dépendances installées, entrer `gulp` pour lancer la compilation automatique du SCSS à chaque modification. Cela lancera automatiquement la prévisualisation du travail sur un navigateur. Elle est également mise à jour automatiquement à chaque modification.  

Guidelines SCSS
---

* `variables.scss` : Variables générales, omniprésentes (police, tailles de police, couleurs...)
* `global.scss` : CSS opérant sur la page en général, notamment les éléments HTML natifs (`a`, `body`, `ul`...)
* Dossier `components` : Chaque fichier représente un composant, c'est-à-dire un élément distinct et réutilisé au travers du projet. À partir d'une certaine envergure de projet, les composants peuvent être compartimentés selon le principe de l'[Atomic/Pattern Design](http://patternlab.io/) (atoms < molecules < organisms < templates < pages).
