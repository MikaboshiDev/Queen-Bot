const { EmbedBuilder, CommandInteraction, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const ee = require("../../../Tools/Settings/channels.json");
const chalk = require("chalk");
module.exports = {
  id: "Suggestion",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const userSuggest = interaction.fields.getTextInputValue(`User_Suggest`);
    const Suggest = interaction.fields.getTextInputValue(`Suggest`);
    const serverSuggest = interaction.fields.getTextInputValue(`Server_Suggest`);
    await interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(ee["comandos"]["modales"]["estructura"]["sugerencias"]["descripcion"])
        .addFields(
          { name: `\`•\` Usuario Author:`, value: `${userSuggest}` },
          { name: `\`•\` Usuario Real:`, value: `${interaction.user.tag}` },
          { name: `\`•\` Usuario ID:`, value: `\`${interaction.user.id}\`` },
          { name: `\`•\` Hora de Ejecucion:`, value: `<t:${Math.round(Date.now() / 1000)}:t>` },
          { name: `\`•\` Sugerencia Enviada`, value: `\`\`\`${Suggest}\`\`\`` },
          { name: `\`•\` Notas Adicionales`, value: `\`\`\`${serverSuggest}\`\`\`` })
        .setFooter({
          text: ee["comandos"]["modales"]["estructura"]["sugerencias"]["footer"],
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle(ee["comandos"]["modales"]["estructura"]["sugerencias"]["titulo"])
        .setTimestamp()
      ], ephemeral: true
    }).catch((error) => {});
    try {
      const embed = new EmbedBuilder()
        .setColor(`Random`)
        .setDescription(ee["comandos"]["modales"]["estructura"]["sugerencias"]["descripcion1"])
        .addFields(
          { name: `\`•\` Usuario Author:`, value: `${userSuggest}` },
          { name: `\`•\` Usuario Real:`, value: `${interaction.user.tag}` },
          { name: `\`•\` Usuario ID:`, value: `\`${interaction.user.id}\`` },
          { name: `\`•\` Hora de Ejecucion:`, value: `<t:${Math.round(Date.now() / 1000)}:t>` },
          { name: `\`•\` Sugerencia Enviada`, value: `\`\`\`${Suggest}\`\`\`` },
          { name: `\`•\` Notas Adicionales`, value: `\`\`\`${serverSuggest}\`\`\`` })
        .setFooter({
          text: ee["comandos"]["modales"]["estructura"]["sugerencias"]["footer1"],
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle(ee["comandos"]["modales"]["estructura"]["sugerencias"]["titulo1"])
        .setTimestamp()

      const aceptar = new ButtonBuilder()
        .setCustomId("aceptar")
        .setStyle(ButtonStyle.Success)
        .setLabel("Aceptar")
        .setEmoji("✅")
      const denegar = new ButtonBuilder()
        .setCustomId("denegar")
        .setStyle(ButtonStyle.Success)
        .setLabel("Denegar")
        .setEmoji("🛑")
      const eliminar = new ButtonBuilder()
        .setCustomId("eliminar")
        .setStyle(ButtonStyle.Success)
        .setLabel("Eliminar")
        .setEmoji("🌍")

      const botones = new ActionRowBuilder()
        .addComponents(aceptar, denegar, eliminar)

      const embed2 = new EmbedBuilder()
        .setTitle("Sugerencia Aceptada ✅")
        .setDescription(`*La sugerencia de **${interaction.user.tag}** fue revisada y **aceptada** por el equipo*`)
        .setFooter({
          text: "My Queen https://discord.gg/4Z7QZ7Y",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
      const embed3 = new EmbedBuilder()
        .setTitle("Sugerencia Denegada 🛑")
        .setDescription(`*La sugerencia de **${interaction.user.tag}** fue revisada y **denegada** por el equipo*`)
        .setFooter({
          text: "My Queen https://discord.gg/4Z7QZ7Y",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })
      const embed4 = new EmbedBuilder()
        .setTitle("Sugerencia Eliminada 🌍")
        .setDescription(`*La sugerencia de **${interaction.user.tag}** fue revisada y sera **eliminada** en 5 segundos.....*`)
        .setFooter({
          text: "My Queen https://discord.gg/4Z7QZ7Y",
          iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        })

      const m = await client.channels.cache.get(ee["comandos"]["modales"]["canales"]["sugerencia"]).send({ embeds: [embed], components: [botones], fetchReply: true }).catch((error) => {});

      const filtro = i => i.user.id === "679560282929889331";
      const collector = m.createMessageComponentCollector({ filter: filtro })
      collector.on(`collect`, async i => {
        if (i.customId === "aceptar") {
          await i.deferUpdate()
          i.editReply({ embeds: [embed2], components: [] }).then(m => setTimeout(() => m.delete(), 7000))
          interaction.user.send({ content: "✅ Tu sugerencia que enviaste a sido aceptada muchas gracias por tus sugerencias" }).catch((error) => {});
        }
        if (i.customId === "denegar") {
          await i.deferUpdate()
          i.editReply({ embeds: [embed3], components: [] }).then(m => setTimeout(() => m.delete(), 7000))
          interaction.user.send({ content: "🛑 Tu sugerencia que enviaste a sido denegada muchas gracias por tus sugerencias" }).catch((error) => {});
        }
        if (i.customId === "eliminar") {
          await i.deferUpdate()
          i.editReply({ embeds: [embed4], components: [] }).then(m => setTimeout(() => m.delete(), 5000))
          interaction.user.send({ content: "🌍 Tu sugerencia que enviaste a sido eliminada muchas gracias por tus sugerencias" }).catch((error) => {});
        }
      })
    } catch (e) { console.log(e) }
  }
}