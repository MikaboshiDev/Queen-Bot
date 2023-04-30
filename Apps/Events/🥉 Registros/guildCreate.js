const { inspect } = require("util");
const Discord = require("discord.js");
const { EmbedBuilder, WebhookClient } = require("discord.js");
const ee = require("../../../Tools/Settings/channels.json");
const webhook = new WebhookClient({
  url: "https://discord.com/api/webhooks/1027461358213664788/MHCOr7kprcxDPFqN0qS6VI8dPobaD5oMeWFBbqguzdYf9utOSbWjLDA-jQ-QxQRnwEzP"
});
const chalk = require("chalk");
module.exports = {
  name: "guildCreate",
  async execute(guild, client) {

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setFooter({ 
        text: `Registro Privado de Servidores de Discord`, 
        iconURL: client.user.avatarURL() 
      })
      .setThumbnail(guild.iconURL({ dynamic: true }) || client.user.avatarURL())
      .setDescription([
        `<a:Join_vc:1028005783134294138> ┊ **Me uni a un nuevo servidor**`,
        `\`👋\`**Nombre:** ${guild.name}`,
        `\`👑\`**Fundador/a:** ${guild.ownerId}`,
        `\`🍃\`**Tag:** <@${guild.ownerId}>`,
        `\`🔰\`**ID:** ${guild.id}`,
        `\`🎉\`**Miembros:** ${guild.memberCount}`,
        `\`📁\`**Canales:** ${guild.channels.cache.size}`,
      ].join("\n"))
      .setTimestamp();

    webhook.send({ 
      embeds: [embed]
    }).catch(() => { });
  },
};
