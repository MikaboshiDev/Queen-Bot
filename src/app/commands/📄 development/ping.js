const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ChatInputCommandInteraction } = require(`discord.js`);
module.exports = {
    data: new SlashCommandBuilder()
        .setName(`ping`)
        .setDescription(`Get the bot's ping`),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`Pong!`)
            .setDescription(`🏓 ${client.ws.ping}ms`)
            .setColor(`#FF0000`);
        await interaction.reply({ embeds: [embed] });
    }}