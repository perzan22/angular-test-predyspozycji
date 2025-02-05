const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
        req.userData = { login: decodedToken.login };
        next();
    } catch (error) {
        res.status(401).json({ message: "You are not authenticated!" });
    }
}