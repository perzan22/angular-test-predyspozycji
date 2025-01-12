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

exports.editQuestion = async (req, res, next) => {
    const question = {
        id_pytania: req.query.id_pytania,
        tresc: req.body.tresc,
        instrukcja: req.body.instrukcja,
        ilosc_odpowiedzi: +req.body.ilosc_odpowiedzi,
        id_typu: +req.body.id_typu
    };

    const query = `UPDATE pytanie SET tresc = $1, instrukcja = $2, ilosc_odpowiedzi = $3, id_typu = $4 WHERE id_pytania = $5`
    const values = [question.tresc, question.instrukcja, question.ilosc_odpowiedzi, question.id_typu, question.id_pytania];

    try {
        const result = await db.query(query, values);
        res.status(201).json({
            message: 'Pytanie edytowany pomyślnie!',
            question: result.rows[0],
        });
    } catch (error) {
        console.error('Błąd podczas edytowania pytania:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}