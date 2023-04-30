const Discord = require("discord.js");
const fs = require("fs");
module.exports = {
    name: "rateLimit",
    async execute(rateLimitData, client) {
        console.log(JSON.stringify(rateLimitData)).then(() => {
            fs.writeFile(`../../../Tools/Registros/Host/RateLimit-${client.user.id}.log`, JSON.stringify(rateLimitData), (err) => {
                if (err) throw err;
                console.log(`RateLimit Data Saved!`);
            });
        })
    }
}