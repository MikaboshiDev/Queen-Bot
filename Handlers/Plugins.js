const { readdirSync } = require("fs");
const { filledBar } = require('string-progressbar');
const chalk = require('chalk');

async function loadAddons(client) {
    try {
        const addons = readdirSync("./Addons").filter((file) => file.endsWith(".js"));
        const filled = filledBar(100, addons.length);

        console.log("Add: ".red + filled[0] + " [" + filled[1] + "%]");
        readdirSync("./Addons").forEach((file) => {
            if (!file.endsWith(".js")) return;
            require(`../Addons/${file}`)(client);
        })
    } catch (e) {
        console.log(`Error al cargar los addons: ${e.message}`);
    }
}

module.exports = { loadAddons };