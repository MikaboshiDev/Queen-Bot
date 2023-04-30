const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    TextInputBuilder,
    ActionRowBuilder,
    TextInputStyle,
    ModalBuilder,
    StringSelectMenuBuilder,
} = require("discord.js");
const chalk = require("chalk");
module.exports = {
    botpermisos: [
        "SendMessages",
        "EmbedLinks"
    ],
    data: new SlashCommandBuilder()
        .setName("reportes")
        .setDescription("🛑 Muestra los formularios de reporte del bot de discord a los desarrolladores")
        .addSubcommand((options) => 
            options
                .setName("modals")
                .setDescription("🛑 Muestra os formularios de reporte/desarrollo del bot")
            ),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand()
        switch (subcommand) {
            case "modals": {
                const Row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("Modals")
                        .setPlaceholder("Selecciona alguna opcion de tu preferencia amigo")
                        .addOptions(
                            { label: "😈 bugs", description: "Formulario de reportes de bugs o problema del servidor de discord o del bot mismo", value: "first_option" },
                            { label: "👑 privadas", description: "Formulario para pedir las funciones privadas del bot creadora", value: "second_option" },
                            { label: "🏓 reseñas", description: "Envia una valoracin de tu experiencia con el bot de discord", value: "third_option" },
                            { label: "🤩 sugerencia", description: "Envia una sugerencia del (bot / servidor) a los desarrolladores", value: "fourth_option" },
                            { label: "🌍 global", description: "Envia un reporte global de un usuario o servidor de discord", value: "fifth_option" },
                            { label: "🤬 clases", description: "Envia una sugerencia de que clases podemos impartir a futuro", value: "sixth_option" },
                            { label: "📝 exit server", description: "Saca al bot de discord de uno de sus servidores activos actualmente", value: "seventh_option" },
                            { label: "🫂 mensajes", description: "Envia mensajes a los servidores de discord donde el bot esta presente", value: "eighth_option" },
                        )
                );
        
                const embed = new EmbedBuilder()
                    .setTitle("🎯 Panel de Comandos Rapidos")
                    .setDescription("Aqui puedes ver los modals de comandos rapidos del bot de discord para utilidades")
                    .addFields(
                        { name: `❔ __Como Funciono__`, value: `> Selecciona algunos de los modals que se encuentran en el panel de abajo y te mostrare los comandos accesibles\n\n> Por Ejemplo: \`/panel menus\` para mas comandos en tu servidor de discord` },
                    )
                    .setColor("Random")
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({text:"🎯 Panel de Comandos Rapidos"});
        
                interaction.reply({ embeds: [embed], components: [Row] }).catch((error) => {})
            }
                break;
        }
    }
}