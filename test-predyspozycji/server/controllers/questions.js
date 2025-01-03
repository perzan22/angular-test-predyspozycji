const db = require('../db')


exports.getQuestions = async (req, res, next) => {
    const query = `SELECT * FROM pytanie`;
    const result = await db.query(query);
    if (result) {
        res.status(200).json({
            questions: result.rows,
            message: 'Pytania znalezione!'
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono pytań' })
    }
}