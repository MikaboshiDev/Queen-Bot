const Discord = require("discord.js");
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, ActionRowBuilder, ChannelType } = require("discord.js");
module.exports = {
    permisos: [
        "ManageChannels",
    ],
    botpermisos: [
        "ManageChannels",
        "EmbedLinks",
    ],
    data: new SlashCommandBuilder()
        .setName("canal")
        .setDescription("Muestra los canales del servidor")
        .addSubcommand((options) =>
            options
                .setName("lock")
                .setDescription("🔰 bloquea un canal del servidor de discord")
                .addChannelOption((options) =>
                    options
                        .setName("channel")
                        .setDescription("Establezca el canal que desea bloquear")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
                .addStringOption((options) =>
                    options
                        .setName("reason")
                        .setDescription(
                            "Establezca la razón por la que desea bloquear el canal"
                        )
                        .setRequired(false)
                )
        )
        .addSubcommand((options) =>
            options
                .setName("slowmode")
                .setDescription("🔰 establece el modo lento en un canal del servidor")
                .addChannelOption((option) =>
                    option
                        .setName("canal")
                        .setDescription("Canal donde establecer el modo lento")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
                .addIntegerOption((option) =>
                    option
                        .setName("tiempo")
                        .setDescription("Tiempo de modo lento")
                        .setRequired(true)
                )
        ),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case "lock":
                {
                    const channel = interaction.options.getChannel("channel");
                    const reason = interaction.options.getString("reason");
                    const unlock = channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                        SendMessages: false,
                        AddReactions: false,
                    });

                    if (!unlock) return interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("Comando Lock! 🟡")
                                .setDescription([
                                    `\`•\` Estado: Error`,
                                    `\`•\` Motivo: No se pudo bloquear el canal`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                    `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                                ])
                        ],
                        ephemeral: true
                    });

                    const embed = new EmbedBuilder()
                        .setTitle("⛳ Canal Bloqueado")
                        .setDescription(
                            `*El canal **${channel}** ha sido bloqueado por ${interaction.user.tag}*`
                        )
                        .setColor("Random")
                        .setTimestamp()
                        .setFooter({
                            text: `Canal bloqueado por ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL(),
                        })
                        .addFields({
                            name: "⛳ Razon",
                            value: reason || "No hay razón proporcionada por el bloqueo",
                        });

                    const unlocked = new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setCustomId("Unlock_Channels")
                                .setEmoji("🍃")
                                .setLabel("Unlock Channels")
                                .setStyle(Discord.ButtonStyle.Primary),
                        );

                    interaction.reply({ embeds: [embed], components: [unlocked], ephemeral: true }).catch((error) => { });

                    const filter = (button) => button.user.id === interaction.user.id;
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
                    collector.on("collect", async (button) => {
                        if (button.customId === "Unlock_Channels") {
                            if (!interaction.member.permissions.has("ManageChannels")) {
                                return interaction.reply({
                                    embeds: [
                                        new EmbedBuilder()
                                            .setTitle("Comando Lock! 🟡")
                                            .setDescription([
                                                `\`•\` Estado: Error`,
                                                `\`•\` Motivo: No tienes permisos para estas acciones`,
                                                `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                                `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                                            ])
                                    ],
                                    ephemeral: true
                                });
                            }
                            channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                                SendMessages: true,
                                AddReactions: true,
                            });
                            const unlocking = new EmbedBuilder()
                                .setTitle("⛳ Canal Desbloqueado")
                                .setDescription(
                                    `*El canal **${channel}** ha sido Desbloqueado por ${interaction.user.tag}*`
                                )
                                .setColor("Random")
                                .setTimestamp()
                                .setFooter({
                                    text: `Canal desbloqueado por ${interaction.user.tag}`,
                                    iconURL: interaction.user.displayAvatarURL(),
                                })
                                .addFields({
                                    name: "⛳ Razon",
                                    value: reason || "No hay razón proporcionada por el desbloqueo",
                                });
                            button.update({ embeds: [unlocking], components: [], ephemeral: true }).catch((error) => { });
                        }
                    })
                }
                break;
            case "slowmode":
                {
                    try {
                        const tiempo = interaction.options.getInteger("tiempo");
                        const canal = interaction.options.getChannel("canal");
                        if (tiempo > 21600) {
                            interaction.reply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setTitle("Comando Slowmode! 🟡")
                                        .setDescription([
                                            `\`•\` Estado: Error`,
                                            `\`•\` Motivo: El tiempo de modo lento no puede ser mayor a 21600 segundos (6 horas)`,
                                            `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                            `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                                        ].join("\n"))
                                ],
                                ephemeral: true,
                            }).catch((error) => { });
                        }
                        if (tiempo < 0) {
                            interaction.reply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setTitle("Comando Slowmode! 🟡")
                                        .setDescription([
                                            `\`•\` Estado: Error`,
                                            `\`•\` Motivo: El tiempo de modo lento no puede ser menor a 0 segundos`,
                                            `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                            `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                                        ].join("\n"))
                                ],
                                ephemeral: true,
                            }).catch((error) => { });
                        }
                        await canal.setRateLimitPerUser(tiempo);
                        const embed = new Discord.EmbedBuilder()
                            .setTitle("⛳ Modo lento establecido")
                            .setColor("Random")
                            .setDescription(
                                `*⛳ El modo lento se ha establecido en **${tiempo}** segundos*`
                            )
                            .setTimestamp()
                            .setFooter({
                                text: interaction.user.tag,
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                            });

                        let time = new Discord.ActionRowBuilder().addComponents(
                            new Discord.ButtonBuilder()
                                .setStyle(ButtonStyle.Secondary)
                                .setLabel("tiempo")
                                .setEmoji("🧐")
                                .setCustomId("informacion"),
                            new Discord.ButtonBuilder()
                                .setStyle(ButtonStyle.Secondary)
                                .setLabel("desactivar")
                                .setEmoji("🥶")
                                .setCustomId("desactivar"),
                            new Discord.ButtonBuilder()
                                .setStyle(ButtonStyle.Danger)
                                .setLabel("+ 10 segundos")
                                .setEmoji("🥵")
                                .setCustomId("mas"),
                        );
                        interaction.reply({
                            embeds: [embed],
                            components: [time],
                            ephemeral: true
                        }).catch((error) => { });

                        const collector =
                            interaction.channel.createMessageComponentCollector({
                                time: 15000,
                            });
                        collector.on("collect", async (button) => {
                            if (button.customId === "informacion") {
                                button.update({ embeds: [embed.setDescription(`El modo lento del canal es de **${tiempo}** segundos`)], ephemeral: true }).catch((error) => { });
                            }
                            if (button.customId === "desactivar") {
                                const desactivar = await canal.setRateLimitPerUser(0);
                                button.update({
                                    embeds: [embed.setDescription(`El modo lento del canal ha sido desactivado de forma correcta`)],
                                    components: [],
                                    ephemeral: true
                                }).catch((error) => { });

                                if (!desactivar)
                                    return button.update({
                                        embeds: [embed.setDescription(`El modo lento del canal no se ha podido desactivar debido a que ya esta en 0 o no existe el canal`)],
                                        ephemeral: true
                                    }).catch((error) => { });
                            }

                            if (button.customId === "mas") {
                                if (tiempo > 21600) {
                                    button.update({
                                        embeds: [embed.setDescription("El tiempo no puede ser mayor al permitido por discord")],
                                        ephemeral: true
                                    }).catch((error) => { });
                                }

                                if (tiempo < 0) {
                                    button.update({
                                        embeds: [embed.setDescription("El tiempo no puede ser menor a los 0 segundos")],
                                        ephemeral: true
                                    }).catch((error) => { });
                                }

                                canal.setRateLimitPerUser(tiempo + 10);
                                button.update({
                                    embeds: [embed.setDescription(`*⛳ El modo lento se ha actualizado **10 Segundos** mas al anterior*`)],
                                    ephemeral: true
                                }).catch((error) => { });

                            }
                        });
                    } catch (e) {
                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(
                                        `<:VS_cancel:1006609599199186974> New status code invalid?`
                                    )
                                    .setDescription(`\`\`\`yml\n${e}\`\`\``)
                                    .setColor("Random")
                                    .setFooter({ text: `Error en el comando slowmode` }),
                            ],
                            ephemeral: true,
                        });
                        console.log(
                            chalk.redBright(`[Error]`) +
                            chalk.whiteBright(
                                ` Se ha usado el comando slowmode en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`
                            )
                        );
                    }
                }
                break;
        }
    }
}