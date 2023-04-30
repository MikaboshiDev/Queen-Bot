const { EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const ee = require("../../../Tools/Settings/channels.json")
module.exports = {
  id: "Calificaciones",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const Calificaion = interaction.fields.getTextInputValue(`Calificacion`);
    const Estrella = interaction.fields.getTextInputValue(`Estrellas`);
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(ee["comandos"]["modales"]["estructura"]["calificaciones"]["descripcion"])
        .addFields(
          { name: `\`•\` Usuario:`, value: `${interaction.user.tag}`, inline: true },
          { name: `\`•\` Usuario ID:`, value: `\`${interaction.user.id}\``, inline: true },
          { name: `\`•\` Hora de Ejecucion:`, value: `<t:${Math.round(Date.now() / 1000)}:t>`, inline: true },
          { name: `\`•\` Valoracion`, value: `${Estrella} 🌟`, inline: true },
          { name: `\`•\` Calificacion`, value: `\`\`\`${Calificaion}\`\`\`` })
        .setFooter({
          text: ee["comandos"]["modales"]["estructura"]["calificaciones"]["footer"],
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle(ee["comandos"]["modales"]["estructura"]["calificaciones"]["titulo"])
        .setTimestamp()
      ], ephemeral: true
    }).catch((error) => {});
    try {
      const embed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(ee["comandos"]["modales"]["estructura"]["calificaciones"]["descripcion1"])
        .addFields(
          { name: `\`•\` Usuario:`, value: `${interaction.user.tag}`, inline: true },
          { name: `\`•\` Usuario ID:`, value: `\`${interaction.user.id}\``, inline: true },
          { name: `\`•\` Hora de Ejecucion:`, value: `<t:${Math.round(Date.now() / 1000)}:t>`, inline: true },
          { name: `\`•\` Valoracion`, value: `${Estrella} 🌟`, inline: true },
          { name: `\`•\` Calificacion`, value: `\`\`\`${Calificaion}\`\`\`` })
        .setFooter({
          text: ee["comandos"]["modales"]["estructura"]["calificaciones"]["footer1"],
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTimestamp()
      client.channels.cache.get(ee["comandos"]["modales"]["canales"]["calificaciones"]).send({ embeds: [embed] }).catch((error) => {});
    } catch (e) {
      console.log(e)
    }
  }
}