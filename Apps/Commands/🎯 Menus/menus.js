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
        .setName("panel")
        .setDescription("🎯 Saca los menus customizados del bot de discord")
        .addSubcommand((options) => options.setName("menus").setDescription("🎯 Saca los menus customizados del bot de discord")),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand()
        switch (subcommand) {
            case "menus": {
                const Row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("Paneles")
                        .setPlaceholder("Selecciona algun menu de tu preferencia")
                        .addOptions(
                            { label: "😈 owner", description: "Muestra el panel de control de reinicio del bot de discord", value: "first_option" },
                            { label: "👑 informacion", description: "Panel de informacion del servidor, bot y mas cosas importantes", value: "second_option" },
                            { label: "🏓 economia", description: "Panel de informacion de la economia del servidor de discord", value: "third_option" },
                            { label: "🤩 diversion", description: "Panel de diversion para pasar el rato con tus amigos", value: "fourth_option" },
                            { label: "🌍 astrologia", description: "Panel de astrologia para ver tu signo del zodiaco y planetas", value: "fifth_option" },
                            { label: "🎮 reseñas", description: "Panel para mandar tu reseña del servidor de discord", value: "sixth_option" },
                            { label: "🤬 funciones", description: "Panel de funciones privadas de nivel de administrador", value: "seventh_option" },
                            { label: "🎯 wikipedia", description: "Panel de aporte de la wikipedia de minecraft (aportes)", value: "eighth_option" },
                        )
                );
        
                const embed = new EmbedBuilder()
                    .setTitle("🎯 Panel de Comandos Rapidos (Utilidades y mas)")
                    .setDescription("Aqui puedes ver los menus de comandos rapidos del bot de discord")
                    .addFields(
                        { name: `❔ __Como Funciono__`, value: `> Selecciona algunos de los menus que se encuentran en el panel de abajo y te mostrare los comandos accesibles\n\n> Por Ejemplo: \`/bot modals\` para mas comandos en tu servidor de discord` },
                    )
                    .setColor("Random")
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({text:"🎯 Panel de Comandos Rapidos", iconURL:interaction.user.displayAvatarURL()});
        
                interaction.reply({ embeds: [embed], components: [Row], ephemeral: true })
            }
                break;
        }
    }
}