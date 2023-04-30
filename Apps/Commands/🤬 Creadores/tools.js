const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType
} = require("discord.js");
const Discord = require("discord.js");
const chalk = require("chalk");
const { error } = require("winston");
const GitHub = require("easy-github-search"); // We define our package.
const search = new GitHub();
const { inspect } = require('util');
module.exports = {
  botpermisos: [
    "SendMessages",
    "EmbedLinks",
    "ManageMessages",
    "MoveMembers",
  ],
  permisos: [
    "SendMessages",
    "EmbedLinks",
  ],
  data: new SlashCommandBuilder()
    .setName("tools")
    .setDescription(
      "🤬 Herramienta de agregado de embeds discord herramienta gratuita"
    )
    .addSubcommand((options) =>
      options
        .setName("voice")
        .setDescription("🤬 mueve usuarios de un canal de voz a otro de forma rapida")
        .addChannelOption((option) =>
          option
            .setName("canal")
            .setDescription("Canal al que seran movidos los usuarios de discord")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildVoice)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("github")
        .setDescription("🥸 busca en github diferentes perfiles de usuarios")
        .addStringOption((option) =>
          option
            .setName("usuario")
            .setDescription("🥸 usuario de github que deseas buscar")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("reglas")
        .setDescription("🥸 muestra las reglas originales que discord recomienda en grupos publicos o comunidades")
    ),
  async execute(interaction, client) {
    try {
      const subcommand = interaction.options.getSubcommand();
      switch (subcommand) {
        case "voice": {
          try {
            if (!interaction.member.permissions.has("MoveMembers"))
              return interaction.reply({
                content: `<a:error:1030716002259980318> No tienes permisos para mover miembros en este servidor!`,
                ephemeral: true,
              });
            const { member, options } = interaction;
            const newChannel = options.getChannel("canal");
            const voiceChannel = member.voice.channel;
            if (!voiceChannel)
              return interaction.reply({
                content: `<a:error:1030716002259980318> You need to be in the voice channel to move the members!`,
                ephemeral: true,
              }).catch((error) => {});
            if (newChannel === voiceChannel)
              return interaction.reply({
                content: `<a:error:1030716002259980318> You can't move members to the same channel they are already in!`,
                ephemeral: true,
              }).catch((error) => {});
            voiceChannel.members.forEach((m) => {
              m.voice.setChannel(newChannel, `Voice Moved by ${member.user.tag}`);
            });
            interaction.reply({
              content: `<:panda_gift:1007529203119439882> Moved all users to ${newChannel}.`,
              ephemeral: true,
            }).catch((error) => {});
          } catch (e) {
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle(
                    `<a:error:1030716002259980318> New status code invalid?`
                  )
                  .setDescription(`\`\`\`yml\n${e}\`\`\``)
                  .setColor("Random")
                  .setFooter({ text: `Error en el comando voice` }),
              ],
              ephemeral: true,
            });
            console.log(
              chalk.redBright(`[Error]`) +
              chalk.whiteBright(
                `Se ha usado el comando voice en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`
              )
            );
          }
        }
          break;
        case "reglas": {
          try {
            if (!interaction.member.permissions.has("ManageMessages"))
              return interaction.reply({
                content: `<a:error:1030716002259980318> No tienes permisos para manejar mensajes en este servidor!`,
                ephemeral: true,
              });
            const embed = new Discord.EmbedBuilder()
              .setTitle("Rules Discord Native")
              .setURL("https://discord.com/guidelines")
              .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
              .setColor("Random")
              .addFields(
                {
                  name: "`•`1. ****Ser Respetuoso***",
                  value:
                    "Debes respetar a todos los usuarios, independientemente de tu agrado hacia ellos. Trata a los demás como quieres ser tratado.",
                },
                {
                  name: "`•`2. ***No Recurrir a lenguajes inapropiados***",
                  value:
                    "El uso de blasfemias debe mantenerse al mínimo. Sin embargo, cualquier lenguaje despectivo hacia cualquier usuario está prohibido.",
                },
                {
                  name: "`•`3. ***No Spamming & Flooding***",
                  value:
                    "No envíe muchos mensajes pequeños uno tras otro. No interrumpa el chat enviando spam. Sin embargo, puede enviar spam en el canal de spam.",
                },
                {
                  name: "`•`4. ***Sin publicidad***",
                  value:
                    "No toleramos ningún tipo de publicidad, ya sea para otras comunidades o transmisiones. Puede publicar su contenido en el canal de medios si es relevante y proporciona valor real (video/arte)",
                },
                {
                  name: "`•`5. ***Sin nombres ofensivos ni fotos de perfil.***",
                  value:
                    "Se le pedirá que cambie su nombre o imagen si el personal lo considera inapropiado.",
                },
                {
                  name: "`•`6. ***Servidor Raideo & Raiding***",
                  value: "No se permiten incursiones o menciones de incursiones.",
                },
                {
                  name: "`•`7. ***Amenazas directas e indirectas***",
                  value:
                    "Las amenazas a otros usuarios de ||DDoS, Death, DoX, abuso|| y otras amenazas maliciosas están absolutamente prohibidas y no permitidas.",
                },
                {
                  name: "`•`8. ***Siga las pautas de la comunidad de Discord***",
                  value:
                    "Puedes encontrarlos aquí: https://discordapp.com/guidelines",
                },
                {
                  name: "`•`9. ***No se una a los canales de chat de voz sin el permiso de las personas que ya están allí.***",
                  value:
                    "Si ve que tienen un lugar libre, está bien que se una y pregunte si tienen un lugar disponible, pero váyase si quien estuvo allí primero no desea su presencia.",
                },
                {
                  name: "`•`10.   ***Los administradores y moderadores silenciarán/expulsarán/prohibirán a su discreción. Si te sientes maltratado, envía un DM a un administrador y resolveremos el problema.***",
                  value:
                    "Todos los canales tendrán mensajes fijos que explican para qué están ahí y cómo funciona todo. Si no entiendes algo, ¡no dudes en preguntar!",
                },
                {
                  name: "`•`11. ***Extra***",
                  value:
                    "Su presencia en este servidor implica la aceptación de estas reglas, incluidos todos los cambios posteriores. Estos cambios pueden realizarse en cualquier momento sin previo aviso, es su responsabilidad verificarlos.",
                }
              )
              .setTimestamp()
              .setFooter({
                text: `Cualquier duda o sugerencia, contacta a un administrador.`,
                iconURL: interaction.user.avatarURL({ dynamic: true }),
              });

            let inviteEmbedBtn = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setLabel("Mandar")
                .setEmoji("1028717094453383229")
                .setCustomId("enviar"),
              new Discord.ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("cancelar")
                .setEmoji("1028717159930667078")
                .setLabel("Cancelar"),
              new Discord.ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId("ingles")
                .setEmoji("🔥")
                .setLabel("English")
            );
            interaction.reply({ embeds: [embed], components: [inviteEmbedBtn], ephemeral: true }).catch((error) => {});
            interaction.followUp({ content: `Recuerda que puedes usar el comando \`/admin panel\` para ver los setups pendientes para configurar o \`/bot modals\` para mandar sugerencias al bot y sus comandos actuales.`, ephemeral: true }).catch((error) => {});
            const filter = (button) => button.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({
              filter,
              time: 15000,
            });
            collector.on("collect", async (button) => {
              if (button.customId === "enviar") {
                const respuesta = new Discord.EmbedBuilder()
                  .setTitle("Rules Discord Native")
                  .setURL("https://discord.com/guidelines")
                  .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                  .setColor("Random")
                  .addFields(
                    {
                      name: "`•`1. ****Ser Respetuoso***",
                      value:
                        "Debes respetar a todos los usuarios, independientemente de tu agrado hacia ellos. Trata a los demás como quieres ser tratado.",
                    },
                    {
                      name: "`•`2. ***No Recurrir a lenguajes inapropiados***",
                      value:
                        "El uso de blasfemias debe mantenerse al mínimo. Sin embargo, cualquier lenguaje despectivo hacia cualquier usuario está prohibido.",
                    },
                    {
                      name: "`•`3. ***No Spamming & Flooding***",
                      value:
                        "No envíe muchos mensajes pequeños uno tras otro. No interrumpa el chat enviando spam. Sin embargo, puede enviar spam en el canal de spam.",
                    },
                    {
                      name: "`•`4. ***Sin publicidad***",
                      value:
                        "No toleramos ningún tipo de publicidad, ya sea para otras comunidades o transmisiones. Puede publicar su contenido en el canal de medios si es relevante y proporciona valor real (video/arte)",
                    },
                    {
                      name: "`•`5. ***Sin nombres ofensivos ni fotos de perfil.***",
                      value:
                        "Se le pedirá que cambie su nombre o imagen si el personal lo considera inapropiado.",
                    },
                    {
                      name: "`•`6. ***Servidor Raideo & Raiding***",
                      value: "No se permiten incursiones o menciones de incursiones.",
                    },
                    {
                      name: "`•`7. ***Amenazas directas e indirectas***",
                      value:
                        "Las amenazas a otros usuarios de ||DDoS, Death, DoX, abuso|| y otras amenazas maliciosas están absolutamente prohibidas y no permitidas.",
                    },
                    {
                      name: "`•`8. ***Siga las pautas de la comunidad de Discord***",
                      value:
                        "Puedes encontrarlos aquí: https://discordapp.com/guidelines",
                    },
                    {
                      name: "`•`9. ***No se una a los canales de chat de voz sin el permiso de las personas que ya están allí.***",
                      value:
                        "Si ve que tienen un lugar libre, está bien que se una y pregunte si tienen un lugar disponible, pero váyase si quien estuvo allí primero no desea su presencia.",
                    },
                    {
                      name: "`•`   ***Los administradores y moderadores silenciarán/expulsarán/prohibirán a su discreción. Si te sientes maltratado, envía un DM a un administrador y resolveremos el problema.***",
                      value:
                        "Todos los canales tendrán mensajes fijos que explican para qué están ahí y cómo funciona todo. Si no entiendes algo, ¡no dudes en preguntar!",
                    },
                    {
                      name: "`•`10. ***Extra***",
                      value:
                        "Su presencia en este servidor implica la aceptación de estas reglas, incluidos todos los cambios posteriores. Estos cambios pueden realizarse en cualquier momento sin previo aviso, es su responsabilidad verificarlos.",
                    }
                  )
                  .setTimestamp()
                  .setFooter({
                    text: `Cualquier duda o sugerencia, contacta a un administrador.`,
                    iconURL: interaction.user.avatarURL({ dynamic: true }),
                  });

                let web = new Discord.ActionRowBuilder().addComponents(
                  new Discord.ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Web Discord Rules")
                    .setEmoji("1026467695039873064")
                    .setURL("https://discord.com/guidelines")
                );
                interaction.channel.send({ embeds: [respuesta], components: [web] }).catch((error) => {});
                button.update({ embeds: [embed], components: [] }).catch((error) => {});
              }
              if (button.customId === "cancelar") {
                button.update({ embeds: [embed], components: [] }).catch((error) => {});
                interaction.channel.send({
                  content: `✅ Cancelado el envio de reglas por ${interaction.user.username}`,
                  ephemeral: true,
                }).catch((error) => {});
              }
              if (button.customId === "ingles") {
                const respuesta2 = new Discord.EmbedBuilder()
                  .setTitle("Rules Discord Native")
                  .setURL("https://discord.com/guidelines")
                  .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                  .setColor("Random")
                  .addFields(
                    {
                      name: "`•`1. ****Be Respectful***",
                      value:
                        "You must respect all users, regardless of how much you like them. Treat others as you want to be treated.",
                    },
                    {
                      name: "`•`2. ***Do Not Use Inappropriate Language***",
                      value:
                        "The use of profanity should be kept to a minimum. However, any derogatory language towards any user is prohibited.",
                    },
                    {
                      name: "`•`3. ***No spam or flood***",
                      value:
                        "Do not send many small messages one after another. Do not interrupt the chat by sending spam. However, you can send spam in the spam channel.",
                    },
                    {
                      name: "`•`4. ***No Ads***",
                      value:
                        "We do not tolerate any type of advertising, whether it is for other communities or streams. You can publish your content in the media channel if it is relevant and provides real value (video / art)",
                    },
                    {
                      name: "`•`5. ***No offensive names or profile pictures.***",
                      value:
                        "You will be asked to change your name or image if staff deem it inappropriate.",
                    },
                    {
                      name: "`•`6. ***Raiding & Raiding Server***",
                      value: "No raids or raid mentions allowed.",
                    },
                    {
                      name: "`•`7. ***Direct and indirect threats***",
                      value:
                        "Threats to other users of ||DDoS, Death, DoX, Abuse|| and other malicious threats are absolutely prohibited and not allowed.",
                    },
                    {
                      name: "`•`8. ***Follow Discord Community Guidelines***",
                      value:
                        "You can find them here: https://discordapp.com/guidelines",
                    },
                    {
                      name: "`•`9. ***Do not join voice chat channels without permission from the people who are already there.***",
                      value:
                        "If you see they have a spot open, it's okay to join and ask if they have a spot available, but leave if whoever was there first doesn't want you there.",
                    },
                    {
                      name: "`•` ***Admins and moderators will mute/ban/ban at their discretion. If you feel mistreated, DM an admin and we'll resolve the issue.***",
                      value:
                        "All channels will have fixed messages explaining what they are there for and how everything works. If you don't understand something, feel free to ask!",
                    },
                    {
                      name: "`•`10. ***Extra***",
                      value:
                        "Your presence on this server implies acceptance of these rules, including all subsequent changes. These changes may be made at any time without prior notice, it is your responsibility to check them.",
                    }
                  )
                  .setTimestamp()
                  .setFooter({
                    text: `Cualquier duda o sugerencia, contacta a un administrador.`,
                    iconURL: interaction.user.avatarURL({ dynamic: true }),
                  });

                let web2 = new Discord.ActionRowBuilder().addComponents(
                  new Discord.ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel("Web Discord Rules")
                    .setEmoji("1026467695039873064")
                    .setURL("https://discord.com/guidelines")
                );

                interaction.channel.send({ embeds: [respuesta2], components: [web2] }).catch((error) => {});
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
                  .setFooter({ text: `Error en el comando rules` }),
              ],
              ephemeral: true,
            });
          }
        }
          break;
        case "github": {
          const usuario = interaction.options.getString("usuario");
          search.searchUser(usuario).then((res) => {
            console.log(res)
            const e = new EmbedBuilder()
              .setTitle(`Github and Source Code Information about this Bot`)
              .addFields(
                { name: "\`•\` Nombre", value: `> ${res.username} \`(${res.id})\``, inline: true },
                { name: "\`•\` Followers", value: `> followers: ${res.followers}\n> following: ${res.following}`, inline: true },
                { name: "\`•\` Creacion", value: `> ${res.createdAt} \`(${res.updatedAt})\`` },
                { name: "\`•\` Repositories", value: `> Publicos: \`${res.publicRepos}\` Gits: \`${res.publicGists}\``, inline: true },
                { name: "\`•\` Links", value: `> ${res.url}\n> ${res.htmlUrl}` },
                { name: "\`•\` Bio", value: `> ${res.bio ? `${res.bio}` : `<a:error:1030716002259980318> No tiene bio agregada al perfil de github`}` },
                { name: "\`•\` Dates Extras", value: `\`\`\`yml\nEmail: ${res.email ? `${res.email}` : ``}\nCompania: ${res.company ? `${res.company}` : ``}\nTwitter: ${res.twitter ? `${res.twitter}` : ``}\nLocation: ${res.location ? `${res.location}` : ``}\`\`\`` },
              )
              .setThumbnail(res.avatarUrl)
              .setFooter({ text: "Mas comandos nuevos en mi grupo oficial de discord", iconURL: client.user.displayAvatarURL() })
              .setColor("Random")
              .setTimestamp();

            const i = new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Link)
                  .setURL(res.htmlUrl)
                  .setLabel("GitHub Profile")
                  .setEmoji("🥸"),
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Danger)
                  .setCustomId("json")
                  .setLabel("Repositorios")
                  .setEmoji("🥺"),
                new ButtonBuilder()
                  .setStyle(ButtonStyle.Success)
                  .setCustomId("tomato")
                  .setLabel("Purpur Bot")
                  .setEmoji("🥰"),
              );

            interaction.reply({ embeds: [e], components: [i]}).catch(() => {});
          }).catch((err) =>
            interaction.reply({ content: `<a:error:1030716002259980318> No se encontro ningun usuario con ese nombre intente con otro username usando \`/github\``, ephemeral: true }));

          const filter = (button) => button.user.id === interaction.user.id;
          const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

          collector.on("collect", async (button) => {
            if (button.customId === "json") {

              search.getUserRepos(usuario).then((docker) => {

                if (docker.message === "The search was not found." && docker.severity === "COMMON") {
                  return interaction.editReply({ content: `<a:error:1030716002259980318> No se encontro ningun repositorio intente con otro username usando \`/github\``, ephemeral: true });
                }

                const h = new EmbedBuilder()
                  .setTitle(`Github Json Repositories`)
                  .addFields(
                    { name: "\`•\` Nombre", value: `> ${docker.repository.info.name ? `${docker.repository.info.name}` : `<a:error:1030716002259980318> Sin Nombre Colocado`}`, inline: true },
                    { name: "\`•\` Owner", value: `> ${docker.owner.username} \`(${docker.owner.id})\``, inline: true },
                    { name: "\`•\` Descripcion", value: `> ${docker.repository.info.description ? `${docker.repository.info.description}` : `<a:error:1030716002259980318> No tiene descripcion el Repositorio`}` },
                    { name: "\`•\` Visibility", value: `> ${docker.repository.info.visibility}` },
                    { name: "\`•\` Datos Extras", value: `\`\`\`yml\nDefaultBranch: ${docker.repository.info.defaultBranch}\nForks: ${docker.repository.info.forks}\nWatchers: ${docker.repository.info.watchers}\`\`\`` },
                  )
                  .setFooter({ text: "Mas comandos nuevos en mi grupo oficial de discord", iconURL: client.user.displayAvatarURL() })
                  .setThumbnail(docker.owner.avatarUrl)
                  .setColor("Random")
                  .setTimestamp();
                interaction.editReply({ embeds: [h], components: []}).catch((error) => {});
              });
            }
          });
        }
          break;
      }
    } catch (e) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              `<:VS_cancel:1006609599199186974> New status code invalid?`
            )
            .setDescription(`\`\`\`yml\n${e}\`\`\``)
            .setColor("Random")
            .setFooter({ text: `Error en el comando tools` }),
        ],
        ephemeral: true,
      });
    }
  },
};
