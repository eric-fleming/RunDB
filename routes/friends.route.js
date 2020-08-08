const express = require('express');
const router = express.Router();
const Friends = require('../databases/mongo/models/friends.model');



// middleware that logs time
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
});


// ROUTES
router.get('/', (req,res) => {
    Friends.find()
        .then(friends => res.json(friends))
        .catch(err => res.status(400).json('Error: '+err));
});



router.post('/add', (req, res) => {

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