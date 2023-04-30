const {
  SlashCommandBuilder,
  CommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  ButtonStyle,
  EmbedBuilder,
  ButtonBuilder,
  ChannelType,
} = require("discord.js");
const Discord = require("discord.js");
const chalk = require("chalk");
const SuggestionSetup = require("../../../Model/sugerencia/suggestionSetup");
module.exports = {
  botpermisos: [
    "SendMessages",
    "EmbedLinks",
    "ReadMessageHistory",
    "UseExternalEmojis",
    "AddReactions",
    "AttachFiles",
  ],
  permisos: [
    "SendMessages",
    "EmbedLinks",
    "ReadMessageHistory",
    "UseExternalEmojis",
  ],
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("🌍 Muestra información sobre el servidor/usuario")
    .addSubcommand((options) =>
      options
        .setName("avatar")
        .setDescription("🌍 Muestra el avatar de un usuario del servidor")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Provide a user to check")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("role")
        .setDescription("🌍 Muestra información sobre algun rol del servidor")
        .addRoleOption((option) =>
          option
            .setName("info")
            .setDescription("Provide a role to check")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("sugerencia")
        .setDescription("🌍 Manda una sugerencia a los creadores del servidor")
    )
    .addSubcommand((options) =>
      options
        .setName("permisos")
        .setDescription("🌍 Obten los permisos de diferentes usuarios de discord")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("elije el usuario al que quieres decifrar")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("google")
        .setDescription(
          "🌍 Busca en googley mas de 3 plataformas alguna informacion"
        )
        .addStringOption((option) =>
          option
            .setName("busqueda")
            .setDescription("Escribe lo que quieres buscar")
            .setRequired(true)
            .setMaxLength(20)
            .setMinLength(3)
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { guild, options } = interaction;
    switch (options.getSubcommand()) {
      case "avatar":
        {
          try {
            const user =
              interaction.options.getUser("user") || interaction.user;

            let png = user.avatarURL({
              format: "png",
              dynamic: true,
              size: 1024,
            });
            let jpg = user.avatarURL({
              format: "jpg",
              dynamic: true,
              size: 1024,
            });
            let webp = user.avatarURL({
              format: "webp",
              dynamic: true,
              size: 1024,
            });

            const avatar = new Discord.EmbedBuilder()
              .setAuthor({
                name: "Avatar de " + interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              })
              .setImage(
                user.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                  size: 1024,
                })
              )
              .setFooter({ text: `Avatar pedido por ${interaction.user.tag}` })
              .setTimestamp()
              .setColor("Random");

            interaction.reply({
              embeds: [avatar],
              components: [
                new Discord.ActionRowBuilder().addComponents([
                  new Discord.ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setEmoji("1026467687649513563")
                    .setLabel("PNG")
                    .setURL(`${png}`),
                  new Discord.ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setEmoji("1026467687649513563")
                    .setLabel("JPG")
                    .setURL(`${jpg}`),
                  new Discord.ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setEmoji("1026467687649513563")
                    .setLabel("WEBP")
                    .setURL(`${webp}`),
                ]),
              ],
            }).catch((error) =>
              console.log(chalk.cyanBright("[Slash]") + ` Se produjo un Error en el Slash [Info] en el Servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
          } catch (e) {
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle(
                    `<:VS_cancel:1006609599199186974> New status code invalid?`
                  )
                  .setDescription(`\`\`\`yml\n${e}\`\`\``)
                  .setColor("Random")
                  .setFooter({ text: `Error en el comando avatar` }),
              ],
              ephemeral: true,
            });
          }
        }
        break;
      case "role":
        {
          try {
            const role = interaction.options.getRole("info");
            if (!role) return interaction.reply(client.main);
            let roleP = role.permissions.toArray().join(" | ");
            if (roleP.length > 1024) roleP = "Too many permissions to display";
            const roleInfo = new Discord.EmbedBuilder()
              .setAuthor({
                name: `Role Information ${role.name}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              })
              .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
              .addFields(
                {
                  name: `\`•\` Role name:`,
                  value: `*${role.name}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Role color:`,
                  value: `*${role.color}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Role hex color:`,
                  value: `*${role.hexColor}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Mention:`,
                  value: `*${role.toString()}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Created AT:`,
                  value: `*${role.createdAt.toLocaleTimeString()}*`,
                  inline: true,
                },
                { name: `\`•\` Role ID:`, value: `*${role.id}*`, inline: true },
                {
                  name: `\`•\` Role position:`,
                  value: `*${role.position}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Role members:`,
                  value: `*${role.members.size}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Role Hoist:`,
                  value: `*${role.hoist}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Role Permissions:`,
                  value: `\`${roleP}\``,
                  inline: true,
                }
              )
              .setColor(role.color)
              .setTimestamp()
              .setFooter({
                text: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              });

            let web = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setLabel("Owner")
                .setCustomId("Owner")
                .setEmoji("1028717188112203867")
            );
            interaction.reply({ embeds: [roleInfo], components: [web] }).catch((error) =>
              console.log(chalk.cyanBright("[Slash]") + ` Se produjo un Error en el Slash [Info] en el Servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
          } catch (e) {
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle(
                    `<:VS_cancel:1006609599199186974> New status code invalid?`
                  )
                  .setDescription(`\`\`\`yml\n${e}\`\`\``)
                  .setColor("Random")
                  .setFooter({ text: `Error en el comando role-info` }),
              ],
              ephemeral: true,
            });
            console.log(
              chalk.redBright(`[Error]`) +
              chalk.whiteBright(
                `Se ha usado el comando roles en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`
              )
            );
          }
        }
        break;
      case "sugerencia":
        {
          const { guild } = interaction;
          const SuggestionSetupDB = await SuggestionSetup.findOne({
            GuildID: guild.id,
          });
          if (!SuggestionSetupDB)
            return interaction.reply({
              content: `<:VS_cancel:1006609599199186974> **Warning:** Couldn't find any data on this system, please use the \`/sugerencia-setup\` command to set it up.`,
              ephemeral: true,
            })

          const InputField = new TextInputBuilder()
            .setCustomId("suggest_Modal")
            .setLabel("Por Favor proporciona tu sugerencia")
            .setPlaceholder("Sugerencias Sistema!")
            .setMaxLength(300)
            .setMinLength(1)
            .setStyle(TextInputStyle.Paragraph);

          const TestModalTextModalInputRow =
            new ActionRowBuilder().addComponents(InputField);

          const modal = new ModalBuilder()
            .setCustomId("suggestModal")
            .setTitle("Envia tu Sugerencia!")
            .addComponents(TestModalTextModalInputRow);

          await interaction.showModal(modal)
        }
        break;
      case "google": {
        try {
          const text2 = interaction.options.getString("busqueda");
          const google1 = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`https://www.google.com/search?q=${text2}`)
            .setLabel("Google")
            .setEmoji("🔍");

          const bing = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`https://www.bing.com/search?q=${text2}`)
            .setLabel("Bing")
            .setEmoji("🧐");

          const duckduckgo = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`https://duckduckgo.com/?q=${text2}`)
            .setLabel("Duckduckgo")
            .setEmoji("🐤");

          const wikipedia = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`https://www.wikipedia.org/wiki/${text2}`)
            .setLabel("Wikipedia")
            .setEmoji("🌍");

          let row = new Discord.ActionRowBuilder()
            .addComponents(google1)
            .addComponents(bing);

          let row2 = new Discord.ActionRowBuilder()
            .addComponents(duckduckgo)
            .addComponents(wikipedia);

          const panel = new Discord.EmbedBuilder()
            .setTitle(
              `<:panda_gift:1007529203119439882> Aqui esta tu busqueda recientemente`
            )
            .addFields({
              name: `\`•\` Busqueda Realizada`,
              value: `${text2}`
            })
            .setTimestamp()
            .setFooter({
              text: `Busquedas y Mas solo en mi servidor de soporte`,
            })
            .setColor(`Random`);
          interaction.reply({
            embeds: [panel],
            components: [row, row2],
            ephemeral: true,
          }).catch((error) =>
            console.log(chalk.cyanBright("[Slash]") + ` Se produjo un Error en el Slash [Info] en el Servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
        } catch (e) {
          interaction.reply({
            embeds: [
              new Discord.EmbedBuilder()
                .setTitle(
                  `<:VS_cancel:1006609599199186974> New status code invalid?`
                )
                .setDescription(`\`\`\`yml\n${e}\`\`\``)
                .setColor("Random")
                .setFooter({ text: `Error en el comando google` }),
            ],
            ephemeral: true,
          });
        }
      }
        break;
      case "permisos": {
        const { member, channelId, guildId, applicationId, commandName, deferred, replied, ephemeral, options, id, createdTimestamp } = interaction;
        const { guild } = member;
        const user = interaction.options.getUser("user");
        if (!user) user = member.user;
        try {
          try {
            const member = guild.members.cache.get(user.id);
            const embeduserinfo = new Discord.EmbedBuilder()
            embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            embeduserinfo.setTitle(`Aqui esta la informacion de ${member.user.username}`)
            embeduserinfo.setAuthor({ name: "Obtencion de Permisos", iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            embeduserinfo.addFields({ name: "Estos son los permisos obtenidos", value: `${member.permissions.toArray().map(p => `\`${p}\``).join(" | ")}` })
            embeduserinfo.setColor("Random").setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            embeduserinfo.setFooter({ text: "Comandos Personalizados Qin Shi Huang" })
            interaction?.reply({ embeds: [embeduserinfo] })
          } catch (e) {
            const embeduserinfo = new Discord.EmbedBuilder()
            embeduserinfo.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            embeduserinfo.setTitle(`Aqui esta la informacion de ${member.user.username}`)
            embeduserinfo.setAuthor({ name: "Obtencion de Permisos", iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            embeduserinfo.addFields({ name: "Estos son los permisos obtenidos", value: `${member.permissions.toArray().map(p => `\`${p}\``).join(" | ")}` })
            embeduserinfo.setColor("Random").setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            embeduserinfo.setFooter({ text: "Comandos Personalizados Qin Shi Huang" })
            interaction?.reply({ embeds: [embeduserinfo] })
          }
        } catch (e) {
          interaction.reply({
            embeds: [
              new Discord.EmbedBuilder()
                .setTitle(
                  `<:VS_cancel:1006609599199186974> New status code invalid?`
                )
                .setDescription(`\`\`\`yml\n${e}\`\`\``)
                .setColor("Random")
                .setFooter({ text: `Error en el comando role-info` }),
            ],
            ephemeral: true,
          });
        }
      }
        break;
    }
  },
};
