const { ChatInputCommandInteraction } = require("discord.js");
const Suggestions = require("../../../Model/sugerencia/suggestion");
const SuggestionSetup = require("../../../Model/sugerencia/suggestionSetup");
const Discord = require("discord.js");
module.exports = {
  buttons_permisos: [
    "Administrator"
  ],
  id: "Upvote",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const SuggestionsDB = await Suggestions.findOne({
      GuildID: interaction.guild.id,
      ChannelID: interaction.channel.id,
      MessageID: interaction.message.id,
    });
    if (!SuggestionsDB)
      return interaction.reply({
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
      GuildID: interaction.guild.id,
    });
    if (!SuggestionSetupDB)
      return interaction.reply({
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

    const Embed = Discord.EmbedBuilder.from(interaction.message.embeds[0]);

    if (SuggestionsDB.Downvotes.includes(interaction.user.id))
      return interaction.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle("Sistema de Sugerencias! 🟡")
            .setFooter({
              text: "My Queen https://discord.gg/4Z7QZ7Y",
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setDescription([
              `\`•\` Error: \`DataBase\``,
              `\`•\` Motivo: Elimine su Voto Anterior de Favor`,
              `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
              `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
            ].join("\n"))
        ],
        ephemeral: true,
      }).catch((error) => { });

    if (SuggestionsDB.Upvotes.includes(interaction.user.id)) {
      await Suggestions.findOneAndUpdate(
        {
          GuildID: interaction.guild.id,
          ChannelID: interaction.channel.id,
          MessageID: interaction.message.id,
        },
        { $pull: { Upvotes: interaction.user.id } }
      );

      Embed.data.fields[0] = {
        name: `👍 **Votos Positivos**`,
        value: `\`\`\`${SuggestionsDB.Upvotes.length - 1} Votos\`\`\``,
        inline: true,
      };

      interaction.message.edit({ embeds: [Embed] }).catch((error) => { });

      return interaction.reply({
        content: `✅ **Éxito:** ¡Eliminó su voto de esta sugerencia!`,
        ephemeral: true,
      }).catch((error) => { });
    }
    await Suggestions.findOneAndUpdate(
      {
        GuildID: interaction.guild.id,
        ChannelID: interaction.channel.id,
        MessageID: interaction.message.id,
      },
      { $push: { Upvotes: interaction.user.id } }
    ).then(() => {
      Embed.data.fields[0] = {
        name: `👍 **Votos Positivos**`,
        value: `\`\`\`${SuggestionsDB.Upvotes.length + 1} Votos\`\`\``,
        inline: true,
      };

      interaction.message.edit({ embeds: [Embed] }).catch((error) => { });

      return interaction.reply({
        content: `✅ **Éxito:** ¡Agregaste tu voto a la sugerencia!`,
        ephemeral: true,
      }).catch((error) => { });
    });
  },
};