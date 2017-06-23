Saegus Node Boilerplate
====

Mode d'emploi
---

Il est recommandé d'avoir une version de `node` supérieure ou égale à `8.x.x`.  

Installer les dépendances avec `npm install`, démarrer le serveur avec `npm start`.

Précisions et modules facultatifs
---

* Guidelines générales : ES6, voire ES7 notamment avec `async`/`await`
* `utils/Db` : wrapper pour `node-postgres`.   
  Dépendances : `npm install --save pg`  
  Exemple d'usage :
  ```js
  const sql = require('./Db');
  const doStuff = async args => await sql`
    SELECT * FROM "${schemaId}"."Table"
    WHERE "id" = ${entity.id} AND "id" IN ${args.params}
  `;
  async () => {
    const results = await doStuff();
    res.json(results);
  }
  ```
* `utils/Excel` : wrapper pour `xlsx` (lecture), écriture de .xls (qui sont en fait des fichiers HTML judicieusement nommés, mais ouvrables avec Excel avec juste un petit warning).  
  Dépendances : `npm install --save xlsx csv-parse`  
  Exemple d'usage :
  ```js
  const Excel = require('./Excel');
  async () => {
    const data = await Excel.read({
      name: 'file.xlsx',
      data: 'data:application/vnd.ms-excel.sheet.macroenabled.12;base64,UEsDBBQABgAIAAAAI...'
    });
    
    const payload = await Excel.write({
      widths: [50, 50, 50, 100],
      header: ['Column 1', 'Column 2', 'Column 3', 'Column 4'],
      rows: [
        ['dataA1', 'dataA2', 'dataA3', 'dataA4'],
        ['dataB1', 'dataB2', 'dataB3', 'dataB4'],
        ...
      ]
    });
    res.setHeader('Content-type', 'application/vnd.ms-excel');
    res.setHeader('Content-disposition', 'attachment; filename=export.xls');
    res.send(payload);
  }
  ```
* `utils/Mail` : wrapper pour `nodemailer`  
  Dépendances : `npm install --save nodemailer`  
  Configuration : via le fichier `conf/mail/dev.json`  
  Exemple d'usage :
  ```js
  const Mail = require('./Mail');
  async () => {
    await Mail({
      from: 'Someone <someone@saegus.com>',
      to: 'Someone Else <someoneelse@company.com>',
      subject: 'A very important e-mail',
      attachments: [
        { filename: 'filename.pdf', content: <Bytes[]...> }
      ],
      html: `
        <h1>Hello ${args.name}</h1>
        <p>This is to tell you about ${args.thing}. Actually, ${args.remark}.</p>
        <p>Thanks!</p>
      `,
      inject: {
        name: 'Someone Else',
        thing: 'my project',
        remark: "it's completely done"
      }
    });
  }
  ```
* `utils/Prince` : wrapper pour [Prince](http://www.princexml.com/download/), convertisseur de HTML vers PDF  
  Dépendances : [Prince](http://www.princexml.com/download/)  
  Configuration : Le dossier temporaire dans lequel la conversion est faire peut être changé dans le fichier JS  
  Exemple d'usage :
  ```js
  const Prince = require('./Prince');
  async () => {
    // Stores HTML in /tmp/<tmpDirectoryPrefix><random string>,
    // converts it into a PDF and returns the path of the pdf file
    const fileName = await Prince.store(`
      <h1>Hello, world!</h1>
      <p>This is a paragraph.</p>
    `);

    // Gets the PDF file from the file path
    const pdf = await Prince.getPDF(fileName);

    // Deletes the temporary HTML and PDF files when
    // not needed anymore
    await Prince.cleanUp(fileName);

    res.setHeader('Content-type', 'application/pdf');
    res.setHeader('Content-disposition', 'attachment; filename=report.pdf');
    return res.send(result);
  }
  ```
* `utils/Router` : wrapper pour les routes `express`. Ce boilerplate constitue un exemple d'usage de cet utilitaire.

TODO
---

* Framework de tests unitaires : les routes étant répertoriées et déclarées en arrays, elles sont en théorie très facilement testables.
* Structure MVC qui répond aux routes `express`
* Intégration de Prettier
* Intégration de TypeScript (?)
* Dockerisation
* Swagger (?)
* ...suggestions welcome!
