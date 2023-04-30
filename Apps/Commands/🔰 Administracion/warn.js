const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  time,
} = require("discord.js");
const { Types } = require("mongoose");
const chalk = require("chalk");
const warnSchema = require("../../../Model/warns/warnSchema");
module.exports = {
  permisos: [
    "ModerateMembers"
  ],
  botpermisos: [
    "ModerateMembers",
    "SendMessages",
  ],
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("🔰 Advertencias a un usuario del grupo de discord")
    .addSubcommand((subCmd) =>
      subCmd
        .setName("add")
        .setDescription("🔰 Advertir a un usuario")
        .addUserOption((option) => {
          return option
            .setName("user")
            .setDescription("El usuario para advertir")
            .setRequired(true);
        })
        .addStringOption((option) => {
          return option
            .setName("reason")
            .setDescription("El motivo de la advertencia")
            .setRequired(true)
            .setMinLength(5)
            .setMaxLength(500);
        })
    )
    .addSubcommand((subCmd) =>
      subCmd
        .setName("remove")
        .setDescription("🔰 Eliminar una advertencia de un usuario")
        .addStringOption((option) => {
          return option
            .setName("warn_id")
            .setDescription("La identificación de la advertencia para eliminar")
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
      case "add":
        {
          const { options, guild, member } = interaction;
          const user = options.getUser("user");
          const reason = options.getString("reason");
          const warnD2 = time();

          const newSchema = new warnSchema({
            _id: Types.ObjectId(),
            guildId: guild.id,
            userId: user.id,
            warnReason: reason,
            moderator: member.user.id,
            warnDate: warnD2,
          });

          newSchema.save().catch((err) => console.log(err));

          await interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("Usuario Advertido")
                .setDescription(
                  `<@${user.id}> ha sido advertido por \`${reason}\`!`
                )
                .setColor("Red"),
            ],
            ephemeral: true,
          }).catch((error) =>
          console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Warn] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`))

          user
            .send({
              embeds: [
                new EmbedBuilder()
                  .setTitle(`Has sido advertido en: ${guild.name}`)
                  .addFields(
                    {
                      name: "`•` Warned for",
                      value: `\`${reason}\``,
                      inline: true,
                    },
                    {
                      name: "`•` Warned at",
                      value: `${warnD2}`,
                      inline: true,
                    }
                  )
                  .setColor("#2f3136"),
              ],
            })
            .catch(async (err) => {
              console.log(err);
              await interaction.followUp({
                embeds: [
                  new EmbedBuilder()
                    .setTitle(
                      "El usuario tiene dms deshabilitado, por lo que no se envió ningún DM."
                    )
                    .setColor("Red"),
                ],
              });
            });
        }
        break;

      case "remove": {
        const warnId = interaction.options.getString("warn_id");

        const data = await warnSchema.findById(warnId);

        const err = new EmbedBuilder().setDescription(
          `<a:error:1030716002259980318> Sin advertencia Id viendo \`${warnId}\` fue encontrado!`
        );

        if (!data) return await interaction.reply({ embeds: [err] }).catch((error) =>
        console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Warn] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`))

        data.delete();

        const embed = new EmbedBuilder()
          .setTitle("Remove Infraction")
          .setDescription(
            `<a:yes:1028005786112245770> Se eliminó con éxito la advertencia con la coincidencia de ID ${warnId}`
          );
        return await interaction.reply({ embeds: [embed] }).catch((error) =>
        console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Warn] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`))
      }
    }
  },
};
