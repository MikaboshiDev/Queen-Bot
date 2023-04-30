const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  Client,
  ChannelType,
  SlashCommandBuilder,
} = require("discord.js");
const DB = require("../../../Model/antispam/antispamDB");
module.exports = {
  permisos: [
    "Administrator"
  ],
  botpermisos: [
    "ManageGuild",
    "ManageChannels",
    "SendMessages",
    "EmbedLinks",
    "ModerateMembers",
    "AttachFiles",
  ],
  data: new SlashCommandBuilder()
    .setName("antispam")
    .setDescription("🎉 sistema antispam multiservidor discord")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("agregar")
        .setDescription("🎉 agrega un canal al sistema antispam")
        .addChannelOption((option) =>
          option
            .setName("canal")
            .setDescription("proporciona un canal")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remover")
        .setDescription("🎉 elimina un canal del sistema antispam")
        .addChannelOption((option) =>
          option
            .setName("canal")
            .setDescription("proporciona un canal")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("lista")
        .setDescription("🎉 muestra los canales del sistema antispam")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("personalizar")
        .setDescription("🎉 personaliza el sistema de antispam")
        .addChannelOption((option) =>
          option
            .setName("canal")
            .setDescription("proporciona un canal para las notificaciones")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
        .addStringOption((option) =>
          option
            .setName("mensajeserver")
            .setDescription("utiliza +n+ para pasar a la siguiente linea")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("mensajeuser")
            .setDescription("utiliza +n+ para pasar a la siguiente linea")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("imagen")
            .setDescription(
              "proporciona una imagen para el mensaje directo al usuario"
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("tiempo")
            .setDescription("selecciona el tiempo de aislamiento temporal")
            .setRequired(true)
            .addChoices(
              { name: "1 minuto", value: "1m" },
              { name: "5 minutos", value: "5m" },
              { name: "15 minutos", value: "15m" },
              { name: "30 minutos", value: "30m" },
              { name: "1 hora", value: "1h" },
              { name: "12 horas", value: "12h" },
              { name: "18 horas", value: "18h" },
              { name: "7 dias", value: "7d" },
              { name: "15 dias", value: "15d" }
            )
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { user, guild, options } = interaction;
    const opciones = options.getSubcommand();

    let datos = await DB.findOne({ ServidorID: guild.id });

    try {
      switch (opciones) {
        case "agregar":
          {
            const canal = options.getChannel("canal");

            if (!datos) {
              datos = new DB({
                ServidorID: guild.id,
                ServidorNombre: guild.name,
              });

              await datos.save();
            } else if (datos.Canales.includes(canal.id)) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🟡")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Canal: ${canal}`,
                      `\`•\` Mensaje: El canal ya esta agregado!`,
                    ].join("\n"))
                ],
                ephemeral: true,
              });
            }

            if (
              canal.type !== ChannelType.GuildText &&
              canal.type !== ChannelType.GuildVoice &&
              canal.type !== ChannelType.GuildForum
            ) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🟡")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Canal: ${canal}`,
                      `\`•\` Mensaje: El canal no es de de los permitidos!`,
                    ].join("\n"))
                  ],
                ephemeral: true,
              });
            }

            let array = {
              CanalID: canal.id,
              Canalnombre: canal.name,
            };

            datos.Canales.push(array);

            await datos.save();

            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor("Random")
                  .setTitle("Sistema AntiSpam! 🟢")
                  .setDescription([
                    `\`•\` Estado: Activado`,
                    `\`•\` Usuario: ${user}`,
                    `\`•\` Canal: ${canal}`,
                    `\`•\` Mensaje: El canal fue agregado correctamente!`,
                  ].join("\n")),
              ],
              ephemeral: true,
            });
          }
          break;

        case "remover":
          {
            const canal = options.getChannel("canal");

            if (!datos) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🟡")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Canal: ${canal}`,
                      `\`•\` Mensaje: El servidor no tiene canales agregados!`,
                    ].join("\n")),
                ],
                ephemeral: true,
              });
            } else if (!datos.Canales.some((c) => c.CanalID === canal.id)) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🟡")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Canal: ${canal}`,
                      `\`•\` Mensaje: El canal no esta agregado!`,
                    ].join("\n")),
                ],
                ephemeral: true,
              });
            }

            let array = datos.Canales;

            array = array.filter((x) => x.CanalID !== canal.id);

            datos.Canales = array;

            await datos.save();

            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor("Random")
                  .setTitle("Sistema AntiSpam! 🟢")
                  .setDescription([
                    `\`•\` Estado: Activado`,
                    `\`•\` Usuario: ${user}`,
                    `\`•\` Canal: ${canal}`,
                    `\`•\` Mensaje: El canal fue removido correctamente!`,
                  ].join("\n")),
              ],
              ephemeral: true,
            });
          }
          break;

        case "lista":
          {
            if (!datos) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🟡")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Mensaje: El canal no esta agregado!`,
                    ].join("\n")),
                ],
                ephemeral: true,
              });
            } else if (!datos.Canales.length) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🟡")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Mensaje: No hay sistemas online!`,
                    ].join("\n")),
                ],
                ephemeral: true,
              });
            }

            let canales = datos.Canales.map((c) =>
              guild.channels.cache.get(c.CanalID)
            ).join("\n");

            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor("Random")
                  .setTitle("Sistema AntiSpam! 🟢")
                  .setDescription([
                    `\`•\` Estado: Activado`,
                    `\`•\` Usuario: ${user}`,
                    `\`•\` Canales: ${canales}`,
                  ].join("\n")),
              ],
              ephemeral: true,
            });
          }
          break;

        case "personalizar":
          {
            const canal = options.getChannel("canal");
            const mensajeserver = options.getString("mensajeserver");
            const mensajeuser = options.getString("mensajeuser");
            const imagen = options.getString("imagen");
            const tiempo = options.getString("tiempo");

            if (!datos) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🟡")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Mensaje: No hay sistemas online!`,
                    ].join("\n")),
                ],
                ephemeral: true,
              });
            } else if (!datos.Canales.length) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🟡")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Mensaje: No hay sistemas online!`,
                    ].join("\n")),
                ],
                ephemeral: true,
              });
            }

            if (
              canal.type !== ChannelType.GuildText &&
              canal.type !== ChannelType.GuildVoice &&
              canal.type !== ChannelType.GuildForum
            ) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🟡")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Canal: ${canal}`,
                      `\`•\` Mensaje: El canal no es de de los permitidos!`,
                    ].join("\n"))
                ],
                ephemeral: true,
              });
            }

            if (mensajeserver.length > 2048 && mensajeuser.length > 2048) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🔴")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Canal: ${canal}`,
                      `\`•\` Mensaje: El mensaje no puede ser mayor a \`2048\` caracteres!`,
                    ].join("\n")),
                ],
                ephemeral: true,
              });
            }

            if (!imagen.includes("http") && !imagen.includes(".png")) {
              return interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Sistema AntiSpam! 🔴")
                    .setDescription([
                      `\`•\` Estado: Desactivado`,
                      `\`•\` Usuario: ${user}`,
                      `\`•\` Canal: ${canal}`,
                      `\`•\` Mensaje: La imagen no es valida!`,
                    ].join("\n")),
                ],
                ephemeral: true,
              });
            }

            datos.CanalID = canal.id;
            datos.CanalNombre = canal.name;
            datos.MensajeServer = mensajeserver;
            datos.MensajeUser = mensajeuser;
            datos.Imagen = imagen;
            datos.Tiempo = tiempo;

            await datos.save();

            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setColor("Random")
                  .setTitle("Sistema AntiSpam! 🟢")
                  .setDescription([
                    `\`•\` Estado: Activado`,
                    `\`•\` Usuario: ${user}`,
                    `\`•\` Canal: ${canal}`,	
                    `\`•\` Mensaje: El sistema se ha personalizado correctamente!`,
                  ].join("\n")),
              ],
              ephemeral: true,
            });
          }
          break;
      }
    } catch (error) {
      console.log(error);

      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Random")
            .setTitle("Sistema AntiSpam! 🔴")
            .setDescription([
              `\`•\` Estado: Desactivado`,
              `\`•\` Ansiedad: ${user}`,
              `\`•\` Mensaje: El sistema no esta activado!`,	
            ].join("\n")),
        ],
        ephemeral: true,
      });
    }
  },
};
