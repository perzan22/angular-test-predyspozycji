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