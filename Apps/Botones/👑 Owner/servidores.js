const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  developer: true,
  id: "Servidores",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction, client) {

    const embed = new Discord.EmbedBuilder()
      .setAuthor({ 
        name: `${client.user.tag}'s Information`, 
        iconURL: `https://cdn.discordapp.com/attachments/992251291214545026/998974029614567515/d9cb1a809bcc4b1b915f40c784e9b365.png` 
      })
      .setDescription(`**Prefix:** \`/\``)
      .setThumbnail(`https://cdn.discordapp.com/attachments/992251291214545026/998974029614567515/d9cb1a809bcc4b1b915f40c784e9b365.png`)
      .setColor('Random')
      .setTimestamp()
      .setFooter({
        text: "My Queen https://discord.gg/4Z7QZ7Y",
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      })
      .addFields(
        { name: `\`•\` Servidores`, value: `\`\`\`prolog\n${client.guilds.cache.size}\`\`\`` },
        { name: `\`•\` Canales`, value: `\`\`\`prolog\n${client.channels.cache.size}\`\`\`` },
        { name: `\`•\` Usuarios`, value: `\`\`\`prolog\n${client.users.cache.size}\`\`\`` },
        { name: `\`•\` Creado el`, value: `\`\`\`prolog\n${client.user.createdAt}\`\`\`` },
        { name: `\`•\` ID`, value: `\`\`\`prolog\n${client.user.id}\`\`\`` },
        { name: `\`•\` Version`, value: `\`\`\`prolog\n${Discord.version}\`\`\`` },
      );
    interaction.reply({ embeds: [embed], ephemeral: true }).catch((error) => {});
  }
}