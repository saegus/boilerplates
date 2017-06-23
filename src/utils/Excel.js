/*
  Usage (npm install --save xlsx csv-parse):
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
*/

const Xlsx = require('xlsx');
const CSVParse = require('csv-parse');

const read = ({ name, data }) => {
  let csv;
  // Decode the file data
  if (name.slice(-4) === '.csv') {
    csv = new Buffer(data.split(',')[1], 'base64').toString();
  } else {
    const workbook = Xlsx.read(new Buffer(data.split(',')[1], 'base64'));
    csv = Xlsx.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
  }

  // Turn the csv into an array of arrays
  // First, try to parse with the default delimiter (',')
  // If it fails, try with the second most common (';')
  // Don't bother with other ones and just assume they're invalid files
  return new Promise((resolve, reject) => CSVParse(csv, (err, result) => {
    if (err) {
      return CSVParse(csv, { delimiter: ';' }, (err2, result2) => {
        if (err2) return reject(err2);
        return resolve(result2);
      });
    }
    return resolve(result);
  }));
};

const write = ({ widths, header, rows }) =>
  `<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: 'Roboto', 'Arial', sans-serif;
        font-size: 14px;
      }
      td.result {
        font-family: 'Roboto', 'Arial', sans-serif;
        text-align: left;
        font-size: 14px;
      }
      tr {
        height: 32px;
      }
    </style>
  </head>
  <body>
    <table>
      ${(widths || []).map(width => `<col width="${width}" />`).join('\n')}
      <thead>
        <tr style="background-color : #ebebeb; font-size:14px; color:#7e7e7e; height :25px;">
          ${(header || []).map(column => `<th>${column}</th>`).join('\n')}
        </tr>
      </thead>
      <tbody>
        ${rows.map(row => `<tr>
          ${row.map(column => `<td style="text-align: left; vertical-align: middle;">${column || '-'}</td>`).join('\n')}
        </tr>`).join('\n')}
      </tbody>
    </table>
  </body>
</html>`;

module.exports = { read, write };
