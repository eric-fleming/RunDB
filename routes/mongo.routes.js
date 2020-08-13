
const express = require('express');
const router = express.Router();
const Friends = require('../databases/mongo/models/friends.model');
const RunnerCollection = require('../databases/mongo/models/runner.model').Runner;
const RunCollection = require('../databases/mongo/models/run.model').Run;
const Update = require('../databases/mongo/utils/check');


// middleware that logs time
router.use(function timeLog(req, res, next) {
    let now = Date.now();
    let utc = (new Date()).toUTCString();
    console.log(`Date: ${utc} ----> Miliseconds: ${now}`);
    next()
});

// ---------------------------------------------------------------------------------
// ---------------------------------RUNNER ROUTES-----------------------------------
// ---------------------------------------------------------------------------------

router.get('/runner/:id', (req, res) => {
    RunnerCollection.findById(req.params.id)
        .then(runner => res.json(runner))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.get('/runners', (req, res) => {
    RunnerCollection.find()
        .then(runners => res.json(runners))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.delete('/runner/:id', (req, res) => {
    RunnerCollection.findByIdAndDelete(req.params.id)
        .then(() => res.json(`Runner ${req.params.id} was deleted...`))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/runner/:id', (req, res) => {
    //update the name

    RunnerCollection.findById(req.params.id)
        .then(runner => {
            runner.name.first = req.body.first || runner.name.first;
            runner.name.last = req.body.last || runner.name.last;
            runner.location.city = req.body.city || runner.location.city;
            runner.location.country = req.body.country || runner.location.country;

            runner.save()
                .then(() => res.json(`updated ${req.body.runnerID}`))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

router.put('/runner/follow', (req, res) => {
    //add them to my following

    RunnerCollection.findById(req.body.runnerID)
        .then(runner => {
            runner.following = Update.pushIfNotPresent(runner.following, req.body.subRunnerID);

            runner.save()
                .then(() => res.json(`following ${req.body.subRunnerID}`))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});


router.put('/runner/registerFollower', (req,res) => {
    // add myself to their followers
    RunnerCollection.findById(req.body.subRunnerID)
        .then(runner => {
            runner.followers = Update.pushIfNotPresent(runner.followers, req.body.runnerID);

            runner.save()
                .then(() => res.json(`new follower ${req.body.runnerID} registered`))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})


router.post('/runner', (req,res) => {
    
    console.log(req.body);
    const newRunnerRecord = new RunnerCollection({
        name: {
            first: req.body.first,
            last: req.body.last
        },
        location: {
            city: req.body.city,
            country: req.body.country
        },
        searchable: true
    });

    newRunnerRecord.save()
        .then(runner => res.json('runner record added'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// ---------------------------------------------------------------------------------
// ---------------------------------RUN ROUTES-----------------------------------
// ---------------------------------------------------------------------------------

router.get('/runs', (req, res) => {
    RunCollection.find()
        .then(runs => res.json(runs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/run/:id', (req, res) => {
    RunCollection.findById(req.params.id)
        .then(run => res.json(run))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/run', (req, res) => {

    console.log(req.body);
    const newRunRecord = new RunCollection({
        runner_id: req.body.runner_id,
        date: req.body.date,
        distance: req.body.distance,
        time: req.body.time,
        searchable: true
    });

    newRunRecord.save()
        .then(run => res.json('run record added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/run/:id', (req, res) => {
    RunCollection.findByIdAndDelete(req.params.id)
        .then(() => res.json(`Run ${req.params.id} was deleted...`))
        .catch(err => res.status(400).json('Error: ' + err));
});

// ---------------------------------------------------------------------------------
// ---------------------------------FRIEND ROUTES-----------------------------------
// ---------------------------------------------------------------------------------
// OLD ROUTES FOR TEMPLATING
router.get('/getFriends', (req, res) => {
    Friends.find()
        .then(friends => res.json(friends))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.post('/addFriend', (req, res) => {

    const runnerID = req.body.runnerID;
    const friends = req.body.friends;

    const newFriendsRecord = new Friends({
        runnerID,
        friends
    });

    newFriendsRecord.save()
        .then(friends => res.json('friends record added'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;