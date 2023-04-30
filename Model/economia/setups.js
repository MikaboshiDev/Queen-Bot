const mongoose = require('mongoose');

const setupSchema = new mongoose.Schema({
    guildID: String,
})

const model = mongoose.model("Configuraciones", setupSchema);

module.exports = model;