const express = require('express');
const router = express.Router();
const run_table = require('../databases/postgresql/running_history_db_queries');
// middleware that logs time
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

// Base Route : /runs
router.get('/', (req, res) => {
    console.log(`Fetching runs...`);
    run_table.getRunningHistory()
        .then(response => {
            res.status(200).send({ data: response });
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/', (req, res) => {

    run_table.createRun(req.body)
        .then(response => {
            res.status(200).send(response);
            console.log(`Processing POST : runner=${req.body.runnerid} dist=${req.body.distance} time=${req.body.time}`);
        })
        .catch(error => {
            res.status(500).send(error)
            console.log(`ERROR POST : runner=${req.body.runnerid} dist=${req.body.distance} time=${req.body.time}`);
        })
});

router.put('/:run_uid', (req, res) => {
    run_table.editRun(req.body)
        .then(response => {
            res.status(200).send(response);
            console.log(`Processing PUT : ${req.body}`);
        })
        .catch(error => {
            res.status(500).send(error)
            console.log(`ERROR PUT : ${req.body}`);
        })
});

router.delete('/:run_uid', (req, res) => {
    console.log(req.params);
    run_table.deleteRun(req.params.run_uid)
        .then(response => {
            res.status(200).send(response);
            console.log(`Processing DELETE : ID=${req.params.run_uid}`);
        })
        .catch(error => {
            res.status(500).send(error)
            console.log(`ERROR DELETE : ID=${req.params.run_uid}`);
            console.log(error)
        })
});

module.exports = router;