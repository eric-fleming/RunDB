//  APP DEPENDENCIES
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();


// ROUTES
const runners = require('./routes/runner.routes');
const runs = require('./routes/run.routes');



app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

// Can be used to access static resources.
app.use('/public', express.static('public'));


// ROUTES
app.use('/runners', runners);
app.use('/runs', runs);

app.get('/', (req, res) => {
    res.status(200).send('Server is running...');
});

app.get('/info', (req, res) => {
    res.sendFile('./public/info.html', { root: __dirname });
});

app.get('/error', (req, res) => {
    res.sendFile('./public/error.html', { root: __dirname });
});

module.exports = app;