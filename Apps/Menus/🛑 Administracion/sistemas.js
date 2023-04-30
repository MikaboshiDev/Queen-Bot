const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const chalk = require("chalk");
const Discord = require("discord.js");
const { readdirSync } = require("fs");

const reseñas = require("../../../Model/servidor/reseñas");
const roleSchema = require("../../../Model/verificacion/verificationSchema");
const conteo = require("../../../Model/conteo/conteoDB");
const Schema = require(`${process.cwd()}/Model/servidor/antiraid`);
const Schemas = require(`${process.cwd()}/Model/servidor/antialts.js`);
const bienvenidas = require("../../../Model/bienvenidas/joinsDB");
const despedidas = require("../../../Model/bienvenidas/leaveDB");
const SuggestionSetup = require("../../../Model/sugerencia/suggestionSetup");
const ticketSchema = require("../../../Model/tickets/ticketsSchema");
const antispamDB = require("../../../Model/antispam/antispamDB");

module.exports = {
    permission: ["Administrator"],
    id: "Configuraciones_Sistemas",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.values.includes('first_option')) {

            const guild = interaction.guild;

            guild.channels.create({
                name: "📢・general",
                type: ChannelType.GuildText,
                topic: `Bienvenido al Chat General: Fecha: ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}!`
            }).catch((error) =>
                console.log(chalk.yellowBright("[Botones]") + ` No se pudo crear el canal de general en el servidor ${guild.name} el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));

            guild.channels.create({
                name: "🌊・comandos",
                type: ChannelType.GuildText,
                topic: `Bienvenido a los Comandos: Fecha: ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}!`
            }).catch((error) =>
                console.log(chalk.yellowBright("[Botones]") + ` No se pudo crear el canal de comandos en el servidor ${guild.name} el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));

            guild.channels.create({
                name: "⭐・multimedia",
                type: ChannelType.GuildText,
                topic: `Bienvenido a Multimedia: Fecha: ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}!`
            }).catch((error) =>
                console.log(chalk.yellowBright("[Botones]") + ` No se pudo crear el canal de multimedia en el servidor ${guild.name} el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));

            const o = new Discord.EmbedBuilder()
                .setTitle("Configuracion del Servidor")
                .setDescription("Se termino de crear 3 canales de texto de forma correcta, si no se crearon los canales de forma correcta, intente crearlos manualmente.")
                .addFields(
                    {
                        name: "\`•\` Detalles de Sistema",
                        value: `> » Estos son los Datalles de Generacion:\n\n> » **Fecha:** \`${new Date().toLocaleDateString()}\`\n> » **Hora:** \`${new Date().toLocaleTimeString()}\`\n> » **Servidor:** ${guild.name} (\`${guild.id}\`)\n> » **Tiempo Generado:** \`${Date.now() - interaction.createdTimestamp}ms\``
                    },
                    {
                        name: "\`•\` Canal Generados",
                        value: `> » Los siguientes canales fueron generados en el Servidor:\n> » General (\`GuildText ${guild.id}\`)\n> » Comandos (\`GuildText ${guild.id}\`)\n> » Multimedia (\`GuildText ${guild.id}\`)\``
                    }
                )
                .setColor("Random")
                .setFooter({
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setTimestamp();

            interaction.reply({ embeds: [o], ephemeral: true }).catch((error) => { });
        } else if (interaction.values.includes('second_option')) {
            const e = new Discord.EmbedBuilder()
                .setTitle("🔒 Lockall - Lockear todos los canales")
                .setDescription("*Estas en el Sistema de Lockedall del Servidor estas seguro de querer bloquear todos los canales del servidor?*")
                .setThumbnail(client.user.displayAvatarURL())
                .setColor("Random")
                .setFooter({
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setTimestamp()

            const i = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("lockall")
                        .setEmoji("1028005786112245770")
                        .setLabel("Aceptar")
                        .setStyle(Discord.ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                        .setCustomId("lockall_off")
                        .setEmoji("1030716002259980318")
                        .setLabel("Cancelar")
                        .setStyle(Discord.ButtonStyle.Danger),
                    new Discord.ButtonBuilder()
                        .setCustomId("lockall_desactivar")
                        .setEmoji("1026468389675335760")
                        .setLabel("Desactivar")
                        .setStyle(Discord.ButtonStyle.Secondary),
                );

            interaction.reply({ embeds: [e], components: [i], ephemeral: true }).catch((error) => { });

            const filter = (i) => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
            collector.on("collect", async (i) => {
                if (i.customId === "lockall") {
                    interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).forEach((channel) => {
                        channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                            SendMessages: false,
                            AddReactions: false,
                            EmbedLinks: false,
                        });
                    });
                    interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).forEach((channel) => {
                        channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                            Speak: false,
                            Connect: false,
                        });
                    });
                    i.update({ embeds: [e.setDescription("*Se han bloqueado todos los canales del servidor de forma correcta*")], components: [] }).catch((error) => { });
                } else if (i.customId === "lockall_off") {
                    i.update({ embeds: [e.setDescription("*Se han cancelado el sistema de lockall en el servidor de forma axitosa*")], components: [] }).catch((error) => { });
                } else if (i.customId === "lockall_desactivar") {
                    interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).forEach((channel) => {
                        channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                            SendMessages: true,
                            AddReactions: true,
                            EmbedLinks: true,
                        });
                    });
                    interaction.guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).forEach((channel) => {
                        channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                            Speak: true,
                            Connect: true,
                        });
                    });
                    i.update({ embeds: [e.setDescription("*Se han desactivado todos los canales del servidor de forma correcta*")], components: [] }).catch((error) => { });
                }
            })
        } else if (interaction.values.includes('third_option')) {
            let check_reseñas = await reseñas.findOne({ guildId: interaction.guild.id });
            let check_verificacion = await roleSchema.findOne({ guildId: interaction.guild.id });
            let check_conteo = await conteo.findOne({ guildId: interaction.guild.id });
            let check_antiraid = await Schema.findOne({ guildID: interaction.guild.id });
            let check_antialts = await Schemas.findOne({ guildID: interaction.guild.id });
            let check_bienvenidas = await bienvenidas.findOne({ ServidorID: interaction.guild.id });
            let check_despedidas = await despedidas.findOne({ ServidorID: interaction.guild.id });
            let check_sugerencias = await SuggestionSetup.findOne({ guildID: interaction.guild.id });
            let check_tickets = await ticketSchema.findOne({ guildId: interaction.guild.id });
            let check_antispam = await antispamDB.findOne({ ServidorID: interaction.guild.id });

            const i = new Discord.EmbedBuilder()
                .setTitle("Configuración de Sistemas Publicos")
                .setDescription(`\`👑\`**Servidor:** ${interaction.guild.name} (\`${interaction.guild.id}\`)\n\`🍃\`**Canal:** ${interaction.channel} (\`${interaction.channel.id}\`)\n\nA continuacion tienes una lista de los sistemas publicos que puedes configurar en tu servidor, para configurarlos solo tienes hacer uso de los comandos de / que dispone el bot`)
                .addFields(
                    {
                        name: "\`•\` Reseñas",
                        value: `${check_reseñas ? `**Estado:** \`Activado\`\n> » Canal: <#${check_reseñas.channelID}> (\`${check_reseñas.channelID}\`)\n> » ${interaction.createdAt}ms` : "**Estado:** \`Desactivado\`"}`,
                    },
                    {
                        name: "\`•\` Verificación",
                        value: `${check_verificacion ? `**Estado:** \`Activado\`\n> » Rol: <@&${check_verificacion.roleId}> (\`${check_verificacion.roleId}\`)` : "**Estado:** \`Desactivado\`"}`,
                    },
                    {
                        name: "\`•\` Conteo",
                        value: `${check_conteo ? `**Estado:** \`Activado\`\n> » Canal: <#${check_conteo.channelId}> (\`${check_conteo.channelId}\`)\n> » ${interaction.createdAt}ms` : "**Estado:** \`Desactivado\`"}`,
                    },
                    {
                        name: "\`•\` AntiRaid",
                        value: `${check_antiraid ? `**Estado:** \`Activado\`\n> » Accion: Nadie puede entrar mientras este activado` : "**Estado:** \`Desactivado\`"}`,
                    },
                    {
                        name: "\`•\` AntiAlts",
                        value: `${check_antialts ? `**Estado:** \`Activado\`\n> » Accion: Toda cuenta con misma id en el servidor es baneada` : "**Estado:** \`Desactivado\`"}`,
                    },
                    {
                        name: "\`•\` Bienvenidas",
                        value: `${check_bienvenidas ? `**Estado:** \`Activado\`\n> » Canal: <#${check_bienvenidas.CanalID}> (\`${check_bienvenidas.CanalID}\`)\n> » Rol: ${check_bienvenidas.RolID ? `<@&${check_bienvenidas.RolID}> (\`${check_bienvenidas.RolID}\`)` : `Sin Seleccionar`}\n> » Imagen: ${check_bienvenidas.Imagen}\n> » ${interaction.createdAt}ms` : "**Estado:** \`Desactivado\`"}`,
                    },
                    {
                        name: "\`•\` Despedidas",
                        value: `${check_despedidas ? `**Estado:** \`Activado\`\n> » Canal: <#${check_despedidas.CanalID}> (\`${check_despedidas.CanalID}\`)\n> » Imagen: ${check_despedidas.Imagen}\n> » ${interaction.createdAt}ms` : "**Estado:** \`Desactivado\`"}`,
                    },
                    {
                        name: "\`•\` Sugerencias",
                        value: `${check_sugerencias ? `**Estado:** \`Activado\`\n> » Canal: <#${check_sugerencias.SuggestChannel}> (\`${check_sugerencias.SuggestChannel}\`)\n> » Rol: <@&${check_sugerencias.ManagerRole}> (\`${check_sugerencias.ManagerRole}\`)\n> » Aceptar: \`${check_sugerencias.AcceptColor}\`\n> » Rechazar: \`${check_sugerencias.DeclineColor}\`` : "**Estado:** \`Desactivado\`"}`,
                    },
                    {
                        name: "\`•\` Tickets",
                        value: `${check_tickets ? `**Estado:** \`Activado\`\n> » Canal: <#${check_tickets.channelId}> (\`${check_tickets.channelId}\`)\n> » Rol: <@&${check_tickets.supportId}> (\`${check_tickets.supportId}\`)\n> » Logs: <#${check_tickets.logsId}> (\`${check_tickets.logsId}\`)` : "**Estado:** \`Desactivado\`"}`,
                    },
                    {
                        name: "\`•\` AntiSpam",
                        value: `${check_antispam ? `**Estado:** \`Activado\`\n> » Canal: <#${check_antispam.CanalID}> (\`${check_antispam.CanalID}\`)\n> » Imagen: ${check_antispam.Imagen}\n> » Tiempo: ${check_antispam.Tiempo}` : "**Estado:** \`Desactivado\`"}`,
                    },
                )
                .setColor("Random")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setTimestamp()
                .setFooter({
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                });

            const o = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("comandos")
                        .setLabel("Comandos de Configuracion")
                        .setStyle(Discord.ButtonStyle.Secondary)
                        .setEmoji("📜")
                );

            interaction.reply({ embeds: [i], components: [o], ephemeral: true }).catch((error) => { });
            const filter = (button) => button.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on("collect", async (button) => {
                if (button.customId === "comandos") {
                    const comandos9 = readdirSync(`./Commands/🎉 Setups`).filter((archivo) => archivo.endsWith(".js"));
                    const e = new Discord.EmbedBuilder()
                        .setTitle("Comandos de Configuracion")
                        .setDescription(comandos9.length >= 1 ? `>>> *${comandos9.map((comando) => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `No hay comandos en esta categoria`)
                        .setColor("Random")
                        .setTimestamp()
                        .setFooter({
                            text: "My Queen https://discord.gg/4Z7QZ7Y",
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        });

                    button.reply({ embeds: [e], ephemeral: true }).catch((error) => { });
                }
            });
        } else if (interaction.values.includes('fourth_option')) {
        var banlist = interaction.guild.bans.fetch();
        banlist.then(bans => {
            if (bans.size == 0) {
                interaction.reply(`<a:error:1030716002259980318> No hay baneados en este servidor de discord intente mas tarde`, { ephemeral: true });
            } else {
                const list = bans.map(ban => ban.user.username).slice(0, 60).join("\n\n> ✧ ");
                const motivo = bans.map(ban => ban.reason).slice(0, 60).join("\n\n> ✧ ");
                const fecha = bans.map(ban => ban.user.createdAt).slice(0, 60).join("\n\n> ✧ ");
                const executor = bans.map(ban => ban.user.id).slice(0, 60).join("\n\n");

                const embed = new Discord.EmbedBuilder()
                    .setTitle(`🔰 Lista de baneados de ${interaction.guild.name}`)
                    .addFields(
                        { name: "\`•\` Usuario", value: `> ✧ ${list}`, inline: true },
                        { name: "\`•\` ID", value: `${executor}`, inline: true },
                    )
                    .setColor("Random")
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                    .setFooter({
                        text: "My Queen https://discord.gg/4Z7QZ7Y",
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp();

                const boton = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setStyle(Discord.ButtonStyle.Danger)
                            .setLabel("Fechas Correspondientes")
                            .setCustomId("fechas")
                            .setEmoji("🔰"),
                        new Discord.ButtonBuilder()
                            .setStyle(Discord.ButtonStyle.Success)
                            .setLabel("Motivos Registrados")
                            .setCustomId("motivos")
                            .setEmoji("💬")
                    )

                if (embed > 2048) {
                    interaction.reply({ content: `<a:error:1030716002259980318> El contenido es muy largo para ser enviado en un embed del servidor`, ephemeral: true });
                }

                interaction.reply({ embeds: [embed], components: [boton], ephemeral: true }).catch((error) =>
                    interaction.editReply({ content: `<a:error:1030716002259980318> No se pudo enviar el embed del servidor, intente mas tarde o reportelo en mi servidor de soporte`, ephemeral: true }))

                const filter = (button) => button.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

                collector.on("collect", async (button) => {
                    if (button.customId == "fechas") {
                        const fechas = new Discord.EmbedBuilder()
                            .setTitle(`🔰 Fechas de baneados de ${interaction.guild.name}`)
                            .addFields(
                                { name: "\`•\` Fecha", value: `> ✧ ${fecha}`, inline: true },
                            )
                            .setColor("Random")
                            .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                            .setFooter({
                                text: "My Queen https://discord.gg/4Z7QZ7Y",
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                            })
                            .setTimestamp();

                        if (fechas > 2048) {
                            button.update({ content: `<a:error:1030716002259980318> El contenido es muy largo para ser enviado en un embed del servidor`, ephemeral: true });
                        }

                        button.update({ embeds: [fechas], components: [boton], ephemeral: true }).catch((error) =>
                            button.update({ content: `<a:error:1030716002259980318> No se pudo enviar el embed del servidor, intente mas tarde o reportelo en mi servidor de soporte`, ephemeral: true }))
                    }
                    if (button.customId === "motivos") {
                        const motivos = new Discord.EmbedBuilder()
                            .setTitle(`🔰 Motivos de baneados de ${interaction.guild.name}`)
                            .addFields(
                                { name: "\`•\` Motivo", value: `> ✧ ${motivo ? `${motivo}` : `<a:error:1030716002259980318> Sin Proporcionar`}`, inline: true },
                            )
                            .setColor("Random")
                            .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                            .setFooter({
                                text: "My Queen https://discord.gg/4Z7QZ7Y",
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                            })
                            .setTimestamp();

                        if (motivos > 2048) {
                            button.update({ content: `<a:error:1030716002259980318> El contenido es muy largo para ser enviado en un embed del servidor`, ephemeral: true });
                        }

                        button.update({ embeds: [motivos], components: [boton], ephemeral: true }).catch((error) =>
                            button.update({ content: `<a:error:1030716002259980318> No se pudo enviar el embed del servidor, intente mas tarde o reportelo en mi servidor de soporte`, ephemeral: true }))
                        }
                    })
                }
            })
        } else if (interaction.values.includes('fifth_option')) {
            const os = require("os");
            const versiones = require('../../../package.json');
            
            /* ----------[CPU Usage]---------- */
            const cpus = os.cpus();
            const cpu = cpus[0];

            // Accumulate every CPU times values
            const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);

            // Calculate the CPU usage
            const usage = process.cpuUsage();
            const currentCPUUsage = (usage.user + usage.system) * 1000;
            const perc = (currentCPUUsage / total) * 100;

            /* ----------[RAM Usage]---------- */

            /**Get the process memory usage (in MB) */
            async function getMemoryUsage() {
                return process.memoryUsage().heapUsed / (1024 * 1024).toFixed(2);
            }

            const startUsage = process.cpuUsage();
            const now = Date.now();
            while (Date.now() - now < 500);
            let userUsage = process.cpuUsage(startUsage).user / 1000;
            let sysUsage = process.cpuUsage(startUsage).system / 1000 || 0;
            const totalGuilds = client.guilds.cache.size;
            const totalMembers = client.users.cache.size;
            const totalChannel = client.channels.cache.size;

            const e = new Discord.EmbedBuilder()
                .setAuthor({
                    name: client.user.tag + " Information",
                    iconURL: client.user.displayAvatarURL()
                })
                .setDescription(`\`\`\`yml\nName: ${client.user.tag} [${client.user.id}]\nApi Latency: ${Math.round(client.ws.ping)}ms\nSystems: ${sysUsage}\nUser Usage: ${userUsage} MB\`\`\``)
                .setFooter({
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setColor("Random")
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    { name: "🤖 Comandos", value: `\`\`\`yml\nServidores: ${totalGuilds}\nUsuarios: ${totalMembers}\nCanales: ${totalChannel}\`\`\``, inline: true },
                    { name: `<a:Dashbord:1005732715112443974> Bot - Estadisticas`, value: `\`\`\`yml\nNode.js: ${process.version}\nDiscord.js: v${versiones.version}\nEnmap: v5.8.4\`\`\``, inline: true },
                    { name: `<a:config:1026467696453357658> Sistema - Estadisticas`, value: `\`\`\`yml\nOS: ${process.platform}\nCpu: ${(perc / 1000).toFixed(1)}%\nRam: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}%\nUptime: ${convertTime()}\`\`\`` },
                    { name: `<:topggAngry:1026468391709577226> Desarrollador`, value: `\`\`\`yml\nName: Qin Shi Huang#6966\nID: [442355791412854784]\`\`\`` },
                    { name: `<:panda_gift:1007529203119439882> Probador - Co-Owner`, value: `\`\`\`yml\nName: א Dust Killer א#1493\nID: [960012567747637259]\`\`\`` },
                    { name: `<a:InLove:1006999906969469019> Links Importantes`, value: `[**・Invitacion del Bot**](https://discord.com/api/oauth2/authorize?client_id=1001243010031423518&permissions=4398046511095&scope=bot%20applications.commands) [**・ Invitacion a Soporte**](https://discord.gg/EFz39MyDZn) [**・ Pagina Web Oficial**](https://studiodeveloper.online/)` }
                );

            interaction.reply({ embeds: [e], ephemeral: true }).catch((error) => { });

            function convertTime() {
                var uptime = process.uptime();
                console.log('Tiempo de Proceso:', uptime);
                const date = new Date(uptime * 1000);
                const days = date.getUTCDate() - 1,
                    hours = date.getUTCHours(),
                    minutes = date.getUTCMinutes(),
                    seconds = date.getUTCSeconds();

                let time = [];

                if (days > 0) time.push(days + ' day' + (days == 1 ? '' : 's'));
                if (hours > 0) time.push(hours + ' h' + (hours == 1 ? '' : 's'));
                if (minutes > 0) time.push(minutes + ' mn' + (minutes == 1 ? '' : 's'));
                if (seconds > 0) time.push(seconds + ' s'); // + (seconds == 1 ? '' : 's'));
                const dateString = time.join(', ');
                console.log('Fecha del Registro: ' + dateString);
                return dateString;
            }
        }
    }
}