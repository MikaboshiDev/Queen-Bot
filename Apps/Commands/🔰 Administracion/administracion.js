const {
  EmbedBuilder,
  SlashCommandBuilder,
  ButtonStyle,
  ChannelType,
  ButtonBuilder,
  ActionRowBuilder,
} = require("discord.js");
const Discord = require(`discord.js`);
const chalk = require("chalk");
const DB = require("../../../Model/encuesta/pollDB");
const Suggestions = require("../../../Model/sugerencia/suggestion");
const SuggestionSetup = require("../../../Model/sugerencia/suggestionSetup");
module.exports = {
  botpermisos: [
    "ManageChannels",
    "SendMessages",
    "EmbedLinks",
    "ManageMessages",
  ],
  permisos: [
    "ManageChannels",
    "SendMessages",
    "EmbedLinks",
    "ManageMessages",
  ],
  data: new SlashCommandBuilder()
    .setName("admin")
    .setDescription("🔰 Comandos de administracion para servidores")
    .addSubcommand((options) =>
      options
        .setName("nuke")
        .setDescription("🔰 nukea un canal de tu servidor de discord")
        .addChannelOption((option) => {
          return option
            .setName("channel")
            .setRequired(false)
            .setDescription("Channel to send the message to.")
            .addChannelTypes(ChannelType.GuildText);
        })
    )
    .addSubcommand((options) =>
      options
        .setName("sugerencias")
        .setDescription("🔰 Elimina, acepta o borra las sugerencias del sistema del bot")
        .addStringOption((option) =>
          option
            .setName(`action`)
            .setDescription(`Elija una acción específica para usar`)
            .setRequired(true)
            .addChoices(
              { name: `aceptar`, value: `accept` },
              { name: `denegar`, value: `decline` },
              { name: `pendiente`, value: `un-respond` }
            )
        )
        .addStringOption((option) =>
          option
            .setName("motivo")
            .setDescription("Ingresa el motivo de la accion tomada")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName(`message`)
            .setDescription(`Proporcione una identificación de mensaje de sugerencia`)
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case "nuke":
        {
          try {
            const channel = interaction.options.getChannel("channel") || interaction.channel;
            const embed = new Discord.EmbedBuilder()
              .setTitle(`🛡️ Nuke Sistema`)
              .setDescription(`*¿Estas seguro de que quieres nukear el canal **${channel}**?*`)
              .setColor("Random")
              .setTimestamp()
              .setFooter({
                text: `Solicitado por ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              });
            const row = new Discord.ActionRowBuilder()
              .addComponents(
                new Discord.ButtonBuilder()
                  .setCustomId("nuke")
                  .setLabel("Nuke")
                  .setEmoji(`✅`)
                  .setStyle(ButtonStyle.Danger),
                new Discord.ButtonBuilder()
                  .setCustomId("cancelar")
                  .setEmoji(`🛑`)
                  .setLabel("Cancelar")
                  .setStyle(ButtonStyle.Secondary),
                new Discord.ButtonBuilder()
                  .setCustomId("clonar")
                  .setLabel("Clonar")
                  .setEmoji("🤬")
                  .setStyle(ButtonStyle.Primary)
              );
            interaction.reply({
              embeds: [embed],
              components: [row],
              ephemeral: true,
            }).catch((error) => {});
            const filter = (button) => button.user.id === interaction.user.id;
            const collector =
              interaction.channel.createMessageComponentCollector({
                filter,
                time: 15000,
              });
            collector.on("collect", async (button) => {
              if (button.customId === "nuke") {
                if (!interaction.guild.members.me.permissions.has("ManageChannels"))
                  return interaction.reply({
                    embeds: [
                      new Discord.EmbedBuilder()
                        .setTitle(`Sistema Nuke! 🟡`)
                        .setDescription([
                          `\`•\` Estado: Error`,
                          `\`•\` Razon: No tengo permisos para administrar canales`,
                          `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                          `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                        ].join("\n"))
                    ],
                    ephemeral: true,
                  }).catch((error) => { });
                const position = channel.position;
                const newChannel = await channel.clone();
                await channel.delete().catch((error) => { });
                newChannel.setPosition(position);
                newChannel.send({
                  embeds: [
                    new Discord.EmbedBuilder()
                      .setTitle(`Sistema Nuke! 🟢`)
                      .setDescription([
                        `\`•\` Estado: Exitoso`,
                        `\`•\` Razon: Canal nukeado con exito`,
                        `\`•\` User: ${interaction.user.tag}`,
                        `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                        `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                      ].join("\n")),
                  ],
                }).catch((error) => { });
                button.update({ embeds: [], components: [] }).catch((error) => { });
              }
              if (button.customId === "cancelar") {
                button.update({ embeds: [embed.setDescription([
                  `\`•\` Estado: Cancelado`,
                  `\`•\` Razon: Cancelado por el usuario`,
                  `\`•\` User: ${interaction.user.tag}`,
                  `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                  `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                ].join("\n"))
              ], components: [], ephemeral: true }).catch((error) => { });
              }
              if (button.customId === "clonar") {

                const row = new Discord.ActionRowBuilder().addComponents(
                  new Discord.ButtonBuilder()
                    .setCustomId("clone")
                    .setLabel("Clonar")
                    .setEmoji(`✅`)
                    .setStyle(ButtonStyle.Danger),
                  new Discord.ButtonBuilder()
                    .setCustomId("cancel")
                    .setEmoji(`🛑`)
                    .setLabel("Cancelar")
                    .setStyle(ButtonStyle.Secondary)
                );

                interaction.editReply({
                  embeds: [new Discord.EmbedBuilder()
                    .setTitle(`🛡️ Clone Channel Sistema`)
                    .setDescription(`*¿Estas seguro de que quieres clonar el canal **${channel}**?*`)
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                  ], components: [row], ephemeral: true
                }).catch((error) => { });
                const filter = (botones) => button.user.id === interaction.user.id;
                const collector =
                  interaction.channel.createMessageComponentCollector({
                    filter,
                    time: 15000,
                  });
                collector.on("collect", async (botones) => {
                  if (botones.customId === "clone") {
                    const position = channel.position;
                    const newChannel = await channel.clone();
                    newChannel.setPosition(position);
                    newChannel.send({ embeds: [
                      new Discord.EmbedBuilder()
                        .setTitle(`Sistema Clonar! 🟢`)
                        .setDescription([
                          `\`•\` Estado: Exitoso`,
                          `\`•\` Razon: Canal clonado con exito`,
                          `\`•\` User: ${interaction.user.tag}`,
                          `\`•\` Canal: ${channel}`,
                          `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                          `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                        ].join("\n"))
                    ] })
                    botones.update({ embeds: [embed.setDescription([
                          `\`•\` Estado: Exitoso`,
                          `\`•\` Razon: Canal clonado con exito`,
                          `\`•\` User: ${interaction.user.tag}`,
                          `\`•\` Canal: ${channel}`,
                          `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                          `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                    ].join("\n"))
                  ], components: [] }).catch((error) => { });
                  }
                  if (botones.customId === "cancel") {
                    botones.update({ embeds: [embed.setDescription([
                          `\`•\` Estado: Cancelado`,
                          `\`•\` Razon: Cancelado por el usuario`,
                          `\`•\` User: ${interaction.user.tag}`,
                          `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                          `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                    ].join("\n"))
                  ], components: [] }).catch((error) => { }); 
                  }
                });
              }
            });
          } catch (e) {
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle(
                    `<:VS_cancel:1006609599199186974> New status code invalid?`
                  )
                  .setDescription(`\`\`\`yml\n${e}\`\`\``)
                  .setColor("Random")
                  .setFooter({ text: `Error en el comando nuke` }),
              ],
              ephemeral: true,
            });
          }
        }
        break;
      case "sugerencias":
        {
          const { guild, channel, options, member } = interaction;
          const i = interaction;

          const messageId = options.getString("message");
          const action = options.getString("action");
          const razones = options.getString("motivo");

          if (razones > 100) return interaction.reply({ 
            embeds: [
              new EmbedBuilder()
                .setTitle("Comando Sugerencias! 🟡")
                .setDescription([
                  `\`•\` Estado: Error`,
                  `\`•\` Motivo: El motivo no puede ser mayor a 100 caracteres`,
                  `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                  `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                ].join("\n"))
            ],
            ephemeral: true 
          }).catch((error) => { });

          const SuggestionsDB = await Suggestions.findOne({
            GuildID: guild.id,
            ChannelID: channel.id,
            MessageID: messageId,
          });
          if (!SuggestionsDB)
            return i.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("Comando Sugerencias! 🔴")
                  .setDescription([
                    `\`•\` Estado: Error`,
                    `\`•\` Motivo: No se encontro ningun dato de la sugerencia`,
                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                    `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
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
                new EmbedBuilder()
                  .setTitle("Comando Sugerencias! 🔴")
                  .setDescription([
                    `\`•\` Estado: Error`,
                    `\`•\` Motivo: No se encontro ningun dato de este sistema`,
                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                    `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                  ].join("\n"))
              ],
              ephemeral: true,
            }).catch((error) => { });

          if (
            !member.roles.cache.find(
              (r) => r.id === SuggestionSetupDB.ManagerRole
            )
          )
            return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("Comando Sugerencias! 🟡")
                  .setDescription([
                    `\`•\` Estado: Error`,
                    `\`•\` Motivo: No tienes permisos para usar estas acciones`,
                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                    `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                  ].join("\n"))
              ],
              ephemeral: true,
            }).catch((error) => { }); 

          const SuggestChannel = guild.channels.cache.get(
            SuggestionSetupDB.SuggestChannel
          );
          const SuggestMessage = await SuggestChannel.messages.fetch(
            SuggestionsDB.MessageID
          );

          const Buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("Upvote")
              .setLabel("Votar")
              .setDisabled(true)
              .setEmoji("👍")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("Downvote")
              .setDisabled(true)
              .setEmoji("👎")
              .setLabel("Votar")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("Delete")
              .setEmoji("🗑️")
              .setDisabled(true)
              .setLabel("Declinar")
              .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
              .setCustomId("Accept")
              .setEmoji("✅")
              .setLabel("Aceptar")
              .setDisabled(true)
              .setStyle(ButtonStyle.Secondary),
          );

          const Embed = EmbedBuilder.from(SuggestMessage.embeds[0]);

          switch (action) {
            case "accept":
              {
                if (SuggestionsDB.Accepted == true)
                  return i.reply({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle("Comando Sugerencias! 🟡")
                        .setDescription([
                          `\`•\` Estado: Error`,
                          `\`•\` Motivo: Esta sugerencia ya esta aceptada`,
                          `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                          `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                        ].join("\n"))
                    ],
                    ephemeral: true,
                  }).catch((error) => { });
                Embed.setColor(SuggestionSetupDB.AcceptColor);
                Embed.setFooter({ text: `Aceptada la sugerencia por ${member.user.tag} at`, iconURL: member.user.displayAvatarURL() });
                Embed.setTimestamp();
                Embed.data.fields[3] = {
                  name: `\`•\` Razon`,
                  value: `> ${razones}`
                };

                await SuggestMessage.edit({
                  content: `<@${SuggestionsDB.MemberID}>`,
                  embeds: [Embed],
                  components: [Buttons],
                }).catch((error) => { });
                await Suggestions.findOneAndUpdate(
                  {
                    GuildID: guild.id,
                    ChannelID: channel.id,
                    MessageID: messageId,
                  },
                  { Declined: false, Accepted: true }
                );
                i.reply({
                  content: `✅ **Éxito:** Aceptaste la sugerencia del usuario`,
                  ephemeral: true,
                }).catch((error) => { }); 
              }
              break;
            case "decline":
              {
                if (SuggestionsDB.Declined == true)
                  return i.reply({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle("Comando Sugerencias! 🟡")
                        .setDescription([
                          `\`•\` Estado: Error`,
                          `\`•\` Motivo: Esta sugerencia ya fue rechazada`,
                          `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                          `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                        ].join("\n"))
                    ],
                    ephemeral: true,
                  }).catch((error) => { });
                Embed.setColor(SuggestionSetupDB.DeclineColor);
                Embed.setFooter({
                  text: `Rechazado por ${member.user.tag} at`,
                });
                Embed.setTimestamp();
                Embed.data.fields[3] = {
                  name: `\`•\` Razon`,
                  value: `> ${razones}`
                };

                await SuggestMessage.edit({
                  content: `<@${SuggestionsDB.MemberID}>`,
                  embeds: [Embed],
                  components: [Buttons],
                }).catch((error) => { });
                await Suggestions.findOneAndUpdate(
                  {
                    GuildID: guild.id,
                    ChannelID: channel.id,
                    MessageID: messageId,
                  },
                  { Declined: true, Accepted: false }
                );
                interaction.reply({
                  content: `✅ **Éxito** Rechazaste la sugerencia del usuario`,
                  ephemeral: true,
                }).catch((error) => { });
              }
              break;
            case "un-respond":
              {
                if (SuggestionsDB.Accepted || SuggestionsDB.Declined == false)
                  return i.reply({
                    embeds: [
                      new EmbedBuilder()
                        .setTitle("Comando Sugerencias! 🟡")
                        .setDescription([
                          `\`•\` Estado: Error`,
                          `\`•\` Motivo: La sugerencia esta en pendiente`,
                          `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                          `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                        ].join("\n"))
                    ],
                    ephemeral: true,
                  }).catch((error) => { });

                Embed.setFooter({ text: `Sugerencia comenzó de nuevo en` });
                Embed.setTimestamp();
                Embed.setColor(SuggestionSetupDB.embedColor);
                Embed.data.fields[3] = {
                  name: `\`•\` Razon`,
                  value: `> ${razones}`
                };

                await SuggestMessage.edit({
                  content: `** **`,
                  embeds: [Embed],
                  components: [
                    new ActionRowBuilder().addComponents(
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
                    ),
                  ],
                });
                await Suggestions.findOneAndUpdate(
                  {
                    GuildID: guild.id,
                    ChannelID: channel.id,
                    MessageID: messageId,
                  },
                  { Declined: false, Accepted: false }
                );
                i.reply({
                  embeds: [
                    new EmbedBuilder()
                      .setTitle("Comando Sugerencias! 🟢")
                      .setDescription([
                        `\`•\` Estado: Exito`,
                        `\`•\` Motivo: Has reiniciado la sugerencia actual`,
                        `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                        `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                      ].join("\n"))
                  ],
                  ephemeral: true,
                }).catch((error) => { });
              }
              break;
          }
        }
        break;
    }
  },
};
