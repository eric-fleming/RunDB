/**
 * For connecting with Mongo Atlas and applying CRUD operations
 * @module MongoRoutes
 */
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
/**
 * Grab all inforamation about a specific runner
 * @function getRunnerByID
 * @param {string} :id
 * @returns {json} 
 */
router.get('/runner/:id', (req, res) => {
    RunnerCollection.findById(req.params.id)
        .then(runner => res.json(runner))
        .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * Grab all inforamation for all the runners in the database
 * @function getRunners
 * @returns {json}
 */
router.get('/runners', (req, res) => {
    RunnerCollection.find()
        .then(runners => res.json(runners))
        .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * Delete inforamation about a specific runner
 * @function deleteRunnerById
 * @param {string} :id
 * @returns {json}
 */
router.delete('/runner/:id', (req, res) => {
    RunnerCollection.findByIdAndDelete(req.params.id)
        .then(() => res.json(`Runner ${req.params.id} was deleted...`))
        .catch(err => res.status(400).json('Error: ' + err));
});


/**
 * A runner adds another runner to their following field
 * @function follow
 * @property {string} req.body.runnerID
 * @property {string} req.body.subRunnerID
 * @returns {json}
 */
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


/**
 * A runner adds themselves to another runner'f follower field
 * @function registerFollower
 * @property {string} req.body.runnerID
 * @property {string} req.body.subRunnerID
 * @returns {json}
 */
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

/**
 * Add a new runner to the database
 * @function addRunner
 * @property {string} req.body.firstName
 * @property {string} req.body.lastName
 * @property {string} req.body.city
 * @property {string} req.body.country
 * @property {string} req.body.searchable
 * @returns {json}
 */
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