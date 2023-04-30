const Discord = require("discord.js");
module.exports = {
    name: "error",
    async execute(error, client) {
        console.log(String(error));
    }
}