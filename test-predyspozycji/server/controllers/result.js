const { getAnswers } = require('../store/answersStore')
const calculateAverage = require('../functions/calculateAverage')
const db = require('../db')
const findClosestField = require('../functions/findClosestField')

exports.getTestResult = async (req, res, next) => {
    const average = calculateAverage(getAnswers())

    const query = `SELECT * FROM kierunek`;
    const result = await db.query(query);
    const kierunki = result.rows;

    
    const kierunek = findClosestField(average, kierunki)

    res.status(200).json({ 
        kierunek: kierunek,
        wynik: average
    })
}

exports.addNewResult = async (req, res, next) => {

    const testResult = {
        data: new Date(),
        id_kandydata: req.body.id_kandydata,
        id_kierunku: req.body.id_kierunku,
        wynik: req.body.wynik
    }

    const query = `INSERT INTO wynik_testu (data, id_kandydata, id_kierunku, wynik) VALUES ($1, $2, $3, $4)`;
    const values = [testResult.data, testResult.id_kandydata, testResult.id_kierunku, testResult.wynik];

    try {

        const result = await db.query(query, values);
        res.status(201).json({
            message: 'Kandydat poprawnie dodany!',
            wynik_testu: result.rows[0]
        })

    } catch (error) {

        console.error('Błąd podczas dodawania wyniku:', error);
        res.status(500).json({ error: 'Błąd serwera' });

    }

}

