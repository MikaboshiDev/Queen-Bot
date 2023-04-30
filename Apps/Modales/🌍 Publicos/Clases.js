const { EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const ee = require("../../../Tools/Settings/channels.json");
const chalk = require("chalk");
module.exports = {
  id: "Clase",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const userClass = interaction.fields.getTextInputValue(`User_Clase`);
    const Class = interaction.fields.getTextInputValue(`Clase`);
    const serverClass = interaction.fields.getTextInputValue(`Server_Clase`);
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(ee["comandos"]["modales"]["estructura"]["clases"]["descripcion"])
        .addFields(
          { name: `\`•\` Usuario Author:`, value: `${userClass}` },
          { name: `\`•\` Usuario Real:`, value: `${interaction.user.tag}` },
          { name: `\`•\` Usuario ID:`, value: `\`${interaction.user.id}\`` },
          { name: `\`•\` Hora de Ejecucion:`, value: `<t:${Math.round(Date.now() / 1000)}:t>` },
          { name: `\`•\` Sugerencia Enviada`, value: `\`\`\`${Class}\`\`\`` },
          { name: `\`•\` Notas Adicionales`, value: `\`\`\`${serverClass}\`\`\`` })
        .setFooter({
          text: ee["comandos"]["modales"]["estructura"]["clases"]["footer"],
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle(ee["comandos"]["modales"]["estructura"]["clases"]["titulo"])
        .setTimestamp()
      ], ephemeral: true
    }).catch((error) => {});
    try {
      const embed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(ee["comandos"]["modales"]["estructura"]["clases"]["descripcion1"])
        .addFields(
          { name: `\`•\` Usuario Author:`, value: `${userClass}` },
          { name: `\`•\` Usuario Real:`, value: `${interaction.user.tag}` },
          { name: `\`•\` Usuario ID:`, value: `\`${interaction.user.id}\`` },
          { name: `\`•\` Hora de Ejecucion:`, value: `<t:${Math.round(Date.now() / 1000)}:t>` },
          { name: `\`•\` Sugerencia Enviada`, value: `\`\`\`${Class}\`\`\`` },
          { name: `\`•\` Notas Adicionales`, value: `\`\`\`${serverClass}\`\`\`` })
        .setFooter({
          text: ee["comandos"]["modales"]["estructura"]["clases"]["footer1"],
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle(ee["comandos"]["modales"]["estructura"]["clases"]["titulo1"])
        .setTimestamp()
      client.channels.cache.get(ee["comandos"]["modales"]["canales"]["clases"]).send({ embeds: [embed] }).catch((error) => {});
    } catch (e) {
      console.log(e)
    }
  }
}