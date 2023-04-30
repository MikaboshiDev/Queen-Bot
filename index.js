const { Client, GatewayIntentBits, Partials, Collection, Options } = require(`discord.js`);
const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions, GuildVoiceStates, GuildEmojisAndStickers, GuildPresences, GuildInvites } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Reaction, Channel } = Partials;

const { DiscordTogether } = require("discord-together");
const fs = require("fs");
require("colors")
require("dotenv").config({
  path: './config.env',
  debug: process.env.DEBUG
});

const client = new Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  failIfNotExists: false,
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: false,
  },
  intents: [ Guilds, GuildMembers, GuildMessages, GuildMessageReactions, GuildVoiceStates, GuildEmojisAndStickers, GuildPresences, GuildInvites ],
  partials: [ User, Message, GuildMember, ThreadMember, Reaction, Channel ],
});

const { loadEvents } = require(`./Handlers/Events`);
const { loadModals } = require("./Handlers/Modals");
const { loadSelectMenus } = require("./Handlers/Menus");
const { loadAddons } = require("./Handlers/Plugins");

const { loadButtons } = require("./Handlers/Buttons");
const { embedPages } = require("./Handlers/Paginas");

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();
client.events = new Collection();

client.la = {}
var langs = fs.readdirSync("./Languages")
for (const lang of langs.filter(file => file.endsWith(".json"))) {
  client.la[`${lang.split(".json").join("")}`] = require(`./Languages/${lang}`)
}
Object.freeze(client.la)

loadButtons(client);
loadModals(client);
loadSelectMenus(client);

loadEvents(client);
loadAddons(client);

client.cookiescooldowns = new Collection();
client.discordTogether = new DiscordTogether(client);

client.color = process.env.color;
client.login(process.env.token);
