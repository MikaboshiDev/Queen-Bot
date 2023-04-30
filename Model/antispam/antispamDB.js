const { model, Schema } = require("mongoose");

module.exports = model("antispamDB", new Schema({

    ServidorID: String,
    ServidorNombre: String,
    CanalID: String,
    CanalNombre: String,
    Tiempo: { type: String, default: "1m" },
    MensajeServer: { type: String, default: "{user} ha sido aislado temporalmente por {razon}!\n\nPor favor no envies tantos mensajes a la vez, recuerda que las advertencias son acumulativas y puedes ser baneado!" },
    MensajeUser: { type: String, default: "{user} has sido aislado temporalmente por {razon}!\n\nPor favor no envies tantos mensajes a la vez, recuerda que las advertencias con acumulativas y puedes ser baneado!" },
    Imagen: { type: String, default: "https://i.imgur.com/QOLhJOJ.png" },
    Canales: Array
    //Advertencias: Array  // esto esta en desarrollo aun

}))