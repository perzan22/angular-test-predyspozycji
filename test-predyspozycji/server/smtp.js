const nodemailer = require('nodemailer');
require('dotenv').config();

const mail = nodemailer.createTransport({
    service: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

module.exports = mail;