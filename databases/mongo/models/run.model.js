const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;



const RunSchema = new Schema({
    runner_id: Schema.ObjectId,
    date: Date,
    distance: Number,
    time: Number
    }, {
    timestamps: true
});


const Run = Mongoose.model('runs', RunSchema);

module.exports = {
    RunSchema,
    Run
};