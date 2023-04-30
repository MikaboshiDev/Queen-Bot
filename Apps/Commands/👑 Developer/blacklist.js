const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const guildBLK = require("../../../Model/blacklist/serverBlacklist");
const userBLK = require("../../../Model/blacklist/userBlacklist");
const moment = require("moment");

module.exports = {
  botpermisos: [
    "SendMessages",
    "EmbedLinks"
  ],
  developer: true,
  data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("👑 Blacklist a user or server from using the bot.")
    .addSubcommand((options) =>
      options
        .setName("server")
        .setDescription("👑 Blacklist a server.")
        .addStringOption((option) =>
          option
            .setName("serverid")
            .setDescription(
              "Provide the server ID of the server you would like to blacklist."
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("Provide the reason of the blacklist.")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("user")
        .setDescription("👑 Blacklist a user.")
        .addStringOption((option) =>
          option
            .setName("userid")
            .setDescription(
              "Provide the ID of the user you would like to blacklist."
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("reason")
            .setDescription("Provide the reason of the blacklist.")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("list")
        .setDescription("👑 List all blacklisted users and servers.")
    )
    .addSubcommand((options) =>
      options
        .setName("remove")
        .setDescription("👑 Remove a user or server from the blacklist.")
        .addStringOption((option) =>
          option
            .setName("type")
            .setDescription(
              "Provide the ID of the user or server you would like to remove from the blacklist."
            )
            .setRequired(true)
            .addChoices(
              { name: "Server", value: "server" },
              { name: "User", value: "user" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("id")
            .setDescription(
              "Provide the ID of the user or server you would like to remove from the blacklist."
            )
            .setRequired(true)
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const embed = new EmbedBuilder();
    const { options } = interaction;

    switch (options.getSubcommand()) {
      case "server":
        {
          const gldID = options.getString("serverid");
          const reason = options.getString("reason");
          const guild = client.guilds.cache.get(gldID);
          const gName = guild.name || "A mysterious guild";
          const gID = guild.id;

          const data = await guildBLK.findOne({ serverID: gID });
          if (!data) {
            const newBlacklist = new guildBLK({
              serverID: gID,
              reason: reason,
              time: Date.now(),
            });

            await newBlacklist.save();

            embed
              .setColor("Red")
              .setTitle(`Estado Blacklist ${client.user.username}! 🟢`)
              .setDescription([
                `- Servidor: ${gName}`,
                `- ID: ${gID}`,
                `- Razon: ${reason}`,
              ].join("\n"))
              .setFooter({ text: `Sistema de Blacklist Global del Servidor` });
            return interaction.reply({ embeds: [embed] });
          }
        }
        break;
      case "user":
        {
          const userID = options.getString("userid");
          const reason = options.getString("reason");

          const user = await client.users.fetch(userID);
          const uName = user.tag || "A mysterious user";
          const uID = user.id;

          const data = await userBLK.findOne({ userid: uID });
          if (!data) {
            const newBlacklist = new userBLK({
              userid: uID,
              reason: reason,
              time: Date.now(),
            });

            await newBlacklist.save();

            embed
              .setColor("Red")
              .setTitle(`Estado Blacklist ${client.user.username}! 🟢`)
              .setDescription([
                `- Usuario: ${uName}`,
                `- ID: ${uID}`,
                `- Razon: ${reason}`,
              ].join("\n"))
              .setFooter({ text: `Sistema de Blacklist Global del Servidor` });
            return interaction.reply({ embeds: [embed] });
          }
        }
        break;
      case "remove":
        {
          const agregados = interaction.options.getString("type");
          if (agregados === "server") {
            const gID = interaction.options.getString("id");
            if (data) {
              await guildBLK.deleteOne({ serverID: gID });
              embed
                .setColor("Blurple")
                .setTitle(`Estado Blacklist ${client.user.username}! 🟢`)
                .setDescription([
                  `- Accion: Remover Blacklist`,
                  `- Mensaje: Este gremio ha sido eliminado de la lista negra.`
                ].join("\n"))
                .setTimestamp()
                .setFooter({text: `Sistema de Blacklist Global del Servidor`,});
              return interaction.reply({ embeds: [embed] });
            }

            if (!data) {
              embed
                .setColor("Blurple")
                .setTitle(`Estado Blacklist ${client.user.username}! 🟢`)
                .setDescription([
                  `- Accion: Remover Blacklist`,
                  `- Servidor ID: ${gID}`
                  `- Mensaje: Este gremio no esta en la lista negra.`
                ].join("\n"))
                .setTimestamp()
                .setFooter({text: `Sistema de Blacklist Global del Servidor`});
              return interaction.reply({ embeds: [embed] });
            }
          }
          if (agregados === "user") {
            const uID = options.getString("id");
            const data = await userBLK.findOne({ serverID: uID });

            if (data) {
              await userBLK.deleteOne({ userid: uID });
              embed
                .setColor("Blurple")
                .setTitle(`Estado Blacklist ${client.user.username}! 🟢`)
                .setDescription([
                  `- Accion: Remover Blacklist`,
                  `- Usuario: <@${uID}>`,
                  `- Mensaje: Este usuario ha sido eliminado de la lista negra.`
                ].join("\n"))
                .setTimestamp()
                .setFooter({text: `Sistema de Blacklist Global del Servidor`});
              return interaction.reply({ embeds: [embed] });
            }

            if (!data) {
              embed
                .setColor("Blurple")
                .setTitle(`Estado Blacklist ${client.user.username}! 🟢`)
                .setDescription([
                  `- Accion: Remover Blacklist`,
                  `- Mensaje: Este usuario no esta en la lista negra.`
                ].join("\n"))
                .setTimestamp()
                .setFooter({text: `Sistema de Blacklist Global del Servidor`});
              return interaction.reply({ embeds: [embed] });
            }
          }
        }
        break;
      case "list":
        {
          const data = await guildBLK.find();
          const data2 = await userBLK.find();


          if (data.length === 0 && data2.length === 0) {
            embed
              .setColor("Blurple")
              .setTitle(`Estado Blacklist ${client.user.username}! 🟢`)
              .setDescription([
                `- Accion: Lista de Blacklist`,
                `- Mensaje: No hay servidores ni usuarios en la lista negra.`
              ])
              .setTimestamp()
              .setThumbnail(client.user.displayAvatarURL())
              .setFooter({text: `Sistema de Blacklist Global del Servidor`});
            return interaction.reply({ embeds: [embed], ephemeral: true });
          }
          if (data.length !== 0) {
            const guilds = data.map((x) => x.serverID);
            const timings = data.map((x) => x.time);
            const formatted = timings.map((x) => moment(x).format("llll"));

            embed
              .setColor("Blurple")
              .setTitle(`Estado Blacklist ${client.user.username}! 🟢`)
              .addFields({
                name: `<:VS_froom:1026467689209806858> Blacklisted Servers ID (\`${data.length}\`)`,
                value: `> ${guilds.join("\n> ")}`,
                inline: true,
              },
              {
                name: `<:VS_froom:1026467689209806858> Blacklisted Server Time (\`${data2.length}\`)`,
                value: `> ${formatted.join("\n> ")}`,
                inline: true,
              })
              .setTimestamp()
              .setThumbnail(client.user.displayAvatarURL())
              .setFooter({ text: `Sistema de Blacklist Global del Servidor` });
            return interaction.reply({ embeds: [embed], ephemeral: true });
          }

          if (data2.length !== 0) {
            const users = data2.map((x) => x.userid);
            const times = data2.map((x) => x.time);
            const formatted = times.map((x) => moment(x).format("llll"));


            embed
              .setColor("Blurple")
              .setTitle(`Estado Blacklist ${client.user.username}! 🟢`)
              .addFields({
                name: `<:VS_froom:1026467689209806858> Blacklisted Users ID (\`${data2.length}\`)`,
                value: `> ${users.join("\n> ")}`,
                inline: true,
              },
              {
                name: `<:VS_froom:1026467689209806858> Blacklisted Users Time (\`${data2.length}\`)`,
                value: `> ${formatted.join("\n> ")}`,
                inline: true,
              }
              )
              .setTimestamp()
              .setThumbnail(client.user.displayAvatarURL())
              .setFooter({ text: `Sistema de Blacklist Global del Servidor` });
            return interaction.reply({ embeds: [embed], ephemeral: true });
          }

          if (data.length !== 0 && data2.length !== 0) {
            const guilds = data.map((x) => x.serverID);
            const users = data2.map((x) => x.userid);
            embed
              .setColor("Blurple")
              .setTitle(`Estado Blacklist ${client.user.username}! 🟢`)
              .addFields(
                {
                  name: `<:VS_froom:1026467689209806858> Blacklisted Servers ID (\`${data.length}\`)`,
                  value: `> ${guilds.join("\n> ")}`,
                  inline: true,
                },
                {
                  name: `<:VS_froom:1026467689209806858> Blacklisted Users ID (\`${data2.length}\`)`,
                  value: `> ${users.join("\n> ")}`,
                  inline: true,
                })
              .setTimestamp()
              .setThumbnail(client.user.displayAvatarURL())
              .setFooter({ text: `Sistema de Blacklist Global del Servidor` });
            return interaction.reply({ embeds: [embed], ephemeral: true });
          }
        }
        break;
    }
  },
};
