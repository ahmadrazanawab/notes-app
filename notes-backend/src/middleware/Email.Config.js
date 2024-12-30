const nodemailer = require('nodemailer');

//Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL, //my email address
    pass: process.env.PASSWORT, // my email password or app password
  },
});

module.exports = transporter;
