const { ChatInputCommandInteraction } = require("discord.js");
const Suggestions = require("../../../Model/sugerencia/suggestion");
const SuggestionSetup = require("../../../Model/sugerencia/suggestionSetup");
const Discord = require("discord.js")
module.exports = {
  buttons_permisos: [
    "Administrator"
  ],
  id: "Delete",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      const { channel, guild, member, message } = interaction;
      const i = interaction;
      const SuggestionsDB = await Suggestions.findOne({
        GuildID: guild.id,
        ChannelID: channel.id,
        MessageID: message.id,
      });
      if (!SuggestionsDB)
        return i.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("Sistema de Sugerencias! 🔴")
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setDescription([
                `\`•\` Error: \`DataBase\``,
                `\`•\` Motivo: No se pudo encontrar ningún dato sobre esta sugerencia`,
                `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
              ].join("\n"))
          ],
          ephemeral: true,
        }).catch((error) => { });

      const SuggestionSetupDB = await SuggestionSetup.findOne({
        GuildID: guild.id,
      });
      if (!SuggestionSetupDB)
        return i.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("Sistema de Sugerencias! 🔴")
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setDescription([
                `\`•\` Error: \`DataBase\``,
                `\`•\` Motivo: No se pudo encontrar ningún dato en este sistema`,
                `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
              ].join("\n"))
          ],
          ephemeral: true,
        }).catch((error) => { });

      if (!member.roles.cache.find((r) => r.id === SuggestionSetupDB.ManagerRole))
        return i.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle("Sistema de Sugerencias! 🔴")
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setDescription([
                `\`•\` Error: \`DataBase\``,
                `\`•\` Motivo: No tienes permiso de usar el boton`,
                `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
              ].join("\n"))
          ],
          ephemeral: true,
        }).catch((error) => { });

      const Embed = Discord.EmbedBuilder.from(i.message.embeds[0]);

      Embed.setColor(SuggestionSetupDB.DeclineColor);
      Embed.setFooter({ text: `Esta sugerencia a sido eliminada con exito!`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

      await Suggestions.findOneAndDelete(
        {
          GuildID: guild.id,
          ChannelID: channel.id,
          MessageID: message.id,
        },
        { GuildID: guild.id }
      );

      message.edit({ embeds: [Embed] }).catch((error) => { });

      i.reply({
        content: `✅ **Éxito:** ¡Eliminó la sugerencia del usuario!`,
        ephemeral: true,
      }).catch((error) => { });
    } catch (e) {
      interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
            .setDescription(`\`\`\`yml\n${e}\`\`\``)
            .setColor("Random")
            .setFooter({
              text: "My Queen https://discord.gg/4Z7QZ7Y",
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            }),
        ],
        ephemeral: true,
      });
    }
  },
};