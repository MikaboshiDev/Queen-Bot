const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  AttachmentBuilder,
} = require("discord.js");
const kitsu = require("node-kitsu");
const superagent = require("superagent");
const Discord = require("discord.js");
const chalk = require("chalk");
const translate = require("@iamtraction/google-translate");
const moment = require("moment");
const axios = require("axios");
const { Rank } = require('canvacord');
const User = require('../../../Model/level/user');
module.exports = {
  botpermisos: [
    "SendMessages",
    "EmbedLinks"
  ],
  data: new SlashCommandBuilder()
    .setName("games")
    .setDescription("🎮 Comandos de la categoria de juegos")
    .addSubcommand((options) =>
      options
        .setName("traducir")
        .setDescription("🎮 comando de traduccion a diferentes idiomas")
        .addStringOption(option =>
          option
            .setName("texto")
            .setDescription("proporciona el texto a traducir")
            .setRequired(true)
            .setMaxLength(200)
        )
        .addStringOption(option =>
          option
            .setName("opciones")
            .setDescription("selecciona un lenguaje a traducir")
            .setRequired(true)
            .addChoices(
              { name: `español`, value: `es` },
              { name: `ingles`, value: `en` },
              { name: "frances", value: "fr" },
              { name: "alemán", value: "de" },
              { name: "japones", value: "ja" },
              { name: "euskera", value: "eu" },
              { name: "portugués", value: "pt" },
              { name: "ruso", value: "ru" },
              { name: "chino", value: "zh" },
              { name: "italiano", value: "it" },
            )
        )
    )
    .addSubcommand((options) =>
      options
        .setName("rango")
        .setDescription("🎮 Obtenga su rango y la xp del otro nivel por una livecard")
    )
    .addSubcommand((options) =>
      options
        .setName("twith")
        .setDescription("🎮 Investiga canales de twith con estos comandos.")
        .addStringOption((option) =>
          option
            .setName("user")
            .setDescription("Usuario para dar informacion")
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case "twith":
        {
          const { options, member } = interaction;
          const channelName = options.getString("user");

          interaction.deferReply();
          if (!channelName)
            return interaction.reply({
              content: `<a:error:1030716002259980318> Tienes que introducir un canal de twitch.`,
              ephermeral: true,
            }).catch((error) => {});

          try {
            const Response = await superagent.get(
              `https://api.crunchprank.net/twitch/followcount/${channelName.toLowerCase()}`
            );
            const upTime = await superagent.get(
              `https://api.crunchprank.net/twitch/uptime/${channelName.toLowerCase()}`
            );
            const totalViews = await superagent.get(
              `https://api.crunchprank.net/twitch/total_views/${channelName.toLowerCase()}`
            );
            const accountage = await superagent.get(
              `https://api.crunchprank.net/twitch/creation/${channelName.toLowerCase()}`
            );
            const lastGame = await superagent.get(
              `https://api.crunchprank.net/twitch/game/${channelName.toLowerCase()}`
            );
            const avatarimg = await superagent.get(
              `https://api.crunchprank.net/twitch/avatar/${channelName.toLowerCase()}`
            );

            const embed = new EmbedBuilder()

              .setColor("#e100ff")
              .setTitle(`Twitch stats de: ${channelName}`)
              .setDescription(
                `❣️ **Followers**: ${Response.text} \n
                        👀 **Views**: ${totalViews.text}\n 
                        ⬆ **Uptime**: ${upTime.text} \n
                        📝 **Creado el**: ${accountage.text}  \n
                        ⏮️ **Ultimo juego**: ${lastGame.text} \n
                        🔴 **En directo**: ${upTime.text}`
              )
              .setFooter({
                text: `Informacion requerida por: ${member.user.tag}`,
                iconURL: member.user.displayAvatarURL(),
              })
              .setURL(`https://twitch.tv/${channelName}`)
              .setThumbnail(
                "https://pngimg.com/uploads/twitch/twitch_PNG27.png"
              )
              .setImage(`${avatarimg.text}`)
              .setTimestamp();

            interaction.editReply({
              embeds: [embed],
              components: [
                new Discord.ActionRowBuilder().addComponents([
                  new Discord.ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setEmoji(`1007529203119439882`)
                    .setLabel("Link")
                    .setURL(`https://twitch.tv/${channelName}`),
                ]),
              ],
            }).catch((error) => {});

            if (upTime.text === `${channelName} is offline`) {
              upTime.text = "esta Offline";
            }
          } catch (error) {
            return interaction.editReply({
              content: `<a:error:1030716002259980318> El usuario no es valido o ha ocurrido un error inesperado.`,
              ephermeral: true,
            }).catch((error) => {});
          }
        }
        break;
      case "traducir": {
        const { guild, options, member } = interaction

        try {

          await interaction.deferReply({ ephemeral: true })

          const texto = options.getString("texto")
          const opciones = options.getString("opciones")

          const traduccion = await translate(texto, { to: opciones })

          const respuesta = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }), url: "https://discord.gg/J9R5VNTr2x" })
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setTitle("Aquí tienes la traducción")
            .setDescription(`\`\`\`${traduccion.text}\`\`\``)
            .setFooter({ text: `solicitado por ${member.user.tag}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}` })
            .setTimestamp()

          return interaction.editReply({ embeds: [respuesta] })

        } catch (error) {
          console.log(error)

          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`<a:error:1030716002259980318> Lo siento ${member} ocurrió un error al obtener los datos!`)
            ]
          })
        }

      }
      break;
      case "rango": {
        const member = interaction.member;

        let user;

        const guildId = member.guild.id;
        const userId = member.user.id;

        user = await User.findOne({ guildId, userId });

        if (!user) {
          user = {
            level: 1,
            xp: 0,
          };
        }

        const rank = new Rank()
          .setAvatar(member.user.displayAvatarURL())
          .setCurrentXP(user.xp)
          .setLevel(user.level)
          .setRank(0, 0, false)
          .setRequiredXP(user.level * 100)
          .setStatus(member.presence.status)
          .setProgressBar('#FFFFFF', 'COLOR')
          .setUsername(member.user.username)
          .setDiscriminator(member.user.discriminator);

        rank.build().then((data) => {
          interaction.reply({
            files: [new AttachmentBuilder(data, { name: 'rank.png' })],
          }).catch((error) => {});
        });
      }
      break;
    }
  },
};
