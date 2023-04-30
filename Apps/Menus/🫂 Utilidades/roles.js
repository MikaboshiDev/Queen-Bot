const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const chalk = require("chalk");

module.exports = {
    id: "select-roles",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        const rol = interaction.values[0];
        const rolFetched = await interaction.guild.roles.fetch(rol);

        let rolesPermisos = rolFetched.permissions.toArray().join(", ");

        const embed = new EmbedBuilder()
            .setAuthor({
                name: `Informacion del rol ${rolFetched.name}`,
                iconURL: interaction.user.avatarURL()
            })
            .addFields(
                { name: `\`•\` Role name:`, value: `*${rolFetched.name}*`, inline: true },
                { name: `\`•\` Role color:`, value: `*${rolFetched.color}*`, inline: true },
                { name: `\`•\` Role hex color:`, value: `*${rolFetched.hexColor}*`, inline: true },
                { name: `\`•\` Mention:`, value: `*${rolFetched.toString()}*`, inline: true },
                { name: `\`•\` Created AT:`, value: `*${rolFetched.createdAt.toLocaleTimeString()}*`, inline: true },
                { name: `\`•\` Role ID:`, value: `*${rolFetched.id}*`, inline: true },
                { name: `\`•\` Role position:`, value: `*${rolFetched.position}*`, inline: true },
                { name: `\`•\` Role members:`, value: `*${rolFetched.members.size}*`, inline: true },
                { name: `\`•\` Role Hoist:`, value: `*${rolFetched.hoist}*`, inline: true },
                { name: `\`•\` Role Permissions:`, value: `\`${rolesPermisos}\``, inline: true }
            )
            .setTimestamp()
            .setColor("Random")
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

        interaction.reply({ embeds: [embed] }).catch((error) => { });
    }
}