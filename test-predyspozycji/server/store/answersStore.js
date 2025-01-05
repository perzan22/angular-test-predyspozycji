let answers = [];

const addAnswer = (answer) => {
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