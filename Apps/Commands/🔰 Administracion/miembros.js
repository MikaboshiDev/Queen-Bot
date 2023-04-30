const Discord = require("discord.js");
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, AttachmentBuilder } = require("discord.js");
const DB = require("../../../Model/encuesta/pollDB");
module.exports = {
    botpermisos: [
        "EmbedLinks",
        "AttachFiles",
    ],
    data: new SlashCommandBuilder()
        .setName("miembros")
        .setDescription("Muestra la cantidad de miembros del servidor")
        .addSubcommand((options) =>
            options
                .setName("vote")
                .setDescription(
                    "🔰 Crea una votacion para expulsar a un miembro de tu canal de voz"
                )
                .addUserOption((option) =>
                    option
                        .setName("member")
                        .setDescription("Seleccione el miembro que desea expulsar.")
                        .setRequired(true)
                )
        )
        .addSubcommand((options) =>
            options
                .setName("encuestas")
                .setDescription(
                    "🔰 Crea una encuesta en discord con un menu interactivo"
                )
                .addStringOption((option) =>
                    option
                        .setName("title")
                        .setDescription("Dale un nombre a la encuesta.")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName("options")
                        .setDescription(
                            "Use un ^ para dividir los nombres. Ejemplo: Verdadero^Falso^Ninguno de los anteriores"
                        )
                        .setRequired(true)
                )
        ),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case "vote":
                {
                    const { member, options } = interaction;
                    const target = options.getMember("member");
                    if (!target.voice.channel) {
                        return interaction.reply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setTitle("Comando Voice! 🟡")
                                    .setDescription([
                                        `\`•\` Estado: Error`,
                                        `\`•\` Razon: El miembro no fue encontrado en el canal de voz.`,
                                        `\`•\` User: ${interaction.user.tag}`,
                                        `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                        `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                                    ].join("\n"))
                            ],
                            ephemeral: true,
                        }).catch((error) => { });
                    }

                    if (target.voice.channel !== member.voice.channel) {
                        return interaction.reply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setTitle("Comando Voice! 🟡")
                                    .setDescription([
                                        `\`•\` Estado: Error`,
                                        `\`•\` Razon: Debes estar en el mismo canal de voz.`,
                                        `\`•\` User: ${interaction.user.tag}`,
                                        `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                        `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                                    ].join("\n"))
                            ],
                            ephemeral: true,
                        }).catch((error) => { });
                    }

                    if (
                        target.permissions.has(PermissionFlagsBits.Administrator) ||
                        target.permissions.has(PermissionFlagsBits.ModerateMembers)
                    ) {
                        return interaction.reply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setTitle("Comando Voice! 🟡")
                                    .setDescription([
                                        `\`•\` Estado: Error`,
                                        `\`•\` Razon: No puedes atear a este usuario del canal.`,
                                        `\`•\` User: ${interaction.user.tag}`,
                                        `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                        `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                                    ].join("\n"))
                            ],
                            ephemeral: true,
                        }).catch((error) => { });
                    }

                    if (member.voice.channel.members.size == 2) {
                        return interaction.reply({
                            embeds: [
                                new Discord.EmbedBuilder()
                                    .setTitle("Comando Voice! 🟡")
                                    .setDescription([
                                        `\`•\` Estado: Error`,
                                        `\`•\` Razon: No puedes votar en un canal con solo 2 mmiembros.`,
                                        `\`•\` User: ${interaction.user.tag}`,
                                        `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                        `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                                    ].join("\n"))
                            ],
                            ephemeral: true,
                        }).catch((error) => { });
                    }

                    const users = member.voice.channel.members.size;
                    const channel = member.voice.channel;
                    const votesNeed = Math.round((users - 1) * 0.5 + 1);

                    let memberMention = "";

                    channel.members.each((user) => {
                        if (user.id == target.id) {
                            return;
                        } else {
                            memberMention += `<@${user.id}> `;
                        }
                    });

                    const message = await interaction.reply({
                        content: memberMention,
                        embeds: [
                            new EmbedBuilder()
                                .setColor(Colors.Yellow)
                                .setThumbnail(target.displayAvatarURL())
                                .setAuthor({
                                    name: member.user.username,
                                    iconURL: member.user.displayAvatarURL(),
                                })
                                .setDescription(
                                    `**comienza a votar para patear <@${target.id}> out**\n\n` +
                                    `**Tiempo para votar:** _1 minutos..._\n` +
                                    `**Necesita votos**: _${votesNeed}_`
                                ),
                        ],
                        fetchReply: true,
                    }).catch((error) => { });
                    const filterReactions = (reaction) =>
                        ["👍"].includes(reaction.emoji.name);

                    message.react("👍");

                    message
                        .awaitReactions({
                            filterReactions,
                            maxUsers: users,
                            time: 1000 * 60 * 1,
                        })
                        .then((collected) => {
                            if (collected.get("👍").count > votesNeed) {
                                message.reactions.removeAll();

                                try {
                                    target.voice.disconnect();
                                } catch { }

                                message
                                    .edit({
                                        content: " ",
                                        embeds: [
                                            new EmbedBuilder()
                                                .setColor(Colors.Green)
                                                .setThumbnail(target.displayAvatarURL())
                                                .setDescription(
                                                    `**Se termino la votacion - <@${target.id}> es expulsado.**\n\n` +
                                                    `**Ha sido baneado del canal** ${channel.name}\n\n` +
                                                    `**Votos recogidos**: ${collected.get("👍").count - 1
                                                    }`
                                                )
                                                .setTimestamp(),
                                        ],
                                    })
                                    .then(
                                        channel.permissionOverwrites.edit(target, {
                                            Connect: false,
                                        })
                                    );
                            }

                            if (collected.get("👍").count <= votesNeed) {
                                message.reactions.removeAll();
                                return message.edit({
                                    content: " ",
                                    embeds: [
                                        new EmbedBuilder()
                                            .setColor(Colors.Red)
                                            .setThumbnail(target.displayAvatarURL())
                                            .setDescription(
                                                `<a:error:1030716002259980318> **Se termino la votacion - <@${target.id}> no es expulsado**.\n\n` +
                                                `**Necesito votos**: ${votesNeed}\n` +
                                                `**Votos recogidos**: ${collected.get("👍").count - 1
                                                }`
                                            )
                                            .setTimestamp(),
                                    ],
                                }).catch((error) => { });
                            }
                        });
                }
                break;
            case "encuestas":
                {
                    const title = interaction.options
                        .getString("title")
                        .substring(0, 256);
                    const option = interaction.options
                        .getString("options")
                        .split("^")
                        .slice(0, 24);
                    const embed = new EmbedBuilder();

                    let optionsArray = [];
                    let descriptionArray = [];
                    let sendToDB = [];

                    for (let i = 0; i < option.length; i++) {
                        descriptionArray.push(`${option[i]}: 0 usuarios seleccionados actualmente`);
                        optionsArray.push({
                            label: option[i],
                            value: i.toString(),
                            description: `Elige la opcion ${option[i]} de nuestra encuesta`,
                        });
                        sendToDB.push({ name: option[i], value: 0 });
                    }

                    const selectMenuRow = new ActionRowBuilder().addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId("poll-system")
                            .setPlaceholder("Da tu respuesta para la encuesta del servidor.")
                            .setOptions(optionsArray)
                    );

                    embed
                        .setTitle(title)
                        .setFooter({ text: `Encuenta de ${interaction.user.tag}` })
                        .setColor("NotQuiteBlack")
                        .setTimestamp()
                        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                        .setDescription("\`❓ \`" + descriptionArray.join("\n\n"));
                    interaction
                        .reply({
                            embeds: [embed],
                            components: [selectMenuRow],
                            fetchReply: true,
                        })
                        .then(async (message) => {
                            await DB.create({
                                GuildID: interaction.guild.id,
                                MessageID: message.id,
                                ChannelID: interaction.channel.id,
                                CreatedBy: interaction.user.id,
                                Title: title,
                                Chosen: sendToDB,
                            });
                        });
                }
                break;
        }
    }
}