const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");
const schedule = require("node-schedule");
const chalk = require("chalk");
module.exports = {
  botpermisos: [
    "SendMessages", 
    "EmbedLinks", 
    "ManageChannels"
  ],
  data: new SlashCommandBuilder()
    .setName("recordatorio")
    .setDescription("🥸 Establezca un recordatorio de mensaje para la discordia del servidor del gremio")
    .addStringOption((option) => {
      return option
        .setName("mensaje")
        .setDescription("El mensaje a recordar en la discordia del servidor")
        .setRequired(true)
        .setMaxLength(2000)
        .setMinLength(10);
    })
    .addIntegerOption((option) => {
      return option
        .setName("tiempo")
        .setDescription("La hora a la que enviar el mensaje. (En Minutos)")
        .setRequired(true)
        .setMinValue(1);
    }),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const message = interaction.options.getString("mensaje");
    const time = interaction.options.getInteger("tiempo");

    if (time >= 525960 * 1000) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Set Reminder Err! 🔴")
            .setDescription([
              `\`•\` Estado: Error`,
              `\`•\` Razon:  The time is too long`,
              `\`•\` Fecha:  ${new Date().toLocaleString()}`,
              `\`•\` Hora:   ${new Date().toLocaleTimeString()}`,
            ].join("\n"))
            .setDescription()
            .setColor("Red"),
        ],
      }).catch((error) => {});
    }

    const timeMs = time * 60000;

    const date = new Date(new Date().getTime() + timeMs);

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Set Reminder \`${date.toTimeString()}\`! 🟢`)
          .setDescription([
            `\`•\` Tiempo Programado: ${time}`,
            `\`•\` Mensaje Guardado: ${message}`,
          ].join("\n")),
      ],
      ephemeral: true,
    }).catch((error) => {});

    schedule.scheduleJob(date, async () => {
      await interaction.member.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Set Reminder \`${date.toTimeString()}\`! 🟢`)
            .setDescription([
              `\`•\` Mensaje de Trabajo: ${message}`
              `\`•\` Fecha de la Interaccion: ${interaction.createdAt}`,
            ].join("\n")),
        ],
      }).catch((error) => {});
    });
  },
};
