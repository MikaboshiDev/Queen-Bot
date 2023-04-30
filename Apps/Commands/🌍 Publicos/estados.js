const { CommandInteraction, EmbedBuilder, AttachmentBuilder, ChannelType, SlashCommandBuilder } = require("discord.js");

const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { generateChartConfig } = require('../../../Tools/chart');

const moment = require("moment");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("estados")
        .setNameLocalizations({
            "fr": "états",
            "en-US": "states",
        })
        .setDescription("🌍 Muestra los estados de los usuarios/canales y roles del servidor")
        .setDescriptionLocalizations({
            "en-US": "🌍 Shows the states of the users/channels and roles of the server",
            "fr": "🌍 Affiche les états des utilisateurs/canales et des rôles du serveur",
        })
        .addSubcommand(subcommand =>
            subcommand
                .setName("usuarios")
                .setNameLocalizations({
                    "en-US": "users",
                    "fr": "utilisateurs",
                })
                .setDescription("🌍 Muestra los estados de los usuarios del servidor")
                .setDescriptionLocalizations({
                    "en-US": "🌍 Shows the states of the users of the server",
                    "fr": "🌍 Affiche les états des utilisateurs du serveur",
                })
                .addUserOption(option =>
                    option
                        .setName("usuario")
                        .setNameLocalizations({
                            "en-US": "user",
                            "fr": "utilisateur",
                        })
                        .setDescription("🌍 Muestra los estados de un usuario")
                        .setDescriptionLocalizations({
                            "en-US": "🌍 Shows the states of a user",
                            "fr": "🌍 Affiche les états d'un utilisateur",
                        })
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("servidor")
                .setNameLocalizations({
                    "en-US": "server",
                    "fr": "serveur",
                })
                .setDescription("🏫 Muestra los estados del servidor")
                .setDescriptionLocalizations({
                    "en-US": "Shows the states of the server",
                    "fr": "Affiche les états du serveur",
                })
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName("canales")
                .setNameLocalizations({
                    "en-US": "channels",
                    "fr": "canaux",
                })
                .setDescription("📢 Muestra los estados de los canales del servidor")
                .setDescriptionLocalizations({
                    "en-US": "Shows the states of the channels of the server",
                    "fr": "Affiche les états des canaux du serveur",
                })
                .addChannelOption(option =>
                    option
                        .setName("canal")
                        .setNameLocalizations({
                            "en-US": "channel",
                            "fr": "canal",
                        })
                        .setDescription("📢 Muestra los estados de un canal")
                        .setDescriptionLocalizations({
                            "en-US": "Shows the states of a channel",
                            "fr": "Affiche les états d'un canal",
                        })
                        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildVoice, ChannelType.GuildStageVoice)
                        .setRequired(true)
                )
        ),

    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {

        const { guild, options } = interaction;

        try {
            switch (options.getSubcommand()) {

                case "usuarios": {

                    const Target = options.getMember("usuario");
                    await Target.fetch();

                    /**
                     * 
                     * @param {Target} Target 
                     */
                    async function displayHex(Target) {

                        if (Target.displayHexColor !== '#000000') {
                            return Target.displayHexColor;
                        } else {
                            return '#2F3136'; // Transparent
                        }

                    };

                    const Response = new EmbedBuilder()
                        .setColor(await displayHex(Target))
                        .setAuthor({
                            name: `${Target.user.tag}'s Informacion del Usuario`,
                            iconURL: Target.user.avatarURL({
                                dynamic: true,
                            }),
                        })
                        .setThumbnail(
                            `${Target.user.displayAvatarURL({
                                dynamic: true,
                                size: 1024,
                            })}`
                        )
                        .addFields({
                            name: `<:flechaderlong:1026467692997255229> Informacion General`,
                            value: `
 
                         **\`•\` Name**: ${Target.user}
                         **\`•\` ID**: ${Target.user.id}
                         **\`•\` Roles**: ${Target.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}
                         **\`•\` Joined Server**: <t:${parseInt(Target.joinedTimestamp / 1000)}:R>
                         **\`•\` Joined Discord**: <t:${parseInt(Target.user.createdTimestamp / 1000)}:R>
                         ㅤ
                         `,
                            inline: false,
                        })

                    interaction.reply({
                        embeds: [Response],
                    });

                } break;


                case "servidor": {

                    const explicitFilter = {
                        DISABLED: 'Off',
                        MEMBERS_WITHOUT_ROLES: 'No Role',
                        ALL_MEMBERS: 'Everyone'
                    }

                    const verificationRate = {
                        NONE: 'None',
                        LOW: 'Low',
                        MEDIUM: 'Medium',
                        HIGH: 'High',
                        VERY_HIGH: 'Highest'
                    }

                    const Response = new EmbedBuilder()
                        .setTitle(`Servidor Informacion:`)
                        .setColor("#5865F2")
                        .setThumbnail(guild.iconURL({ dynamic: false, size: 1024 }))
                        .addFields(
                            {
                                name: "📝 GENERAL:",
                                value:
                                    `
 
                             **\`•\` Name**: ${guild.name}
                             **\`•\` ID**: ${guild.id}
                             **\`•\` Created**: <t:${parseInt(guild.createdTimestamp / 1000)}:R>
                             **\`•\` Owner**: <@${guild.ownerId}>
                             **\`•\` Description**: ${guild.description || "None"}
                             **\`•\` Verification Rate**: ${verificationRate[guild.verificationLevel] || "None"}
                             **\`•\` Explicit Filter**: ${explicitFilter[guild.explicitContentFilter] || "None"}
                             ㅤ
                             `,
                                inline: true,

                            }, {
                            name: "👥 MIEMBROS: ",
                            value:
                                `
                             **\`•\` Total Members**: ${guild.members.cache.size}
                             **\`•\` Users**: ${guild.members.cache.filter((m) => !m.user.bot).size}
                             **\`•\` Bots**: ${guild.members.cache.filter((m) => m.user.bot).size}
                             ㅤ
                             `,
                            inline: false,

                        }, {
                            name: "💬 CANALES: ",
                            value:
                                `
                             **\`•\` Total Channels**: ${guild.channels.cache.size}
                             **\`•\` Text**: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size}
                             **\`•\` Voice**: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size}
                             **\`•\` Annoument**: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildAnnouncement).size}
                             **\`•\` Categories**: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size}
                             **\`•\` Stages**: ${guild.channels.cache.filter((c) => c.type === ChannelType.GuildStageVoice).size}
                             ㅤ
                             `,
                            inline: false,

                        },
                        )
                        .setFooter({ text: "Informacion de Servidor de Discord" }).setTimestamp();
                    interaction.reply({
                        embeds: [Response],
                    });
                } break;


                case "canales": {

                    const channel = options.getChannel("canal");

                    const channelTypes = {
                        GUILD_TEXT: 'Text',
                        DM: 'DM',
                        GUILD_VOICE: 'Voice',
                        GROUP_DM: 'Group DM',
                        GUILD_CATEGORY: 'Category',
                        GUILD_STAGE_VOICE: 'Stage Voice',
                        GUILD_DIRECTORY: 'Hub Directory',
                        GUILD_FORUM: 'Forum',
                    }

                    if (channel.type !== ChannelType.GuildVoice) {
                        const webhooks = await channel.fetchWebhooks();
                        const webhookArray = webhooks.size;

                        // Channel Message Analytics 

                        const msgs = await channel.messages.fetch().then((res) => { return res });
                        const now = Date.now();

                        const last1Day = msgs.filter(
                            (msg) => now - msg.createdTimestamp < ms('1d')
                        ).size;

                        const last2Days = msgs.filter(
                            (msg) => now - msg.createdTimestamp < ms('2d')
                        ).size;

                        const last3Days = msgs.filter(
                            (msg) => now - msg.createdTimestamp < ms('3d')
                        ).size;

                        const last4Days = msgs.filter(
                            (msg) => now - msg.createdTimestamp < ms('4d')
                        ).size;

                        const last5Days = msgs.filter(
                            (msg) => now - msg.createdTimestamp < ms('5d')
                        ).size;

                        const last6Days = msgs.filter(
                            (msg) => now - msg.createdTimestamp < ms('6d')
                        ).size;

                        const last7Days = msgs.filter(
                            (msg) => now - msg.createdTimestamp < ms('7d')
                        ).size;


                        // Graph Data
                        const colors = {
                            purple: {
                                default: "rgba(149, 76, 233, 1)",
                                half: "rgba(149, 76, 233, 0.5)",
                                quarter: "rgba(149, 76, 233, 0.25)",
                                zero: "rgba(149, 76, 233, 0)"
                            },
                            indigo: {
                                default: "rgba(80, 102, 120, 1)",
                                quarter: "rgba(80, 102, 120, 0.25)"
                            }
                        };

                        const msgsData = [
                            last7Days,
                            last6Days,
                            last5Days,
                            last4Days,
                            last3Days,
                            last2Days,
                            last1Day,
                        ];
                        const labels = [
                            'Last Week',
                            'Last 6 Days',
                            'Last 5 Days',
                            'Last 4 Days',
                            'Last 3 Days',
                            'Last 2 Days',
                            'Last 1 Day',
                        ];

                        /**
                         * Generates a canvas for the chart
                         */
                        const canvas = new ChartJSNodeCanvas(
                            {
                                width: 1500,
                                height: 720,
                                plugins: {
                                    modern: [require('chartjs-plugin-gradient')],
                                },
                                chartCallback: (ChartJS) => { },
                            }
                        );

                        /**
                         * Generates chart configuration
                         */
                        const chartConfig = generateChartConfig(
                            {
                                type: "line",
                                data: {
                                    labels: labels,
                                    datasets: [
                                        {
                                            label: 'Messages',
                                            fill: true,
                                            gradient: {
                                                backgroundColor: {
                                                    axis: 'y',
                                                    colors: {
                                                        0: colors.purple.zero,
                                                        100: colors.purple.quarter,
                                                    },
                                                },
                                            },
                                            pointBackgroundColor: colors.purple.default,
                                            borderColor: colors.purple.default,
                                            data: msgsData,
                                            lineTension: 0.4,
                                            borderWidth: 2,
                                            pointRadius: 3
                                        },
                                    ],
                                },
                                options: {
                                    layout: {
                                        padding: 10
                                    },
                                    responsive: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        }
                                    },
                                    scales: {
                                        xAxes: {
                                            gridLines: {
                                                display: false
                                            },
                                            ticks: {
                                                padding: 10,
                                                autoSkip: false,
                                                maxRotation: 0,
                                                minRotation: 0
                                            }
                                        },
                                        yAxes: {
                                            scaleLabel: {
                                                display: true,
                                                labelString: "Messages",
                                                padding: 10
                                            },
                                            gridLines: {
                                                display: true,
                                                color: colors.indigo.quarter
                                            },
                                            ticks: {
                                                beginAtZero: false,
                                                max: 63,
                                                min: 57,
                                                padding: 10
                                            }
                                        }
                                    }
                                },
                                plugins: [
                                    {
                                        id: 'mainBg',
                                        beforeDraw: (chart) => {
                                            const ctx = chart.canvas.getContext('2d');
                                            ctx.save();
                                            ctx.globalCompositeOperation = 'destination-over';
                                            ctx.fillStyle = '#192027';
                                            ctx.fillRect(0, 0, chart.width, chart.height);
                                            ctx.restore();
                                        }
                                    },
                                ],
                            }
                        )

                        const image = await canvas.renderToBuffer(chartConfig);
                        const attachment = new AttachmentBuilder(image, { name: 'chart.png' });

                        // Info Embed
                        const Response = new EmbedBuilder()
                            .setColor(`#954CE9`) // ${colors.purple.default}
                            .setAuthor({
                                name: `${guild.name} Canal Informacion`,
                                iconURL: guild.iconURL({
                                    dynamic: true,
                                    size: 512,
                                }),
                            })
                            .setTitle(`Canal Info:`)
                            .addFields({
                                name: "GENERAL:",
                                value:
                                    `
                             **\`•\` Name**: ${channel}
                             **\`•\` Description**: ${channel.topic || `Ninguno`}
                             **\`•\` ID**: ${channel.id}
                             **\`•\` Category**: ${channel.parentId ? `${channel.parent.name}` : `Ninguno`}
                             **\`•\` Type**: ${channelTypes[channel.type] || `Ninguno`}
                             **\`•\` Position**: ${channel.position}
                             **\`•\` NSFW**: ${channel.nsfw ? "Yes" : "No"} 
                             **\`•\` Created**: <t:${parseInt(channel.createdTimestamp / 1000)}:R>
                             ㅤ
                             `
                            }, {
                                name: "THREADS: ",
                                value:
                                    `
                             **\`•\` Active Threads**: ${channel.threads.cache.size || `Ninguno`}
                             ㅤ
                             `
                            }, {
                                name: "WEBHOOKS: ",
                                value:
                                    `
                             **\`•\` Total Webhooks**: ${webhookArray || `Ninguno`}
                             ㅤ
                             `
                            })
                            .setImage('attachment://chart.png')
                            .setFooter({ text: "Comandos de Estado de Servidores de Discord" }).setTimestamp();

                        await interaction.deferReply();
                        await interaction.editReply({
                            embeds: [Response],
                            files: [attachment],
                        });

                    } else {

                        const vcmember = channel.members;
                        const memberArray = vcmember.size;

                        const Response = new EmbedBuilder()
                            .setColor(`#5865F2`)
                            .setAuthor({
                                name: `${guild.name} Canales Informacion`,
                                iconURL: guild.iconURL({
                                    dynamic: true,
                                    size: 512,
                                }),
                            })
                            .setTitle(`Canal Info:`)
                            .addFields({
                                name: "<:flechaderlong:1026467692997255229> GENERAL:",
                                value:
                                    `
                             **\`•\` Name**: ${channel.name}
                             **\`•\` Description**: ${channel.topic || `Ninguno`}
                             **\`•\` ID**: ${channel.id}
                             **\`•\` Category**: ${channel.parentId ? `${channel.parent.name}` : `Ninguno`}
                             **\`•\` Type**: ${channelTypes[channel.type] || `Ninguno`}
                             **\`•\` Position**: ${channel.position}
                             **\`•\` Created**: ${moment(channel.createdAt).format("MMMM Do YYYY")} (${moment(channel.createdAt).startOf("day").fromNow()})
                             ㅤ
                             `
                            }, {
                                name: "<:flechaderlong:1026467692997255229> VC: ",
                                value:
                                    `
                             **\`•\` Members**: ${memberArray || `Ninguno`}
                             **\`•\` Max Members**: ${channel.userLimit || `Ninguno`}
                             **\`•\` Bitrate**: ${channel.bitrate || `Ninguno`}
                             ㅤ
                             `
                            })
                            .setFooter({ text: "Comandos de Estado de Servidores de Discord" }).setTimestamp();
                        interaction.reply({
                            embeds: [Response],
                        });
                    }
                }
                    break;
            };
        } catch (err) {
            console.log(err);
        };
    },
}
