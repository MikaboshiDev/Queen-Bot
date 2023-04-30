const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const chalk = require("chalk");

module.exports = {
    id: "select-usuarios",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        const usuario = interaction.values[0];
        const usuarioFetched = await client.users.fetch(usuario);

        /* Obtener informacion del usuario seleccionado */
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `Informacion del usuario ${usuarioFetched.username}`,
                iconURL: interaction.user.avatarURL()
            })
            .setDescription([
                `**Usuario:** ${usuarioFetched.username}`,
                `**ID:** ${usuarioFetched.id}`,
                `**Nickname:** ${usuarioFetched.username === usuarioFetched.username ? "No tiene" : usuarioFetched.username}`,
                `**Bot:** ${usuarioFetched.bot ? "Si" : "No"}\n`,
                `**Membrecia en Discord:**`,
                `<t:${Math.floor(usuarioFetched.createdTimestamp / 1000)}:R>\n`,
                `**Membrecia en ${interaction.guild.name}:**`,
                `${parseInt(usuarioFetched.joinedTimestamp) ? `<t:${Math.floor(usuarioFetched.joinedTimestamp / 1000)}:R>` : "No se pudo obtener la informacion"}`,
            ].join("\n"))
            .setTimestamp()
            .setColor("Random")
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

        interaction.reply({ embeds: [embed] }).catch(err => { });
    }
}