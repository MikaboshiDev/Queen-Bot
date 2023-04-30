const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    CommandInteraction,
    PermissionFlagsBits,
    EmbedBuilder,
    ModalBuilder,
    TextInputBuilder,
    ActionRowBuilder,
    TextInputStyle,
} = require("discord.js");
const emojis = require("../../../Tools/Settings/emojis.json");
const chalk = require("chalk");
const Discord = require("discord.js");
module.exports = {
    id: "Modals",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        if (interaction.values.includes('first_option')) {
            try {
                const name = new TextInputBuilder()
                    .setCustomId("User_Report")
                    .setLabel("Name of the reporting user")
                    .setPlaceholder("put your discord name")
                    .setMaxLength(20)
                    .setMinLength(5)
                    .setStyle(TextInputStyle.Paragraph);

                const server = new TextInputBuilder()
                    .setCustomId("Server_Report")
                    .setLabel("Name of the server")
                    .setPlaceholder("put the name of the server")
                    .setMaxLength(30)
                    .setMinLength(5)
                    .setStyle(TextInputStyle.Paragraph);

                const report = new TextInputBuilder()
                    .setCustomId("Report")
                    .setLabel("Report to send")
                    .setPlaceholder("Submit your report to my developers")
                    .setMaxLength(500)
                    .setMinLength(30)
                    .setStyle(TextInputStyle.Paragraph);

                const adicional = new TextInputBuilder()
                    .setCustomId("Server_Notas")
                    .setLabel("Additional notes")
                    .setPlaceholder("Add any additional note that you have pending")
                    .setMaxLength(500)
                    .setMinLength(20)
                    .setStyle(TextInputStyle.Paragraph);

                const TestModalTextModalInputRow = new ActionRowBuilder().addComponents(
                    name
                );
                const TestModalTextModalInputRow2 = new ActionRowBuilder().addComponents(
                    report
                );
                const TestModalTextModalInputRow3 = new ActionRowBuilder().addComponents(
                    server
                );
                const TestModalTextModalInputRow4 = new ActionRowBuilder().addComponents(
                    adicional
                );

                const modal = new ModalBuilder()
                    .setCustomId("Form")
                    .setTitle("Bug / Report Form Vermiel Creadora")
                    .addComponents(TestModalTextModalInputRow, TestModalTextModalInputRow2)
                    .addComponents(
                        TestModalTextModalInputRow3,
                        TestModalTextModalInputRow4
                    );

                await interaction.showModal(modal).catch((error) =>
                    console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Bot] por el Servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}] y el error fue: ${error}`));
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(
                                `<:VS_cancel:1006609599199186974> New status code invalid?`
                            )
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor("Random")
                            .setFooter({ text: `Error en el comando bugs / report` }),
                    ],
                    ephemeral: true,
                });
            }
        } else if (interaction.values.includes('second_option')) {
            try {
                const name = new TextInputBuilder()
                    .setCustomId("User_Privada")
                    .setLabel("Name of the reporting user")
                    .setPlaceholder("put your discord name")
                    .setMaxLength(20)
                    .setMinLength(5)
                    .setStyle(TextInputStyle.Paragraph);

                const server = new TextInputBuilder()
                    .setCustomId("Server_Privada")
                    .setLabel("Name of the server")
                    .setPlaceholder("put the name of the server")
                    .setMaxLength(30)
                    .setMinLength(5)
                    .setStyle(TextInputStyle.Paragraph);

                const report = new TextInputBuilder()
                    .setCustomId("Motivo")
                    .setLabel("Report to send")
                    .setPlaceholder("Submit your report to my developers")
                    .setMaxLength(500)
                    .setMinLength(30)
                    .setStyle(TextInputStyle.Paragraph);

                const adicional = new TextInputBuilder()
                    .setCustomId("Server_Notes")
                    .setLabel("Additional notes")
                    .setPlaceholder("Add any additional note that you have pending")
                    .setMaxLength(500)
                    .setMinLength(20)
                    .setStyle(TextInputStyle.Paragraph);

                const TestModalTextModalInputRow = new ActionRowBuilder().addComponents(
                    name
                );
                const TestModalTextModalInputRow2 = new ActionRowBuilder().addComponents(
                    report
                );
                const TestModalTextModalInputRow3 = new ActionRowBuilder().addComponents(
                    server
                );
                const TestModalTextModalInputRow4 = new ActionRowBuilder().addComponents(
                    adicional
                );

                const modal = new ModalBuilder()
                    .setCustomId("Private")
                    .setTitle("Solicitud de Funciones Privadas")
                    .addComponents(TestModalTextModalInputRow, TestModalTextModalInputRow2)
                    .addComponents(
                        TestModalTextModalInputRow3,
                        TestModalTextModalInputRow4
                    );

                await interaction.showModal(modal).catch((error) =>
                    console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Bot] por el Servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}] y el error fue: ${error}`));
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(
                                `<:VS_cancel:1006609599199186974> New status code invalid?`
                            )
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor("Random")
                            .setFooter({ text: `Error en el comando privadas` }),
                    ],
                    ephemeral: true,
                });
            }
        } else if (interaction.values.includes(`third_option`)) {
            try {
                const name = new TextInputBuilder()
                    .setCustomId("Calificacion")
                    .setLabel("Calificacion al Bot")
                    .setPlaceholder("Proporciona una Calificacion al Bot de Discord")
                    .setMaxLength(300)
                    .setMinLength(20)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);

                const valoracion = new TextInputBuilder()
                    .setCustomId("Estrellas")
                    .setLabel("Valoracion del Bot")
                    .setPlaceholder("Proporciona una Valoracion de 1 a 10")
                    .setMaxLength(5)
                    .setMinLength(1)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);

                const TestModalTextModalInputRow = new ActionRowBuilder().addComponents(
                    name
                );
                const TestModalTextModalInputRow2 = new ActionRowBuilder().addComponents(
                    valoracion
                );

                const modal = new ModalBuilder()
                    .setCustomId("Calificaciones")
                    .setTitle("Calificacion a Universal 🌍")
                    .addComponents(TestModalTextModalInputRow)
                    .addComponents(TestModalTextModalInputRow2);

                await interaction.showModal(modal).catch((error) =>
                    console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Bot] por el Servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}] y el error fue: ${error}`));
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(
                                `<:VS_cancel:1006609599199186974> New status code invalid?`
                            )
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor("Random")
                            .setFooter({ text: `Error en el comando calificacion modal` }),
                    ],
                    ephemeral: true,
                });
            }
        } else if (interaction.values.includes('fourth_option')) {
            try {
                const name1 = new TextInputBuilder()
                    .setCustomId("User_Suggest")
                    .setLabel("Name of the reporting user")
                    .setPlaceholder("put your discord name the suggest")
                    .setMaxLength(30)
                    .setMinLength(5)
                    .setStyle(TextInputStyle.Paragraph);

                const report1 = new TextInputBuilder()
                    .setCustomId("Suggest")
                    .setLabel("Report to send")
                    .setPlaceholder("Submit your suggestion to my developers")
                    .setMaxLength(150)
                    .setMinLength(30)
                    .setStyle(TextInputStyle.Paragraph);

                const adicional1 = new TextInputBuilder()
                    .setCustomId("Server_Suggest")
                    .setLabel("Additional notes")
                    .setPlaceholder("Add any additional note that you have pending")
                    .setMaxLength(100)
                    .setMinLength(20)
                    .setStyle(TextInputStyle.Paragraph);

                const TestModalTextModalInputRow = new ActionRowBuilder().addComponents(
                    name1
                );
                const TestModalTextModalInputRow2 = new ActionRowBuilder().addComponents(
                    report1
                );
                const TestModalTextModalInputRow4 = new ActionRowBuilder().addComponents(
                    adicional1
                );

                const modal = new ModalBuilder()
                    .setCustomId("Suggestion")
                    .setTitle("Sugerencias para Vermiel Creadora")
                    .addComponents(TestModalTextModalInputRow, TestModalTextModalInputRow2)
                    .addComponents(TestModalTextModalInputRow4);

                await interaction.showModal(modal).catch((error) =>
                    console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Bot] por el Servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}] y el error fue: ${error}`));
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(
                                `<:VS_cancel:1006609599199186974> New status code invalid?`
                            )
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor("Random")
                            .setFooter({ text: `Error en el comando sugerencia` }),
                    ],
                    ephemeral: true,
                });
            }
        } else if (interaction.values.includes('fifth_option')) {
            try {
                const name = new TextInputBuilder()
                    .setCustomId("Usuario_Global")
                    .setLabel("Nombre Autor:")
                    .setPlaceholder("Coloca tu nombre como autor del reporte")
                    .setMaxLength(30)
                    .setMinLength(5)
                    .setStyle(TextInputStyle.Paragraph);

                const report = new TextInputBuilder()
                    .setCustomId("Reporte_Global")
                    .setLabel("Reporte & Sugerencia")
                    .setPlaceholder("Coloca tu reporte o sugerencia que quieres mandar")
                    .setMaxLength(150)
                    .setMinLength(30)
                    .setStyle(TextInputStyle.Paragraph);

                const server = new TextInputBuilder()
                    .setCustomId("Servidor_Global")
                    .setLabel("Servidor de Origen")
                    .setPlaceholder("Describe el servidor donde ocurrio el reporte")
                    .setMaxLength(200)
                    .setMinLength(50)
                    .setStyle(TextInputStyle.Paragraph);

                const pruebas = new TextInputBuilder()
                    .setCustomId("Pruebas")
                    .setLabel("Pruebas del Reporte")
                    .setPlaceholder(
                        "Adjunta links de imagenes, web etc.. para sustentar tu reporte"
                    )
                    .setMaxLength(200)
                    .setMinLength(50)
                    .setStyle(TextInputStyle.Paragraph);

                const adicional = new TextInputBuilder()
                    .setCustomId("Notas_Extras")
                    .setLabel("Nota Adicional")
                    .setPlaceholder("Coloca cualquier detalle o nota extra final")
                    .setMaxLength(150)
                    .setMinLength(20)
                    .setStyle(TextInputStyle.Paragraph);

                const TestModalTextModalInputRow = new ActionRowBuilder().addComponents(
                    name
                );
                const TestModalTextModalInputRow2 = new ActionRowBuilder().addComponents(
                    report
                );
                const TestModalTextModalInputRow4 = new ActionRowBuilder().addComponents(
                    server
                );
                const TestModalTextModalInputRow5 = new ActionRowBuilder().addComponents(
                    pruebas
                );
                const TestModalTextModalInputRow6 = new ActionRowBuilder().addComponents(
                    adicional
                );

                const modal = new ModalBuilder()
                    .setCustomId("Extras")
                    .setTitle("Reportes Globales Vermiel Creadora")
                    .addComponents(TestModalTextModalInputRow, TestModalTextModalInputRow2)
                    .addComponents(TestModalTextModalInputRow4)
                    .addComponents(
                        TestModalTextModalInputRow5,
                        TestModalTextModalInputRow6
                    );

                await interaction.showModal(modal).catch((error) =>
                    console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Bot] por el Servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}] y el error fue: ${error}`));
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(
                                `<:VS_cancel:1006609599199186974> New status code invalid?`
                            )
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor("Random")
                            .setFooter({
                                text: `Error en el comando reportes globales vermiel`,
                            }),
                    ],
                    ephemeral: true,
                });
            }
        } else if (interaction.values.includes('sixth_option')) {
            try {
                const name1 = new TextInputBuilder()
                    .setCustomId("User_Clase")
                    .setLabel("Name of the reporting user")
                    .setPlaceholder("put your discord name the suggest class")
                    .setMaxLength(20)
                    .setMinLength(5)
                    .setStyle(TextInputStyle.Paragraph);

                const report1 = new TextInputBuilder()
                    .setCustomId("Clase")
                    .setLabel("Report to send")
                    .setPlaceholder("Submit your clase o asesoria to my developers")
                    .setMaxLength(150)
                    .setMinLength(30)
                    .setStyle(TextInputStyle.Paragraph);

                const adicional1 = new TextInputBuilder()
                    .setCustomId("Server_Clase")
                    .setLabel("Additional notes")
                    .setPlaceholder("Add any additional note that you have pending")
                    .setMaxLength(150)
                    .setMinLength(20)
                    .setStyle(TextInputStyle.Paragraph);

                const TestModalTextModalInputRow = new ActionRowBuilder().addComponents(
                    name1
                );
                const TestModalTextModalInputRow2 = new ActionRowBuilder().addComponents(
                    report1
                );
                const TestModalTextModalInputRow4 = new ActionRowBuilder().addComponents(
                    adicional1
                );

                const modal = new ModalBuilder()
                    .setCustomId("Clase")
                    .setTitle("Clase / Asesoria Form Vermiel Creadora")
                    .addComponents(TestModalTextModalInputRow, TestModalTextModalInputRow2)
                    .addComponents(TestModalTextModalInputRow4);

                await interaction.showModal(modal).catch((error) =>
                    console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Bot] por el Servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}] y el error fue: ${error}`));
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(
                                `<:VS_cancel:1006609599199186974> New status code invalid?`
                            )
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor("Random")
                            .setFooter({ text: `Error en el comando clase modal` }),
                    ],
                    ephemeral: true,
                });
            }
        } else if (interaction.values.includes('seventh_option')) {
            if (!interaction.user.id === "679560282929889331") {
                interaction.reply({
                    content: `<a:error:1030716002259980318> No tienes los permisos para acceder a estas configuraciones del servidor debes ser dueño para ello`,
                    ephemeral: true,
                })
            }

            const servidor = new TextInputBuilder()
                .setCustomId("id_servidor")
                .setLabel("ID del Servidor a Abandonar")
                .setPlaceholder("Ingresa la id del servidor que voy abandonar de la cache")
                .setMaxLength(50)
                .setMinLength(5)
                .setStyle(TextInputStyle.Paragraph);

            const TestModalTextModalInputRow = new ActionRowBuilder().addComponents(    servidor    );

            const modal = new ModalBuilder()
                .setCustomId("Abandonar")
                .setTitle("Abandonar Servidor de Discord")
                .addComponents(TestModalTextModalInputRow);

            await interaction.showModal(modal).catch((error) =>
                console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Bot] por el Servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}] y el error fue: ${error}`));
        } else if (interaction.values.includes('eighth_option')) {
            if (!interaction.user.id === "679560282929889331") {
                interaction.reply({
                    content: `<a:error:1030716002259980318> No tienes los permisos para acceder a estas configuraciones del servidor debes ser dueño para ello`,
                    ephemeral: true,
                })
            }
            
            const a = new TextInputBuilder()
                .setCustomId("id_server")
                .setLabel("ID del Servidor a Interactuar")
                .setPlaceholder("Ingresa la id del servidor con el que voy a interactuar")
                .setMaxLength(50)
                .setMinLength(5)
                .setStyle(TextInputStyle.Paragraph);

            const b = new TextInputBuilder()
                .setCustomId("id_channel")
                .setLabel("ID del Canal a Manejar")
                .setPlaceholder("Ingresa la id del scanal que sera manipulado")
                .setMaxLength(50)
                .setMinLength(5)
                .setStyle(TextInputStyle.Paragraph);

            const c = new TextInputBuilder()
                .setCustomId("id_mensaje")
                .setLabel("Mensaje a Mandar")
                .setPlaceholder("Ingresa el mensaje que voy a mandar al servidor seleccionado")
                .setMaxLength(500)
                .setMinLength(5)
                .setStyle(TextInputStyle.Paragraph);

            const d = new TextInputBuilder()
                .setCustomId("id_cantidad")
                .setLabel("Cantidad de Mensajes")
                .setPlaceholder("Ingresa la cantidad de mensajes que voy a mandar")
                .setMaxLength(10)
                .setMinLength(5)
                .setStyle(TextInputStyle.Paragraph);

            const e = new ActionRowBuilder().addComponents(a);
            const i = new ActionRowBuilder().addComponents(b);
            const j = new ActionRowBuilder().addComponents(c);
            const k = new ActionRowBuilder().addComponents(d);

            const modal = new ModalBuilder()
                .setCustomId("Interactuar")
                .setTitle("Interactuar con Servidor de Discord")
                .addComponents(e)
                .addComponents(i)
                .addComponents(j)
                .addComponents(k);

            await interaction.showModal(modal).catch((error) =>
                console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Bot] por el Servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}] y el error fue: ${error}`));
        }
    }
}