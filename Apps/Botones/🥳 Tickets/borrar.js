const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { Types } = require("mongoose");
const { createTranscript } = require("discord-html-transcripts");
const chalk = require("chalk");
const ticketSchema = require("../../../Model/tickets/ticketsSchema");
const userSchema = require("../../../Model/tickets/userTicketsSchema");

module.exports = {
  buttons_permisos: [
    "Administrator"
  ],
  id: "deleteTicket",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   *  
   * 
   */
  async execute(interaction, client) {
    try {
      const { channel, member, guild, customId } = interaction;
      const tksData = await ticketSchema.findOne({
        guildId: guild.id,
      });
      const usrData = await userSchema.findOne({
        guildId: interaction.guild.id,
        ticketId: channel.id,
      });

      if (!member.roles.cache.find((r) => r.id === tksData.supportId)) {
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setTitle("Ticket Closed Doned!📝")
              .setDescription([
                `\`👋\` Miembro: ${member.user.tag}`,
                `\`📝\` Ticket: ${channel.name}`,
                `\`📜\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`📅\` Hora: ${new Date().toLocaleTimeString()}`,
              ].join("\n")),
          ],
          ephemeral: true,
        }).catch((error) => {});
      }

      interaction.message.edit({
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("ticket-close")
              .setLabel("Close Ticket")
              .setStyle(ButtonStyle.Danger)
              .setDisabled(true)
          ),
        ],
      });

      userSchema
        .findOneAndDelete({
          guildId: guild.id,
        }).catch((error) => {});

      setTimeout(
        () => channel.delete().catch((err) => console.log(err)),
        5 * 1000
      );
      

      const transcript = await createTranscript(channel, {
        limit: -1,
        returnBuffer: false,
        fileName: `Ticket-${member.user.username}.html`,
      });

      await client.channels.cache
        .get(tksData.logsId)
        .send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ticket Closed Doned!📝")
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setDescription([
                `\`👋\` Miembro: ${member.user.tag}`,
                `\`📝\` Ticket: ${channel.name}`,
                `\`📅\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`⏰\` Hora: ${new Date().toLocaleTimeString()}`
              ].join("\n"))
              .setTimestamp()
              .setFooter({ text: `Ticket Cerrado ID: ${interaction.guild.id}` })
              .setColor("Blue"),
          ],
          files: [transcript],
        }).catch((error) => {});

      await interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ticket Closed Doned!📝")
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setTimestamp()
              .setFooter({ text: `Ticket Cerrado ID: ${interaction.guild.id}` })
              .setDescription([
                `\`👋\` Miembro: ${member.user.tag}`,
                `\`📝\` Ticket: ${channel.name}`,
                `\`📅\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`⏰\` Hora: ${new Date().toLocaleTimeString()}`
              ]. join("\n"))
              .setColor("Blue"),
          ],
        }).catch((error) => {});
    } catch (e) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`New status code invalid? ❌`)
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
  }
}