const mongoose = require('mongoose');

const loggerSchema = new mongoose.Schema({
    guildID: String,
    channelID: String,
})

const model = mongoose.model("logger", loggerSchema);

module.exports = model;