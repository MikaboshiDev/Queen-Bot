const { EmbedBuilder, userMention, ChatInputCommandInteraction, Client } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client 
   *  
   */
  async execute(interaction, client) {
    if (!interaction.isStringSelectMenu()) return;
    const selectMenu = client.menus.get(interaction.customId);
    if (!selectMenu || selectMenu == undefined) return;

    await selectMenu.execute(interaction, client);

  },
};
