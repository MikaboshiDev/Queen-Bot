const { InteractionType, EmbedBuilder, ChatInputCommandInteraction, userMention, Client } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  /**
  * @param {ChatInputCommandInteraction} interaction 
  * @param {Client} client
  */
  async execute(interaction, client) {
    if (interaction.type !== InteractionType.ModalSubmit) return;
    const modal = client.modals.get(interaction.customId);
    if (!modal || modal == undefined) return;

    modal.execute(interaction, client);
  },
};