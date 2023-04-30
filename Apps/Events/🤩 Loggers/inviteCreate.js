const { Client, Invite, EmbedBuilder } = require("discord.js");
const loggerSchema = require("../../../Model/servidor/logs");
module.exports = {
    name: "inviteCreate",
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
            .setTitle("Sistema de Logs - Invitacion Creada")
            .addFields(
                { name: `Invite Link`, value: `> ${invite.code} (\`${invite.inviter.id}\`)`, inline: true},
                { name: `Invite Created`, value: `> <t:${parseInt(invite.createdTimestamp / 1000)}:R>`, inline: true},
                { name: `Invite Expires`, value: `> <t:${parseInt(invite.expiresTimestamp / 1000)}:R>\n> <@${invite.inviter.id}>`},
                { name: `Invite created by`, value: `> <@${invite.inviter.id}> (\`${invite.inviter.id}\`)`, inline: true},
                { name: `Max Uses`, value: `> ${invite.maxUses.toString()}`, inline: true},
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1043659862992764999/845717716559593512.png")
            .setFooter({ text: `Logs del Servidor ${invite.guild.name}`, iconURL: invite.guild.iconURL() })
            .setTimestamp();

        logsChannel.send({ embeds: [embed] });
    },
};