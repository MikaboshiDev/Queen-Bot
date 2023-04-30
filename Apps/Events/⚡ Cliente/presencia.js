const {
  Client,
  ActivityType,
  EmbedBuilder,
  WebhookClient,
  ButtonStyle,
  ButtonBuilder,
} = require(`discord.js`);

const ms = require("ms");
const os = require("os");
const chalk = require("chalk");
const mongoose = require("mongoose");

const { ChannelType } = require("discord.js");
const moment = require('moment');
const osu = require('node-os-utils');
const Discord = require('discord.js');
const fs = require("fs");
require('moment-duration-format')
const DB = require("../../../Model/client/clientDB");

const cpus = os.cpus();
const cpu = cpus[0];

const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);

const usage = process.cpuUsage();
const currentCPUUsage = (usage.user + usage.system) * 1000;
const perc = (currentCPUUsage / total) * 100;

async function getMemoryUsage() {
  return process.memoryUsage().heapUsed / (1024 * 1024).toFixed(2);
}

const startUsage = process.cpuUsage();
const now = Date.now();
while (Date.now() - now < 500);
let userUsage = process.cpuUsage(startUsage).user / 1000;
let sysUsage = process.cpuUsage(startUsage).system / 1000 || 0;

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param { Client } client
   */
  execute(client) {
    const initialStatus = setTimeout(() => {
      client.user.setPresence({
        activities: [
          {
            name: `Iniciando construccion de la base de datos`,
            type: ActivityType.Playing,
          },
        ],
        status: "idle",
      });
    });

    const statusArray = [
      `Uso Ram: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}%`,
      `Info API: ${client.ws.ping}ms | Servers: ${client.guilds.cache.size} | Users: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`,
      `${client.guilds.cache.size} Servidores en Discord Presentes`,
      `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Usuarios en discord dresentes`,
      `${client.channels.cache.size} Canales de discord observando`,
      `Creador por ${client.users.cache.get("679560282929889331").tag}`,
      `Presentes en Host: Teramont Minecraft & Discord Hostings`
    ];

    let index = 0;
    const randTime = Math.floor(Math.random() * 5) + 1;

    setTimeout(() => {
      setInterval(() => {
        if (index === statusArray.length) index = 0;
        const status = statusArray[index];

        client.user.setPresence({
          activities: [{ name: status, type: ActivityType.Listening }],
          status: "idle",
        });
        index++;
      }, 6 * 1000);
    }, randTime);

    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      const filleds = filledBar(100, (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1));
      console.log("Ram: ".red + filleds[0] + " [" + filleds[1] + "%]");

      console.log(chalk.cyan.bold('EVENTS STATUS━━━━━━━━━━━━━━━━━━━━┓'));
      console.log(`${chalk.cyan.bold('┃')} Cargados: ${client.user.tag}`);
      console.log(`${chalk.cyan.bold('┃')} Database: ${chalk.greenBright('Conectada ✅')}`);
      console.log(`${chalk.cyan.bold('┃')} Fecha: ${chalk.cyanBright(new Date().toLocaleString())}`);
      console.log(chalk.cyan.bold('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'));

      console.log(chalk.yellow.bold('STATS COMMANDS━━━━━━━━━━━━━━━━━━━┓'));
      console.log(`${chalk.yellow.bold('┃')} Comandos Cargados: ${client.commands.size}`);
      console.log(`${chalk.yellow.bold('┃')} Eventos Cargados: ${client.events.size}`);
      console.log(`${chalk.yellow.bold('┃')} Menus Cargados: ${client.selectMenus.size}`);
      console.log(`${chalk.yellow.bold('┃')} Modales Cargados: ${client.modals.size}`);
      console.log(`${chalk.yellow.bold('┃')} Botones Cargados: ${client.buttons.size}`);
      console.log(chalk.yellow.bold('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'));

      console.log(chalk.red.bold('BOT INFO━━━━━━━━━━━━━━━━━━━━━━━━━┓'));
      console.log(`${chalk.red.bold('┃')} Nombre: ${client.user.tag}`);
      console.log(`${chalk.red.bold('┃')} ID: ${client.user.id}`);
      console.log(`${chalk.red.bold('┃')} Latencia: ${Math.round(client.ws.ping)}ms`);
      console.log(`${chalk.red.bold('┃')} Uso de CPU: ${(perc / 1000).toFixed(1)} %`);
      console.log(`${chalk.red.bold('┃')} Uso de RAM: ${userUsage} MB`);
      console.log(`${chalk.red.bold('┃')} Miembros: ${client.users.cache.size}`);
      console.log(`${chalk.red.bold('┃')} Servidores: ${client.guilds.cache.size}`);
      console.log(`${chalk.red.bold('┃')} Canales: ${client.channels.cache.size}`);
      console.log(`${chalk.red.bold('┃')} Creado por: ${chalk.greenBright(`${client.users.cache.get("679560282929889331").tag}`)}`);
      console.log(`${chalk.red.bold('┃')} Fecha de Creacion: ${client.user.createdAt.toLocaleDateString()}`);
      console.log(chalk.red.bold('┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛'));
    })

    let memArray = [];

    setInterval(async () => {
      memArray.push(await getMemoryUsage());

      if (memArray.length >= 14) {
        memArray.shift();
      }

      await DB.findOneAndUpdate(
        {
          Client: true
        },
        {
          Memory: memArray
        },
        {
          upsert: true
        }
      );
    }, ms("30s"));
  },
};
