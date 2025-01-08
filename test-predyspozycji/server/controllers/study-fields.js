const db = require('../db')

exports.getStudyFields = async (req, res, next) => {
    const query = `SELECT * FROM kierunek`;
    const result = await db.query(query);
    if (result) {
        res.status(200).json({
            studyFields: result.rows,
            message: 'Kierunki znalezione!'
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono kierunków' })
    }
}

exports.getStudyField = async (req, res, next) => {
    const id_kierunku = req.query.id_kierunku
    const query = `SELECT * FROM kierunek WHERE id_kierunku = $1`;
    const values = [id_kierunku]
    const studyField = (await db.query(query, values)).rows[0];
    if (studyField) {
        res.status(200).json({
            id_kierunku: studyField.id_kierunku,
            nazwa: studyField.nazwa,
            wydzial: studyField.wydzial,
            wartosc_punktowa: studyField.wartosc_punktowa
        })
    } else {
        res.status(404).json({ message: 'Nie znaleziono kierunku' })
    }
}

exports.addStudyField = async (req, res, next) => {
    const studyField = {
        nazwa: req.body.nazwa,
        wydzial: req.body.wydzial,
        wartosc_punktowa: +req.body.wartosc_punktowa
    };

    const query = `INSERT INTO kierunek (nazwa, wydzial, wartosc_punktowa) VALUES ($1, $2, $3)`;
    const values = [studyField.nazwa, studyField.wydzial, studyField.wartosc_punktowa];

    try {
        const result = await db.query(query, values);
        res.status(201).json({
            message: 'Kierunek dodany pomyślnie!',
            studyField: result.rows[0],
        });
    } catch (error) {
        console.error('Błąd podczas dodawania kierunku:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

exports.editStudyField = async (req, res, next) => {
    const studyField = {
        id_kierunku: req.query.id_kierunku,
        nazwa: req.body.nazwa,
        wydzial: req.body.wydzial,
        wartosc_punktowa: +req.body.wartosc_punktowa
    };

    const query = `UPDATE kierunek SET nazwa = $1, wydzial = $2, wartosc_punktowa = $3 WHERE id_kierunku = $4`
    const values = [studyField.nazwa, studyField.wydzial, studyField.wartosc_punktowa, studyField.id_kierunku];

    try {
        const result = await db.query(query, values);
        res.status(201).json({
            message: 'Kierunek edutowany pomyślnie!',
            studyField: result.rows[0],
        });
    } catch (error) {
        console.error('Błąd podczas dodawania kierunku:', error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}