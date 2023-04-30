const { ChatInputCommandInteraction } = require("discord.js");
const Discord = require(`discord.js`)
module.exports = {
  id: "Dates",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction, client) {

    const response = new Discord.EmbedBuilder()
      .setTitle("Clases y Asesorias 🛠️")
      .setColor("Random")
      .setTimestamp()
      .setThumbnail(interaction.user.displayAvatarURL())
      .setDescription(`*Hola ${interaction.user} no olvides que puedes decidir tomar tus propias **clases y asesorias** cuanto antes. No olvides el tiempo no se detiene*`)
      .setFooter({
        text: `My Queen https://discord.gg/4Z7QZ7Y`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
      });

    let date = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Link)
          .setURL(`https://discord.gg/WVs9ennRcp`)
          .setLabel(`Asesorias`)
          .setEmoji('🌍')
      )

    interaction.reply({ embeds: [response], components: [date], ephemeral: true }).catch((error) => {});
  },
};