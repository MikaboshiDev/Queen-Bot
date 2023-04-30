const { ChatInputCommandInteraction } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  id: "Owner",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction, client) {
    const ownerId = interaction.guild.ownerId;
    const embed = new Discord.EmbedBuilder()
      .setTitle(`Informacion del Creador del Servidor`)
      .setDescription(`**Nombre:** ${client.users.cache.get(ownerId).tag}\n**ID:** ${ownerId}`)
      .addFields(
        { name: `\`•\` Nombre:`, value: `${client.users.cache.get(ownerId).tag}` },
        { name: `\`•\` ID:`, value: `${ownerId}` },
        { name: `\`•\` Fecha de Creacion:`, value: `${client.users.cache.get(ownerId).createdAt}` },
        { name: `\`•\` Bot:`, value: `${client.users.cache.get(ownerId).bot}` })
      .setThumbnail(client.users.cache.get(ownerId).displayAvatarURL({ dynamic: true, size: 512 }))
      .setTimestamp()
      .setColor('Random')
      .setFooter({ 
        text: `My Queen https://discord.gg/4Z7QZ7Y`, 
        iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 512 }) 
      });

    interaction.reply({ embeds: [embed], ephemeral: true }).catch((error) => {})
  },
};
