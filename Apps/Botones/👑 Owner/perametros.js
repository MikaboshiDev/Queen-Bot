const { ChatInputCommandInteraction } = require("discord.js");
const moment = require('moment');
const osu = require('node-os-utils');
const os = require('os');
const Discord = require("discord.js");
module.exports = {
  developer: true,
  id: "Parametros",
  /**
  * 
  * @param {ChatInputCommandInteraction} interaction 
  */
  async execute(interaction, client) {

    let cpuUsado;
    const cpu = osu.cpu;
    var mem = osu.mem;
    let freeRAM, usedRAM;

    await mem.info().then(info => {
      freeRAM = info['freeMemMb']
      usedRAM = info['totalMemMb'] - freeRAM
    });

    let values = {
      high: 200,
      medium: 100,
      low: 50
    };

    const response = new Discord.EmbedBuilder()
      .setTitle("Performance Date Bot Status")
      .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
      .setDescription(`**INFORMATION BASIC BOT**\n \`\`\`prolog\n${(usedRAM, freeRAM)} [${Math.round((100 * usedRAM / (usedRAM + freeRAM)))}%]\`\`\``)
      .addFields(
        { name: `\`•\` System: Intel`, value: `\`\`\`prolog\n${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB\`\`\`` },
        { name: `\`•\` Operative System: `, value: `\`\`\`prolog\n${os.type} ${os.release} ${os.arch}\`\`\`` },
        { name: `\`•\` Last Login:`, value: `\`\`\`prolog\n${moment(client.readyAt).format("DD [de] MMM YYYY HH:mm")}\`\`\`` },
        { name: `\`•\` Activitys Host:`, value: `\`\`\`prolog\n${moment.duration(os.uptime * 1000).format(`D [Días], H [Horas], m [Minutos], s [Segundos]`)}\n   — Bot: ${moment.duration(client.uptime).format(`D [Días], H [Horas], m [Minutos], s [Segundos]`)}\`\`\`` },
        { name: `\`•\` CPU:`, value: `\`\`\`prolog\n${os.cpus()[0].model}\`\`\`` },
        { name: `\`•\` CPU Usage:`, value: `\`\`\`prolog\n${Math.round(cpu.usage())}%\`\`\`` },
        { name: `\`•\` CPU Cores:`, value: `\`\`\`prolog\n${os.cpus().length}\`\`\`` })
      .setTimestamp()
      .setFooter({
        text: "My Queen https://discord.gg/4Z7QZ7Y",
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .setColor("Random")

    interaction.reply({ embeds: [response] }).catch((error) => {});
  }
}