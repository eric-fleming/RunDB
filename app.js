//  APP DEPENDENCIES
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


// ROUTER DEPS
const runners = require('./routes/runner.routes');
const runs = require('./routes/run.routes');
const friends = require('./routes/friends.route');
const mongo = require('./routes/mongo.routes');

// MIDDLEWARE
app.use(express.json());
app.use(cors());
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
app.use('/friends', friends);
app.use('/mongo', mongo);

app.get('/', (req, res) => {
    res.status(200).send('Server is running...');
});

app.get('/info', (req, res) => {
    res.sendFile('./public/info.html', { root: __dirname });
});

app.get('/error', (req, res) => {
    res.sendFile('./public/error.html', { root: __dirname });
});

// CLOUD DATABASE
const mongo_atlas_uri = process.env.MONGO_ATLAS_URI;
mongoose.connect(mongo_atlas_uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('MongoDB Atlas connection successfully established');
});

module.exports = app;