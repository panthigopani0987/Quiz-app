const Quiz = require('../models/Quiz');
const calculateScore = require('../utils/calculateScore');

// Get all quizzes
const getAllQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        next(error);
    }
};

// Get quiz by ID
const getQuizById = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        next(error);
    }
};

// Submit quiz and calculate score
const submitQuiz = async (req, res, next) => {
    try {
        const { quizId, userAnswers } = req.body;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        const { score, totalQuestions } = calculateScore(quiz, userAnswers);
        res.status(200).json({ score, totalQuestions });
    } catch (error) {
        next(error);
    }
};

// Create Quiz
const createQuiz = async (req, res, next) => {
    try {
        const newQuiz = new Quiz(req.body);
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        next(error);
    }
};

//Update
const updateQuiz = async (req, res, next) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(updatedQuiz);
    } catch (error) {
        next(error);
    }
};

//delete
const deleteQuiz = async (req, res, next) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getQuizById,
    getAllQuizzes,
    createQuiz,
    submitQuiz,
    updateQuiz,
    deleteQuiz
}