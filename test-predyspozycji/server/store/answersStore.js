let answers = [];

const addAnswer = (answer) => {
    console.log(answer)
    answers.push(answer);
};

const getAnswers = () => {
    return answers;
};

const resetAnswers = () => {
    answers = [];
}

module.exports = {
    addAnswer,
    getAnswers,
    resetAnswers
}