const { EmbedBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js");
const ee = require("../../../Tools/Settings/channels.json");
const chalk = require("chalk");
module.exports = {
  id: "Extras",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const one = interaction.fields.getTextInputValue("Usuario_Global");
    const two = interaction.fields.getTextInputValue("Servidor_Global");
    const fourth = interaction.fields.getTextInputValue("Reporte_Global");
    const five = interaction.fields.getTextInputValue("Pruebas");
    const six = interaction.fields.getTextInputValue("Notas_Extras");


    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor("Random")
        .setDescription(ee["comandos"]["modales"]["estructura"]["globales"]["descripcion"])
        .addFields(
          { name: `\`•\` Usuario Author:`, value: `${one}` },
          { name: `\`•\` Usuario Real:`, value: `${interaction.user.tag}` },
          { name: `\`•\` Usuario ID:`, value: `\`${interaction.user.id}\`` },
          { name: `\`•\` Hora de Ejecucion:`, value: `<t:${Math.round(Date.now() / 1000)}:t>` },
          { name: `\`•\` Servidor Origen:`, value: `${two}` },
          { name: `\`•\` Motivo del Reporte:`, value: `\`\`\`${fourth}\`\`\`` },
          { name: `\`•\` Pruebas Mandadas:`, value: `${five}` },
          { name: `\`•\` Notas Adicionales:`, value: `\`\`\`${six}\`\`\`` }
        )
        .setFooter({
          text: ee["comandos"]["modales"]["estructura"]["globales"]["footer"],
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setTitle(ee["comandos"]["modales"]["estructura"]["globales"]["titulo"])
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))], ephemeral: true
    }).catch((error) => {});
    try {
      const embed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(ee["comandos"]["modales"]["estructura"]["globales"]["descripcionServer"])
        .addFields(
          { name: `\`•\` Usuario Author:`, value: `${one}` },
          { name: `\`•\` Usuario Real:`, value: `${interaction.user.tag}` },
          { name: `\`•\` Usuario ID:`, value: `\`${interaction.user.id}\`` },
          { name: `\`•\` Hora de Ejecucion:`, value: `<t:${Math.round(Date.now() / 1000)}:t>` },
          { name: `\`•\` Servidor Origen:`, value: `${two}` },
          { name: `\`•\` Motivo del Reporte:`, value: `\`\`\`${fourth}\`\`\`` },
          { name: `\`•\` Pruebas Mandadas:`, value: `${five}` },
          { name: `\`•\` Notas Adicionales:`, value: `\`\`\`${six}\`\`\`` }
        )
        .setFooter({
          text: ee["comandos"]["modales"]["estructura"]["globales"]["footerServer"],
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle(ee["comandos"]["modales"]["estructura"]["globales"]["tituloServer"])
        .setTimestamp()
      client.channels.cache.get(ee["comandos"]["modales"]["canales"]["globales"]).send({ embeds: [embed] }).catch((error) => {});
    } catch (e) { console.log(e) }
  },
};
