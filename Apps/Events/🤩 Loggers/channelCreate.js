const { Client, GuildChannel, EmbedBuilder, ChannelType } = require("discord.js");
const loggerSchema = require("../../../Model/servidor/logs");
module.exports = {
    name: "channelCreate",
    /**
     * @param {GuildChannel} channel
     * @param {Client} client
     */
    async execute(channel, client) {
        
        const data = await loggerSchema.findOne({ guildID: channel.guild.id });
        if (!data) return;

        const logsChannel = client.channels.cache.get(data.channelID);
        if (!logsChannel) return;

        if(!channel.guild.members.me.permissions.has("ViewAuditLogs")) return;
        if (!channel.guild.members.me.permissions.has("SendMessages")) return;

        let canaltype;
        if (channel.type === ChannelType.GuildText) canaltype = "💾 Texto"
        if (channel.type === ChannelType.GuildVoice) canaltype = "📢 Voz"
        if (channel.type === ChannelType.GuildCategory) canaltype = "📁 Categoría"
        if (channel.type === ChannelType.GuildForum) canaltype = "✅ Foros"
        if (channel.type === ChannelType.GuildDirectory) canaltype = "🛒 Directorio"
        if (channel.type === ChannelType.GuildStageVoice) canaltype = "❌ Stage Voice"

        let cateogoria;
        if (channel.parent) {
            cateogoria = channel.parent.id;
        } else { cateogoria = "Sin Categoria" }

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle("Sistema de Logs - Canal Creado")
            .addFields([
                { name: "Canal Creado", value: `> ${channel.name} (\`${channel.id}\`)`, inline: true },
                { name: "Fecha de Creacion", value: `> <t:${parseInt(channel.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "Datos Extra del Canal", value: `> Tipo: ${canaltype} Categoria: <#${cateogoria}> Nsfw: ${channel.nsfw ? `<a:yes:1028005786112245770> Con Nsfw Agregado` : `<a:error:1030716002259980318> Sin Nsfw`}` },
                { name: "Descripcion", value: `> ${channel.topic ? channel.topic : `<a:error:1030716002259980318> Sin Descripcion Actualmente en el Servidor`}` }
            ])
            .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1043659862992764999/845717716559593512.png")
            .setFooter({ text: `Logs del Servidor ${channel.guild.name}`, iconURL: channel.guild.iconURL() })
            .setTimestamp();

        logsChannel.send({ embeds: [embed] });
    },
};