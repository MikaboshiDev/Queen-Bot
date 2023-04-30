const mongoose = require('mongoose');

const ecoSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    dinero: {type: Number, default: 500},
    banco: {type: Number, default: 3000},
    daily: String,
    work: String,
    crime: String,
})

const model = mongoose.model("economia", ecoSchema);

module.exports = model;