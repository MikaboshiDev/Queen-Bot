const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");
const chalk = require("chalk");
const { createTranscript } = require("discord-html-transcripts");
const { loadButtons } = require(`../../../Handlers/Buttons`);
const { loadCommands } = require(`../../../Handlers/Commands`);
const { loadSelectMenus } = require(`../../../Handlers/SelectMenu`);
const { loadEvents } = require(`../../../Handlers/Events`);
const { loadModals } = require(`../../../Handlers/Modals`);
const moment = require('moment');
const osu = require('node-os-utils');
const os = require('os');
const fs = require(`fs`);
const Ascii = require("ascii-table");
const query = require('samp-query');
require('moment-duration-format');
const sourcebin = require("sourcebin_js");
module.exports = {
    developer: true,
    id: "Reinicio",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.values.includes('first_option')) {
            for (const [key, value] of client.events)
                client.removeListener(`${key}`, value, true);
            loadEvents(client);
            interaction.reply({ content: `<:check:1028717094453383229> Los eventos se han recargado correctamente en ${Date.now() - interaction.createdTimestamp}ms. Fecha de Registro: ${new Date().toLocaleDateString()} Eventos Recargados: (\`${client.events.size}\`)`, ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('second_option')) {
            loadCommands(client);
            interaction.reply({ content: `<:check:1028717094453383229> Los comandos se han recargado correctamente en ${Date.now() - interaction.createdTimestamp}ms. Fecha de Registro: ${new Date().toLocaleDateString()} Comandos Recargados: (\`${client.commands.size}\`)`, ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('third_option')) {
            loadModals(client);
            interaction.reply({ content: `<:check:1028717094453383229> Los modales se han recargado correctamente en ${Date.now() - interaction.createdTimestamp}ms. Fecha de Registro: ${new Date().toLocaleDateString()} Modals Recargados: (\`${client.modals.size}\`)`, ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes(`fourth_option`)) {
            loadSelectMenus(client);
            interaction.reply({ content: `<:check:1028717094453383229> Los selectmenus se han recargado correctamente en ${Date.now() - interaction.createdTimestamp}ms. Fecha de Registro: ${new Date().toLocaleDateString()} Menus Recargados: (\`${client.selectMenus.size}\`)`, ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes(`fifth_option`)) {
            loadButtons(client);
            interaction.reply({ content: `<:check:1028717094453383229> Los botones se han recargado correctamente en ${Date.now() - interaction.createdTimestamp}ms. Fecha de Registro: ${new Date().toLocaleDateString()} Botones Recargados: (\`${client.buttons.size}\`)`, ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes(`sixth_option`)) {
            const embed = new EmbedBuilder()
                .setTitle('🛑 Detener el bot')
                .setDescription('*¿Estas seguro de que quieres **detener** el bot completamente?*')
                .setColor('Random')
                .setFooter({ text: `Comandos de desarrollador Qin Bot` })
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('confirm')
                        .setEmoji(`✅`)
                        .setLabel('Confirmar')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('cancel')
                        .setEmoji(`🛑`)
                        .setLabel('Cancelar')
                        .setStyle(ButtonStyle.Danger))
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on('collect', async i => {
                if (i.customId === 'confirm') {
                    await i.update({ content: `<:check:1028717094453383229> Deteniendo el bot...`, components: [] });
                    await client.destroy();
                    process.exit();
                } else if (i.customId === 'cancel') {
                    await i.update({ content: `<:VS_cancel:1006609599199186974> Cancelado al 90%......`, components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
                }
            });
        } else if (interaction.values.includes(`seventh_option`)) {
            const embed = new EmbedBuilder()
                .setTitle('🛑 Reiniciar el bot')
                .setDescription('*¿Estas seguro de que quieres **reiniciar** el bot completamente?*')
                .setColor('Random')
                .setFooter({ text: `Comandos de desarrollador Qin Bot` })
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('confirm')
                        .setEmoji(`✅`)
                        .setLabel('Confirmar')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('cancel')
                        .setEmoji(`🛑`)
                        .setLabel('Cancelar')
                        .setStyle(ButtonStyle.Danger))
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on('collect', async i => {
                if (i.customId === 'confirm') {
                    await i.update({ content: 'Reiniciando el bot...', components: [] });
                    await client.destroy();
                    process.exit();
                } else if (i.customId === 'cancel') {
                    await i.update({ content: '<:VS_cancel:1006609599199186974> Cancelado al 90%......', components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
                }
            });
        } else if (interaction.values.includes(`eighth_option`)) {
            const reply = new EmbedBuilder()
                .setTitle(`Canal a sido guardado con exito`)
                .setDescription(`Saved chat : ${channel}`)
                .setColor("Red");

            try {
                const attachment = await createTranscript(channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${channel}.html`,
                });

                await interaction.reply({ embeds: [reply], files: [attachment], ephemeral: true }).catch((error) =>
                    console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
                console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(` Se ha usado el comando save en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
            } catch (e) {
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
                        .setDescription(`\`\`\`yml\n${e}\`\`\``)
                        .setColor("Random")
                        .setFooter({ text: `Error en el comando save` })], ephemeral: true
                })
                console.log(chalk.redBright(`[Error]`) + chalk.whiteBright(` Se ha usado el comando save en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
            }
        } else if (interaction.values.includes(`ninth_option`)) {
            const embed = new EmbedBuilder()
                .setTitle("Controls & Parametros 🎮")
                .setColor("Random")
                .setTimestamp()
                .setThumbnail(interaction.user.displayAvatarURL())
                .setDescription(`*Hola ${interaction.user} aqui tienes mi **informacion** actual y mi panel de informacion de mi **hosting y librerias** actuales cualquier error sera mandado al **canal asignado** anteriormente*`)
                .setFooter({ text: `Cualquier problema sera registrado en tiempo real` })
            const controls = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId("Parametros")
                    .setLabel("Parametros")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`🛠️`))
                .addComponents(new ButtonBuilder()
                    .setCustomId("Servidores")
                    .setLabel("Servidores")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(`🎧`))
            interaction.reply({ embeds: [embed], components: [controls], ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes(`tenth_option`)) {
            const embed = new EmbedBuilder()
                .setTitle(`Modulo de control para  __${interaction.user.tag}__`)
                .setColor("#ff0012")
                .setDescription(`guias y controles desarrollados: \`Qin Shi Huang 悟\``)
                .addFields(
                    { name: `<:Bot:1008444437057241198> **__¿ Mis Caracteristicas ?__**`, value: `Hola **${interaction.user}**, mi nombre es **__Vermiel Creadora__** ❤ Soy una bot que fue diseñeda y trabajada para el estudio de usuarios de mis servidores de discord y para su soporte. ❤ Espero nos llevemos bien juntos estudiando...❤\n 🎮 Gran cantidad de comandos de divercion y emociones activos\n 💻 Buenos comandos de estudio y informacion para tu servidor\n 🛡️ Comandos de moderacion que te ayudaran en tu servidor de discord\n 🔭 Con mas de +150 comandos para tu servidor y tus usuarios\n 📡 Un sistema de musica y de setups que seguido actualiza.` },
                    { name: `🛠️ **__¿ Como Funciono ?__**`, value: `Estas en mi modulo de control a continuacion encontraras un menu con modulos detallados de mi control y servidores en los que estoy prensente actualmente y los roles junto permisos que tengo en cada uno de ellos.` },
                    { name: `📈 **__Estadisticas__**`, value: `<:bot:1001191742789390417> con **30 Guias & Informaciones**\n👤 Desarollador **[Qin Shi Huang 悟#1017](https://discord.gg/tm6k4sWz)**` },
                    { name: `**__¿ Quieres mas ayuda ?__**`, value: `\`1. Manera\` *de usar los menus para cambiar de guias.*\n  \`2. Manera\` *Use el menú para seleccionar todas las páginas de ayuda que desea mostrar.*\n \`3. Manera\` *para ir a mi servidor de soporte.*` })
                .setThumbnail("https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg")
                .setFooter({ text: `Página 1 / © desarollado por Qin Shi Huang 悟 | 2022`, iconURL: `https://cdn.discordapp.com/attachments/1011459607660613692/1011869202589696040/e04c5daaf5ee55fd230c792fe830152c.jpg` });

            const Row = new ActionRowBuilder()
                .addComponents(new StringSelectMenuBuilder()
                    .setCustomId("Control")
                    .setPlaceholder("Selecciona una Categoria")
                    .addOptions(
                        { label: 'Servidores', description: 'En que servidores me encuentro actualmente', value: 'first_option' },
                        { label: 'You can select me too', description: 'This is also a description', value: 'second_option' },
                        { label: 'I am also an option', description: 'This is a description as well', value: 'third_option' }))

            interaction.reply({ embeds: [embed], components: [Row], ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes(`eleventh_option`)) {
            let ping = Date.now() - interaction.createdTimestamp;

            let cpuUsado;
            const cpu = osu.cpu;
            var mem = osu.mem;
            let freeRAM, usedRAM;

            await mem.info().then(info => {
                freeRAM = info['freeMemMb']
                usedRAM = info['totalMemMb'] - freeRAM
            });


            let values = {
                high: 200,
                medium: 100,
                low: 50
            };
            let status;
            if (ping > values.high) { status = 'Inestable' }
            else if (ping > values.medium) { status = 'Estable' }
            else { status = 'Excelente' };

            let dias = Math.floor(client.uptime / 86400000)
            let horas = Math.floor(client.uptime / 3600000) % 24
            let minutos = Math.floor(client.uptime / 60000) % 60
            let segundos = Math.floor(client.uptime / 1000) % 60

            const uptime = new EmbedBuilder()
                .setTitle(`Uptime Bot Developer`)
                .setDescription(`Timings Bot Online **${client.user.tag}**`)
                .addFields(
                    { name: `Dias:`, value: `\`\`\`prolog\n${dias} dias\`\`\`` },
                    { name: `Horas:`, value: `\`\`\`prolog\n${horas} horas\`\`\``, inline: true },
                    { name: `Minutos:`, value: `\`\`\`prolog\n${minutos} minutos\`\`\``, inline: true },
                    { name: `Segundos:`, value: `\`\`\`prolog\n${segundos} segundos\`\`\``, inline: true },
                    { name: `System: Intel`, value: `\`\`\`prolog\n${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB\`\`\`` },
                    { name: `Operative System: `, value: `\`\`\`prolog\n${os.type} ${os.release} ${os.arch}\`\`\`` },
                    { name: `Last Login:`, value: `\`\`\`prolog\n${moment(client.readyAt).format("DD [de] MMM YYYY HH:mm")}\`\`\`` },
                    { name: `Activitys Host:`, value: `\`\`\`prolog\n${moment.duration(os.uptime * 1000).format(`D [Días], H [Horas], m [Minutos], s [Segundos]`)}\`\`\`` },
                    { name: `Bot`, value: `\`\`\`prolog\n${moment.duration(client.uptime).format(`D [Días], H [Horas], m [Minutos], s [Segundos]`)}\`\`\`` },
                    { name: `Pings`, value: `\`\`\`prolog\n${status} | ${ping}ms\`\`\`` })
                .setImage("https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg")
                .setColor("Random")
                .setFooter({ text: `Timings Bot Developer Online` })
                .setTimestamp()

            interaction.reply({ embeds: [uptime] }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Developer] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes(`twelfth_option`)) {
            try {
                let list = "";
                client.guilds.cache.forEach((guild) => {
                    list += `${guild.name} (${guild.id}) | ${guild.memberCount} Members | Owner: ${guild.ownerId}\n`;
                });

                sourcebin
                    .create([
                        {
                            name: `Code by Ducko#7068`,
                            content: list,
                            languageId: "js",
                        },
                    ])
                    .then((src) => {
                        interaction.reply({
                            content: `My Server List - ${src.url}`,
                            ephemeral: true,
                        }).catch((error) =>
                            console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el slash [guild] en el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`))
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
                            .setFooter({ text: `Error en el comando sourcebin` }),
                    ],
                    ephemeral: true,
                }).catch((error) =>
                    console.log(chalk.cyanBright("[Slash]") + ` Se produjo un error en el slash [guild] en el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`))
            }
        }
    },
};