const db = require('../db')
require('dotenv').config();

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {

    const { login, password } = req.body;

    const query = `SELECT * FROM administrator WHERE login = $1`;
    
    const admin = await db.query(query, [login]);
    if (!admin) {
        return res.status(404).json({ message: 'Niepoprawny login!' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.rows[0].haslo);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Niepoprawne hasło!' });
    }

    const token = jwt.sign({ login: login }, `${process.env.TOKEN}`, { expiresIn: '1h' });

    res.status(200).json({
        message: 'Zalogowano pomyślnie!',
        token: token
    });
}