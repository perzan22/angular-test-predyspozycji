const db = require('../db')
const { addAnswer, getAnswers, resetAnswers } = require('../store/answersStore')

let answers = [];

exports.saveAnswers = (req, res, next) => {
    const { answer } = req.body
    if (answer) {
        addAnswer(answer.ilosc_odpowiedzi);
        console.log(getAnswers())
        res.status(200).json({ message: 'Odpowiedź zapisana', answer: answer })
    } else {
        res.status(400).json({ message: 'Brak odpowiedzi' })
    }
}

exports.getAnswers = async (req, res, next) => {
    const id_pytania = req.query.id_pytania
    const query = `SELECT * FROM odpowiedz WHERE id_pytania = $1 ORDER BY id_odpowiedzi`;
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

exports.editAnswer = async (req, res, next) => {
    const answer = {
        id_odpowiedzi: req.query.id_odpowiedzi,
        tresc: req.body.tresc,
        wartosc_punktowa: req.body.wartosc_punktowa,
        id_pytania: +req.body.id_pytania
    };



    const query = `UPDATE odpowiedz SET tresc = $1, wartosc_punktowa = $2, id_pytania = $3 WHERE id_odpowiedzi = $4`
    const values = [answer.tresc, answer.wartosc_punktowa, answer.id_pytania, answer.id_odpowiedzi];

    try {
        const result = await db.query(query, values);
        res.status(201).json({
            message: 'Odpowiedz edytowana pomyślnie!'
        });
    } catch (error) {
        console.error('Błąd podczas edytowania odpowiedzi:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}