import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

//Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL, //my email address
    pass: process.env.PASSWORT, // my email password or app password
  },
});

export { transporter };

