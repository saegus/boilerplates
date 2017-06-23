Saegus Inferno Boilerplate
==========

Mode d'emploi
----

Il est fortement recommandé d'utiliser une version de `node` supérieure ou égale à `8.x.x`. 

Environnement de développement : `npm start` (`http://localhost:8080`)  
Construction pour la production : `npm run build` (dossier de destination : `build`)

Technologies
----

### JavaScript

* [Inferno](https://infernojs.org/docs), librairie d'UI [React](https://facebook.github.io/react/docs)-like. Très léger (9kb gzipped), très fluide, donc judicieux dans un contexte mobile-first et [progressive apps](https://developers.google.com/web/progressive-web-apps/checklist)
* (TODO) [Redux](http://redux.js.org/), gestionnaire d'états pour des librairies d'UI tels que React
* [Babel](https://babeljs.io/), cross-compiler de JavaScript/JSX ES6+ vers ES5 (entre autres)
* [es5-shim](https://github.com/es-shims/es5-shim) et [es6-shim](https://github.com/paulmillr/es6-shim), polyfills implémentant des fonctions ES5/ES6 pour les navigateurs moins modernes

### CSS

* [SCSS](http://sass-lang.com/documentation/), un pré-processeur de CSS
* [CSSNext](http://cssnext.io/) (intégré avec [PostCSS](http://postcss.org/), un post-processeur de CSS), qui permet d'utiliser/polyfill certaines futures fonctionnalités de CSS qui n'ont pas encore été implémentés dans tous les navigateurs. Inclut notamment `autoprefixer` pour les propriétés ayant besoin de préfixages (e.g. `flex`).

### Développement

* [Webpack 3](https://webpack.js.org/), constructeur de paquets de modules JavaScript permettant entre autres la minification du code, du *tree-shaking* (tente de débarasser le code des fonctionnalités non utilisées) et la gestion de modules JavaScript
* [BrowserSync](https://www.browsersync.io/), recharge automatiquement les navigateurs ouverts sur la page de l'application à chaque build Webpack (NB: le Hot Module Replacement de Webpack n'est pas évident à mettre en place pour Inferno), répand un parcours (clics, inputs) vers tous les navigateurs
* [Prettier](https://github.com/prettier/prettier), formatteur automatique de fichiers JavaScript/JSX ES6

Guidelines
----

### Structure de projet

* Fortement inspiré de l'[Atomic/Pattern Design](http://patternlab.io/) : hiérarchie de composants en `atoms`, `molecules`, `organisms`, `templates` et `pages`.
* On regroupe les composants réutilisables (`<= organisms`) dans un dossier `components`
* Pour les gros projets, il est possible de séparer l'application en modules de `templates` et de `pages` soit en pages séparées, soit reliés par un `index.jsx` principal, avec le dossier `components` en commun pour les composants réutilisables (`<= organisms`) :
  ```
  src
  |- components
  |--- atoms
  |--- molecules
  |--- organisms
  |- modules
  |--- module1
  |----- templates
  |----- pages
  |----- index.jsx
  |--- module2
  |----- templates
  |----- ...
  ```
* Composants séparés par dossiers contenant `index.jsx` (template + initialisation), `style.scss` (SCSS) et `handlers.jsx` (non nécessaire pour les composants *stateless*; gestion de la logique du composant)
* Dossier `assets` pour les fichiers externes à importer (images, vidéos, polices...)
* Dossier `scss` pour le setup SCSS général : polices, variables, mixins et normalisation
* Dossier `utils` pour les utilitaires généraux : Http, Translations...

### Général

* Tabsize de 2 (espaces)
* Minimalisme et optimisation par rapport aux modules externes (3rd party) : faire attention aux effets de bord, au poids du package final...
* Conformément aux principes de l'Atomic Design :
  * Les appels d'API et la modification d'états généraux ne doivent se faire qu'à partir de handlers de `pages`
  * Il est préférable que les `templates`, `atoms`, `molecules` et `organisms` soient *stateless*. Cependant, il est parfois nécessaire d'implémenter des composants *stateful* pour ceux touchant au DOM (e.g. autoscroll, autofocus...).


### JavaScript

* JavaScript/JSX ES6+, gestion de dépendances grâce à des modules (syntaxe `import`/`export`)
* Attention : le formattage du code se fait automatiquement à la sauvegarde grâce à **Prettier**.
* Décomposer les propriétés d'un composant *stateless*
  ```jsx
  // Non décomposé
  export default props => <span>{props.prop1 + props.prop2}</span>;

  // Décomposé
  export default { prop1, prop2 } => <span>{prop1 + prop2}</span>;
  ```
* L'import d'un "asset" (image, vidéo...) doit se faire dans le composant qui l'intègre

### SCSS

* *Component-centric CSS* (ou *Object-oriented CSS*) : un `style.scss` de composant inclut exclusivement des règles découlant de ce composant. Éviter le CSS global autre que de la normalisation (e.g. `normalize.css`) : privilégier l'encapsulation d'éléments natifs en composants plutôt que des overrides globaux (e.g. `button`, `input`...)
* Variante de la norme de nomenclature [BEM](http://getbem.com/introduction/), réadaptée pour nos composants :
  ```scss
  .NomDuComposant {
    &__nom-de-l-element {

    }

    &--nom-du-modifieur {

    }
  }
  ```
* Suivant les principes de l'Atomic Design, le CSS d'un composant n'affecte que lui-même et éventuellement les composants un niveau en dessous, e.g. :
  ```scss
  .Atome {
    &__element { ... }
    &--modifieur { ... }
  }

  .Molecule {
    &__element {
      ...

      .Atome { ... }
    }
  }
  ```
* Ne pas accumuler plus de 3 niveaux d'inclusion (séparer en un sous-composant quand ça doit arriver)
* (Expérimental) Variables :
  * Variabiliser les styles des composants dans un fichier `variables.scss` par composant, seul fichier de variable inclus dans le `style.scss` du même dossier
  * Lorsque c'est possible, faire découler les valeurs de ces variables du contexte du projet (`@import 'scss/variables.scss'`). Notamment, les `z-index` doivent être recensés dans le contexte projet `scss/variables.scss`.

Aides
---

### Composant *stateless*

```jsx
import Inferno from 'inferno';
import './style.scss';

export default ({
  prop1,
  prop2,
  children,
}) =>
  <div className="StatelessComponent">
    {props.children}
  </div>
;
```

### Composant *stateful* (!= *stateless*)

```jsx
import Inferno from 'inferno';
import Component from 'inferno-component';
import Atom from 'atoms/Atom';
import { handler } from './handlers';
import './style.scss';

export default class StatefulComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '' };
    this.handler = Inferno.linkEvent(this, handler);
  }
  render() {
    return (
      <div className="StatefulComponent">
        <Atom onChange={this.handler}>
          {this.state.data}
        </Atom>
      </div>
    );
  }
}
```

TODO
----

* Utilisation concrète de `Http`
* Exemple de Redux
* Implémenter un exemple de "service worker" pour le contexte Progressive Web App
* Dockeriser l'environnement de dev pour éviter les problèmes dûs à la différence entre les environnements
* Ajouter le `manifest.json`
* Formaliser les mixins de viewports/devices
* Exemple de "server-side rendering"
* Meta-tags Open Graph
* Exemple d'intégration à Electron (?)
