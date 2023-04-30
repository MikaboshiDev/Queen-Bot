const {
    Client,
    CommandInteraction,
    EmbedBuilder,
    ChannelType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const { Types } = require("mongoose");
const { createTranscript } = require("discord-html-transcripts");
const ticketSchema = require("../../../Model/tickets/ticketsSchema");
const userSchema = require("../../../Model/tickets/userTicketsSchema");
const chalk = require("chalk");
module.exports = {
    id: "Crear-Ticket",
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { channel, member, guild, customId } = interaction;
        const userId = interaction.user.id;
        const motivo = interaction.fields.getTextInputValue("Razon-Ticket")

        const data = await ticketSchema.findOne({
            guildId: guild.id,
        });

        if (!data)
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Ticket Closed! 📝")
                        .setDescription([
                            `\`👋\` Miembro: ${member.user.tag}`,
                            `\`📝\` Motivo: No se ha configurado el sistema de tickets.`,
                            `\`📜\` Fecha: ${new Date().toLocaleDateString()}`,
                            `\`📅\` Hora: ${new Date().toLocaleTimeString()}`,
                        ].join("\n"))
                ],
                ephemeral: true,
            }).catch((error) => { });

        const userTicket = await userSchema.findOne({ guildId: guild.id, creatorId: userId });
        if (userTicket.closed === false)
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Ticket Closed! 📝")
                        .setDescription([
                            `\`👋\` Miembro: ${member.user.tag}`,
                            `\`📝\` Motivo: Ya tienes un ticket abierto.`,
                            `\`📜\` Fecha: ${new Date().toLocaleDateString()}`,
                            `\`📅\` Hora: ${new Date().toLocaleTimeString()}`,
                        ].join("\n"))
                ],
                ephemeral: true,
            }).catch((error) => { });


        const channelPermissions = [
            "ViewChannel",
            "SendMessages",
            "AddReactions",
            "ReadMessageHistory",
            "AttachFiles",
            "EmbedLinks",
            "UseApplicationCommands",
        ];

        const ticketEmbed = new EmbedBuilder().setColor("Blurple");

        interaction.guild.channels
            .create({
                name: `🎫・ticket-${interaction.user.username}`,
                reason: `Ticket By: ${interaction.user.username}, ID: ${interaction.user.id}, Dia: ${new Date().toLocaleDateString()}, Hora: ${new Date().toLocaleTimeString()}, Razon: Ticket de Soporte General`,
                type: ChannelType.GuildText,
                parent: data.categoryId,
                permissionOverwrites: [
                    {
                        id: userId,
                        allow: [channelPermissions],
                    },
                    {
                        id: data.supportId,
                        allow: [channelPermissions],
                    },
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: ["ViewChannel"],
                    },
                ],
            })
            .then(async (channel) => {
                userSchema.create({
                    _id: Types.ObjectId(),
                    guildId: guild.id,
                    ticketId: channel.id,
                    claimed: false,
                    closed: false,
                    deleted: false,
                    creatorId: userId,
                    claimer: null,
                });

                channel.setRateLimitPerUser(2);

                ticketEmbed
                    .setAuthor({ name: `🎟️ Bienvenido a ${interaction.channel}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                    .setDescription([
                        `\`📁\` **Motivo del Ticket:** ${motivo}`,
                        `\`⌛\` **ID del Ticket:** ${channel.id}`,
                        `\`⛔\` **Creador del Ticket:** ${interaction.user.tag}`,
                        `\`🔓\` **ID del Creador del Ticket:** ${interaction.user.id}\n`,
                        `\`👋🏼\` Gracias por hacer un ticket de soporte general, nuestro equipo de personal estará contigo en breve.`,
                        `\`⏰\` Nuestro horario de soporte estandar es entre las 1 PM de la tarde y las 4 AM hora UTC, (8:00 y 23:00 hora local)`
                    ].join("\n"))
                    .setColor("Random")
                    .setFooter({ text: `Servidor de Soporte y Servicios del Servidor`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                    .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
                    .setTimestamp();

                const botones = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("closeTicket").setLabel("Close Ticket").setEmoji("1015234841190600756").setStyle(ButtonStyle.Success),
                    new ButtonBuilder().setCustomId("deleteTicket").setEmoji("⛔").setLabel("Delete Ticket").setStyle(ButtonStyle.Danger),
                    new ButtonBuilder().setCustomId("reopenTicket").setEmoji("🔓").setLabel("Reopen Ticket").setStyle(ButtonStyle.Primary),
                );

                const configs = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("claimTicket").setLabel("Claim Ticket").setEmoji("1015234867530829834").setStyle(ButtonStyle.Success),
                    new ButtonBuilder().setCustomId("guardarTicket").setEmoji("⌛").setLabel("Guardar Ticket").setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("publicticket").setEmoji("📝").setLabel("Publico Ticket").setStyle(ButtonStyle.Secondary),
                )

                channel.send({
                    content: `${interaction.user.tag}`,
                    embeds: [ticketEmbed],
                    components: [botones, configs],
                }).catch((error) => { });

                await channel
                    .send({
                        content: `${member}`,
                    })
                    .then((message) => {
                        setTimeout(() => {
                            message.delete().catch((err) => console.log(err));
                        }, 5 * 1000);
                    });

                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Ticket Created! 📁")
                            .setDescription([
                                `\`👏\` Usuario: ${interaction.user.tag}`,
                                `\`📁\` Ticket: ${channel}`,
                                `\`📝\` ID: ${channel.id}`,
                            ].join("\n"))
                            .setColor("Green"),
                    ], components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                                .setURL(channel.url)
                                .setLabel("Ir a Ticket")
                                .setStyle(ButtonStyle.Link)
                        )
                    ], ephemeral: true,
                });
            }).catch((error) => { });
    }
}