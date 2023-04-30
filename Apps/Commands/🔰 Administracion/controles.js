const Discord = require("discord.js");
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, AttachmentBuilder } = require("discord.js");
module.exports = {
    permisos: ["Administrator"],
    data: new SlashCommandBuilder()
        .setName("controles")
        .setDescription("🔰 Muestra los controles del bot solo (Administradores) pueden usarlo"),
    async execute(interaction, client) {

        const e = new Discord.EmbedBuilder()
            .setTitle("🔒 Panel - Panel de Administracion")
            .setDescription(`Hola ${interaction.user.tag} utiliza los siguientes botones para realizar una configuracion rapida para el servidor`)
            .addFields(
                { name: `❔ __Como Funciono__`, value: `> Selecciona alguno de los botones para diferentes configuraciones del servidor de manera rapida\n\n> Por Ejemplo: \`Configuracion de Sistemas\` te dara informacion de que sistemas del bot tienes activos y en que canales, dia, roles etc etc..` },
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("Random")
            .setFooter({ text: "Sistema de Panel de Administracion del Servidor" })
            .setTimestamp();

        const j = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("config_schemas_delete")
                    .setEmoji("🗑️")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel("Eliminar Schemas"),
                new Discord.ButtonBuilder()
                    .setCustomId("config_error")
                    .setEmoji("🔥")
                    .setLabel("Configuracion Errores")
                    .setStyle(Discord.ButtonStyle.Success),
                new Discord.ButtonBuilder()
                    .setCustomId("config_botinfo")
                    .setEmoji("🤖")
                    .setLabel("Configuracion BotInfo")
                    .setStyle(Discord.ButtonStyle.Danger),
            );

        const h = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId("Configuraciones_Servidor")
                    .setPlaceholder("Selecciona alguna de las opciones que tenemos para ti")
                    .addOptions(
                        { label: "😈 Canales del Servidor", description: "Muestra los canales del servidor en un maximo de 25", value: "first_option" },
                        { label: "👑 Roles del Servidor", description: "Muestra los roles del servidor en un maximo de 25", value: "second_option" },
                        { label: "🏓 Usuarios del Servidor", description: "Panel de informacion de los usuarios del servidor de discord", value: "third_option" },
                        { label: "🥹 Baneos del Servidor", description: "Panel de informacion de los baneos del servidor de discord", value: "fourth_option" },
                    )
            )

        const x = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId("Configuraciones_Sistemas")
                    .setPlaceholder("Selecciona alguna de las opciones que tenemos para ti")
                    .addOptions(
                        { label: "😈 Configuracion del Servidor", description: "Crea canales de apoyo de manera inmediata con esta opcion rapida", value: "first_option" },
                        { label: "👑 Configuracion de Lockall", description: "Bloquea y desbloquea el servidor de manera global", value: "second_option" },
                        { label: "🏓 Configuracion de Sistemas", description: "Sistemas configurados hasta la actualidad en el servidor", value: "third_option" },
                        { label: "📜 Configuracion de Banlist", description: "Muestra la banlist de el servidor junto a fechas y motivos", value: "fourth_option" },
                        { label: "🥹 Configuracion de botinfo", description: "Muestra la informacion del bot hasta la actualidad", value: "fifth_option" },
                    )
            )

        interaction.reply({
            embeds: [e],
            components: [h, x, j],
            ephemeral: true
        })
    }
}