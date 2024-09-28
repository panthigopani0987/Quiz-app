const express = require('express');
const routes = express.Router();
const quizController = require('../controllers/quizController');


routes.get('/', quizController.getAllQuizzes);
routes.get('/:id', quizController.getQuizById);
routes.post('/submit', quizController.submitQuiz);
routes.post('/', quizController.createQuiz);
routes.put('/:id', quizController.updateQuiz);
routes.delete('/:id', quizController.deleteQuiz);

module.exports = routes;
