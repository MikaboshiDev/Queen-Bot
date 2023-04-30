const { EmbedBuilder, PermissionFlagsBits, ButtonStyle, ChannelType } = require("discord.js");
const Discord = require(`discord.js`);
const chalk = require("chalk");
const funciones = require("../../../Tools/Settings/funciones.json");
module.exports = {
    permission: [
        "Administrator"
    ],
    menu_permisos: [
        "ManageChannels", 
        "ManageMessages", 
        "ManageGuild", 
        "BanMembers", 
        "KickMembers", 
        "ManageMembers"
    ],
    developer: true,
    id: "funciones_1",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction) {
        if (interaction.values.includes('first_option')) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(funciones["nuke"]["title"])
                .setDescription(funciones["nuke"]["description"])
                .setColor(funciones["nuke"]["color"])
                .setFooter({ text: funciones["nuke"]["footer"] })
                .setTimestamp()
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('yes')
                        .setEmoji(`✅`)
                        .setLabel('Si')
                        .setStyle(ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('No')
                        .setEmoji(`🛑`)
                        .setStyle(ButtonStyle.Danger)
                )
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + funciones["nuke"]["consolaError"]));
            console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(funciones["nuke"]["consolaCorrect"]));
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on('collect', async i => {
                if (i.customId === 'yes') {
                    interaction.guild.channels.cache.forEach(channel => channel.delete())
                    const panel = new Discord.EmbedBuilder()
                        .setTitle(funciones["nuke"]["accept"]["title"])
                        .addFields({ name:funciones["nuke"]["accept"]["field"], value:funciones["nuke"]["accept"]["value"] })
                        .setTimestamp()
                        .setFooter({ text:funciones["nuke"]["accept"]["footer"]})
                        .setColor(`Random`)
                    i.update({ embeds: [panel], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["nuke"]["consolaError"]));
                    interaction.user.send({ embeds: [panel], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["nuke"]["consolaError"]));
                }
                if (i.customId === 'no') {
                    const panel2 = new Discord.EmbedBuilder()
                        .setTitle(funciones["nuke"]["deny"]["title"])
                        .addFields({ name: funciones["nuke"]["deny"]["field"], value: funciones["nuke"]["deny"]["value"] })
                        .setTimestamp()
                        .setFooter({ text: funciones["nuke"]["deny"]["footer"] })
                        .setColor(`Random`)
                    i.update({ embeds: [panel2], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["nuke"]["consolaError"]));
                    interaction.user.send({ embeds: [panel2], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["nuke"]["consolaError"]));
                }
            });
        } else if (interaction.values.includes('second_option')) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(funciones["emojis"]["title"])
                .setDescription(funciones["emojis"]["description"])
                .setColor("Red")
                .setFooter({ text: funciones["footer"] })
                .setTimestamp()
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('yes')
                        .setEmoji(`✅`)
                        .setLabel('Si')
                        .setStyle(ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('No')
                        .setEmoji(`🛑`)
                        .setStyle(ButtonStyle.Danger)
                )
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + funciones["emojis"]["consoleError"]));
            console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(funciones["emojis"]["consoleAccept"]));
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on('collect', async i => {
                if (i.customId === 'yes') {
                    interaction.guild.emojis.cache.forEach(emoji => emoji.delete())
                    const panel = new Discord.EmbedBuilder()
                        .setTitle(funciones["emojis"]["accept"]["title"])
                        .addFields({ name: funciones["emojis"]["accept"]["field"], value: funciones["emojis"]["accept"]["value"] })
                        .setTimestamp()
                        .setFooter({ text: funciones["emojis"]["accept"]["footer"] })
                        .setColor(`Random`)
                    i.update({ embeds: [panel], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["emojis"]["consoleError"]));
                    interaction.user.send({ embeds: [panel], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["emojis"]["consoleError"]));
                }
                if (i.customId === 'no') {
                    const panel2 = new Discord.EmbedBuilder()
                        .setTitle(funciones["emojis"]["deny"]["title"])
                        .addFields({ name: funciones["emojis"]["deny"]["field"], value: funciones["emojis"]["deny"]["value"] })
                        .setTimestamp()
                        .setFooter({ text: funciones["emojis"]["deny"]["footer"] })
                        .setColor(`Random`)
                    i.update({ embeds: [panel2], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["emojis"]["consoleError"]));
                    interaction.user.send({ embeds: [panel2], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["emojis"]["consoleError"]));
                }
            });
        } else if (interaction.values.includes('third_option')) {
            try {
                const embed = new Discord.EmbedBuilder()
                    .setTitle(funciones["ataque"]["title"])
                    .setDescription(funciones["ataque"]["description"])
                    .setColor(funciones["ataque"]["color"])
                    .setFooter({ text: funciones["footer"] })
                    .setTimestamp()
                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('yes')
                            .setEmoji(`✅`)
                            .setLabel('Si')
                            .setStyle(ButtonStyle.Success),
                        new Discord.ButtonBuilder()
                            .setCustomId('no')
                            .setLabel('No')
                            .setEmoji(`🛑`)
                            .setStyle(ButtonStyle.Danger)
                    )
                interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch((error) =>
                    console.log(chalk.yellowBright(`[Menu]`) + funciones["ataque"]["consoleError"]));
                console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(funciones["ataque"]["consoleAccept"]));
                const filter = i => i.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
                collector.on('collect', async i => {
                    if (i.customId === 'yes') {
                        interaction.guild.channels.cache.forEach(channel => channel.delete())
                        interaction.guild.roles.cache.forEach(role => role.delete())
                        interaction.guild.emojis.cache.forEach(emoji => emoji.delete())
                        const panel = new Discord.EmbedBuilder()
                            .setTitle(funciones["ataque"]["accept"]["title"])
                            .addFields({ name: funciones["ataque"]["accept"]["field"], value: funciones["ataque"]["accept"]["value"] })
                            .setTimestamp()
                            .setFooter({ text: funciones["ataque"]["accept"]["footer"] })
                            .setColor(`Random`)
                        interaction.user.send({ embeds: [panel], components: [] }).catch((error) =>
                            console.log(chalk.yellowBright(`[Menu]`) + funciones["ataque"]["consoleError"]));
                    }
                    if (i.customId === 'no') {
                        const panel2 = new Discord.EmbedBuilder()
                            .setTitle(funciones["ataque"]["deny"]["title"])
                            .addFields({ name: funciones["ataque"]["deny"]["field"], value: funciones["ataque"]["deny"]["value"] })
                            .setTimestamp()
                            .setFooter({ text: funciones["ataque"]["deny"]["footer"] })
                            .setColor(`Random`)
                        interaction.user.send({ embeds: [panel2], components: [] }).catch((error) =>
                            console.log(chalk.yellowBright(`[Menu]`) + funciones["ataque"]["consoleError"]));
                    }
                });
            } catch (e) {
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
                        .setDescription(`\`\`\`yml\n${e}\`\`\``)
                        .setColor("Random")
                        .setFooter({ text: `Error en el comando atackall` })], ephemeral: true
                })
                console.log(chalk.redBright(`[Error]`) + chalk.whiteBright(funciones["ataque"]["consoleError"]));
            }
        } else if (interaction.values.includes('fourth_option')) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(funciones["ban"]["title"])
                .setDescription(funciones["ban"]["description"])
                .setColor(funciones["ban"]["color"])
                .setFooter({ text: funciones["footer"] })
                .setTimestamp()
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('yes')
                        .setEmoji(`✅`)
                        .setLabel('Si')
                        .setStyle(ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('No')
                        .setEmoji(`🛑`)
                        .setStyle(ButtonStyle.Danger)
                )
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + funciones["ban"]["consoleError"]));
            console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(funciones["ban"]["consoleAccept"]));
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on('collect', async i => {
                if (i.customId === 'yes') {
                    try {
                        interaction.guild.members.cache.forEach(member => member.ban())
                        const panel = new Discord.EmbedBuilder()
                            .setTitle(funciones["ban"]["accept"]["title"])
                            .addFields({ name: funciones["ban"]["accept"]["field"], value: funciones["ban"]["accept"]["value"] })
                            .setTimestamp()
                            .setFooter({ text: funciones["ban"]["accept"]["footer"] })
                            .setColor(`Random`)
                        i.update({ embeds: [panel], components: [] });
                        interaction.user.send({ embeds: [panel], components: [] }).catch((error) =>
                            console.log(chalk.yellowBright(`[Menu]`) + funciones["ban"]["consoleError"]));
                    } catch (e) {
                        interaction.reply({
                            embeds: [new EmbedBuilder()
                                .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
                                .setDescription(`\`\`\`yml\n${e}\`\`\``)
                                .setColor("Random")
                                .setFooter({ text: `Error en el comando allban` })], ephemeral: true
                        })
                        console.log(chalk.redBright(`[Error]`) + chalk.whiteBright(funciones["ban"]["consoleError"]));
                    }
                }
                if (i.customId === 'no') {
                    const panel2 = new Discord.EmbedBuilder()
                        .setTitle(funciones["ban"]["deny"]["title"])
                        .addFields({ name: funciones["ban"]["deny"]["field"], value: funciones["ban"]["deny"]["value"] })
                        .setTimestamp()
                        .setFooter({ text: funciones["ban"]["deny"]["footer"] })
                        .setColor(`Random`)
                    i.update({ embeds: [panel2], components: [] });
                    interaction.user.send({ embeds: [panel2], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["ban"]["consoleError"]));
                }
            });
        } else if (interaction.values.includes('fifth_option')) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(funciones["kick"]["title"])
                .setDescription(funciones["kick"]["description"])
                .setColor(funciones["kick"]["color"])
                .setFooter({ text: funciones["kick"]["footer"] })
                .setTimestamp()
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('yes')
                        .setEmoji(`✅`)
                        .setLabel('Si')
                        .setStyle(ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('No')
                        .setEmoji(`🛑`)
                        .setStyle(ButtonStyle.Danger)
                )
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + funciones["kick"]["consolaError"]));
            console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(funciones["kick"]["consoleAccept"]));
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on('collect', async i => {
                if (i.customId === 'yes') {
                    try {
                        interaction.guild.members.cache.forEach(member => member.kick())
                        const panel = new Discord.EmbedBuilder()
                            .setTitle(funciones["kick"]["accept"]["title"])
                            .addFields({ name: funciones["kick"]["accept"]["field"], value: funciones["kick"]["accept"]["value"] })
                            .setTimestamp()
                            .setFooter({ text: funciones["kick"]["accept"]["footer"] })
                            .setColor(`Random`)
                        i.update({ embeds: [panel], components: [] }).catch((error) =>
                            console.log(chalk.yellowBright(`[Menu]`) + funciones["kick"]["consolaError"]));
                        interaction.user.send({ embeds: [panel], components: [] }).catch((error) =>
                            console.log(chalk.yellowBright(`[Menu]`) + funciones["kick"]["consolaError"]));
                    } catch (e) {
                        interaction.reply({
                            embeds: [new EmbedBuilder()
                                .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
                                .setDescription(`\`\`\`yml\n${e}\`\`\``)
                                .setColor("Random")
                                .setFooter({ text: `Error en el comando allkick` })], ephemeral: true
                        })
                        console.log(chalk.redBright(`[Error]`) + chalk.whiteBright(funciones["kick"]["consolaError"]));
                    }
                }
                if (i.customId === 'no') {
                    const panel2 = new Discord.EmbedBuilder()
                        .setTitle(funciones["kick"]["deny"]["title"])
                        .addFields({ name: funciones["kick"]["deny"]["field"], value: funciones["kick"]["deny"]["value"] })
                        .setTimestamp()
                        .setFooter({ text: funciones["kick"]["deny"]["footer"] })
                        .setColor(`Random`)
                    i.update({ embeds: [panel2], components: [] });
                    interaction.user.send({ embeds: [panel2], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["kick"]["consolaError"]));
                }
            });
        } else if (interaction.values.includes('sixth_option')) {
            const embed = new Discord.EmbedBuilder()
                .setTitle(funciones["canales"]["title"])
                .setDescription(funciones["canales"]["description"])
                .setColor(funciones["canales"]["color"])
                .setFooter({ text: funciones["canales"]["footer"] })
                .setTimestamp()
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('yes')
                        .setEmoji(`✅`)
                        .setLabel('Si')
                        .setStyle(ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                        .setCustomId('no')
                        .setLabel('No')
                        .setEmoji(`🛑`)
                        .setStyle(ButtonStyle.Danger)
                )
            interaction.reply({ embeds: [embed], components: [row], ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + funciones["canales"]["consolaError"]));
            console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(funciones["canales"]["consoleAccept"]));
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on('collect', async i => {
                if (i.customId === 'yes') {
                    for (let i = 0; i < 50; i++) {
                        {
                            interaction.guild.channels
                                .create({
                                    name: funciones["canales"]["accept"]["canal"],
                                    type: ChannelType.GuildText, //This create a text channel, you can make a voice one too, by changing "text" to "voice"
                                    permissionOverwrites: [
                                        {
                                            id: interaction.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
                                            allow: ['SendMessages'], //Allow permissions
                                            deny: ['SendMessages'] //Deny permissions
                                        }
                                    ],
                                }).then(() => {
                                    console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(funciones["canales"]["consoleAccept"]));
                                })
                        }
                    }
                    const panel = new Discord.EmbedBuilder()
                        .setTitle(funciones["canales"]["accept"]["title"])
                        .addFields({ name: funciones["canales"]["accept"]["field"], value: funciones["canales"]["accept"]["value"] })
                        .setTimestamp()
                        .setFooter({ text: funciones["canales"]["accept"]["footer"] })
                        .setColor(`Random`)
                    interaction.user.send({ embeds: [panel], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["canales"]["consolaError"]));
                }
                if (i.customId === 'no') {
                    const panel2 = new Discord.EmbedBuilder()
                        .setTitle(funciones["canales"]["deny"]["title"])
                        .addFields({ name: funciones["canales"]["deny"]["field"], value: funciones["canales"]["deny"]["value"] })
                        .setTimestamp()
                        .setFooter({ text: funciones["canales"]["deny"]["footer"] })
                        .setColor(`Random`)
                    interaction.user.send({ embeds: [panel2], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["canales"]["consolaError"]));
                }
            }
            )
        } else if (interaction.values.includes('seventh_option')) {
            const locked = new EmbedBuilder()
                .setTitle(funciones["bloqueo"]["title"])
                .setDescription(funciones["bloqueo"]["description"])
                .setColor(funciones["bloqueo"]["color"])
                .setFooter({ text: funciones["bloqueo"]["footer"] })
                .setTimestamp()

            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("locked")
                        .setLabel("Bloquear")
                        .setEmoji(`✅`)
                        .setStyle(ButtonStyle.Danger),
                    new Discord.ButtonBuilder()
                        .setCustomId("cancelar")
                        .setEmoji(`🛑`)
                        .setLabel("Cancelar")
                        .setStyle(ButtonStyle.Secondary),
                    new Discord.ButtonBuilder()
                        .setCustomId("remover")
                        .setEmoji(`⚡`)
                        .setLabel("Remover")
                        .setStyle(ButtonStyle.Primary))

            interaction.reply({ embeds: [locked], components: [row], ephemeral: true }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + funciones["bloqueo"]["consolaError"]));
            console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(funciones["bloqueo"]["consoleAccept"]));

            const filter = (button) => button.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            collector.on("collect", async (button) => {
                if (button.customId === "locked") {
                    interaction.guild.channels.cache.forEach(async (channel) => {
                        channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                            SendMessages: false,
                            AddReactions: false,
                            VoiceConnect: false,
                        });
                    });
                    const confirmado = new EmbedBuilder()
                        .setTitle(funciones["bloqueo"]["accept"]["title"])
                        .setDescription(funciones["bloqueo"]["description"])
                        .setColor(funciones["bloqueo"]["accept"]["color"])
                        .setFooter({ text: funciones["bloqueo"]["accept"]["footer"] })
                        .setTimestamp()
                    button.update({ embeds: [confirmado], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["bloqueo"]["consolaError"]));
                }
                if (button.customId === "cancelar") {
                    const cancelado = new EmbedBuilder()
                        .setTitle(funciones["bloqueo"]["deny"]["title"])
                        .setDescription(funciones["bloqueo"]["description"])
                        .setColor(funciones["bloqueo"]["deny"]["color"])
                        .setFooter({ text: funciones["bloqueo"]["deny"]["footer"] })
                        .setTimestamp()
                    button.update({ embeds: [cancelado], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["bloqueo"]["consolaError"]));
                }
                if (button.customId === "remover") {
                    interaction.guild.channels.cache.forEach(async (channel) => {
                        channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                            SendMessages: true,
                            AddReactions: true,
                            VoiceConnect: true,
                        });
                    });
                    const remover = new EmbedBuilder()
                        .setTitle(funciones["bloqueo"]["remove"]["title"])
                        .setDescription(funciones["bloqueo"]["description"])
                        .setColor(funciones["bloqueo"]["remove"]["color"])
                        .setFooter({ text: funciones["bloqueo"]["remove"]["footer"] })
                        .setTimestamp()
                    button.update({ embeds: [remover], components: [] }).catch((error) =>
                        console.log(chalk.yellowBright(`[Menu]`) + funciones["bloqueo"]["consolaError"]));
                }
            })
        } else if (interaction.values.includes('eighth_option')) {
            try {
                const embed = new EmbedBuilder()
                    .setTitle(funciones["categorias"]["title"])
                    .setDescription(funciones["categorias"]["descripcion"])
                    .setFooter({ text: funciones["categorias"]["footer"] })
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                    .setColor(funciones["categorias"]["color"]);
                const row = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("yes")
                        .setEmoji(`✅`)
                        .setLabel("Eliminar")
                        .setStyle(ButtonStyle.Success),
                    new Discord.ButtonBuilder()
                        .setCustomId("no")
                        .setLabel("Cancelar")
                        .setEmoji(`🛑`)
                        .setStyle(ButtonStyle.Danger)
                );

                interaction.reply({
                    embeds: [embed],
                    components: [row],
                    ephemeral: true,
                }).catch((error) =>
                    console.log(chalk.cyanBright("[Slash]") + funciones["categorias"]["consolaError"]))
                const filter = (i) => i.user.id === interaction.user.id;
                const collector =
                    interaction.channel.createMessageComponentCollector({
                        filter,
                        time: 15000,
                    });
                collector.on("collect", async (i) => {
                    if (i.customId === "yes") {
                        interaction.guild.channels.cache
                            .filter((c) => c.type === ChannelType.GuildCategory)
                            .forEach((c) => c.delete());
                        const embed = new EmbedBuilder()
                            .setTitle(funciones["categorias"]["accept"]["title"])
                            .setDescription(funciones["categorias"]["accept"]["description"])
                            .setFooter({ text: funciones["categorias"]["accept"]["footer"] })
                            .setThumbnail(
                                interaction.user.displayAvatarURL({ dynamic: true })
                            )
                            .setColor(funciones["categorias"]["accept"]["color"]);
                        i.update({ embeds: [embed], components: [] }).catch((error) =>
                            console.log(chalk.cyanBright("[Slash]") + funciones["categorias"]["consolaError"]))
                    }
                    if (i.customId === "no") {
                        const embed = new EmbedBuilder()
                            .setTitle(funciones["categorias"]["deny"]["title"])
                            .setDescription(funciones["categorias"]["deny"]["description"])
                            .setFooter({ text: `Solitado por ${interaction.user.tag}` })
                            .setThumbnail(
                                interaction.user.displayAvatarURL({ dynamic: true })
                            )
                            .setColor(funciones["categorias"]["deny"]["footer"]);
                        i.update({ embeds: [embed], components: [] }).catch((error) =>
                            console.log(chalk.cyanBright("[Slash]") + funciones["categorias"]["consolaError"]))
                    }
                });
            } catch (e) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(funciones["title"])
                            .setDescription(`\`\`\`yml\n${e}\`\`\``)
                            .setColor(funciones["color"])
                            .setFooter({ text: funciones["footer"] }),
                    ],
                    ephemeral: true,
                });
            }
        }
    }
};