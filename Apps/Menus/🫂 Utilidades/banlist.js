const { EmbedBuilder, PermissionFlagsBits, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const chalk = require("chalk");

module.exports = {
    id: "select-baneos",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        const seleccion = interaction.values[0];
        const banFetch = await interaction.guild.bans.fetch();

        /* Buscamos la seleccion en los baneaodos del servidor si es que hay */
        const ban = banFetch.find((x) => x.user.id === seleccion);

        /* Si no hay baneados en el servidor */
        if (!ban) return interaction.reply({ content: `<a:error:1030716002259980318> No hay baneados en el servidor de discord`, ephemeral: true });

        /* Si hay baneados en el servidor */
        const embed = new EmbedBuilder()
            .setAuthor({ 
                name: `Estado de ${client.user.username} Baneados del Servidor`, 
                iconURL: client.user.displayAvatarURL() 
            })
            .setFooter({
                text: `Informacion del usuario baneado del servidor de discord`,
                iconURL: interaction.guild.iconURL()
            })
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("Blurple")
            .addFields(
                { name: `\`•\` Usuario Baneado`, value: `${ban.user.username} (\`${ban.user.id}\`)`, inline: true },
                { name: `\`•\` Fecha del Baneo`, value: `<t:${parseInt(ban.createdTimestamp / 1000)}:f>`, inline: true },
                { name: `\`•\` Motivo del Baneo`, value: `${ban.reason ? ban.reason : "Sin motivo"}`},
            )

        const boton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Secondary)
                    .setLabel("Desbanear")
                    .setCustomId("desbanear")
            )
        
        interaction.reply({ embeds: [embed], components: [boton], ephemeral: true }).catch(() => {});

        /* Interaccion del boton realizar debaneo en caso de ser necesario */
        const filter = (i) => i.customId === "desbanear" && i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on("collect", async (i) => {
            if (i.customId === "desbanear") {
                await ban.user.unban({ reason: `Desbaneado por ${interaction.user.username}` });
                interaction.reply({ content: `<a:yes:1030716280703045714> Se ha desbaneado a ${ban.user.username} del servidor de discord`, ephemeral: true }).catch(() => {});
            }
        });
    }
}