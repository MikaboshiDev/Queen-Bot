const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  developer: true,
  id: "Control",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  execute(interaction, client) {
    if (interaction.values.includes('first_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`<a:Emoji:979486439714725920> Lista de Servidores de Discord.`)
          .setColor("Random")
          .setDescription(client.guilds.cache
            .map(g => `<a:3_:974194778780622848> Guild Name: ${g.name}\n<a:3_:974194778780622848>  Total Members: ${g.members.cache.size}\n <a:3_:974194778780622848> Guild ID: ${g.id}`).join('\n\n'))], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Departamento] por el servidor [${interaction.guild.id}] 
      el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('second_option')) {
      interaction.reply({ content: `<:VS_cancel:1006609599199186974> No habilitada de momento espere informacion despues` }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Departamento] por el servidor [${interaction.guild.id}] 
      el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('third_option')) {
      interaction.reply({ content: `<:VS_cancel:1006609599199186974> No habilitada de momento espere informacion despues` }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Departamento] por el servidor [${interaction.guild.id}] 
      el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    }
  }
}