const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Client,
  ChannelType,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  permisos: [
    "ManageChannels", 
    "ManageMessages", 
  ],
  botpermisos: [
    "ManageChannels", 
    "ManageMessages",
  ],
  data: new SlashCommandBuilder()
    .setName("sorteos")
    .setDescription("🔰 Iniciar un sorteo")
    .addSubcommand((options) =>
      options
        .setName("start")
        .setDescription("🔰 Iniciar un sorteo")
        .addStringOption((options) =>
          options
            .setName("duration")
            .setDescription("Pase un largo (1m, 1h, 1d)")
            .setRequired(true)
        )
        .addIntegerOption((options) =>
          options
            .setName("winners")
            .setDescription("Establecer los ganadores de este sorteo")
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("prize")
            .setDescription("Establecer un premio para ganar")
            .setRequired(true)
        )
        .addChannelOption((options) =>
          options
            .setName("channel")
            .setDescription("Establezca el canal donde se inicia el sorteo.")
            .addChannelTypes(ChannelType.GuildText)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("actions")
        .setDescription("🔰 Opciones para sorteos")
        .addStringOption((options) =>
          options
            .setName("options")
            .setDescription("Select a Option")
            .addChoices(
              { name: "end", value: "end" },
              { name: "pause", value: "pause" },
              { name: "unpause", value: "unpause" },
              { name: "reroll", value: "reroll" },
              { name: "delete", value: "delete" }
            )
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("message_id")
            .setDescription("Establecer el ID de mensaje del sorteo")
            .setRequired(true)
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options } = interaction;
    const Sub = options.getSubcommand();

    const errorEmbed = new EmbedBuilder().setColor("Red");

    const successEmbed = new EmbedBuilder().setColor("#38ca08");

    switch (Sub) {
      case "start":
        {
          const gchannel = options.getChannel("channel") || interaction.channel;
          const duration = options.getString("duration");
          const winnerCount = options.getInteger("winners");
          const prize = options.getString("prize");

          gchannel
            .send(`@everyone`)
            .then((msg) => msg.delete({ timeout: 1000 }));
          client.giveawaysManager
            .start(gchannel, {
              duration: ms(duration),
              winnerCount,
              prize,
            })
            .then(async () => {
              successEmbed.setDescription(`Sorteo Incio en ${gchannel}`);
              return interaction.reply({
                embeds: [successEmbed],
                ephemeral: true,
              });
            })
            .catch((err) => {
              errorEmbed.setDescription(`Error \n\`${err}\``);
              return interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true,
              });
            });
        }
        break;
      case "actions":
        {
          const choice = options.getString("options");
          const messageid = options.getString("message_id");
          const giveaway = client.giveawaysManager.giveaways.find(
            (g) =>
              g.guildId === interaction.guildId && g.messageId === messageid
          );

          if (!giveaway) {
            errorEmbed.setDescription(
              `<:VS_cancel:1006609599199186974> El regalo con el messageid ${messageid} no pudo ser encontrado.`
            );
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
          }
          switch (choice) {
            case "end":
              {
                client.giveawaysManager
                  .end(messageid)
                  .then(() => {
                    successEmbed.setDescription("Giveaway ended.");
                    return interaction.reply({
                      embeds: [successEmbed],
                      ephemeral: true,
                    });
                  })
                  .catch((err) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return interaction.reply({
                      embeds: [errorEmbed],
                      ephemeral: true,
                    });
                  });
              }
              break;
            case "pause":
              {
                client.giveawaysManager
                  .pause(messageid)
                  .then(() => {
                    successEmbed.setDescription("Sorteo Pausado");
                    return interaction.reply({
                      embeds: [successEmbed],
                      ephemeral: true,
                    });
                  })
                  .catch((err) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return interaction.reply({
                      embeds: [errorEmbed],
                      ephemeral: true,
                    });
                  });
              }
              break;
            case "unpause":
              {
                client.giveawaysManager
                  .unpause(messageid)
                  .then(() => {
                    successEmbed.setDescription("Sorteo Despausado");
                    return interaction.reply({
                      embeds: [successEmbed],
                      ephemeral: true,
                    });
                  })
                  .catch((err) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return interaction.reply({
                      embeds: [errorEmbed],
                      ephemeral: true,
                    });
                  });
              }
              break;
            case "reroll":
              {
                client.giveawaysManager
                  .reroll(messageid)
                  .then(() => {
                    successEmbed.setDescription("sorteo Reiniciado");
                    return interaction.reply({
                      embeds: [successEmbed],
                      ephemeral: true,
                    });
                  })
                  .catch((err) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return interaction.reply({
                      embeds: [errorEmbed],
                      ephemeral: true,
                    });
                  });
              }
              break;
            case "delete":
              {
                client.giveawaysManager
                  .delete(messageid)
                  .then(() => {
                    successEmbed.setDescription("Sorteo Borrado");
                    return interaction.reply({
                      embeds: [successEmbed],
                      ephemeral: true,
                    });
                  })
                  .catch((err) => {
                    errorEmbed.setDescription(`Error \n\`${err}\``);
                    return interaction.reply({
                      embeds: [errorEmbed],
                      ephemeral: true,
                    });
                  });
              }
              break;
          }
        }
        break;
      default: {
        console.log("Error en el Comando Sorteos");
      }
    }
  },
};
