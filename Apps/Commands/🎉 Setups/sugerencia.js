const {
  SlashCommandBuilder,
  ChannelType,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const SuggestionSetup = require("../../../Model/sugerencia/suggestionSetup");
const Suggestions = require("../../../Model/sugerencia/suggestion");
const chalk = require("chalk");
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
    .setName(`sugerencias`)
    .setDescription(`🎉 gestionar el sistema de sugerencias`)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((subcommand) => {
      return subcommand
        .setName("setup")
        .setDescription(
          `🎉 configurar el sistema de sugerencias para el servidor`
        )
        .addChannelOption((option) => {
          return option
            .setName(`canal`)
            .setDescription(`Elija un canal específico para enviar sugerencias`)
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText);
        })
        .addRoleOption((option) => {
          return option
            .setName(`manager`)
            .setDescription(
              `Proporcionar un rol para administrar las sugerencias.`
            )
            .setRequired(true);
        })
        .addStringOption((option) => {
          return option
            .setName(`embed`)
            .setDescription(
              `Elija un color de incrustación para usar en incrustaciones`
            )
            .setRequired(true)
            .addChoices(
              { name: `rojo`, value: `#D84559` },
              { name: `invisible`, value: `#303135` },
              { name: `purpura`, value: `#5865F2` },
              { name: `amarillo`, value: `#FEE75C` },
              { name: `blanco`, value: `#FFFFFF` },
              { name: `naranja`, value: `#ff8000` },
              { name: `verde`, value: `#57F287` }
            );
        })
        .addStringOption((option) => {
          return option
            .setName(`aceptar`)
            .setDescription(`Elija un color en las sugerencias aceptadas`)
            .setRequired(true)
            .addChoices(
              { name: `rojo`, value: `#D84559` },
              { name: `invisible`, value: `#303135` },
              { name: `purpura`, value: `#5865F2` },
              { name: `amarillo`, value: `#FEE75C` },
              { name: `blanco`, value: `#FFFFFF` },
              { name: `naranja`, value: `#ff8000` },
              { name: `verde`, value: `#57F287` }
            );
        })
        .addStringOption((option) => {
          return option
            .setName(`denegar`)
            .setDescription(`Elija un color en las sugerencias rechazadas`)
            .setRequired(true)
            .addChoices(
              { name: `rojo`, value: `#D84559` },
              { name: `invisible`, value: `#303135` },
              { name: `purpura`, value: `#5865F2` },
              { name: `amarillo`, value: `#FEE75C` },
              { name: `blanco`, value: `#FFFFFF` },
              { name: `naranja`, value: `#ff8000` },
              { name: `verde`, value: `#57F287` }
            );
        });
    })
    .addSubcommand((subcommand) => {
      return subcommand
        .setName("delete")
        .setDescription(`🎉 eliminar los datos de sugerencia en el servidor`);
    }),
  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { guild, channel, message, options } = interaction;
    const i = interaction;

    if (interaction.options.getSubcommand() === "setup") {
      const channel = options.getChannel("canal");
      const role = options.getRole("manager");
      const embedColor = options.getString("embed");
      const acceptedColor = options.getString("aceptar");
      const declined_color = options.getString("denegar");

      await SuggestionSetup.findOneAndUpdate(
        { GuildID: guild.id },
        {
          SuggestChannel: channel.id,
          ManagerRole: role.id,
          embedColor: embedColor,
          AcceptColor: acceptedColor,
          DeclineColor: declined_color,
        },
        {
          new: true,
          upsert: true,
        }
      );

      i.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Sugerencias Setup Correct! 🎉`)
            .setDescription([
              `\`•\` Canal de sugerencias: ${channel}`,
              `\`•\` Rol de administrador: ${role}`,
              `\`•\` Color de incrustación: ${embedColor}`,
              `\`•\` Color de aceptadas: ${acceptedColor}`,
              `\`•\` Color de rechazadas: ${declined_color}`,
            ].join("\n"))
        ],
        ephemeral: true,
      });
    }
    if (interaction.options.getSubcommand() === "delete") {
      await SuggestionSetup.findOneAndDelete(
        { GuildID: guild.id },
        {
          GuildID: guild.id,
        }
      );

      await Suggestions.deleteMany(
        { GuildID: guild.id, ChannelID: channel.id },
        {
          GuildID: guild.id,
        }
      );

      if (!SuggestionSetup)
        return i.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle(`Interaccion Sin Datos Encontrados! 🎉`)
              .setDescription([
                  `\`•\` Interaccion: Error`,
                  `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                  `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                  `\`•\` Servidor: ${guild.name}`,
                  `\`•\` ID: ${guild.id}`,
                  `\`•\` Canal: ${channel.name}`,
              ].join("\n"))
          ],
          ephemeral: true,
        });

      i.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Sugerencias Setup Delete! 🎉`)
            .setDescription([
              `\`•\` Canal de sugerencias: ${channel}`,
              `\`•\` Rol de administrador: ${role}`,
              `\`•\` Color de incrustación: ${embedColor}`,
              `\`•\` Color de aceptadas: ${acceptedColor}`,
              `\`•\` Color de rechazadas: ${declined_color}`,
            ].join("\n"))
        ],
        ephemeral: true,
      }).catch((error) => {});
    }
  },
};
