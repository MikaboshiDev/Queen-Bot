const { Schema, model } = require("mongoose")

const conteo = new Schema({
   guildId: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        default: 1
    }
})

module.exports = model("conteoDB", conteo)