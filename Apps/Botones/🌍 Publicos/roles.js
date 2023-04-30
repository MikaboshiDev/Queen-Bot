const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js");
module.exports = {
    id: "Roles",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        try {
            let roles = interaction.guild.roles.cache.map(r => r).join(`, `);
            if (roles.length > 1250) roles = roles.slice(0, 1200) + `...`;
            if (!roles) roles = `No hay roles en este servidor.`
            const embed = new Discord.EmbedBuilder()
                .setTitle(`Roles del ${interaction.guild.name}`)
                .setDescription(`${roles}`)
                .setColor("Random")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({ 
                    text: `My Queen https://discord.gg/4Z7QZ7Y`, 
                    iconURL: interaction.guild.iconURL({ dynamic: true }) 
                })
            interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (e) {
            interaction.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
                    .setDescription(`\`\`\`yml\n${e}\`\`\``)
                    .setColor("Random")
                    .setFooter({ 
                        text: `My Queen https://discord.gg/4Z7QZ7Y`,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                ], ephemeral: true
            })
        }
    }
}