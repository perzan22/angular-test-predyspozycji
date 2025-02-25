const db = require('../db')
const { addAnswer, resetAnswers } = require('../store/answersStore')

let answers = [];

exports.saveAnswers = (req, res, next) => {
    const { answer } = req.body
    if (answer) {
        addAnswer({value: answer.wartosc_punktowa, label: answer.label});
        res.status(200).json({ message: 'Odpowiedź zapisana', answer: answer })
    } else {
        res.status(400).json({ message: 'Brak odpowiedzi' })
    }
}

exports.getAnswers = async (req, res, next) => {
    const id_pytania = req.query.id_pytania

    const query = `SELECT o.id_odpowiedzi, o.tresc, o.wartosc_punktowa, t.label 
    FROM odpowiedz AS o 
    JOIN pytanie AS p 
    ON p.id_pytania = o.id_pytania 
    JOIN typ_pytania AS t 
    ON t.id_typu = p.id_typu 
    WHERE o.id_pytania = $1 
    ORDER BY o.id_odpowiedzi`;

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
        message: 'Odpowiedzi wyzerowane.'
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

exports.addNewAnswer = async (req, res, next) => {
    const answer = {
        tresc: req.body.tresc,
        id_pytania: req.body.id_pytania,
        wartosc_punktowa: +req.body.wartosc_punktowa
    };

    const transaction = await db.connect()

    try {

        await transaction.query('BEGIN');
        const addAnswerQuery = `INSERT INTO odpowiedz (tresc, id_pytania, wartosc_punktowa) VALUES ($1, $2, $3)`;
        const answerValues = [answer.tresc, answer.id_pytania, answer.wartosc_punktowa];

        const answerResult = await transaction.query(addAnswerQuery, answerValues);

        const updateQuestionQuery = `UPDATE pytanie SET ilosc_odpowiedzi = ilosc_odpowiedzi + 1 WHERE id_pytania = $1`;
        const questionValues = [answer.id_pytania];

        await transaction.query(updateQuestionQuery, questionValues);

        await transaction.query(`COMMIT`);

        res.status(201).json({
            message: 'Odpowiedź dodana pomyślnie!',
            answer: answerResult.rows[0]
        });

    } catch (error) {
        await transaction.query(`ROLLBACK`);
        console.error('Błąd podczas dodawania odpowiedzi:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    } finally {
        transaction.release();
    }

}

exports.deleteAnswer = async (req, res, next) => {
    const answerID = req.query.id_odpowiedzi
    const questionID = req.query.id_pytania

    const transaction = await db.connect()

    try {

        await transaction.query('BEGIN');
        const deleteAnswerQuery = `DELETE FROM odpowiedz WHERE id_odpowiedzi = $1`;
        const answerValues = [answerID];

        const answerResult = await transaction.query(deleteAnswerQuery, answerValues);

        const updateQuestionQuery = `UPDATE pytanie SET ilosc_odpowiedzi = ilosc_odpowiedzi - 1 WHERE id_pytania = $1`;
        const questionValues = [questionID];

        await transaction.query(updateQuestionQuery, questionValues);

        await transaction.query(`COMMIT`);

        res.status(201).json({
            message: 'Odpowiedź usunięta pomyślnie!',
            answer: answerResult.rows[0]
        });

    } catch (error) {
        await transaction.query(`ROLLBACK`);
        console.error('Błąd podczas usuwania odpowiedzi:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    } finally {
        transaction.release();
    }
}