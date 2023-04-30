const { Client, GuildMember, EmbedBuilder } = require("discord.js");
const loggerSchema = require("../../../Model/servidor/logs");
module.exports = {
    name: "guildMemberRemove",
    /**
     * @param {GuildMember} member
     * @param {Client} client
     */
    async execute(member, client) {

        const data = await loggerSchema.findOne({ guildID: member.guild.id });
        if (!data) return;

        const logsChannel = client.channels.cache.get(data.channelID);
        if (!logsChannel) return;

        if (!member.guild.members.me.permissions.has("ViewAuditLogs")) return;
        if (!member.guild.members.me.permissions.has("SendMessages")) return;

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle("Sistema de Logs - Miembro se a Ido")
            .addFields(
                { name: `Miembro`, value: `> ${member.user.tag} (\`${member.user.id}\`)\n> \`${member.user.username}\``, inline: true },
            )
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setFooter({ text: `Logs del Servidor ${member.guild.name}`, iconURL: member.guild.iconURL() })
            .setTimestamp();

        logsChannel.send({ embeds: [embed] });
    },
};