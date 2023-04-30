const { EmbedBuilder, CommandInteraction, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const ee = require("../../../Tools/Settings/channels.json");
const chalk = require("chalk");
module.exports = {
  id: "Private",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const userReport = interaction.fields.getTextInputValue(`User_Privada`);
    const serverReport = interaction.fields.getTextInputValue(`Server_Privada`);
    const Report = interaction.fields.getTextInputValue(`Motivo`);
    const notasReport = interaction.fields.getTextInputValue(`Server_Notes`);
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(ee["comandos"]["modales"]["estructura"]["privadas"]["descripcion"])
        .addFields(
          { name: `\`•\` Usuario Privada:`, value: `${userReport}` },
          { name: `\`•\` Usuario Real:`, value: `${interaction.user.tag}` },
          { name: `\`•\` Usuario ID:`, value: `\`${interaction.user.id}\`` },
          { name: `\`•\` Hora de Ejecucion:`, value: `<t:${Math.round(Date.now() / 1000)}:t>` },
          { name: `\`•\` Servidor Privada:`, value: `${serverReport}` },
          { name: `\`•\` Motivo Enviado`, value: `\`\`\`${Report}\`\`\`` },
          { name: `\`•\` Notas Adicionales`, value: `\`\`\`${notasReport}\`\`\`` })
        .setFooter({
          text: ee["comandos"]["modales"]["estructura"]["privadas"]["footer"],
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle(ee["comandos"]["modales"]["estructura"]["privadas"]["titulo"])
        .setTimestamp()
      ], ephemeral: true
    }).catch((error) => {});
    try {
      const embed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(ee["comandos"]["modales"]["estructura"]["privadas"]["descripcion1"])
        .addFields(
          { name: `\`•\` Usuario Privada:`, value: `${userReport}` },
          { name: `\`•\` Usuario Real:`, value: `${interaction.user.tag}` },
          { name: `\`•\` Usuario ID:`, value: `\`${interaction.user.id}\`` },
          { name: `\`•\` Hora de Ejecucion:`, value: `<t:${Math.round(Date.now() / 1000)}:t>` },
          { name: `\`•\` Servidor Privada:`, value: `${serverReport}` },
          { name: `\`•\` Motivo Enviado`, value: `\`\`\`${Report}\`\`\`` },
          { name: `\`•\` Notas Adicionales`, value: `\`\`\`${notasReport}\`\`\`` })
        .setFooter({
          text: ee["comandos"]["modales"]["estructura"]["privadas"]["footer1"],
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle(ee["comandos"]["modales"]["estructura"]["privadas"]["titulo1"])
        .setTimestamp()

      const aceptar = new ButtonBuilder()
        .setCustomId("solucionado")
        .setStyle(ButtonStyle.Success)
        .setLabel("solucionado")
        .setEmoji("✅")
      const denegar = new ButtonBuilder()
        .setCustomId("defecto")
        .setStyle(ButtonStyle.Success)
        .setLabel("Defecto")
        .setEmoji("🛑")
      const eliminar = new ButtonBuilder()
        .setCustomId("eliminar")
        .setStyle(ButtonStyle.Success)
        .setLabel("Eliminar")
        .setEmoji("🌍")
      const autor = new ButtonBuilder()
        .setCustomId("autor")
        .setStyle(ButtonStyle.Success)
        .setLabel(interaction.user.tag)
        .setEmoji("🍪")

      const botones = new ActionRowBuilder()
        .addComponents(aceptar, denegar, eliminar)

      const embed2 = new EmbedBuilder()
        .setTitle("La solicitud a sido Verificado ✅")
        .setDescription(`*La solicitud de **${interaction.user.tag}** fue revisado y **aceptado** por el equipo*`)
        .addFields(
          { name: `Solicitud de:`, value: `${interaction.user.tag}` },
          { name: `Usuario ID`, value: `${interaction.user.id}` },
          { name: `Motivo Enviado:`, value: `${Report}` },
          { name: `Notas Adicionales:`, value: `${notasReport}` })
        .setFooter({
          text: "My Queen https://discord.gg/4Z7QZ7Y",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })

      const embed3 = new EmbedBuilder()
        .setTitle("La solicitud a sido Negada 🛑")
        .setDescription(`*La solicitud de **${interaction.user.tag}** fue revisado y **denegado** por el equipo*`)
        .addFields(
          { name: `Solicitud de:`, value: `${interaction.user.tag}` },
          { name: `Usuario ID`, value: `${interaction.user.id}` },
          { name: `Motivo Enviado:`, value: `${Report}` },
          { name: `Notas Adicionales:`, value: `${notasReport}` })
        .setFooter({
          text: "My Queen https://discord.gg/4Z7QZ7Y",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })

      const embed4 = new EmbedBuilder()
        .setTitle("Solicitud Eliminada 🌍")
        .setDescription(`*La solicitud de **${interaction.user.tag}** fue revisado y sera **eliminado** en 5 segundos.....*`)
        .addFields(
          { name: `Solicitud de:`, value: `${interaction.user.tag}` },
          { name: `Usuario ID`, value: `${interaction.user.id}` },
          { name: `Motivo Enviado:`, value: `${Report}` },
          { name: `Notas Adicionales:`, value: `${notasReport}` })
        .setFooter({
          text: "My Queen https://discord.gg/4Z7QZ7Y",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })

      const m = await client.channels.cache.get(ee["comandos"]["modales"]["canales"]["privadas"]).send({ embeds: [embed], components: [botones], fetchReply: true }).catch((error) => {});
      const filtro = i => i.user.id === "679560282929889331";
      const collector = m.createMessageComponentCollector({ filter: filtro })
      collector.on(`collect`, async i => {
        if (i.customId === "solucionado") {
          await i.deferUpdate()
          i.editReply({ embeds: [embed2], components: [] }).then(m => setTimeout(() => m.delete(), 7000))
          interaction.user.send({ content: "✅ Tu solicitud que enviaste a sido aceptado muchas gracias por tu ayuda a mejorar el bot" }).catch((error) => {});
        }
        if (i.customId === "defecto") {
          await i.deferUpdate()
          i.editReply({ embeds: [embed3], components: [] }).then(m => setTimeout(() => m.delete(), 7000))
          interaction.user.send({ content: "🛑 Tu solicitud que enviaste a sido denegado muchas gracias por tu ayuda a mejorar el bot" }).catch((error) => {});
        }
        if (i.customId === "eliminar") {
          await i.deferUpdate()
          i.editReply({ embeds: [embed4], components: [] }).then(m => setTimeout(() => m.delete(), 5000))
          interaction.user.send({ content: "🌍 Tu solicitud que enviaste a sido eliminado  muchas gracias por tu ayuda a mejorar el bot" }).catch((error) => {});
        }
      })
    } catch (e) { console.log(e) }
  } 
}