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
  buttons_permisos: ["Administrator"],
  id: "reopenTicket",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   *  
   * 
   */
  async execute(interaction, client) {
    const { channel, member, guild, customId } = interaction;
    const uData = await userSchema.findOne({
      guildId: guild.id,
      ticketId: channel.id,
    });

    if (!uData.closed)
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription([
              `\`•\` Estado: \`Abierto\``,
              `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
              `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
              `\`•\` Motivo: Este ticket ya esta abierto.`,
            ].join("\n"))
            .setTitle("Reopened ticket! 📝")
            .setFooter({
              text: "My Queen https://discord.gg/4Z7QZ7Y",
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setColor("0x2F3136")
        ]
      }).catch((error) => {});

    await userSchema.updateMany(
      {
        ticketId: channel.id,
      },
      {
        closed: false,
      }
    );

    interaction.message.edit({
      components: [
        new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId("ticket-reopen")
            .setLabel("Reopen Ticket")
            .setEmoji("🔓")
            .setStyle(ButtonStyle.Success)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId("ticket-delete")
            .setLabel("Delete Ticket")
            .setEmoji("⛔")
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true)
        ),
      ],
    });

    client.channels.cache
      .get(uData.ticketId)
      .permissionOverwrites.edit(uData.creatorId, {
        ViewChannel: true,
      });

    await interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Reopened ticket! 📝")
            .setDescription([
              `\`👋\` Miembro: ${member.user.tag}`,
              `\`📝\` Ticket: ${channel.name}`,
              `\`📅\` Fecha: ${new Date().toLocaleDateString()}`,
              `\`⏰\` Hora: ${new Date().toLocaleTimeString()}`
            ].join("\n"))
            .setFooter({
              text: "My Queen https://discord.gg/4Z7QZ7Y",
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp()
            .setColor("Blue"),
        ],
        ephemeral: true
      }).catch((error) => {});
  }
}