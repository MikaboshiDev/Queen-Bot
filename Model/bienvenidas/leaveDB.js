const { model, Schema } = require("mongoose");

module.exports = model("despedidas", new Schema({

    ServidorID: String,
    ServidorNombre: String,
    Mensaje: { type: String, default: "{user} abandono el servidor" },
    Imagen: { type: String, default: "https://cdn.discordapp.com/attachments/1027458270589362257/1055591864239128687/ddb9be33931e8ccfa988c82c8acdfed4.jpg" },
    CanalID: String,
    CanalNombre: String,
    
}))