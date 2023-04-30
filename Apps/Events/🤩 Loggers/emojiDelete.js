const { Client, GuildEmoji, EmbedBuilder } = require("discord.js");
const loggerSchema = require("../../../Model/servidor/logs");
module.exports = {
    name: "emojiDelete",
    /**
     * @param {GuildEmoji} emoji
     * @param {Client} client
     */
    async execute(emoji, client) {

        const data = await loggerSchema.findOne({ guildID: emoji.guild.id });
        if (!data) return;

        const logsChannel = client.channels.cache.get(data.channelID);
        if (!logsChannel) return;

        if (!emoji.guild.members.me.permissions.has("ViewAuditLogs")) return;
        if (!emoji.guild.members.me.permissions.has("SendMessages")) return;

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle("Sistema de Logs - Emoji Eliminado")
            .addFields(
                { name: "Nombre", value: `> ${emoji.name} (\`${emoji.id}\`)`, inline: true },
                { name: "Fecha", value: `> <t:${parseInt(emoji.createdTimestamp / 1000)}:R>`, inline: true }
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1043660937380503702/850923749132992550.png")
            .setFooter({ text: `Logs del Servidor ${emoji.guild.name}`, iconURL: emoji.guild.iconURL() })
            .setTimestamp();

        logsChannel.send({ embeds: [embed] });
    },
};