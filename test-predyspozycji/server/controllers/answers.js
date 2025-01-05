const db = require('../db')

let answers = [];

exports.saveAnswers = (req, res, next) => {
    const { answer } = req.body
    if (answer) {
        answers.push(answer);
        console.log(answers)
        res.status(200).json({ message: 'Odpowiedź zapisana', answer: answer })
    } else {
        res.status(400).json({ message: 'Brak odpowiedzi' })
    }
}

exports.getResults = (req, res, next) => {
    console.log(answers)
    res.status(200).json({ answers: answers })
}

exports.getAnswers = async (req, res, next) => {
    const id_pytania = req.query.id_pytania
    console.log(id_pytania)
    const query = `SELECT * FROM odpowiedz WHERE id_pytania = ${id_pytania}`;
    const result = await db.query(query);
    console.log(result.rows)
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
    answers = []
    res.status(200).json({
        message: 'Odpoweidzi wyzerowane.'
    })
}