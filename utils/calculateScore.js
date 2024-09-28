function calculateScore(quiz, userAnswers) {
    let score = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === userAnswers[index]) {
            score++;
        }
    });

    return { score, totalQuestions };
}

module.exports = calculateScore;  