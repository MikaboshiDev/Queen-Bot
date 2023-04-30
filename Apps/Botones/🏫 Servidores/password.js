const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js");
module.exports = {
    permission: [
        "Administrator"
    ],
    id: "password",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        try {
            const length = 25;
            const charset = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789";
            let password = "";
            for (let i = 0, n = charset.length; i < length; ++i) {
                password += charset.charAt(Math.floor(Math.random() * n));
            }

            return await interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle("Contraseña Generada")
                        .setColor("Random")
                        .setDescription(`\`\`\`diff\n- ${password}\`\`\``)
                        .setFooter({
                            text: "My Queen https://discord.gg/4Z7QZ7Y",
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        })
                ],
                ephemeral: true
            }).catch((error) => {});
        } catch (e) {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
                        .setDescription(`\`\`\`yml\n${e}\`\`\``)
                        .setColor("Random")
                        .setFooter({
                            text: "My Queen https://discord.gg/4Z7QZ7Y",
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        })
                ],
                ephemeral: true,
            });
        }
    }
}