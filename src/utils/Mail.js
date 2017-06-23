/*
  Usage (npm install --save nodemailer):
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
*/

const Nodemailer = require('nodemailer');
const mailAuth = require('../../conf/mail/dev.json');

const transporter = Nodemailer.createTransport(mailAuth);
transporter.verify(error => (error ? console.error('Mail (using conf/mail/dev.json):', error) : console.log('Mail: Successfully initiated.')));

module.exports = options => (process.env.NODE_ENV === 'dev' ?
  // Only actually sends mail when in production; to test, remove the process.env check
  Promise.resolve(console.log('mailto:', options.to, options.inject)) :
  new Promise((resolve, reject) => {
    // Can be used in the mail template
    const args = options.inject; // eslint-disable-line
    transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      attachments: options.attachments,
      // eval is safe here as long as the provided HTML template doesn't come from an user input
      // (i.e. the mail template is hard coded and nothing malicious or broken is run inside it)
      html: eval(`\`${options.html}\``), // eslint-disable-line
    }, (error, info) => {
      if (error) reject(error);
      else {
        console.log('Mail %s sent: %s', info.messageId, info.response);
        resolve();
      }
    });
  }
));
