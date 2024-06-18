const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const app = express();
const port = 5000;

// MongoDB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./Routes/Auth'));
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Default route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
