const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
} = require("discord.js");
const Suggestions = require("../../../Model/sugerencia/suggestion");
const SuggestionSetup = require("../../../Model/sugerencia/suggestionSetup");

module.exports = {
  id: "suggestModal",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { guild, member } = interaction;

    const SuggestionSetupDB = await SuggestionSetup.findOne({
      GuildID: interaction.guild.id,
    });
    if (!SuggestionSetupDB)
      return interaction.reply({
        content: `<a:error:1030716002259980318> **Advertencia:** No se pudo encontrar ningún dato en este sistema:/`,
        ephemeral: true,
      });

    const input = interaction.fields.getTextInputValue("suggest_Modal");

    await guild.channels.cache
      .get(SuggestionSetupDB.SuggestChannel)
      .send({
        embeds: [
          new EmbedBuilder()
            .setColor(SuggestionSetupDB.embedColor)
            .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
            .setAuthor({ name: `Sugerencia de ${member.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setFooter({
              text: "Envia una sugerencia con mis comandos!",
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setDescription(`> ${input}`)
            .setTimestamp()
            .addFields(
              {
                name: "👍 **Votos Positivos**:",
                value: `\`\`\`0 Votos\`\`\``,
                inline: true,
              },
              {
                name: "👎 **Votos Negativos**:",
                value: `\`\`\`0 Votos\`\`\``,
                inline: true,
              },
              { name: "** **", value: `** **` } // For Roald's OSD, Can be removed if you want...
            ),
        ],
        components: [
          new ActionRowBuilder().addComponents([
            new ButtonBuilder()
              .setCustomId("Upvote")
              .setLabel("Votar")
              .setEmoji("👍")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("Downvote")
              .setEmoji("👎")
              .setLabel("Votar")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("Delete")
              .setEmoji("🗑️")
              .setLabel("Declinar")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("Accept")
              .setEmoji("✅")
              .setLabel("Aceptar")
              .setStyle(ButtonStyle.Secondary),
          ]),
        ],
      })
      .then(async (Message) => {
        await interaction.reply({
          content: `✅ **Éxito:** Su sugerencia ha sido enviada en <#${SuggestionSetupDB.SuggestChannel}>!`,
          ephemeral: true,
        });
        await Suggestions.create({
          GuildID: guild.id,
          ChannelID: SuggestionSetupDB.SuggestChannel,
          MessageID: Message.id,
          MemberID: member.id,
          MemberTag: member.user.tag,
          Suggestion: input,
          Accepted: false,
          Declined: false,
          Upvotes: [],
          Downvotes: [],
        }).catch(() => {
          interaction.reply(`<a:error:1030716002259980318> No hay ningun setup asignado en el servidor actualmente`, { ephemeral: true })
        });
      });
  },
};