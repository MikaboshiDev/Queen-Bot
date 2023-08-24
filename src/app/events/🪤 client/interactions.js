const { ChatInputCommandInteraction, EmbedBuilder, InteractionType, userMention, Client } = require(`discord.js`);
module.exports = {
        name: "interactionCreate",
        /**
         * @param {ChatInputCommandInteraction} interaction
         * @param {Client} client
         */
        async execute(interaction, client) {
                if (!interaction.isChatInputCommand()) return;
                if (!interaction.guild || !interaction.channel) return;
                const command = client.commands.get(interaction.commandName);
                if (!command) return;

                command.execute(interaction, client);
                if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
                        command.autocomplete(interaction, client);
                }
        }
};