const Discord = require('discord.js');
const  { ChatInputCommandInteraction } = require("discord.js")
module.exports = {
    id: "Permisos",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { member } = interaction;
        const { guild } = member;
        const user = interaction.user;
        if (!user) user = member.user;
        try {
            try {
                const member = guild.members.cache.get(user.id);
                const embeduserinfo = new Discord.EmbedBuilder()
                embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                embeduserinfo.setTitle(`Aqui esta la informacion de ${member.user.username}`)
                embeduserinfo.setAuthor({ name: "Obtencion de Permisos", iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                embeduserinfo.addFields({ name: "Estos son los permisos obtenidos", value: `${member.permissions.toArray().map(p => `\`${p}\``).join(" | ")}` })
                embeduserinfo.setColor("Random").setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                embeduserinfo.setFooter({ 
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                interaction?.reply({ embeds: [embeduserinfo], ephemeral: true })
            } catch (e) {
                const embeduserinfo = new Discord.EmbedBuilder()
                embeduserinfo.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
                embeduserinfo.setTitle(`Aqui esta la informacion de ${member.user.username}`)
                embeduserinfo.setAuthor({ name: "Obtencion de Permisos", iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                embeduserinfo.addFields({ name: "Estos son los permisos obtenidos", value: `${member.permissions.toArray().map(p => `\`${p}\``).join(" | ")}` })
                embeduserinfo.setColor("Random").setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                embeduserinfo.setFooter({ 
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })

                interaction?.reply({ embeds: [embeduserinfo], ephemeral: true })
            }
        } catch (e) {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
                        .setDescription(`\`\`\`yml\n${e}\`\`\``)
                        .setColor("Random")
                        .setFooter({ 
                            text: `My Queen https://discord.gg/4Z7QZ7Y`,
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        }),
                ],
                ephemeral: true,
            });
        }
    }
}