const { loadCommands } = require("../../../scripts/handlers");
const { dbMongoose } = require("../../../scripts/mongoose");
const Discord = require(`discord.js`)
module.exports = {
    name: `ready`,
    once: true,
    async execute(client, ) {
        loadCommands(client);
        dbMongoose();
    }}