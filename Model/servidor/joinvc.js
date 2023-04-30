const mongoose = require('mongoose');

const loggerSchema = new mongoose.Schema({
    guildID: String,
    voziD: String,
    textoID: String,
    mensaje: String
})

const model = mongoose.model("Sistema-JoinVc", loggerSchema);

module.exports = model;