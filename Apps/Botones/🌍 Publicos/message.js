const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js")
module.exports = {
    id: "message_one",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const channel = interaction.channel;
        const fetchMessages = await channel.messages.fetch({
            after: 1,
            limit: 1,
        });
        const msg = fetchMessages.first();
        if (!msg) return;

        const embed = new Discord.EmbedBuilder()
            .setTitle(`Este es el primer mensaje de: ${channel.name}`)
            .setURL(msg.url)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setDescription("**Mensaje:** " + msg.content)
            .addFields(
                { name: "ID del mensaje", value: `${msg.id}` },
                { name: "Autor", value: `${msg.author}` }
            )
            .setColor("Random")
            .setFooter({
                text: `My Queen https://discord.gg/4Z7QZ7Y`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });

        let row2 = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Link)
                .setURL(`${msg.url}`)
                .setLabel("Mensaje Url")
                .setEmoji("🌍")
        );

        interaction.reply({
            embeds: [embed],
            components: [row2],
            ephemeral: true,
        }).catch((error) => {});
    }
}