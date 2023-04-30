const { Client, Role, EmbedBuilder } = require("discord.js");
const loggerSchema = require("../../../Model/servidor/logs");
module.exports = {
    name: "roleCreate",
    /**
     * @param {Role} role
     * @param {Client} client
     */
    async execute(role, client) {

        const data = await loggerSchema.findOne({ guildID: role.guild.id });
        if (!data) return;

        const logsChannel = client.channels.cache.get(data.channelID);
        if (!logsChannel) return;

        if (!role.guild.members.me.permissions.has("ViewAuditLogs")) return;
        if (!role.guild.members.me.permissions.has("SendMessages")) return;

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle("Sistema de Logs - Rol Creado")
            .addFields(
                { name: `Role Name`, value: `> ${role.name} (\`${role.id}\`)`, inline: true },
                { name: `Role Color`, value: `> ${role.hexColor}`, inline: true },
                { name: `Role Created`, value: `> <t:${parseInt(role.createdTimestamp / 1000)}:R>`},
                { name: "Datos Extra del Rol", value: `> Color: ${role.color} - Hex: ${role.hexColor} - Mencion: ${role.toString()} - Posicion: ${role.position}` },
                { name: `Role Permissions`, value: `> ${role.permissions.toArray().join(" | ") || `<a:error:1030716002259980318> Sin Permisos en el Gremio`}` }
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1043659862992764999/845717716559593512.png")
            .setFooter({ text: `Logs del Servidor ${role.guild.name}`, iconURL: role.guild.iconURL() })
            .setTimestamp();

        logsChannel.send({ embeds: [embed] });
    },
};