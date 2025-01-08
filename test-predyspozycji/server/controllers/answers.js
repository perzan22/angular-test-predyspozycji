const db = require('../db')
const { addAnswer, getAnswers, resetAnswers } = require('../store/answersStore')

let answers = [];

exports.saveAnswers = (req, res, next) => {
    const { answer } = req.body
    if (answer) {
        addAnswer(answer.wartosc_punktowa);
        console.log(getAnswers())
        res.status(200).json({ message: 'Odpowiedź zapisana', answer: answer })
    } else {
        res.status(400).json({ message: 'Brak odpowiedzi' })
    }
}

exports.getAnswers = async (req, res, next) => {
    const id_pytania = req.query.id_pytania
    const query = `SELECT * FROM odpowiedz WHERE id_pytania = $1`;
    const values = [id_pytania]
    const result = await db.query(query, values);
    if (result) {
        res.status(200).json({
            answers: result.rows,
            message: 'Odpowiedzi znalezione!'
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono odpowiedzi' })
    }
}

exports.resetAnswers = (req, res, next) => {
    resetAnswers();
    res.status(200).json({
        message: 'Odpoweidzi wyzerowane.'
    })
}

exports.getAllAnswers = async (req, res, next) => {
    const query = `SELECT * FROM odpowiedz`;
    const result = await db.query(query);
    if (result) {
        res.status(200).json({
            answers: result.rows,
            message: 'Odpowiedzi znalezione!'
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono odpowiedzi' })
    }
}