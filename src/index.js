const express = require('express');


const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/', (req, res) => {
    res.send('Hello World!23');
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