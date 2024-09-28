const express = require('express');
const quizRoutes = require('./routes/quizRoutes');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

// Connect to MongoDB
require('dotenv').config();
connectDB();

//middleware
app.use(express.json());
const errorHandler = (err, req, res, next) => {
    res.status(500).json({ message: err.message });
};
app.use(errorHandler);

// Quiz Routes
app.use('/api/quizzes', quizRoutes);;

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Shutting down server...');
    process.exit();
});