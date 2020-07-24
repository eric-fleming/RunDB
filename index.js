const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = 3001;

const runner_db_queries = require('./database/run_model');
const running_history_db_queries = require('./database/running_history_db_queries');
//const { response } = require('express');



app.use(express.json());
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

// Can be used to access static resources.
app.use('/public', express.static('public'));


// ROUTES
app.get('/', (req, res) => {
    res.status(200).send('Server is running...');
});

app.get('/info', (req, res) => {
    res.sendFile('./public/info.html', { root: __dirname });
});

app.get('/error', (req, res) => {
    res.sendFile('./public/error.html', { root: __dirname });
});


app.get('/runs', (req, res) => {
    running_history_db_queries.getRunningHistory()
        .then(response => {
            res.status(200).send({ data: response});
            console.log(`Fetching runs...`);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

app.get('/runners', (req, res) => {
    runner_db_queries.getAllRunners()
        .then(response => {
            res.status(200).send({ data: response });
            console.log(`Fetching runners...`);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

app.get('/runners/:id', (req, res) => {
    runner_db_queries.getRunnerById(req.params.id)
        .then(response => {
            res.status(200).send({ data: response });
            console.log(`Fetching runner by id:${req.params.id}...`);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});


app.post('/addrunner', (req,res) => {
    
    runner_db_queries.createRunner(req.body)
    .then(response => {
        res.status(200).send(response);
        console.log(`Processing POST : ${req.body.first} ${req.body.last}`);
    })
    .catch(error => {
        res.status(500).send(error)
        console.log(`ERROR POST : ${req.body.first} ${req.body.last}`);
    })
});

app.post('/addrun', (req, res) => {

    running_history_db_queries.createRun(req.body)
        .then(response => {
            res.status(200).send(response);
            console.log(`Processing POST : runner=${req.body.runnerid} dist=${req.body.distance} time=${req.body.time}`);
        })
        .catch(error => {
            res.status(500).send(error)
            console.log(`ERROR POST : runner=${req.body.runnerid} dist=${req.body.distance} time=${req.body.time}`);
        })
});



// START SERVER
app.listen(port, () =>{
    console.log(`App running on port ${port}`);
});

// '0.0.0.0' to opt out of local host