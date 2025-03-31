require('dotenv').config();
const express = require('express');


const app = express();
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
// Middleware
app.use(express.json());

// Routes
app.use('/', (req, res) => {
    res.send(`${DB_HOST}${DB_USER} Hello World!23`);
}
);
// Routes
app.use('/api', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});