const { Client, Invite, EmbedBuilder } = require("discord.js");
const loggerSchema = require("../../../Model/servidor/logs");
module.exports = {
    name: "inviteDelete",
    /**
     * @param {Invite} invite
     * @param {Client} client
     */
    async execute(invite, client) {

        const data = await loggerSchema.findOne({ guildID: invite.guild.id });
        if (!data) return;

        const logsChannel = client.channels.cache.get(data.channelID);
        if (!logsChannel) return;

        if (!invite.guild.members.me.permissions.has("ViewAuditLogs")) return;
        if (!invite.guild.members.me.permissions.has("SendMessages")) return;

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle("Sistema de Logs - Invitacion Eliminada")
            .addFields(
                { name: `Invite Link`, value: `> ${invite.code} (\`${client.user.id}\`)`, inline: true },
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1043660937380503702/850923749132992550.png")
            .setFooter({ text: `Logs del Servidor ${invite.guild.name}`, iconURL: invite.guild.iconURL() })
            .setTimestamp();

        logsChannel.send({ embeds: [embed] });
    },
};