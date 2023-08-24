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

const { Client, GatewayIntentBits, Partials, Collection, Options } = require("discord.js");
const { loadButton, loadEvents, loadString, loadModals } = require("./scripts/handlers");
const { logWithLabel } = require("./manager/prefijos")
require("module-alias/register");
require("dotenv").config({
    path: './config.env',
    debug: process.env.DEBUG
});

const client = new Client({
    shards: "auto",
    fetchAllMembers: false,
    restTimeOffset: 0,
    failIfNotExists: false,
    allowedMentions: {
        parse: ["users", "roles"],
        repliedUser: false,
    },
    makeCache: Options.cacheWithLimits({
        ...Options.DefaultMakeCacheSettings,
        ReactionManager: 0,
        GuildMemberManager: {
            maxSize: 200,
            keepOverLimit: member => member.id === this.user.id,
        },
    }),
    intents: Object.values(GatewayIntentBits),
    partials: Object.values(Partials),
});

client.commands = new Collection();
client.buttons = new Collection();
client.events = new Collection();
client.modals = new Collection();
client.menus = new Collection();

loadButton(client);
loadEvents(client);
loadString(client);
loadModals(client);

client.login(process.env.token);
