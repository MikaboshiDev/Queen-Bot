const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js");
module.exports = {
    id: "tomato",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        try {
            const embed = new Discord.EmbedBuilder()
                .setTitle(`Github and Source Code Information about this Bot`)
                .setDescription(`[Click here to get to the Github Repository](https://github.com/Tomato6966/Multipurpose-discord-bot)`)
                .addFields(
                    { name: `Github Repository`, value: `Puede hacer exactamente la misma configuración dentro del example.envarchivo, ¡solo asegúrese de cambiarle el nombre .envo usar variables de entorno!`,},
                    { name: `Github Request`, value: `Se sugiere usar la [versión Sharded (&Clustered)]( https://github.com/Tomato6966/Multipurpose-discord-bot/tree/sharded_with_mongo), si planea usarla para un BOT VERIFICADO (¡en más de 2000 servidores!)`,}
                )
                .setFooter({
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: client.user.displayAvatarURL(),
                })
                .setColor("Random")
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL());

            let row2 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL(`https://github.com/Tomato6966/Multipurpose-discord-bot`)
                        .setLabel("GitHub")
                        .setEmoji("1001191985207595018"),
                    new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL(`https://github.com/QinShinHuang`)
                        .setLabel("Personal")
                        .setEmoji("1026467991409401886"),
                    new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL(`https://discordjs.guide/#before-you-begin`)
                        .setLabel("Discord")
                        .setEmoji("1001191742789390417"),
                    new Discord.ButtonBuilder()
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL(`https://mongoosejs.com/docs/index.html`)
                        .setLabel("Mongoose")
                        .setEmoji("1008442932396822618")
                )

            interaction.reply({ embeds: [embed], components: [row2] }).catch(() => {});
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