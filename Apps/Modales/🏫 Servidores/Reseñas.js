const { EmbedBuilder, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction } = require("discord.js");
const reseña = require("../../../Model/servidor/reseñas");
const chalk = require("chalk");
module.exports = {
    id: "Nueva_Reseña",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const valor = interaction.fields.getTextInputValue("Calificacion");
        const comentario = interaction.fields.getTextInputValue("Comentario");
        const reseñas = await reseña.findOne({ guildID: interaction.guild.id });
        if (!reseñas) return interaction.reply({ content: `<a:error:1030716002259980318> No hay reseñas en este servidor`, ephemeral: true });

        const embed = new EmbedBuilder()
            .setDescription(`**<:esparami:1010774296538394684> Nueva Reseña de Nuestro Servidor**`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
                { name: "Usurio", value: `<@${interaction.user.id}> (\`${interaction.user.id}\`)`, inline: true },
                { name: "Calificacion", value: `⭐ ${valor} ⭐`, inline: true },
                { name: "Comentario", value: `> ${comentario}` || `<a:error:1030716002259980318> No hay comentarios agregados por el usuario` },
            )
            .setTimestamp()
            .setColor("Random")
            .setFooter({
                text: "Manadanos tus reseñas con mis comandos de menus",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });

        interaction.reply({ content: `<a:yes:1028005786112245770> Reseña enviada con exito a el servidor gracias por calificarnos`, ephemeral: true }).catch((error) => {});
        client.channels.cache.get(reseñas.channelID).send({ embeds: [embed] }).catch((error) => {});

    }
}