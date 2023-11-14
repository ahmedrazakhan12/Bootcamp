const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Middle-ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Serve static files

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'repeat',
});

db.connect((err) => {
    if (err) throw err; // Remove "new" keyword
    console.log('Connected to database');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Data into Database
// Existing code...

// Data into Database
app.post('/submit', (req, res) => {
    const { name, surname, email, password, gender } = req.body;
    const query = 'INSERT INTO user(name, Surname, email, password, gender) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, surname, email, password, gender], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Data from DataBase
app.get('/get-data',(req,res) => {
    const query = 'select * from user';
    
    db.query(query, (err,results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving data from the database');
        }
        res.json(results);
    })
})


// running
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

