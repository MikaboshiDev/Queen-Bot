const { inspect } = require("util");
const Discord = require("discord.js");
const { EmbedBuilder, WebhookClient } = require("discord.js");
const ee = require("../../../Tools/Settings/channels.json");
const webhook = new WebhookClient({ url: "https://discord.com/api/webhooks/1027461538476462160/ton6f01_FXSJUFIYC9_OkmrCxfuZo5NmI9MrnoRlE9XzcEm8rukMNW0966hvacDlo-Q6" });
const chalk = require("chalk");

module.exports = {
  name: "guildDelete",
  async execute(guild, client) {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setFooter({ 
        text: `Registro Privado de Servidores de Discord`, 
        iconURL: client.user.avatarURL() 
      })
      .setThumbnail(guild.iconURL({ dynamic: true }) || client.user.avatarURL())
      .setDescription([
        `<a:error:1030716002259980318>┊ **Acabo de Abandonar un Servidor**`,
        `\`👋\`**Nombre:** ${guild.name}`,
        `\`👑\`**Fundador/a:** ${guild.ownerId}`,
        `\`🍃\`**Tag:** <@${guild.ownerId}>`,
        `\`🔰\`**ID:** ${guild.id}`,
        `\`🎉\`**Miembros:** ${guild.memberCount}`,
      ].join("\n"))
      .setTimestamp();

    webhook.send({ 
      embeds: [embed]
    }).catch(() => {});
  },
};
