const { ChatInputCommandInteraction, Client } = require("discord.js");
module.exports = {
  name: "interactionCreate",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client 
   *  
   */
  async execute(interaction, client) {
    if (!interaction.isButton()) return;
    const button = client.buttons.get(interaction.customId);

    if (!button || button == undefined) return;
    button.execute(interaction, client);

  },
};