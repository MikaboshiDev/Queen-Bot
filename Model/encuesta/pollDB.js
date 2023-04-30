const { model, Schema } = require("mongoose");

module.exports = model("PollDB", new Schema({
    GuildID: String,
    ChannelID: String,
    MessageID: String,
    CreatedBy: String,
    Users: [String],
    Title: String,
    Chosen: [Object]
}));