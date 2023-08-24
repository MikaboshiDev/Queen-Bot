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

const { logWithLabel } = require("../manager/prefijos")
const { loadFiles } = require("../functions/files");
const chalk = require("chalk");
const fs = require("node:fs");

module.exports = {
    loadButton: async function (client) {
        const Files = await loadFiles("src/app/buttons");
        try {
            Files.forEach((file) => {
                const button = require(file);
                if (!button.id) return;
                client.buttons.set(button.id, button);
            });
        } catch (e) {
            logWithLabel("error", e.message)
        }
    },

    loadCommands: async function (client) {
        await client.commands.clear();
        let commands_array = [];
        const Files = await loadFiles(`src/app/commands`);
        try {
            Files.forEach((file) => {
                const command = require(file);
                client.commands.set(command.data.name, command);
                commands_array.push(command.data.toJSON());
            });
            client.application.commands.set(commands_array);
        } catch (e) {
            logWithLabel("error", e.message)
        }
    },

    loadEvents: async function (client) {
        client.events = new Map();
        const events = new Array();
        const files = await loadFiles("src/app/events");
        for (const file of files) {
            try {
                const event = require(file);
                const execute = (...args) => event.execute(...args, client);
                const target = events.rest ? client.rest : client;

                target[event.once ? "once" : "on"](event.name, execute);
                client.events.set(event.name, event);
                events.push({ Event: event.name, Status: "✅" });
            } catch (e) {
                logWithLabel("error", e.message)
            }
        }
    },

    loadString: async function (client) {
        const Files = await loadFiles("src/app/menus");
        try {
            Files.forEach((file) => {
                const selectMenu = require(file);
                if (!selectMenu.id) return;
                client.menus.set(selectMenu.id, selectMenu);
            });
        } catch (e) {
            logWithLabel("error", e.message)
        }
    },

    loadModals: async function (client) {
        const Files = await loadFiles("src/app/modals");
        try {
            Files.forEach((file) => {
                const modal = require(file);
                if (!modal.id) return;
                client.modals.set(modal.id, modal);
            });
        } catch (e) {
            logWithLabel("error", e.message)
        }
    }
}