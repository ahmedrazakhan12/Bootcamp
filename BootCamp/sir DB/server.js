const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Serve static files

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // your MySQL username
    password: '', // your MySQL password
    database: 'database'
});

// Connecting to database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const { email, password } = req.body;
    const query = 'INSERT INTO information (email, password) VALUES (?, ?)';
    db.query(query, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error inserting data into the database');
        }
        res.redirect('/');
    });
});


app.get('/get-data', (req, res) => {
    // Define your SQL query to retrieve data
    const query = 'SELECT email, password FROM information WHERE email = ? AND password = ?';
    const values = [req.body.email, req.body.password];
    
    db.query(query, values, (err, results) => {
        
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving data from the database');
        }

        // Send the retrieved data as a JSON response
        res.json(results);
        res.redirect('/');
    });
});


// making Port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});


