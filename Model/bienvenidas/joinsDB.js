const { model, Schema } = require("mongoose");

module.exports = model("bienvenida", new Schema({

    ServidorID: String,
    ServidorNombre: String,
    Mensaje: { type: String, default: "{user} bienvenido a **{server}**" },
    Imagen: { type: String, default: "https://cdn.discordapp.com/attachments/1027458270589362257/1055591517454073876/100-beautiful-full-hd-4k-minecraft-wallpapers-picture-2-scSVR9CG2.jpg" },
    CanalID: String,
    CanalNombre: String,
    RolID: String,
    RolNombre: String

}))