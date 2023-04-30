const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  time,
} = require("discord.js");
const { Types } = require("mongoose");
const noteSchema = require("../../../Model/notes/noteSchema");
const chalk = require("chalk");
module.exports = {
  botpermisos: [
    "ManageMembers",
    "ManageChannels",
    "SendMessages"
  ],
  permisos: [
    "Administrator"
  ],
  data: new SlashCommandBuilder()
    .setName("notas")
    .setDescription("🔰 Add a note to a user")
    .addSubcommand((subCmd) =>
      subCmd
        .setName("add")
        .setDescription("🔰 Add a note to a user.")
        .addUserOption((option) => {
          return option
            .setName("user")
            .setDescription("The user to add a note to.")
            .setRequired(true);
        })
        .addStringOption((option) => {
          return option
            .setName("note")
            .setDescription("The note to add to the user.")
            .setRequired(true)
            .setMaxLength(110);
        })
    )
    .addSubcommand((subCmd) =>
      subCmd
        .setName("remove")
        .setDescription("🔰 Remove a note from a user.")
        .addStringOption((option) => {
          return option
            .setName("id")
            .setDescription("The ID of the note.")
            .setRequired(true);
        })
    )
    .addSubcommand((subCmd) =>
      subCmd
        .setName("edit")
        .setDescription("🔰 Edit a note from a user.")
        .addStringOption((option) => {
          return option
            .setName("id")
            .setDescription("The ID of the note to edit.")
            .setRequired(true);
        })
        .addStringOption((option) => {
          return option
            .setName("note")
            .setDescription("The note to edit from a user.")
            .setRequired(true);
        })
    )
    .addSubcommand((subCmd) =>
      subCmd
        .setName("logs")
        .setDescription("🔰 Get the notes of a user")
        .addUserOption((option) => {
          return option
            .setName("user")
            .setDescription("User to get the notes logs from.")
            .setRequired(true);
        })
        .addIntegerOption((option) => {
          return option
            .setName("page")
            .setDescription("The page to display if there are more than 1")
            .setMinValue(2)
            .setMaxValue(20);
        })
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options, member, guild } = interaction;

    switch (options.getSubcommand()) {
      case "add":
        const note = options.getString("note");
        const usr = options.getUser("user");
        const noteTime = time();

        const newSchema = new noteSchema({
          _id: Types.ObjectId(),
          guildId: guild.id,
          userId: usr.id,
          note: note,
          moderator: member.user.id,
          noteDate: noteTime,
        });

        newSchema.save().catch((err) => console.log(err));

        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Success")
              .setDescription(
                `<a:yes:1028005786112245770> Added a new note to a user!\n> Note: \`${note}\``
              )
              .setColor("#2f3136"),
          ],
          ephemeral: true,
        }).catch((error) =>
          console.log(chalk.redBright("[SISTEMA]") + ` A ocurrido un error en el evento de [notas.js] en el servidor [${interaction.guild.id}]`));
        break;

      case "remove":
        const noteId = options.getString("id");
        const data = await noteSchema.findById(noteId);

        const error = new EmbedBuilder()
          .setTitle("ERROR")
          .setDescription(
            `<a:error:1030716002259980318> No notes matching \`${noteId}\` was found in the database.`
          )
          .setColor("Red");

        if (!data)
          await interaction.reply({ embeds: [error], ephemeral: true }).catch((error) =>
            console.log(chalk.redBright("[SISTEMA]") + ` A ocurrido un error en el evento de [notas.js] en el servidor [${interaction.guild.id}]`));

        data.delete();

        const success = new EmbedBuilder()
          .setTitle("Success")
          .setColor("Green")
          .setDescription(
            `<a:yes:1028005786112245770> Successfully removed the note from <@${data.userId}>!`
          );

        await interaction.reply({
          embeds: [success],
          ephemeral: true,
        }).catch((error) =>
          console.log(chalk.redBright("[SISTEMA]") + ` A ocurrido un error en el evento de [notas.js] en el servidor [${interaction.guild.id}]`));
        break;

      case "edit":
        const newNote = options.getString("note");
        const newId = options.getString("id");

        const newData = await noteSchema.findById(newId);

        const err = new EmbedBuilder()
          .setTitle("ERROR")
          .setDescription(
            `<a:error:1030716002259980318> No notes matching \`${newId}\` was found in the database.`
          )
          .setColor("Red");

        if (!newData)
          await interaction.reply({ embeds: [err], ephemeral: true }).catch((error) =>
            console.log(chalk.redBright("[SISTEMA]") + ` A ocurrido un error en el evento de [notas.js] en el servidor [${interaction.guild.id}]`));

        await noteSchema.findOneAndUpdate(
          { guildId: guild.id, _id: newId },
          { note: newNote }
        );

        const suc = new EmbedBuilder()
          .setTitle("Success")
          .setColor("Green")
          .setDescription(
            `<a:yes:1028005786112245770> Successfully edited the note from <@${newData.userId}> to \`${newNote}\``
          );

        await interaction.reply({
          embeds: [suc],
          ephemeral: true,
        }).catch((error) =>
          console.log(chalk.redBright("[SISTEMA]") + ` A ocurrido un error en el evento de [notas.js] en el servidor [${interaction.guild.id}]`));
        break;

      case "logs": {
        const user = interaction.options.getUser("user");
        const page = interaction.options.getInteger("page");

        const noteData = await noteSchema.find({
          userId: user.id,
          guildId: interaction.guild.id,
        });

        if (!noteData?.length)
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle("User Notes")
                .setDescription(`${user} has no notes!`)
                .setColor("Red"),
            ],
          }).catch((error) =>
            console.log(chalk.redBright("[SISTEMA]") + ` A ocurrido un error en el evento de [notas.js] en el servidor [${interaction.guild.id}]`));

        const embed = new EmbedBuilder()
          .setTitle(`${user.tag}'s notes!`)
          .setColor("#2f3136");

        // if the user selected a page
        if (page) {
          const pageNum = 5 * page - 5;

          if (noteData.length >= 6) {
            embed.setFooter({
              text: `page ${page} of ${Math.ceil(noteData.length / 5)}`,
            });
          }

          for (const notes of noteData.splice(pageNum, 5)) {
            const moderator = interaction.guild.members.cache.get(
              notes.moderator
            );

            embed.addFields({
              name: `<a:exh_rules:1026467695039873064>  ${notes._id}`,
              value: `<:flechaderlong:1026467692997255229> Note: \`${notes.note}\`\n<:flechaderlong:1026467692997255229> Note Date: ${notes.noteDate}\n<:flechaderlong:1026467692997255229> Moderator: ${moderator}`,
            });
          }

          return await interaction.reply({ embeds: [embed] }).catch((error) =>
            console.log(chalk.redBright("[SISTEMA]") + ` A ocurrido un error en el evento de [notas.js] en el servidor [${interaction.guild.id}]`));
        }

        if (noteData.length >= 6) {
          embed.setFooter({
            text: `page 1 of ${Math.ceil(noteData.length / 5)}`,
          });
        }

        for (const notes of noteData.slice(0, 5)) {
          const moderator = interaction.guild.members.cache.get(
            notes.moderator
          );

          embed.addFields({
            name: `<a:exh_rules:1026467695039873064>  ${notes._id}`,
            value: `<:flechaderlong:1026467692997255229> Note: \`${notes.note}\`\n<:flechaderlong:1026467692997255229> Note Date: ${notes.noteDate}\n<:flechaderlong:1026467692997255229> Moderator: ${moderator}`,
          });
        }

        await interaction.reply({ embeds: [embed] }).catch((error) =>
          console.log(chalk.redBright("[SISTEMA]") + ` A ocurrido un error en el evento de [notas.js] en el servidor [${interaction.guild.id}]`));
      }
      default:
        break;
    }
  },
};
