const express = require('express');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Bug Tracker API is running' });
});

app.use('/api/bugs', bugRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;