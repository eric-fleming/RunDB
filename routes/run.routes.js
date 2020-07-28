const express = require('express');
const router = express.Router();
const running_history_db_queries = require('../database/running_history_db_queries');
// middleware that logs time
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});

// Base Route : /runs
router.get('/', (req, res) => {
    running_history_db_queries.getRunningHistory()
        .then(response => {
            res.status(200).send({ data: response });
            console.log(`Fetching runs...`);
        })
        .catch(error => {
            res.status(500).send(error);
        })
});

router.post('/', (req, res) => {

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

module.exports = router;