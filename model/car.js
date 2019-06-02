const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const car = new Schema({
    name: String,
    price: Number,
    wheel: Number
});


module.exports = mongoose.model('car', car);

