const { Client, GuildEmoji, EmbedBuilder } = require("discord.js");
const loggerSchema = require("../../../Model/servidor/logs");
module.exports = {
    name: "emojiCreate",
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

        const emoji_name = emoji.name;
        const emoji_animated = emoji.animated;
        const emoji_url = emoji.url;
        const emoji_identifier = emoji.identifier;
        const emoji_link = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji_animated ? "gif" : "png"}`;

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle("Sistema de Logs - Emoji Creado")
            .addFields(
                { name: "Nombre", value: `> ${emoji.name} (\`${emoji.id}\`)`, inline: true },
                { name: "Fecha", value: `> <t:${parseInt(emoji.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "Datos Extra del Emoji", value: `> Animado: ${emoji.animated ? `<a:yes:1028005786112245770> Animado` : `<a:error:1030716002259980318> No Animado`} - Id del Emoji: ${emoji_identifier} - Url del Emoji: [Click Aqui](${emoji_link})` },
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1043659862992764999/845717716559593512.png")
            .setFooter({ text: `Logs del Servidor ${emoji.guild.name}`, iconURL: emoji.guild.iconURL() })
            .setTimestamp();

        logsChannel.send({ embeds: [embed] });
    },
};