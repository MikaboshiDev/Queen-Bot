const { model, Schema } = require("mongoose")

module.exports = model("reporteDB", new Schema({

    ServidorID: String,
    ServidorNombre: String,
    CanalID: String,
    CanalNombre: String,
    CanalComandoID: String,
    CanalComandoNombre: String,
    RolMencionID: String,
    RolMencionNombre: String
    
}))