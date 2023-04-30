const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");

const warnSchema = require("../../../Model/warns/warnSchema");
const chalk = require("chalk");
module.exports = {
  botpermisos: [
    "SendMessages", 
    "EmbedLinks"
  ],
  data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("🔰 Obtener los registros de un usuario")
    .addSubcommand((subCmd) =>
      subCmd
        .setName("warns")
        .setDescription("🔰 Recibe las advertencias de un usuario.")
        .addUserOption((option) => {
          return option
            .setName("user")
            .setDescription("Usuario para obtener los registros de advertencia")
            .setRequired(true);
        })
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    switch (interaction.options.getSubcommand()) {
      case "warns":
        {
          const user = interaction.options.getUser("user");

          const userWarnings = await warnSchema.find({
            userId: user.id,
            guildId: interaction.guild.id,
          });

          const err = new EmbedBuilder()
            .setTitle("Registros de advertencia de usuario")
            .setDescription(`${user} no tiene registros de advertencia`)
            .setColor("Red");

          if (!userWarnings?.length)
            return interaction.reply({ embeds: [err] }).catch((error) =>
            console.log(chalk.redBright("[SISTEMA]") + ` A ocurrido un error en el evento de [logs.js] en el servidor [${interaction.guild.id}]`));

          const embedDescription = userWarnings
            .map((warn) => {
              const moderator = interaction.guild.members.cache.get(
                warn.moderator
              );

              return [
                `\`•\` Warn ID: ${warn.id}`,
                `\`•\` Moderator: ${`<@${moderator}>` || "Moderator left"}`,
                `\`•\` User: ${warn.userId}`,
                `\`•\` Reason: \`${warn.warnReason}\``,
                `<a:pin:1006997984053035069>  Date: ${warn.warnDate}`,
              ].join("\n");
            })
            .join("\n\n");

          const embed = new EmbedBuilder()
            .setTitle(`${user.tag}'s advertencias logs`)
            .setDescription(embedDescription)
            .setColor("#2f3136");

          await interaction.reply({ embeds: [embed] }).catch((error) =>
          console.log(chalk.redBright("[SISTEMA]") + ` A ocurrido un error en el evento de [logs.js] en el servidor [${interaction.guild.id}]`));
        }
        break;

      default:
        break;
    }
  },
};
