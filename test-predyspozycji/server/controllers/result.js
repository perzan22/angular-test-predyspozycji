const { getAnswers } = require('../store/answersStore')
const calculateAverage = require('../functions/calculateAverage')
const db = require('../db')
const findClosestField = require('../functions/findClosestField')

exports.getResults = async (req, res, next) => {
    const average = calculateAverage(getAnswers())

    const query = `SELECT * FROM kierunek`;
    const result = await db.query(query);
    const kierunki = result.rows;

    const kierunek = findClosestField(average, kierunki)

    res.status(200).json({ kierunek: kierunek })
}