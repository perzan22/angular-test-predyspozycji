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

exports.getQuestion = async (req, res, next) => {
    const id_pytania = req.query.id_pytania
    const query = `SELECT * FROM pytanie WHERE id_pytania = $1`
    const values = [id_pytania]
    const question = (await db.query(query, values)).rows[0];
    if (question) {
        res.status(200).json({
            id_pytania: question.id_pytania,
            tresc: question.tresc,
            instrukcja: question.instrukcja,
            ilosc_odpowiedzi: question.ilosc_odpowiedzi,
            id_typu: question.id_typu
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono pytania' })
    }
}