const {
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const util = require("minecraft-server-util");
const chalk = require("chalk");
module.exports = {
  botpermisos: [
    "SendMessages", 
    "EmbedLinks"
  ],
  data: new SlashCommandBuilder()
    .setName("mc")
    .setDescription("🎮 comandos de minecraft servidor estado java/bedrock")
    .addSubcommandGroup((group) =>
      group
        .setName("server")
        .setDescription("Get minecraft server informations.")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("java")
            .setDescription(
              "🎮 Muestra informacion de un servidor de minecraft java"
            )
            .addStringOption((option) =>
              option
                .setName("ip")
                .setDescription("Menciona la ip del servidor")
                .setRequired(true)
            )
            .addNumberOption((option) =>
              option
                .setName("port")
                .setDescription("Menciona el puerto del servidor anterior")
                .setRequired(false)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("bedrock")
            .setDescription(
              "🎮 Muestra informacion de un servidor de minecraft bedrock"
            )
            .addStringOption((option) =>
              option
                .setName("ip")
                .setDescription("Menciona la ip del servidor")
                .setRequired(true)
            )
            .addNumberOption((option) =>
              option
                .setName("port")
                .setDescription("Menciona el puerto del servidor anterior")
                .setRequired(false)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("query")
            .setDescription(
              "🎮 Muestra informacion de un servidor hibrido o sin especificaciones minecraft"
            )
            .addStringOption((option) =>
              option
                .setName("ip")
                .setDescription("Menciona la ip del servidor")
                .setRequired(true)
            )
            .addNumberOption((option) =>
              option
                .setName("port")
                .setDescription("Menciona el puerto del servidor anterior")
                .setRequired(true)
            )
        )
    ),
  async execute(interaction, client) {
    const { guild, options } = interaction;
    const SubcommandGroup = options.getSubcommandGroup();
    const Subcommand = options.getSubcommand();

    let IP;
    let Port;
    let Embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.guild.name,
        iconURL: interaction.guild.iconURL(),
      })
      .setFooter({
        text: `Pedido por: ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    let Channel;
    let Options = {
      timeout: 80000,
    };

    switch (SubcommandGroup) {
      case "server":
        switch (Subcommand) {
          case "java":
            try {
              await interaction.reply("Por favor, espere... puede tardar unos segundos.").catch((error) => { });
              IP = options.getString("ip");
              Port = options.getNumber("port") || 25565;
            } catch (e) {
              interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle(`Error Interaccion! 🔴`)
                    .setDescription(`\`\`\`yml\n${e}\`\`\``)
                    .setColor("Red")
                    .setTimestamp()
                    .setFooter({ text: `Error en el comando minecraft`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) || interaction.guild.iconURL({ dynamic: true }) })
                ],
                ephemeral: true,
              }).catch((error) => { })
            }

            if (IP.length < 2) {
              Embed.setColor("Red");
              Embed.setTitle("Error Minecraft! 🟡");
              Embed.setDescription([
                `\`•\` Estado: Error de Datos`,
                `\`•\` IP: ${IP}`,
                `\`•\` Puerto: ${Port}`,
                `\`•\` Motivo: Se esperaba que la ip tuviera una longitud superior a 2, obtuve 1`
              ].join("\n"));
              return interaction.editReply({ 
                embeds: [Embed], 
                content: null 
              }).catch((error) => { })
            }

            await util
              .status(IP, Port, Options)
              .catch(async (error) => {
                if (error.code === "ENOTFOUND") {
                  Embed.setColor("Red");
                  Embed.setTitle("Error Minecraft! 🟡");
                  Embed.setDescription([
                    `\`•\` Estado: Error de Datos`,
                    `\`•\` IP: ${IP}`,
                    `\`•\` Puerto: ${Port}`,
                    `\`•\` Motivo: Proporcionó una IP/puerto no válido!`
                  ].join("\n"));

                  return interaction.editReply({
                    embeds: [Embed],
                    content: null,
                  }).catch((error) => { })
                }
              

                Embed.setColor("Red");
                Embed.setTitle("Error Minecraft! 🟡");
                Embed.setDescription([
                  `\`•\` Estado: Error de Datos`,
                  `\`•\` IP: ${IP}`,
                  `\`•\` Puerto: ${Port}`,
                  `\`•\` Motivo: ${error}`
                ].join("\n"));
                return await interaction.editReply({
                  embeds: [Embed],
                  content: null,
                }).catch((error) => { })
              })
              .then(async (data) => {
                Embed.setTitle(`Estado del Servidor! ${IP}:${Port}`);
                Embed.setDescription([
                  `\`🔥\` Ip: \`${IP}\``,
                  `\`⌛\` Port: \`${Port}\``,
                  `\`📁\` Protocolo: ${data.version.protocol}\n`,
                  `\`🔒\` Online Player: ${data.players.online.toLocaleString("en-US" )}`,
                  `\`🌐\` Max Player: ${data.players.max.toLocaleString("en-US")}\n`,
                  `\`📜\` Motd: ${data.motd.clean}`,
                  `\`📌\` Motd Raw: ${data.motd.raw}`,
                ].join("\n"))
                Embed.setColor("Random");

                if (data.favicon) {
                  Embed.setThumbnail(interaction.guild.iconURL({ dynamic: true }) || interaction.user.displayAvatarURL({ dynamic: true }));
                  await interaction.editReply({
                    embeds: [Embed],
                    content: null,
                  });
                } else {
                  await interaction.editReply({
                    embeds: [Embed],
                    content: null,
                  }).catch((error) => { });
                }
              });
            break;
          case "bedrock":
            try {
              await interaction.reply("Please Wait... it may take a few seconds.").catch((error) => { });
              IP = options.getString("ip");
              Port = options.getNumber("port") || 19132;
            } catch (e) {
              interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle(`Error Interaccion! 🔴`)
                    .setDescription(`\`\`\`yml\n${e}\`\`\``)
                    .setColor("Red")
                    .setTimestamp()
                    .setFooter({ text: `Error en el comando minecraft`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) || interaction.guild.iconURL({ dynamic: true }) })
                ],
                ephemeral: true,
              }).catch((error) => { });
            }

            if (IP.length < 2) {
              Embed.setColor("Red");
              Embed.setTitle("Error Minecraft! 🟡");
              Embed.setDescription([
                `\`•\` Estado: Error de Datos`,
                `\`•\` IP: ${IP}`,
                `\`•\` Puerto: ${Port}`,
                `\`•\` Motivo: Se esperaba que la ip tuviera una longitud superior a 2, obtuve 1`
              ].join("\n"));

              return interaction.editReply({ 
                embeds: [Embed], 
                content: null 
              }).catch((error) => { });
            }

            await util
              .statusBedrock(IP, Port, Options)
              .catch(async (error) => {
                if (error.code === "ENOTFOUND") {
                  Embed.setColor("Red");
                  Embed.setTitle("Error Minecraft! 🟡");
                  Embed.setDescription([
                    `\`•\` Estado: Error de Datos`,
                    `\`•\` IP: ${IP}`,
                    `\`•\` Puerto: ${Port}`,
                    `\`•\` Motivo: Proporcionó una IP/puerto no válido!`
                  ].join("\n"));

                  return interaction.editReply({
                    embeds: [Embed],
                    content: null,
                  }).catch((error) => { });
                }

                const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("Error Minecraft! 🟡")
                .setTimestamp()
                .setFooter({ text: `Error en el comando minecraft`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) || interaction.guild.iconURL({ dynamic: true }) })
                .setDescription([
                  `\`•\` Estado: Error de Datos`,
                  `\`•\` IP: ${IP}`,
                  `\`•\` Puerto: ${Port}`,
                  `\`•\` Motivo: ${error}`
                ].join("\n"));

                return await interaction.editReply({
                  embeds: [embed],
                  content: null,
                }).catch((error) => { });
              })
              .then(async (data) => {
                const embed = new EmbedBuilder()
                  .setTitle(`Estado del Servidor! ${IP}:${Port}`)
                  .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                  .setDescription([
                    `\`🔥\` Ip: \`${IP}\``,
                    `\`⌛\` Port: \`${Port}\``,
                    `\`⏱️\` Modo de Juego: ${data.gameMode} (\`${data.gameModeID}\`)`, 
                    `\`📁\` Protocolo: ${data.version.protocol}\n`,
                    `\`🔒\` Online Player: ${data.players.online.toLocaleString("en-US" )}`,
                    `\`🌐\` Max Player: ${data.players.max.toLocaleString("en-US")}`,
                    `\`📜\` portIPv4: ${data.portIPv4}:${data.portIPv6}\n`,
                    `\`📜\` Motd: ${data.motd.clean}`,
                    `\`📌\` Motd Raw: ${data.motd.raw}`,
                  ].join("\n"))
                  .setFooter({ text: `Estado de: ${IP}:${Port}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                  .setColor("Random");

                await interaction.editReply({ 
                  embeds: [embed], 
                  content: null 
                }).catch((error) => { });
              });
            break;
          case "query":
            try {
              await interaction.reply(`Please Wait... it may take a few seconds.`).catch((error) => { });
              IP = options.getString("ip");
              Port = options.getNumber("port");
            } catch (e) {
              interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle(`Error Interaccion! 🔴`)
                    .setDescription(`\`\`\`yml\n${e}\`\`\``)
                    .setColor("Red")
                    .setFooter({ text: `Error en el comando minecraft` }),
                ],
                ephemeral: true,
              }).catch((error) => { });
            }

            if (IP.length < 2) {
              const embed = new EmbedBuilder()
              .setColor("Red")
              .setTitle("Error Minecraft! 🟡")
              .setTimestamp()
              .setFooter({ text: `Error en el comando minecraft`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) || interaction.guild.iconURL({ dynamic: true })})
              .setDescription([
                `\`•\` Estado: Error de Datos`,
                `\`•\` IP: ${IP}`,
                `\`•\` Puerto: ${Port}`,
                `\`•\` Motivo: Se esperaba que la ip tuviera una longitud superior a 2, obtuve 1`
              ].join("\n"));

              return interaction.editReply({ 
                embeds: [embed], 
                content: null 
              }).catch((error) => { });
            }

            await util
              .queryFull(IP, Port, Options)
              .catch(async (error) => {
                if (error.code === "ENOTFOUND") {
                  const embed = new EmbedBuilder()
                  .setColor("Red")
                  .setTitle("Error Minecraft! 🟡")
                  .setDescription([
                    `\`•\` Estado: Error de Datos`,
                    `\`•\` IP: ${IP}`,
                    `\`•\` Puerto: ${Port}`,
                    `\`•\` Motivo: Proporcionó una IP/puerto no válido!`
                  ].join("\n"));

                  return interaction.editReply({
                    embeds: [embed],
                    content: null,
                  }).catch((error) => { });
                }
                const embed = new EmbedBuilder()
                  .setColor("Red")
                  .setTitle("Error!")
                  .setTimestamp()
                  .setFooter({ text: `Error en el comando minecraft`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) || interaction.guild.iconURL({ dynamic: true }) })
                  .setDescription("```" + error + "```");

                return await interaction.editReply({
                  embeds: [embed],
                  content: null,
                }).catch((error) => { });
              })
              .then(async (data) => {
                const embed = new EmbedBuilder()
                  .setTitle(`Estado del Servidor ${IP}:${Port}`)
                  .setDescription([
                    `\`🔥\` Ip: \`${IP}\``,
                    `\`⌛\` Port: \`${Port}\``,
                    `\`🌊\` Version: ${data.version}`,
                    `\`⏱️\` Modo de Juego: ${data.gameMode} (\`${data.gameModeID}\`)`, 
                    `\`🔒\` Software: ${data.software}`,
                    `\`🌐\` Host IP: ${data.hostIP}`,
                    `\`📁\` Host Port: ${data.hostPort}\n`,
                    `\`👏\` Online Player: ${data.players.online.toLocaleString("en-US" )}`,
                    `\`⭐\` Max Player: ${data.players.max.toLocaleString("en-US")}`,
                    `\`⏱️\` Online Player Names: ${data.players.list.join(", ") || "Sin Jugadores Online 🔴"}`,
                    `\`📜\` portIPv4: ${data.portIPv4}:${data.portIPv6}\n`,
                    `\`🌹\` Motd: ${data.motd.clean}`,
                    `\`🍃\` Motd Raw: ${data.motd.raw}\n`,
                    `\`🤬\` Plugins: ${data.plugins.join(", ") || "Ningun Plugin Activo 🔴"}`,
                  ].join("\n"))
                  .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || interaction.user.displayAvatarURL({ dynamic: true }))
                  .setTimestamp()
                  .setFooter({ text: `Estado de: ${IP}:${Port}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                  .setColor("Random");

                await interaction.editReply({ embeds: [embed], content: null }).catch((error) => { });
              });
            break;
        }
        break;
    }
  },
};
