const { 
    ChatInputCommandInteraction,
    EmbedBuilder,
    TextInputBuilder,
    ActionRowBuilder,
    TextInputStyle,
    ModalBuilder,
    StringSelectMenuBuilder,
 } = require("discord.js");
const emojis = require("../../../Tools/Settings/emojis.json");
const Imagenes = require("../../../Tools/Settings/imagenes.json");
const chalk = require("chalk");
const Discord = require("discord.js");
module.exports = {
    id: "Paneles",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        if (interaction.values.includes('first_option')) {
            if (interaction.user.id !== "679560282929889331")
                return interaction.reply({
                    content:`<a:error:1030716002259980318> No tienes permisos para usar este comando necesitas ser dueño para el acceso a el menu de configuracion`,
                    ephemeral: true,
                });
            const Row = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("Reinicio")
                    .setPlaceholder("Selecciona alguna operacion a realizar")
                    .addOptions(
                        {
                            label: "🛠️ Eventos",
                            description: "Reinicia los evetnos del bot de discord",
                            value: "first_option",
                        },
                        {
                            label: "🎓 Comandos",
                            description: "Reinicia los comandos del bot de discord",
                            value: "second_option",
                        },
                        {
                            label: "🎧 Modales",
                            description: "Reinicia los modales del bot de discord",
                            value: "third_option",
                        },
                        {
                            label: `🎮 Menus`,
                            description: "Reincia los menus del bot de discord",
                            value: "fourth_option",
                        },
                        {
                            label: "📡 Botones",
                            description: "Reinicia los botones del bot de discord",
                            value: "fifth_option",
                        },
                        {
                            label: `😈 Apagado`,
                            description: `Apagado total del bot de discord`,
                            value: `sixth_option`,
                        },
                        {
                            label: `👑 Propietario`,
                            description: `Reinicia el bot de discord`,
                            value: `seventh_option`,
                        },
                        {
                            label: `🛠️ Guardado`,
                            description: `Guarda la informacion de un canal`,
                            value: `eighth_option`,
                        },
                        {
                            label: `🎓 Cargado`,
                            description: `Carga la informacion de un canal y bot`,
                            value: `ninth_option`,
                        },
                        {
                            label: `🏓 Control`,
                            description: `Panel de control del bot de discord actualmente`,
                            value: `tenth_option`,
                        },
                        {
                            label: `🎧 Registro`,
                            description: `Panel de valores del bot de discord en tiempo real`,
                            value: `eleventh_option`,
                        },
                        {
                            label: `😈 Servidores`,
                            description: `Obten un archivo sourcebin con todos los servidores del bot`,
                            value: `twelfth_option`,
                        }
                    )
            );

            const embed = new EmbedBuilder()
                .setTitle("Panel De Reinicio")
                .setDescription(`Selecciona alguna opcion para reiniciar el bot de discord desde el panel`)
                .addFields(
                    { name: `❔ __Como Funciono__`, value: `> Selecciona alguna de las opciones para manipular el bot de forma externa\n\n> Por Ejemplo: \`Botones\` dara reinicio a los botones de forma global en discord` },
                )
                .setTimestamp()
                .setColor("Random")
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text:`Mas comandos muy pronto nueva actualizacion`});

            interaction.reply({
                embeds: [embed],
                components: [Row],
                ephemeral: true,
            }).catch((error) =>
                console.log(chalk.redBright(`[SISTEMA]`) + `A ocurrido un error en el comando [Paneles] por el servidor [${interaction.guild.id}]...`));
        } else if (interaction.values.includes('second_option')) {
            const Row = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("Informacion")
                    .setPlaceholder("Seleccione la Informacion que Necesitas")
                    .addOptions(
                        {
                            label: "😈 Server Info",
                            description: "This is a description",
                            value: "first_option",
                        },
                        {
                            label: "🎮 Bot Info",
                            description: "This is also a description",
                            value: "second_option",
                        },
                        {
                            label: "👑 Owner Info",
                            description: "This is a description as well",
                            value: "third_option",
                        },
                        {
                            label: "🛠️ Developer Info",
                            description: "This is a description as well",
                            value: "fourth_option",
                        },
                        {
                            label: `🪁 Server Avatar`,
                            description: `Muestra el avatar del servidor de discord`,
                            value: `fifth_option`,
                        },
                        {
                            label: `🤩 Privacidad ToS`,
                            description: `Muestra la informacion de los ToS`,
                            value: `sixth_option`,
                        },
                        {
                            label: `🔗 Uptime Robot`,
                            description: `Muestra el tiempo activo del bot de discord`,
                            value: `seventh_option`,
                        },
                        {
                            label: `🌍 Invitaciones`,
                            description: `Muestra la invitaciones del bot de discord`,
                            value: `eighth_option`,
                        },
                        {
                            label: `🏓 Ping`,
                            description: `Muestra el ping del bot de discord`,
                            value: `ninth_option`,
                        },
                        {
                            label: `🤬 Estado`,
                            description: `Muestra el estado del bot de discord en parametros`,
                            value: `tenth_option`,
                        }
                    )
            );

            const embed = new EmbedBuilder()
                .setTitle("Panel De Informacion")
                .setDescription(
                    "*Panel de informacion de **servidores** selecciona alguna opcion para ver la informacion desde un server info hasta saber informacion del owner*"
                )
                .addFields(
                    { name: `❔ __Como Funciono__`, value: `> Selecciona alguna de las opciones para obtener distintos puntos de informacion\n\n> Por Ejemplo: \`Owner Info\` dara informacion concreta y solo del creador del servidor de discord` },
                )
                .setTimestamp()
                .setColor("Random")
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: "Panel de informacion del bot de discord" });

            interaction.reply({
                embeds: [embed],
                components: [Row],
                ephemeral: true,
            }).catch((error) =>
                console.log(chalk.redBright(`[SISTEMA]`) + `A ocurrido un error en el comando [Paneles] por el servidor [${interaction.guild.id}]...`));
            console.log(
                chalk.greenBright(`[Panel]`) +
                chalk.whiteBright(
                    `Se ha usado el comando paneles en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`
                )
            );
        } else if (interaction.values.includes(`third_option`)) {
            const Row = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("Economia")
                    .setPlaceholder("Economia Multi Servidor")
                    .addOptions(
                        {
                            label: "🤩 Trabajar",
                            description: "Vamos a trabajar en algun trabajo ahora",
                            value: "first_option",
                        },
                        {
                            label: "👨‍🌾 Pension",
                            description: "Recoge tu pension de mi economia",
                            value: "second_option",
                        },
                        {
                            label: "💵 Banco",
                            description: "Ve tus ingresos que tienes en el banco",
                            value: "third_option",
                        },
                        {
                            label: "💰 Top",
                            description: "Ve el top de dinero de los usuarios god",
                            value: "fourth_option",
                        }
                    )
            );
            const embed = new EmbedBuilder()
                .setTitle("Sistema de Economia Creadora")
                .setDescription(
                    `*Este es mi sistema de economia actual selecciona las operaciones que quieras realizar y vuelvete el mas rico de todos*`
                )
                .addFields(
                    { name: `❔ __Como Funciono__`, value: `> Selecciona algunas opciones para hacer uso del sistema de economia del bot de discord\n\n> Por Ejemplo: \`Banco\` te dira la cantidad de dinero que tienes tanto fuera y como en el banco` },
                )
                .setColor("Random")
                .setImage(Imagenes["menus"]["economia"])
                .setTimestamp()
                .setFooter({ text: `Solicitado por ${interaction.user.username}` });

            interaction.reply({
                embeds: [embed],
                components: [Row],
                ephemeral: true,
            }).catch((error) =>
                console.log(chalk.redBright(`[SISTEMA]`) + `A ocurrido un error en el comando [Paneles] por el servidor [${interaction.guild.id}]...`));
            console.log(
                chalk.magentaBright(`[Menu]`) +
                chalk.whiteBright(
                    ` Se ha usado el comando economia en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`
                )
            );
        } else if (interaction.values.includes('fourth_option')) {
            const Row = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("Fun")
                    .setPlaceholder("Selecciona alguna funcion de preferencia")
                    .addOptions(
                        {
                            label: "😚 Wallpaper",
                            description: "Comando avatar sencillo para discord bots",
                            value: "first_option",
                        },
                        {
                            label: "🎓 Borracho",
                            description: "Comandos 8ball con respuestas aleatorias",
                            value: "second_option",
                        },
                        {
                            label: "🎧 Banana",
                            description: "Comando ban basico para guias de discord",
                            value: "third_option",
                        },
                        {
                            label: "🎮 Hacking",
                            description: "Comando server avatar para discord bots",
                            value: "fourth_option",
                        },
                        {
                            label: "🤩 H-Wallpaper",
                            description: "Comando kick en discord bots guia",
                            value: "fifth_option",
                        },
                        {
                            label: "🎶 Feed ",
                            description: "Comando kick en discord bots guia",
                            value: "sixth_option",
                        },
                        {
                            label: `🏓 Adios `,
                            description: `Despidete de el grupo de la mejor forma posible`,
                            value: `seventh_option`,
                        },
                        {
                            label: `🤣 Cat `,
                            description: `Obten fotos aleatorias de gatos :D`,
                            value: `eighth_option`,
                        },
                        {
                            label: `🥺 Dados `,
                            description: `Tira los dados para ver que frase del dia obtienes`,
                            value: `ninth_option`,
                        },
                        {
                            label: `🥰 Alquimia `,
                            description: `Un panel de informacion de pociones de minecraft`,
                            value: `tenth_option`,
                        },
                        {
                            label: `🤬 Profile `,
                            description: `Muestra tu foto de perfil en estilo de wallpaper`,
                            value: `eleventh_option`,
                        },
                        {
                            label: `🤑 tablero `,
                            description: `Muestra un tablero de juego de mesa para jugar con tus amigos`,
                            value: `twelfth_option`,
                        },
                        {
                            label: " 🏓 Rank ",
                            description: "Muestra tu rango actualmente en el servidor",
                            value: "thirteenth_option",
                        },
                        {
                            label: " 🎮 Cars ",
                            description: "Muestra diferentes fotos de carros de google",
                            value: "fourteenth_option",
                        }
                    )
            );
            const embed = new EmbedBuilder()
                .setTitle("Fun & Emotions Discord")
                .setDescription(
                    `*A continuacion tienes un menu con **funciones** random de mi creador y servidor todo para la **utilidad** de mis usuarios de discord cualquier **sugerencia** tienes mis **comandos** a tu disposicion\nCualquier duda estoy en mi servidor de **soporte** espero volverte a ver pronto*`
                )
                .addFields(
                    { name: `❔ __Como Funciono__`, value: `> Selecciona alguna opcion para interactuar con el bot o obtener distintas animaciones de diversion\n\n> Por Ejemplo: \`Rank\` te dara una card con tu nivel de xp en el servidor de discord junto a tu nivel` },
                )
                .setColor("Random")
                .setFooter({ text: `Solicitado por ${interaction.user.tag}` })
                .setTimestamp()
                .setThumbnail(
                    "https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg"
                );

            interaction.reply({
                embeds: [embed],
                components: [Row],
                ephemeral: true,
            }).catch((error) =>
                console.log(chalk.redBright(`[SISTEMA]`) + `A ocurrido un error en el comando [Paneles] por el servidor [${interaction.guild.id}]...`));
            console.log(
                chalk.magentaBright(`[Menu]`) +
                chalk.whiteBright(
                    ` Se ha usado el comando diversion en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`
                )
            );
        } else if (interaction.values.includes('fifth_option')) {
            const Row = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("Astros")
                    .setPlaceholder("Selecciona alguna informacion")
                    .addOptions(
                        {
                            label: "🏓 Mercurio",
                            description: "Informacion de Mercurio",
                            value: "first_option",
                        },
                        {
                            label: "👀 Venus",
                            description: "Informacion de Venus",
                            value: "second_option",
                        },
                        {
                            label: "😚 Tierra",
                            description: "Informacion de Tierra",
                            value: "third_option",
                        },
                        {
                            label: "🧩 Marte",
                            description: "Informacion de Marte",
                            value: "fourth_option",
                        },
                        {
                            label: "🍪 Jupiter",
                            description: "Informacion de Jupiter",
                            value: "fifth_option",
                        },
                        {
                            label: "🪐 Saturno",
                            description: "Informacion de Saturno",
                            value: "sixth_option",
                        },
                        {
                            label: "🪙 Urano",
                            description: "Informacion de Urano",
                            value: "seventh_option",
                        },
                        {
                            label: "​🔭​ Pluton",
                            description: "Informacion de Pluton",
                            value: "eighth_option",
                        },
                        {
                            label: "🌙 Luna",
                            description: "Informacion de la Luna",
                            value: "ninth_option",
                        },
                        {
                            label: "☀️ Sol",
                            description: "Informacion del Sol",
                            value: "tenth_option",
                        },
                        {
                            label: "🌌 Cometas",
                            description: "Informacion de las Cometas",
                            value: "eleventh_option",
                        }
                    )
            );
            const embed = new EmbedBuilder()
                .setTitle(emojis["msg"]["pruning"] + "Astros Universales")
                .setDescription(
                    `*A continuacion tienes un menu con **astros** para que puedas ver informacion relevante de cada uno de ellos\nCualquier duda estoy en mi servidor de **soporte** espero volverte a ver pronto*`
                )
                .addFields(
                    { name: `❔ __Como Funciono__`, value: `> Selecciona alguna de las opciones para obtener informacion de el sistema solar\n\n> Por Ejemplo: \`Luna\` te dara informacion de el satelite natural desde la gravedad, masa, rotacion y otros puntos importantes` },
                )
                .setColor("Random")
                .setThumbnail(
                    "https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg"
                )
                .setTimestamp()
                .setFooter({ text: `Solicitado por ${interaction.user.username}` });

            interaction.reply({
                embeds: [embed],
                components: [Row],
                ephemeral: true,
            }).catch((error) =>
                console.log(chalk.redBright(`[SISTEMA]`) + `A ocurrido un error en el comando [Paneles] por el servidor [${interaction.guild.id}]...`));
            console.log(
                chalk.magentaBright(`[Menu]`) +
                chalk.whiteBright(
                    ` Se ha usado el comando astrologia en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`
                )
            );
        } else if (interaction.values.includes('sixth_option')) {
            const a = new TextInputBuilder()
                .setCustomId("Calificacion")
                .setLabel("Calificacion de la Reseña")
                .setPlaceholder("Ingresa una calificacion al servidor")
                .setMaxLength(20)
                .setMinLength(1)
                .setStyle(TextInputStyle.Paragraph);

            const b = new TextInputBuilder()
                .setCustomId("Comentario")
                .setLabel("Ingresa algun Comentario")
                .setPlaceholder("Ingresa un comentario esto es opcional")
                .setMaxLength(300)
                .setMinLength(5)
                .setRequired(false)
                .setStyle(TextInputStyle.Paragraph);

            const c = new ActionRowBuilder()
                .addComponents(a)

            const p = new ActionRowBuilder()
                .addComponents(b);

            const reseñapro = new ModalBuilder()
                .setTitle("Nueva Reseña")
                .setCustomId("Nueva_Reseña")
                .addComponents(c)
                .addComponents(p);

            await interaction.showModal(reseñapro).catch((error) =>
                console.log(chalk.redBright(`[SISTEMA]`) + `No pudo generarse el modal de [Reseñas] en el servidor [${interaction.guild.id}]...`));
        } else if (interaction.values.includes('seventh_option')) {
            if (interaction.user.id !== "679560282929889331")
                return interaction.reply({
                    content: `<a:error:1030716002259980318> No tienes permisos para usar este comando necesitas ser dueño para el acceso a el menu de configuracion`,
                    ephemeral: true,
                });
            try {
                const Row = new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("funciones_1")
                        .setPlaceholder("Selecciona alguna funcion de ataque")
                        .addOptions(
                            {
                                label: "⚡ Nuke Total",
                                description:
                                    "Nukea todos los canales del servidor de discord",
                                value: "first_option",
                            },
                            {
                                label: "🌍 Emoji Total",
                                description:
                                    "Elimina todos los emojis del servidor de discord",
                                value: "second_option",
                            },
                            {
                                label: "⛳ Ataque Delete",
                                description:
                                    "Borra todos los roles del servidor de discord",
                                value: "third_option",
                            },
                            {
                                label: "🛑 Ban All",
                                description:
                                    "Banea a todos los miembros del servidor de discord",
                                value: "fourth_option",
                            },
                            {
                                label: "🪁 Kick All",
                                description:
                                    "Expulsa a todos los miembros del servidor de discord",
                                value: "fifth_option",
                            },
                            {
                                label: "🔥 Creacion Total",
                                description: "Crea canales de texto 100 canales de texto",
                                value: "sixth_option",
                            },
                            {
                                label: `💜 Locked All`,
                                description: `Bloquea todos los canales de tu servidor de discord`,
                                value: `seventh_option`,
                            },
                            {
                                label: `⏱️ Categorias All`,
                                description: `Elimina todas las categorias del servidor de discord`,
                                value: `eighth_option`
                            }
                        )
                );

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Panel de funciones publicas del bot de discord`)
                            .setDescription(
                                "*A continuacion se mostraran las funciones publicas del bot de discord estas **funciones** se dan como un panel de funciones publicas para que los usuarios puedan usarlas sin necesidad de tener **permisos** de administrador*"
                            )
                            .addFields(
                                { name: `❔ __Como Funciono__`, value: `> Selecciona alguna opcion para hacer cambios globales del servidor ten en cuenta los riesgos de los mismos\n\n> Por Ejemplo: \`Nukeall\` borra todos los canales del servidor a exepcion del canal de comunidad eso en caso de contar con alguno` },
                            )
                            .setFooter({ text: `Solitado por ${interaction.user.tag}` })
                            .setThumbnail(
                                interaction.user.displayAvatarURL({ dynamic: true })
                            ),
                    ],
                    components: [Row],
                    ephemeral: true,
                }).catch((error) =>
                    console.log(chalk.redBright(`[SISTEMA]`) + `A ocurrido un error en el comando [Paneles] por el servidor [${interaction.guild.id}]...`));
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(
                                `<:VS_cancel:1006609599199186974> New status code invalid?`
                            )
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor("Random")
                            .setFooter({ text: `Error en el comando funciones` }),
                    ],
                    ephemeral: true,
                });
                console.log(
                    chalk.redBright(`[Error]`) +
                    chalk.whiteBright(
                        `Se ha usado el comando funciones en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`
                    )
                );
            }
        } else if (interaction.values.includes('eighth_option')) {
            const a = new TextInputBuilder()
                .setCustomId("Informacion")
                .setLabel("Infromacion Relevante")
                .setPlaceholder("Informacion que se mostrado en la guia")
                .setMaxLength(1000)
                .setMinLength(100)
                .setStyle(TextInputStyle.Paragraph);

            const b = new TextInputBuilder()
                .setCustomId("Codigo")
                .setLabel("Codigo Mostrado")
                .setPlaceholder("Codigo que moestraras como ejemplo en la guia")
                .setMaxLength(1000)
                .setMinLength(100)
                .setStyle(TextInputStyle.Paragraph);

            const c = new TextInputBuilder()
                .setCustomId("Explicacion")
                .setLabel("Explicacion del Codigo")
                .setPlaceholder("Explicacion del codigo mostrado en la guia")
                .setMaxLength(1000)
                .setMinLength(100)
                .setStyle(TextInputStyle.Paragraph);

            const d = new TextInputBuilder()
                .setCustomId("Link")
                .setLabel("Link de la guia")
                .setPlaceholder("Link de imagenes, webs, libros para mostrar en la guia")
                .setMaxLength(1000)
                .setMinLength(100)
                .setRequired(false)
                .setStyle(TextInputStyle.Paragraph);

            const TestModalTextModalInputRow = new ActionRowBuilder()
                .addComponents(a);

            const TestModalTextModalInputRow2 = new ActionRowBuilder()
                .addComponents(b);

            const TestModalTextModalInputRow3 = new ActionRowBuilder()
                .addComponents(c);

            const TestModalTextModalInputRow4 = new ActionRowBuilder()
                .addComponents(d);

            const modal = new ModalBuilder()
                .setTitle("Aporta a la Wiki de Discord")
                .setCustomId("Wiki")
                .addComponents(TestModalTextModalInputRow)
                .addComponents(TestModalTextModalInputRow2)
                .addComponents(TestModalTextModalInputRow3)
                .addComponents(TestModalTextModalInputRow4);

            await interaction.showModal(modal).catch((error) =>
                console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el Slash [Wiki] por el Servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}] y el error fue: ${error}`));
        }
    }
}