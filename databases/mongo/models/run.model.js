const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;



const RunSchema = new Schema({
    runner_id: Schema.ObjectId,
    date: Date,
    distance: Number,
    time: Number

})

module.exports = RunSchema;