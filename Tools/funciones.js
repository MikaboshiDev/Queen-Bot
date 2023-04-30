const Discord = require('discord.js');
const serverSchema = require(`${process.cwd()}/Model/economia/servidor.js`);
const setupSchema = require(`${process.cwd()}/Model/economia/setups.js`);
const ecoSchema = require(`${process.cwd()}/Model/economia/economia.js`);
const config = require(`${process.cwd()}/config.json`);
const chalk = require(`chalk`);
module.exports = {
    asegurar_todo,
}

async function asegurar_todo(guildid, userid) {
    
    if (guildid) {
        let serverdata = await serverSchema.findOne({ guildID: guildid })
        if (!serverdata) {
            console.log(chalk.cyanBright(`[ Configuracion - Funciones ]`) + chalk.whiteBright(` Configuraciones de seguridad y economia realizadas con exito`));
            serverdata = await new serverSchema({
                guildID: guildid,
                prefijo: config.prefix
            });
            await serverdata.save();
        }

        let setupsdata = await setupSchema.findOne({ guildID: guildid });

        if (!setupsdata) {
            console.log(chalk.cyanBright(`[ Setups - Funciones ]`) + chalk.whiteBright(` Setups del bot de discord estan asegurados`));
            setupsdata = await new setupSchema({
                guildID: guildid,
                reaccion_roles: [],
            });
            await setupsdata.save();
        }

        if (userid) {
            let ecodata = await ecoSchema.findOne({ userID: userid })
            if (!ecodata) {
                console.log(chalk.cyanBright(`[ Asegurado - Funciones ]`) + chalk.whiteBright(` Economia de ${userid} esta asegurada con exito`));
                ecodata = await new ecoSchema({
                    userID: userid
                });
                await ecodata.save();
            }
        }
    }
}


