const express = require('express');
const router = express.Router();
// DATABASE QUERIES
const runner_db_queries = require('../database/runner_model');

// middleware that logs time
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

// Base Route : /runners

router.get('/', (req, res) => {
    console.log(`Fetching runners...`);
    runner_db_queries.getAllRunners()
        .then(response => {
            res.status(200).send({ data: response });
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.get('/:id', (req, res) => {
    runner_db_queries.getRunnerById(req.params.id)
        .then(response => {
            res.status(200).send({ data: response });
            console.log(`Fetching runner by id:${req.params.id}...`);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});


router.post('/', (req, res) => {

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

router.put('/:id', (req, res) => {
    runner_db_queries.editRunner(req.body)
        .then(response => {
            res.status(200).send(response);
            console.log(`Processing PUT : ${req.body.first} ${req.body.last}`);
        })
        .catch(error => {
            res.status(500).send(error)
            console.log(`ERROR PUT : ${req.body.first} ${req.body.last}`);
        })
});

router.delete('/:id', (req, res) => {

    runner_db_queries.deleteRunner(req.params.id)
        .then(response => {
            res.status(200).send(response);
            console.log(`Processing DELETE : ID=${req.params.id}`);
        })
        .catch(error => {
            res.status(500).send(error)
            console.log(`ERROR DELETE : ID=${req.params.id}`);
            console.log(error)
        })
});

module.exports = router;