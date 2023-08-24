/*
# Discord Server: https://discord.gg/pgDje8S3Ed
# Github: https://github.com/MikaboshiDev
# Docs: https://bit.ly/nightdevelopment
# Dashboard: https://bit.ly/nightdashboard

# Created by: MikaboshiDev
# Version: 1.0.0
# Discord: azazel_hla

# This file is the main configuration file for the bot.
# Inside this file you will find all the settings you need to configure the bot.
# If you have any questions, please contact us on our discord server.
# If you want to know more about the bot, you can visit our website.
*/
const { logWithLabel } = require("../manager/prefijos");
const mongoose = require("mongoose");
const chalk = require('chalk');
const fs = require("node:fs");
const os = require("node:os");

async function dbMongoose(client) {
    try {
        mongoose.set("strictQuery", false);
        const connectionPromise = mongoose.connect(process.env.mongoose, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error("Buffering timed out after 10000ms"));
            }, 10000);
        });

        await Promise.race([connectionPromise, timeoutPromise]);
        console.log(chalk.cyan.bold('HOSTING STATUS━━━━━━━━━━━━━━━━━━━┓'));
        console.log(`${chalk.cyan.bold('┃')} Cpu Arquitecture: ${chalk.green.bold(os.arch())}`);
        console.log(`${chalk.cyan.bold('┃')} Cpu Model: ${chalk.green.bold(os.cpus()[0].model)}`);
        console.log(`${chalk.cyan.bold('┃')} Memory Free: ${chalk.green.bold(`${Math.round(os.freemem() / 1024 / 1024)} MB`)}`);
        console.log(`${chalk.cyan.bold('┃')} Machine Uptime: ${chalk.green.bold(`${Math.round(os.uptime() / 60 / 60)} Hours`)}`);
        console.log(`${chalk.cyan.bold('┃')} Type: ${chalk.green.bold(os.type())}`);
        console.log(`${chalk.cyan.bold('┃')} Node Version: ${chalk.green.bold(os.version())}`);
        console.log(chalk.cyan.bold('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'));
    } catch (err) {
        logWithLabel("error", err.message)
        console.error(err);
    }
}

module.exports = {dbMongoose};
