const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const RunSchema = require('./run.model');


const RunnerSchema = new Schema({
    name: {
        first: {
            type:String,
            trim: true
        },
        last:{
            type: String,
            trim: true
        }
    },
    location: {
        city: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        }
    },
    following: [Schema.ObjectId],
    followers: [Schema.ObjectId],
    history: [RunSchema],
    feed: [Schema.ObjectId],
    searchable: Boolean

}, {
    timestamps: true
});



const Runner = Mongoose.model('runners', RunnerSchema);
module.exports = Runner;