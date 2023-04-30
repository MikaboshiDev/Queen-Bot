const {
    ChatInputCommandInteraction,
    EmbedBuilder,
    TextInputBuilder,
    ActionRowBuilder,
    TextInputStyle,
    ModalBuilder,
    StringSelectMenuBuilder
} = require("discord.js");
const emojis = require("../../../Tools/Settings/emojis.json");
const chalk = require("chalk");
const Discord = require("discord.js");
module.exports = {
    id: "Menus",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        if (interaction.values.includes('first_option')) {
            const Row = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("Dudas")
                    .setPlaceholder("Dudas reportadas hasta el momento")
                    .addOptions(
                        {
                            label: "🎮 Node y Replit",
                            description: "Como tener un bot 24/7 en replit actualmente",
                            value: "first_option",
                        },
                        {
                            label: "⚡ Token Discord",
                            description: "Errores en los token de discord",
                            value: "second_option",
                        },
                        {
                            label: "🎶 Sintaxis",
                            description: "Sintaxis en la programacion de hoy en dia",
                            value: "third_option",
                        }
                    )
            );

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`🛠️ Dudas Universales 🛠️`)
                        .setDescription(
                            `*A continuacion tienes un menu con dudas comunes en la programacion de hoy en dia\nCualquier duda estoy en mi servidor de **soporte** espero volverte a ver pronto*`
                        )
                        .setThumbnail(interaction.client.user.displayAvatarURL())
                        .setFooter({ text: `Solicitado por ${interaction.user.tag}` })
                        .setColor(`#00d26a`),
                ],
                components: [Row],
                ephemeral: true,
            }).catch((error) =>
                console.log(chalk.cyanBright(`[Slash]`) + `A ocurrido un error en el Slash [Estudio] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
        } else if (interaction.values.includes('second_option')) {
            try {
                const Row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("MenuGuides")
                        .setPlaceholder("Visita alguna de mis Guias de Estudio")
                        .addOptions(
                            {
                                label: "🛠️ Python Alto Nivel",
                                description: "Descripcion de un lenguaje de alto nivel",
                                value: "first_option",
                            },
                            {
                                label: "🎓 Kernel",
                                description: "Que es Kernel y su funcion en la actualidad",
                                value: "second_option",
                            },
                            {
                                label: "🎧 Moongose",
                                description:
                                    "Una descripcion de mongoose y sus usos actuales",
                                value: "third_option",
                            },
                            {
                                label: "🎮 Redes Neuronales",
                                description:
                                    "Una breve descripcion de lo que son redes neuronales",
                                value: "fourth_option",
                            },
                            {
                                label: "📡 Wing",
                                description: "Que es wing y como es su uso actualmente",
                                value: "fifth_option",
                            },
                            {
                                label: "😈 Bucles & Funciones",
                                description: "Bucles y Funciones en javascript actualmente",
                                value: "sixth_option",
                            },
                            {
                                label: "🧐 Herencias en TS",
                                description:
                                    "Descripcion de la herencia de Typescript y ejemplos",
                                value: "seventh_option",
                            },
                            {
                                label: "🛑 Node.js & Process",
                                description:
                                    "Process y funcionamiento de node.js breve descripcion",
                                value: "eighth_option",
                            },
                            {
                                label: "👀 C++ Principiante",
                                description:
                                    "C++ para principiantes como estudiarlo desde 0",
                                value: "ninth_option",
                            },
                            {
                                label: `🍪 Distube Player`,
                                description: `Como usar el distube player en discord.js`,
                                value: `tenth_option`,
                            },
                            {
                                label: `✨ Mysql DB`,
                                description: `Como trabaja Mysql en DB`,
                                value: `eleventh_option`,
                            },
                            {
                                label: `🎮 Times`,
                                description: `Times, Creates, Bucles en discord.js Introduccion`,
                                value: `twelfth_option`,
                            },
                            {
                                label: `😞 Rust New`,
                                description: `Que es rust el nuevo lenguaje paradigmatico`,
                                value: `thirteenth_option`,
                            },
                            {
                                label: `✨ Intents & Discord.js`,
                                description: `Intents y su funcionamiento en discord.js`,
                                value: `fourteenth_option`,
                            },
                            {
                                label: `📡 Reacciones & Discord.js`,
                                description: `Reacciones y su funcionamiento en la actualidad`,
                                value: `fifteenth_option`,
                            },
                            {
                                label: `🎓 Presencias & Discord`,
                                description: `Presencias y su funcionamiento en la actualidad`,
                                value: `sixteenth_option`,
                            },
                            {
                                label: `🥶 Canvas Basico`,
                                description: `Uso de canvas a nivel basico en discord.js`,
                                value: `seventeenth_option`,
                            },
                            {
                                label: `🎮 Discord.js & Webhooks`,
                                description: `Webhooks y su funcionamiento en discord.js`,
                                value: `eighteenth_option`,
                            },
                            {
                                label: `✨ Java & Primer Comienzo`,
                                description: `Como empezar a programar en java desde 0`,
                                value: `nineteenth_option`,
                            }
                        )
                );

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Guias Nuevas Generadas por __${interaction.user.tag}__`)
                            .setColor("#ff0012")
                            .setDescription(`Guias para el estudio y soporte de mis Usuarios \`Qin Shi Huang 悟\``)
                            .addFields(
                                { name: `Que Encontraras`, value: `Encontraras Guias de Estudio y Soporte para tus dudas en la programacion de hoy en dia y como solucionarlas contando con alrededor de 19 modulos diferentes de informacion que te puede ser de utilidad para tu dia a dia` },
                            )
                            .setThumbnail(client.user.avatarURL({ dynamic: true }))
                            .setFooter({
                                text: `Página 1 / © desarollado por Qin Shi Huang 悟 | 2022`,
                                iconURL: `https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg`,
                            }),
                    ],
                    components: [Row],
                    ephemeral: true
                }).catch((error) =>
                    console.log(chalk.cyanBright(`[Slash]`) + `A ocurrido un error en el Slash [Estudio] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(
                                `<:VS_cancel:1006609599199186974> New status code invalid?`
                            )
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor("Random")
                            .setFooter({ text: `Error en el comando estudio-guides` }),
                    ],
                    ephemeral: true,
                });
            }
        } else if (interaction.values.includes(`third_option`)) {
            const Row = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("Documentacion")
                    .setPlaceholder("Selecciona alguna documentacion.")
                    .addOptions(
                        {
                            label: "🛠️ v11.0.0",
                            description: "Documentacion de discord.js v11",
                            value: "first_option",
                        },
                        {
                            label: "🎓 v12.5.3",
                            description: "Documentacion de discord.js v12.5",
                            value: "second_option",
                        },
                        {
                            label: "🎧 v13.0.0",
                            description: "Documentacion de discord.js v13.0",
                            value: "third_option",
                        },
                        {
                            label: "🎮 v14.0.0",
                            description: "Documentacion de discord.js v14.0",
                            value: "fourth_option",
                        },
                        {
                            label: "📡 v16.0.4",
                            description: "Documentacion de Node.js v16.5 recomendada",
                            value: "fifth_option",
                        },
                        {
                            label: "😈 v18.0.0",
                            description: "Documentacion de Node.js v18.0 actualizada",
                            value: "sixth_option",
                        },
                        {
                            label: `🥲 Mongoose`,
                            description: `Documentacion de mongoose data bases`,
                            value: `seventh_option`,
                        }
                    )
            );
            const embed = new EmbedBuilder()
                .setTitle("Documentacion de discord.js y node.js")
                .setDescription(
                    `*A continuacion tienes un menu con guias de las versiones de discord.js de **v11.0.0 hasta v14.0.0** y de node.js de **v16.0.4 hasta v18.0.0**\nCualquier duda estoy en mi servidor de **soporte** espero volverte a ver pronto*`
                )
                .setColor("Random")
                .setFooter({ text: `Solicitado por ${interaction.user.tag}` })
                .setTimestamp()
                .setThumbnail(
                    `https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg`
                );

            interaction.reply({ embeds: [embed], components: [Row], ephemeral: true }).catch((error) =>
                console.log(chalk.cyanBright(`[Slash]`) + `A ocurrido un error en el Slash [Estudio] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));

        } else if (interaction.values.includes('fourth_option')) {
            try {
                const Row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("CursoGuides")
                        .setPlaceholder(
                            "Visita alguna de mis Notas y Blocks de Informacion."
                        )
                        .addOptions(
                            {
                                label: "🛠️ Minecraft Bedrock",
                                description: "Descripcion y apoyo de minecraft bedrock",
                                value: "first_option",
                            },
                            {
                                label: "🎓 Constantes",
                                description:
                                    "Te menciona algunos valores de las constantes mas importantes de las matematicas",
                                value: "second_option",
                            },
                            {
                                label: "🎧 Css lenguaje cascada",
                                description:
                                    "Que es css y algunos ejemplos de el uso que tiene en la web",
                                value: "third_option",
                            },
                            {
                                label: "🎮 Clases en Javascript",
                                description:
                                    "Las clases en javascript son una forma de crear objetos.",
                                value: "fourth_option",
                            },
                            {
                                label: "📡 Libreria de Discord.js",
                                description: "Documentacion y uso de Discord.js",
                                value: "fifth_option",
                            },
                            {
                                label: "😈 Network Minecraft",
                                description: "See all my special links class network.",
                                value: "sixth_option",
                            },
                            {
                                label: "🧐 Php Minecraft y Desarrollo",
                                description: "Que es php y unos pequeños usos",
                                value: "seventh_option",
                            },
                            {
                                label: "🛑 Pocketmine Minecraft",
                                description: `Minecraft y su actual desarrollo`,
                                value: "eighth_option",
                            },
                            {
                                label: "👀 Power Nukkyt",
                                description: "Uso y manejo de pocketmine desde O y bases",
                                value: "ninth_option",
                            },
                            {
                                label: `🍪 Goo Goo`,
                                description: `que es go y como se trabaja actualmente`,
                                value: `tenth_option`,
                            },
                            {
                                label: `✨ Html Desarrollo Web`,
                                description: `El trabajo de desarrrollo web y sus beneficios`,
                                value: `eleventh_option`,
                            },
                            {
                                label: `🎮 C# basico y aprendizaje`,
                                description: `Aprendizaje basico de C# inicio`,
                                value: `twelfth_option`,
                            },
                            {
                                label: `☕ Redes Neuronales Basicas`,
                                description: `Que son las redes neuronales y como funcionan`,
                                value: `thirteenth_option`,
                            }

                        )
                );

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Comandos Nuevas Generadas por __${interaction.user.tag}__`)
                            .setColor("#ff0012")
                            .setDescription(`Estudios para el estudio y soporte de mis Usuarios \`Qin Shi Huang 悟\``)
                            .setThumbnail(client.user.avatarURL())
                            .addFields(
                                { name: `❔ __Como Funciono__`, value: `> Selecciona algunos de los menus que se encuentran en el panel de abajo y te mostrare los comandos accesibles\n\n> Por Ejemplo: \`html desarrollo\` muestra una guia de html basico para principiantes` },
                            )
                            .setFooter({
                                text: `Página 1 / © desarollado por Qin Shi Huang 悟 | 2022`,
                                iconURL: `https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg`,
                            }),
                    ],
                    components: [Row],
                    ephemeral: true,
                }).catch((error) =>
                    console.log(chalk.cyanBright(`[Slash]`) + `A ocurrido un error en el Slash [Estudio] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(
                                `<:VS_cancel:1006609599199186974> New status code invalid?`
                            )
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor("Random")
                            .setFooter({ text: `Error en el comando estudio-guides` }),
                    ],
                    ephemeral: true,
                });
            }
        } else if (interaction.values.includes('fifth_option')) {
            interaction.reply({ content: `<a:yes:1028005786112245770> **Discord.js**\n\n> **Discord.js** es una biblioteca de JavaScript para Discord, que permite a los desarrolladores interactuar con la API de Discord para crear y administrar sus bots aui tienes un enlace directo a su guia oficial https://discordjs.guide/#before-you-begin.`, ephemeral: true }).catch((error) =>
                console.log(chalk.cyanBright(`[Slash]`) + `A ocurrido un error en el Slash [Estudio] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
        } else if (interaction.values.includes('sixth_option')) {
            try {
                const Row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("Wikipedia")
                        .setPlaceholder(
                            "Visita alguna de mis Notas y Blocks de Informacion."
                        )
                        .addOptions(
                            {
                                label: "🛠️ Minecraft Bedrock",
                                description: "Descripcion y apoyo de minecraft bedrock",
                                value: "first_option",
                            },
                            {
                                label: "🎓 Minecraft Croosplay",
                                description: "Descripcion y apoyo de minecraft croosplay",
                                value: "second_option",
                            }
                        )
                );

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Guias Nuevas Generadas por __${interaction.user.tag}__`)
                            .setColor("#ff0012")
                            .setDescription(`Guia de Minecraft con gran cantidad de links, menus y ideas para los usuarios`)
                            .setThumbnail(client.user.avatarURL())
                            .addFields(
                                { name: `❔ __Como Funciono__`, value: `> Selecciona algunos de los menus que se encuentran en el panel de abajo y te mostrare los comandos accesibles\n\n> Por Ejemplo: \`Croosplay\` muestra una guia de mimecraft con cantidad de links y ideas posibles` },
                            )
                            .setFooter({
                                text: `Página 1 / © desarollado por Qin Shi Huang 悟 | 2022`,
                                iconURL: `https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg`,
                            }),
                    ],
                    components: [Row],
                    ephemeral: true,
                }).catch((error) =>
                    console.log(chalk.cyanBright(`[Slash]`) + `A ocurrido un error en el Slash [Wikipedia] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(
                                `<:VS_cancel:1006609599199186974> New status code invalid?`
                            )
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor("Random")
                            .setFooter({ text: `Error en el comando estudio-guides` }),
                    ],
                    ephemeral: true,
                });
            }
        }
    }
}