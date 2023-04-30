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
        .setName("school")
        .setDescription("🥶 Muestra un menu con todas las guias del bot de discord")
        .addSubcommand((options) => options.setName("libros").setDescription("🥶 Muestra un menu con todas las guias del bot de discord")),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand()
        switch (subcommand) {
            case "libros": {
                const Row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("Menus")
                        .setPlaceholder("Selecciona alguna opcion de tu preferencia amigo")
                        .addOptions(
                            { label: "😈 dudas", description: "Comando que muestra dudas comunes en progrmacion", value: "first_option" },
                            { label: "👑 guias", description: "Comando que muestra guias de programacion", value: "second_option" },
                            { label: "🏓 documentacion", description: "Comando que muestra diferentes documentaciones de discord", value: "third_option" },
                            { label: "🤩 estudios", description: "Modulos de estudio de diversos lenguajes de programacions", value: "fourth_option" },
                            { label: "🤖 discord.js", description: "Guia rapida de discord.js para usuarios en crecimiento", value: "fifth_option" },
                            { label: "⭐ wikipedia", description: "Guia rapida de minecraft de hjava y croosplay", value: "sixth_option" },
                        )
                );

                const embed = new EmbedBuilder()
                    .setTitle("🎯 Panel de Comandos Rapidos (Guias de Programacion)")
                    .setDescription("*🎯 Aqui puedes ver los menus de comandos rapidos del bot de discord para utilidades*")
                    .addFields(
                        { name: `❔ __Como Funciono__`, value: `> Selecciona algunos de los menus que se encuentran en el panel de abajo y te mostrare los comandos accesibles\n\n> Por Ejemplo: \`Documentacion\` te mostrara un menu con diferentes guias de discord.js y node` },
                    )
                    .setColor("Random")
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setFooter({ text: "🎯 Panel de Comandos Rapidos" });

                interaction.reply({ embeds: [embed], components: [Row]}).catch((error) =>
                    console.log(chalk.redBright(`[SISTEMA]`) + `A ocurrido un error en el comando [Collector_Menus] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`))
            }
                break;
        }
    }
}