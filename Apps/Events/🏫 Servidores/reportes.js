const chalk = require("chalk");
const {
  Client,
  CommandInteraction,
  TextInputStyle,
  EmbedBuilder,
} = require("discord.js");
const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
} = require("discord.js");

const { default: mongoose } = require("mongoose");
const reportSchema = require("../../../Model/report/reportDB");
module.exports = {
  name: "interactionCreate",

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (interaction.isUserContextMenuCommand()) {
      if (interaction.commandName === "report") {
        const modal = new ModalBuilder()
          .setCustomId("reportUserModel")
          .setTitle("Report a user!")
          .setComponents(
            new ActionRowBuilder().setComponents(
              new TextInputBuilder()
                .setCustomId("reportMessage")
                .setLabel("Report Message")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMinLength(20)
                .setMaxLength(500)
            )
          );

        await interaction.showModal(modal);
        const modalSubmitInt = await interaction.awaitModalSubmit({
          filter: (i) => {
            return true;
          },
          time: 20000,
        });

        // Send the report to a user chosen channel

        const reportChannelId = await reportSchema.findOne({
          guildId: interaction.guild.id,
        });

        if (!reportChannelId) return;

        client.channels.cache.get(reportChannelId.channelId).send({
          embeds: [
            new EmbedBuilder()
              .setTitle(`New Report Received! 📁`)
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setDescription([
                  `- User Reported: ${interaction.targetMember}`,
                  `- Reported By: ${interaction.member.user.username}`,
                  `- Report Reason: ${modalSubmitInt.fields.getTextInputValue( "reportMessage" )}`,
              ].join("\n"))
          ],
        });

        // send the user a confirmation message

        interaction.targetMember
          .send({
            embeds: [
              new EmbedBuilder()
                .setTitle("Report")
                .setDescription([
                  `- User: ${interaction.member.user}`,
                  `- Reason: ${modalSubmitInt.fields.getTextInputValue( "reportMessage" )}`,
                ].join("\n"))
                .setFooter({
                  text: "My Queen https://discord.gg/4Z7QZ7Y",
                  iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setColor("Red"),
            ],
          })
          .catch((err) => {
            interaction.followUp({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`New Report Received! 📁`)
                  .setFooter({
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                  })
                  .setDescription([
                    `- User Reported: ${interaction.targetMember}`,
                    `- Motive: Does not accept dms so none where sent`
                  ].join("\n"))
                  .setColor("Red")
              ],
            });
          });

        interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setTitle(`New Report Received! 📁`)
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setDescription([
                `- User Reported: ${interaction.targetMember}`,
                `- Motivo: Report has been sent to the moderators!`
              ].join("\n"))
          ],
          ephemeral: true,
        });
      }
    }
  },
};
