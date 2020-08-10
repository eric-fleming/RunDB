const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const friendSchema = new Schema({
    runnerID: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    friends : [Number],
    },{
        timestamps:true
    });

const Friends = Mongoose.model('Friends', friendSchema);
module.exports = Friends;