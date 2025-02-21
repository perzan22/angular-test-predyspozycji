const mail = require("../smtp");
const mjml = require("mjml");
const fs = require("fs");
require('dotenv').config();

exports.sendMail = async (req, res, next) => {

    const { imie, nazwisko, kierunek, email } = req.body;
    
    const mjmlTamplate = fs.readFileSync("../views/email.mjml", "utf8");

    const mjmlWithData = mjmlTamplate
        .replace("{{imie}}", `${imie}`)
        .replace("{{nazwisko}}", `${nazwisko}`)
        .replace("{{kierunek}}", `${kierunek}`);

    const htmlOutput = mjml(mjmlWithData).html;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: `Twój wybrany kierunek!`,
        html: htmlOutput
    };

    try {
        await mail.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail wysłany!' });
    } catch (error) {
        res.status(500).json({ message: 'Błąd podczas wysłania e-maila.', error });
    }
}