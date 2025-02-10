const mail = require("../smtp");
require('dotenv').config();

exports.sendMail = async (req, res, next) => {

    const { imie, nazwisko, kierunek, email } = req.body;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: `Twój wybrany kierunek!`,
        html: `<h2>Cześć ${imie} ${nazwisko}!<br>Twój wybrany kierunek: ${kierunek}</h2>`
    };

    try {
        await mail.sendMail(mailOptions);
        res.status(200).json({ message: 'E-mail wysłany!' });
    } catch (error) {
        res.status(500).json({ message: 'Błąd podczas wysłania e-maila.', error });
    }
}