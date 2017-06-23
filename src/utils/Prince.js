/*
  An HTML to PDF converter

  Warning: This generates a PDF with a Prince watermark on the top right corner
  when used with a non-commercial licence. This may therefore not be legally
  usable in every project.

  http://www.princexml.com/license/
  http://www.princexml.com/purchase/

  Usage (install Prince first with http://www.princexml.com/download/):
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
*/

const Fs = require('fs');
const Path = require('path');
const ChildProcess = require('child_process');
const Crypto = require('crypto');

const tmpDirectoryPrefix = '/tmp/saegus.my-project.';

let folderName;
Fs.mkdtemp(tmpDirectoryPrefix, (err, res) => {
  if (err) console.error(err.stack);
  folderName = res;
  console.log('Prince: Created temporary export directory at', folderName);
});

const writeFile = (fileName, content) =>
  new Promise((resolve, reject) => Fs.writeFile(Path.resolve(folderName, fileName), content, (err) => {
    if (err) reject(err);
    else resolve();
  }))
;
const unlinkFile = fileName =>
  new Promise((resolve, reject) => Fs.unlink(fileName, (err) => {
    if (err) reject(err);
    else resolve();
  }))
;
const exec = command =>
  new Promise((resolve, reject) => ChildProcess.exec(command, (err) => {
    if (err) reject(err);
    else resolve();
  }))
;

const store = (html, args) => { // eslint-disable-line
  const hash = Crypto.createHash('sha1');
  // eval is safe here as long as the provided HTML template doesn't come from an user input
  // (i.e. the mail template is hard coded and nothing malicious or broken is run inside it)
  html = eval(`\`${html}\``); // eslint-disable-line
  hash.write(html);
  const fileName = hash.digest('hex');
  // 1. Create an HTML input file to run Prince on
  return writeFile(`${fileName}.html`, html)
  // 2. Run the Prince command on the HTML file
  .then(() => exec(`prince ${folderName}/${fileName}.html`))
  .then(() => fileName);
};

const getPDF = fileName =>
  new Promise((resolve, reject) => Fs.readFile(`${folderName}/${fileName}.pdf`, (err, data) => {
    if (err) reject(err);
    else resolve(data);
  }))
;

const cleanUp = fileName => Promise.all([
  unlinkFile(Path.resolve(folderName, `${fileName}.pdf`)),
  unlinkFile(Path.resolve(folderName, `${fileName}.html`)),
]);

module.exports = { store, getPDF, cleanUp };
