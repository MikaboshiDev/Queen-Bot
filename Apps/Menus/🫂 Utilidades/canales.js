const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const chalk = require("chalk");

module.exports = {
    id: "select-canales",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        const canal = interaction.values[0];
        const canalFetched = await interaction.guild.channels.fetch(canal);

        let canaltype;
        if (canalFetched.type === ChannelType.GuildText) canaltype = "💾 Texto"
        if (canalFetched.type === ChannelType.GuildVoice) canaltype = "📢 Voz"
        if (canalFetched.type === ChannelType.GuildCategory) canaltype = "📁 Categoría"
        if (canalFetched.type === ChannelType.GuildForum) canaltype = "✅ Foros"
        if (canalFetched.type === ChannelType.GuildNews) canaltype = "📰 Noticias"
        if (canalFetched.type === ChannelType.GuildDirectory) canaltype = "🛒 Directorio"
        if (canalFetched.type === ChannelType.GuildStageVoice) canaltype = "❌ Stage Voice"

        let category;
        if (canalFetched.parent) { category = canalFetched.parent.id } else { category = "Ninguna" }

        /* Obtener informacion del canal seleccionado */
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `Informacion del canal ${canalFetched.name}`,
                iconURL: interaction.user.avatarURL()
            })
            .addFields(
                { name: "\`•\` Nombre:", value: `*${canalFetched.name}*`, inline: true },
                { name: "\`•\` ID:", value: `*${canalFetched.id}*`, inline: true },
                { name: "\`•\` Categoría:", value: `*${category}*`, inline: true },
                { name: "\`•\` Creado el:", value: `*<t:${parseInt(canalFetched.createdTimestamp / 1000)}:f> (<t:${parseInt(canalFetched.createdTimestamp / 1000)}:R>)*` },
                { name: "\`•\` Tipo del canal:", value: canaltype, inline: true },
                { name: "\`•\` Nsfw:", value: canalFetched.nsfw ? "*✅ Si*" : "*❌ No*", inline: true },
                { name: "\`•\` Descripcion:", value: canalFetched.topic ? canalFetched.topic : "*❌ Sin descripcion Actual en el canal*" },
            )
            .setTimestamp()
            .setColor("Random")
            .setThumbnail(interaction.user.avatarURL())
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}