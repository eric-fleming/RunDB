const express = require('express');
const router = express.Router();
const Friends = require('../databases/mongo/models/friends.model');
const RunnerCollection = require('../databases/mongo/models/runner.model');
const Update = require('../databases/mongo/utils/check');


// middleware that logs time
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});


// ROUTES
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


router.post('/addRunner', (req,res) => {
    const friends = req.body.friends;

    const newRunnerRecord = new RunnerCollection({
        name: {
            first: req.body.firstName,
            last: req.body.lastName
        },
        location: {
            city: req.body.city,
            country: req.body.country
        },
        searchable: req.body.searchable
    });

    newRunnerRecord.save()
        .then(runner => res.json('runner record added'))
        .catch(err => res.status(400).json('Error: ' + err));
});






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