const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { Types } = require("mongoose");
const chalk = require("chalk");

const ticketSchema = require("../../../Model/tickets/ticketsSchema");
const userSchema = require("../../../Model/tickets/userTicketsSchema");
module.exports = {
  permisos: [
    "Administrator"
  ],
  botpermisos: [
    "ManageGuild",
    "ManageChannels",
    "SendMessages",
    "EmbedLinks",
  ],
  data: new SlashCommandBuilder()
    .setName("tickets")
    .setDescription("🎉 Opciones de entradas y configuración")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("setup")
        .setDescription("🎉 Configurar el sistema de tickets")
        .addChannelOption((option) => {
          return option
            .setName("canal")
            .setDescription("canal para enviar el mensaje del ticket")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText);
        })
        .addChannelOption((option) => {
          return option
            .setName("categoria")
            .setDescription("Categoría para crear el ticket")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildCategory);
        })
        .addRoleOption((option) => {
          return option
            .setName("soporte")
            .setDescription("Rol de soporte para el ticket")
            .setRequired(true);
        })
        .addChannelOption((option) => {
          return option
            .setName("logs")
            .setDescription("El canal donde se envían los registros de tickets.")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText);
        })
        .addStringOption((option) => {
          return option
            .setName("descripcion")
            .setDescription("El texto a enviar con el ticket panel")
            .setMaxLength(500)
            .setRequired(false);
        })
        .addStringOption((option) => {
          return option
            .setName("titulo")
            .setDescription("El título del panel de entradas.")
            .setMaxLength(50)
            .setMinLength(3)
            .setRequired(false);
        })
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("borrar").setDescription("🎉 Eliminar el sistema de tickets")
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "setup") {
      const channel = interaction.options.getChannel("canal");
      const category = interaction.options.getChannel("categoria");
      const supportRole = interaction.options.getRole("soporte");
      const description = interaction.options.getString("descripcion");
      const ticketLogs = interaction.options.getChannel("logs");
      const title = interaction.options.getString("titulo");

      const data = await ticketSchema.findOne({
        guildId: interaction.guild.id,
      });

      if (data) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ya has creado el sistema de tickets! 📁")
              .setDescription([
                `\`•\` Canal: <#${data.channelId}>`,
                `\`•\` Categoria: <#${data.categoryId}>`,
                `\`•\` Rol de soporte: <@&${data.supportId}>`,
                `\`•\` Canal de logs: <#${data.logsId}>`,
              ].join("\n"))
          ],
          ephemeral: true,
        });
        return;
      }

      const newSchema = new ticketSchema({
        _id: Types.ObjectId(),
        guildId: interaction.guild.id,
        channelId: channel.id,
        supportId: supportRole.id,
        categoryId: category.id,
        logsId: ticketLogs.id
      });

      newSchema.save().catch((err) => console.log(err));

      interaction
        .reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ticket System! 📁")
              .setDescription([
                `\`•\` Canal: ${channel}`,
                `\`•\` Categoria: ${category}`,
                `\`•\` Rol de soporte: ${supportRole}`,
                `\`•\` Canal de logs: ${ticketLogs}`,
            ].join("\n"))
          ],
          ephemeral: true,
        })
        .catch(async (err) => {
          console.log(err);
          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("Error sistema de tickets! 📁")
                .setDescription([
                  `\`•\` Estado: Error`,
                  `\`•\` Canal: ${channel}`,
                  `\`•\` Categoria: ${category}`,
                  `\`•\` Motivo: Tickets ya configurados!`
                ].join("\n"))
            ],
          });
        });

      const sampleMessage =
      '¡Bienvenido a las entradas! Haga clic en el botón "Crear ticket" para crear un ticket y el equipo de soporte se pondrá en contacto con usted.!';

      client.channels.cache.get(channel.id).send({
        embeds: [
          new EmbedBuilder()
            .setTitle(title || `Panel Tickets ${interaction.guild.name}`)
            .setDescription(description == null ? sampleMessage : description)
            .setTimestamp()
            .setColor("Random")
            .setFooter({ text: `Sistema de Tickets de ${interaction.guild.name}`, iconURL: interaction.guild.iconURL( { dynamic: true }) }),
        ],
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("createTicket")
              .setLabel("Crea un Ticket")
              .setEmoji("1030017632180641872")
              .setStyle(ButtonStyle.Secondary)
          ),
        ],
      });
    }
    if (interaction.options.getSubcommand() === "borrar") {
      const ticketData = await ticketSchema.findOne({
        guildId: interaction.guild.id,
      });

      if (!ticketData) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ticket System! 📁")
              .setDescription([
                  `\`•\` No hay configuración del sistema de tickets en este servidor!`,
                  `\`•\` Use \`/ticket setup\` para configurar el sistema de tickets!`,
              ].join("\n"))
          ],
          ephemeral: true,
        });
      }

      ticketSchema
        .findOneAndDelete({
          guildId: interaction.guild.id,
        })
        .catch((err) => console.log(err));

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Ticket System! 📁")
            .setDescription([
              `\`•\` Eliminado con éxito el sistema de tickets!`,
              `\`•\` Use \`/ticket setup\` para crear uno nuevo!`,
            ].join("\n")),
        ],
        ephemeral: true,
      });
    }
  },
};
