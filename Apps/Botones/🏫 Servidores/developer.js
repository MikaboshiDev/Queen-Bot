const { ChatInputCommandInteraction } = require("discord.js");
const Discord = require(`discord.js`)
const chalk = require('chalk');
module.exports = {
  id: "Development",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction) {

    const response = new Discord.EmbedBuilder()
      .setTitle("Pagina Web y Repositorio 🛠️")
      .setColor("Random")
      .setTimestamp()
      .setFooter({ 
        text: `My Queen https://discord.gg/4Z7QZ7Y`, 
        iconURL: interaction.user.displayAvatarURL() 
      })
      .setDescription(`*Hola ${interaction.user} Aqui tienes nuestra ***pagina*** web actualmente y un ***repositorio*** de trabajo de purpur development tomato*`)
      .setThumbnail("https://github-readme-stats.vercel.app/api?username=mikaboshidev&show_icons=true&locale=en");

    let date = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Link)
          .setURL(`https://github.com/Tomato6966/Multipurpose-discord-bot`)
          .setLabel('GitHub')
          .setEmoji('🎮'),
        new Discord.ButtonBuilder()
          .setStyle(Discord.ButtonStyle.Link)
          .setURL(`https://studiodeveloper.online/`)
          .setLabel('Web')
          .setEmoji('🌍')
      )

    interaction.reply({ embeds: [response], components: [date], ephemeral: true }).catch((error) => {})
  },
};