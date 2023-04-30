const { CommandInteraction, EmbedBuilder, Client, GuildMember, SlashCommandBuilder, Embed } = require("discord.js");
const ms = require("ms");
module.exports = {
    permisos: [
        "BanMembers",
        "KickMembers",
        "ManageMessages",
        "ModerateMembers",
    ],
    botpermisos: [
        "BanMembers",
        "KickMembers",
        "ManageMessages",
        "ModerateMembers",
    ],
    data: new SlashCommandBuilder()
        .setName("mod")
        .setDescription("Moderation Commands")
        .addSubcommand((sub) =>
            sub
                .setName("accion")
                .setDescription("🔰 Acciones permanentes en el servidor")
                .addStringOption((option) =>
                    option
                        .setName("opciones")
                        .setDescription("Pick a option from the list")
                        .setRequired(true)
                        .addChoices(
                            { name: "advertencia", value: "warning" },
                            { name: "kickear", value: "kick" },
                            { name: "banear", value: "ban" },
                        )
                )
                .addUserOption((option) =>
                    option
                        .setName("miembro")
                        .setDescription("Selecciona un miembro para la accion")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName("motivo")
                        .setDescription("Provee una razon valida para registrar")
                        .setRequired(true)
                        .setMaxLength(50)
                )
        )
        .addSubcommand((sub) =>
            sub
                .setName("temporal")
                .setDescription("🔰 Comandos de Aislamiento de moderacion")
                .addStringOption((option) =>
                    option
                        .setName("opciones")
                        .setDescription("Selecciona una opcion de la lista para continuar")
                        .setRequired(true)
                        .addChoices(
                            { name: "timeout", value: "timeout" },
                        )
                )
                .addStringOption((option) =>
                    option
                        .setName("duracion")
                        .setDescription("Elige la durecion de el aislamiento proximo")
                        .setRequired(true)
                        .addChoices(
                            { name: "60 sec", value: "60 sec" },
                            { name: "5 mins", value: "5 mins" },
                            { name: "10 mins", value: "10 mins" },
                            { name: "1 hour", value: "1 hour" },
                            { name: "1 day", value: "1 day" },
                            { name: "1 week", value: "1 week" },
                        )
                )
                .addUserOption((option) =>
                    option
                        .setName("miembro")
                        .setDescription("Selecciona el miembro para realizar el aislamiento")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName("motivo")
                        .setDescription("Da una razon para registrar en el sistema del bot")
                        .setRequired(true)
                        .setMaxLength(50)
                )
        )
        .addSubcommand((sub) =>
            sub
                .setName("remover")
                .setDescription("🔰 Remover acciones registradas en el servidor")
                .addStringOption((option) =>
                    option
                        .setName("opciones")
                        .setDescription("Selecciona que datos removeras")
                        .setRequired(true)
                        .addChoices(
                            { name: "aislamiento", value: "remove timeout" },
                        )
                )
                .addUserOption((option) =>
                    option
                        .setName("miembro")
                        .setDescription("Selecciona el miembro para remover el aislamiento")
                        .setRequired(true)
                )
        ),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const Sub = options.getSubcommand();

        const user = options.getMember("miembro");
        const reason = options.getString("motivo");
        const time = options.getString("duracion");
        const id = await interaction.guild.members.fetch(user.id);

        const errorEmbed = new EmbedBuilder()
            .setColor("Red");

        if (!id)
            return interaction.reply({ content: "Posible miembro ya se fue solo o algo más salió mal", ephemeral: true })

        switch (Sub) {
            case "accion": {
                const hard = options.getString("opciones");

                switch (hard) {
                    case "warning": {
                        /* Si el Usuario es el Owner del Servidor retorna */
                        if (id.id === interaction.guild.ownerId)
                        return interaction.reply({ content: "No puedes usar esta acción en el propietario del servidor", ephemeral: true });

                        if (interaction.member.roles.highest.position <= id.roles.highest.position)
                            return interaction.reply({ content: "No puede usar esta acción en este miembro, este miembro es igual a su rango o superior", ephemeral: true });

                        /* Si el rol del bot es menor al del usuario a sancionar retornar */
                        if (interaction.guild.members.me.roles.highest.position <= id.roles.highest.position)
                            return interaction.reply({ content: "No puedo usar esta acción en este miembro, este miembro es igual a mi rango o superior", ephemeral: true });

                        const warn = new EmbedBuilder()
                            .setTitle("Succesfully warned the member")
                            .setColor("Yellow")
                            .setThumbnail(id.user.avatarURL({ dynamic: true }))
                            .setFields(
                                { name: "ID", value: id.id },
                                { name: "Warn Reason", value: reason },
                                { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true }
                            );
                        await id.send({
                            embeds: [new EmbedBuilder()
                                .setTitle("**Warning**")
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ Dynamic: true, size: 512 }) })
                                .setColor("Yellow")
                                .setThumbnail(`${guild.iconURL({ dynamic: true, size: 512 })}`)
                                .setFields(
                                    { name: "Warned by", value: interaction.user.tag },
                                    { name: "Reason", value: reason },
                                    { name: "Discord Server", value: guild.name },
                                )]
                        }).then(async () => {
                            return interaction.reply({ embeds: [warn], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription("⛔ Private message blocked by the user")
                            return interaction.reply({ embeds: [errorEmbed, warn], ephemeral: true });
                        })
                    }
                        break;

                    case "kick": {
                        /* Si el Usuario es el Owner del Servidor retorna */
                        if (id.id === interaction.guild.ownerId)
                            return interaction.reply({ content: "No puedes usar esta acción en el propietario del servidor", ephemeral: true });

                        if (interaction.member.roles.highest.position <= id.roles.highest.position)
                            return interaction.reply({ content: "No puede usar esta acción en este miembro, este miembro es igual a su rango o superior", ephemeral: true })

                        /* Si el rol del bot es menor al del usuario a sancionar retornar */
                        if (interaction.guild.members.me.roles.highest.position <= id.roles.highest.position)
                            return interaction.reply({ content: "No puedo usar esta acción en este miembro, este miembro es igual a mi rango o superior", ephemeral: true });

                        const kick = new EmbedBuilder()
                            .setTitle("Succesfully kicked the member")
                            .setColor("Orange")
                            .setThumbnail(id.user.avatarURL({ dynamic: true }))
                            .setFields(
                                { name: "ID", value: id.id },
                                { name: "Kick Reason", value: reason },
                                { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                            );
                        await id.send({
                            embeds: [new EmbedBuilder()
                                .setTitle("**Kicked**")
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ Dynamic: true, size: 512 }) })
                                .setColor("Orange")
                                .setThumbnail(`${guild.iconURL({ dynamic: true, size: 512 })}`)
                                .setFields(
                                    { name: "Kicked by", value: interaction.user.tag },
                                    { name: "Reason", value: reason },
                                    { name: "Discord Server", value: guild.name },
                                )]
                        }).then(async () => {
                            return interaction.reply({ embeds: [kick], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription("⛔ Private message blocked by the user")
                            return interaction.reply({ embeds: [errorEmbed, kick], ephemeral: true });
                        })
                        await id.kick({ reason: reason });
                    }
                        break;

                    case "ban": {
                        /* Si el Usuario es el Owner del Servidor retorna */
                        if (id.id === interaction.guild.ownerId)
                            return interaction.reply({ content: "No puedes usar esta acción en el propietario del servidor", ephemeral: true });

                        if (interaction.member.roles.highest.position <= id.roles.highest.position)
                            return interaction.reply({ content: "No puede usar esta acción en este miembro, este miembro es igual a su rango o superior", ephemeral: true })

                        /* Si el rol del bot es menor al del usuario a sancionar retornar */
                        if (interaction.guild.members.me.roles.highest.position <= id.roles.highest.position)
                            return interaction.reply({ content: "No puedo usar esta acción en este miembro, este miembro es igual a mi rango o superior", ephemeral: true });

                        const ban = new EmbedBuilder()
                            .setTitle(`<a:BAN:974197323309662218> Succesfully banned the member`)
                            .setColor("Red")
                            .setThumbnail(id.user.avatarURL({ dynamic: true }))
                            .setFields(
                                { name: "ID", value: id.id },
                                { name: "Ban Reason", value: reason },
                                { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                            );
                        await id.send({
                            embeds: [new EmbedBuilder()
                                .setTitle("**Banned**")
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ Dynamic: true, size: 512 }) })
                                .setColor("Red")
                                .setThumbnail(`${guild.iconURL({ dynamic: true, size: 512 })}`)
                                .setFields(
                                    { name: "Banned by", value: interaction.user.tag },
                                    { name: "Reason", value: reason },
                                    { name: "Discord Server", value: guild.name },
                                )]
                        }).then(async () => {
                            return interaction.reply({ embeds: [ban], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription("⛔ Private message blocked by the user")
                            return interaction.reply({ embeds: [errorEmbed, ban], ephemeral: true });
                        })
                        await id.ban({ days: 0, reason: reason });
                    }
                        break;
                }
            }
                break;

            case "temporal": {
                const soft = options.getString("opciones");

                switch (soft) {
                    case "timeout": {
                        /* Si el Usuario es el Owner del Servidor retorna */
                        if (id.id === interaction.guild.ownerId)
                            return interaction.reply({ content: "No puedes usar esta acción en el propietario del servidor", ephemeral: true });

                        if (interaction.member.roles.highest.position <= id.roles.highest.position)
                            return interaction.reply({ content: "No puede usar esta acción en este miembro, este miembro es igual a su rango o superior", ephemeral: true })

                        /* Si el rol del bot es menor al del usuario a sancionar retornar */
                        if (interaction.guild.members.me.roles.highest.position <= id.roles.highest.position)
                            return interaction.reply({ content: "No puedo usar esta acción en este miembro, este miembro es igual a mi rango o superior", ephemeral: true });

                        switch (time) {
                            case "60 sec": {
                                const firsttm = new EmbedBuilder()
                                    .setTitle("Succesfully timeout the member")
                                    .setColor("White")
                                    .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                    .setFields(
                                        { name: "ID", value: id.id },
                                        { name: "Timeout", value: "60 sec" },
                                        { name: "Timeout Reason", value: reason },
                                        { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                        { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                    );
                                await id.send({
                                    embeds: [new EmbedBuilder()
                                        .setTitle("**Timeout**")
                                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ Dynamic: true, size: 512 }) })
                                        .setColor("White")
                                        .setThumbnail(`${guild.iconURL({ dynamic: true, size: 512 })}`)
                                        .setFields(
                                            { name: "Timeout by", value: interaction.user.tag },
                                            { name: "Timeout", value: "60 sec" },
                                            { name: "Reason", value: reason },
                                            { name: "Discord Server", value: guild.name },
                                        )]
                                }).then(async () => {
                                    return interaction.reply({ embeds: [firsttm], ephemeral: true })
                                }).catch((err) => {
                                    errorEmbed.setDescription("⛔ Private message blocked by the user")
                                    return interaction.reply({ embeds: [errorEmbed, firsttm], ephemeral: true });
                                })
                                await id.timeout(ms("60s"), reason);
                            }
                                break;
                            case "5 mins": {
                                const secondtm = new EmbedBuilder()
                                    .setTitle("Succesfully timeout the member")
                                    .setColor("White")
                                    .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                    .setFields(
                                        { name: "ID", value: id.id },
                                        { name: "Timeout", value: "5 mins" },
                                        { name: "Timeout Reason", value: reason },
                                        { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                        { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                    );
                                await id.send({
                                    embeds: [new EmbedBuilder()
                                        .setTitle("**Timeout**")
                                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ Dynamic: true, size: 512 }) })
                                        .setColor("White")
                                        .setThumbnail(`${guild.iconURL({ dynamic: true, size: 512 })}`)
                                        .setFields(
                                            { name: "Timeout by", value: interaction.user.tag },
                                            { name: "Timeout", value: "5 mins" },
                                            { name: "Reason", value: reason },
                                            { name: "Discord Server", value: guild.name },
                                        )]
                                }).then(async () => {
                                    return interaction.reply({ embeds: [secondtm], ephemeral: true })
                                }).catch((err) => {
                                    errorEmbed.setDescription("⛔ Private message blocked by the user")
                                    return interaction.reply({ embeds: [errorEmbed, secondtm], ephemeral: true });
                                })
                                await id.timeout(ms("5m"), reason);
                            }
                                break;
                            case "10 mins": {
                                const thirdtm = new EmbedBuilder()
                                    .setTitle("Succesfully timeout the member")
                                    .setColor("White")
                                    .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                    .setFields(
                                        { name: "ID", value: id.id },
                                        { name: "Timeout", value: "10 mins" },
                                        { name: "Timeout Reason", value: reason },
                                        { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                        { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                    );
                                await id.send({
                                    embeds: [new EmbedBuilder()
                                        .setTitle("**Timeout**")
                                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ Dynamic: true, size: 512 }) })
                                        .setColor("White")
                                        .setThumbnail(`${guild.iconURL({ dynamic: true, size: 512 })}`)
                                        .setFields(
                                            { name: "Timeout by", value: interaction.user.tag },
                                            { name: "Timeout", value: "10 mins" },
                                            { name: "Reason", value: reason },
                                            { name: "Discord Server", value: guild.name },
                                        )]
                                }).then(async () => {
                                    return interaction.reply({ embeds: [thirdtm], ephemeral: true })
                                }).catch((err) => {
                                    errorEmbed.setDescription("⛔ Private message blocked by the user")
                                    return interaction.reply({ embeds: [errorEmbed, thirdtm], ephemeral: true });
                                })
                                await id.timeout(ms("10m"), reason);
                            }
                                break;
                            case "1 hour": {
                                const fourthtm = new EmbedBuilder()
                                    .setTitle("Succesfully timeout the member")
                                    .setColor("White")
                                    .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                    .setFields(
                                        { name: "ID", value: id.id },
                                        { name: "Timeout", value: "1 hour" },
                                        { name: "Timeout Reason", value: reason },
                                        { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                        { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                    );
                                await id.send({
                                    embeds: [new EmbedBuilder()
                                        .setTitle("**Timeout**")
                                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ Dynamic: true, size: 512 }) })
                                        .setColor("White")
                                        .setThumbnail(`${guild.iconURL({ dynamic: true, size: 512 })}`)
                                        .setFields(
                                            { name: "Timeout by", value: interaction.user.tag },
                                            { name: "Timeout", value: "1 hour" },
                                            { name: "Reason", value: reason },
                                            { name: "Discord Server", value: guild.name },
                                        )]
                                }).then(async () => {
                                    return interaction.reply({ embeds: [fourthtm], ephemeral: true })
                                }).catch((err) => {
                                    errorEmbed.setDescription("⛔ Private message blocked by the user")
                                    return interaction.reply({ embeds: [errorEmbed, fourthtm], ephemeral: true });
                                })
                                await id.timeout(ms("1h"), reason);
                            }
                                break;
                            case "1 day": {
                                const fifthtm = new EmbedBuilder()
                                    .setTitle("Succesfully timeout the member")
                                    .setColor("White")
                                    .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                    .setFields(
                                        { name: "ID", value: id.id },
                                        { name: "Timeout", value: "1 day" },
                                        { name: "Timeout Reason", value: reason },
                                        { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                        { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                    );
                                await id.send({
                                    embeds: [new EmbedBuilder()
                                        .setTitle("**Timeout**")
                                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ Dynamic: true, size: 512 }) })
                                        .setColor("White")
                                        .setThumbnail(`${guild.iconURL({ dynamic: true, size: 512 })}`)
                                        .setFields(
                                            { name: "Timeout by", value: interaction.user.tag },
                                            { name: "Timeout", value: "1 day" },
                                            { name: "Reason", value: reason },
                                            { name: "Discord Server", value: guild.name },
                                        )]
                                }).then(async () => {
                                    return interaction.reply({ embeds: [fifthtm], ephemeral: true })
                                }).catch((err) => {
                                    errorEmbed.setDescription("⛔ Private message blocked by the user")
                                    return interaction.reply({ embeds: [errorEmbed, fifthtm], ephemeral: true });
                                })
                                await id.timeout(ms("1d"), reason);
                            }
                                break;
                            case "1 week": {
                                const sixthtm = new EmbedBuilder()
                                    .setTitle("Succesfully timeout the member")
                                    .setColor("White")
                                    .setThumbnail(id.user.avatarURL({ dynamic: true }))
                                    .setFields(
                                        { name: "ID", value: id.id },
                                        { name: "Timeout", value: "1 week" },
                                        { name: "Timeout Reason", value: reason },
                                        { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                        { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                                    );
                                await id.send({
                                    embeds: [new EmbedBuilder()
                                        .setTitle("**Timeout**")
                                        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ Dynamic: true, size: 512 }) })
                                        .setColor("White")
                                        .setThumbnail(`${guild.iconURL({ dynamic: true, size: 512 })}`)
                                        .setFields(
                                            { name: "Timeout by", value: interaction.user.tag },
                                            { name: "Timeout", value: "1 week" },
                                            { name: "Reason", value: reason },
                                            { name: "Discord Server", value: guild.name },
                                        )]
                                }).then(async () => {
                                    return interaction.reply({ embeds: [sixthtm], ephemeral: true })
                                }).catch((err) => {
                                    errorEmbed.setDescription("⛔ Private message blocked by the user")
                                    return interaction.reply({ embeds: [errorEmbed, sixthtm], ephemeral: true });
                                })
                                await id.timeout(ms("1w"), reason);
                            }
                                break;
                        }
                    }
                        break;
                }
            }
                break;

            case "remover": {
                const removal = options.getString("opciones");

                /* Si el Usuario es el Owner del Servidor retorna */
                if (id.id === interaction.guild.ownerId)
                    return interaction.reply({ content: "No puedes usar esta acción en el propietario del servidor", ephemeral: true });

                if (interaction.member.roles.highest.position <= id.roles.highest.position)
                    return interaction.reply({ content: "No puede usar esta acción en este miembro, este miembro es igual a su rango o superior", ephemeral: true })

                /* Si el rol del bot es menor al del usuario a sancionar retornar */
                if (interaction.guild.members.me.roles.highest.position <= id.roles.highest.position)
                    return interaction.reply({ content: "No puedo usar esta acción en este miembro, este miembro es igual a mi rango o superior", ephemeral: true });

                switch (removal) {
                    case "remove timeout": {
                        const tmremoval = new EmbedBuilder()
                            .setTitle("Succesfully removed timeout from member")
                            .setColor("Green")
                            .setThumbnail(id.user.avatarURL({ dynamic: true }))
                            .setFields(
                                { name: "ID", value: id.id },
                                { name: "Timeout", value: "Removed" },
                                { name: "Joined Server", value: `<t:${parseInt(id.joinedTimestamp / 1000)}:R>`, inline: true },
                                { name: "Account Created", value: `<t:${parseInt(id.user.createdTimestamp / 1000)}:R>`, inline: true },
                            );
                        await id.send({
                            embeds: [new EmbedBuilder()
                                .setTitle("**Timeout Removed**")
                                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL({ Dynamic: true, size: 512 }) })
                                .setColor("Green")
                                .setThumbnail(`${guild.iconURL({ dynamic: true, size: 512 })}`)
                                .setFields(
                                    { name: "Timeout removed by", value: interaction.user.tag },
                                    { name: "Timeout", value: "Removed" },
                                    { name: "Discord Server", value: guild.name },
                                )]
                        }).then(async () => {
                            return interaction.reply({ embeds: [tmremoval], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription("⛔ Private message blocked by the user")
                            return interaction.reply({ embeds: [errorEmbed, tmremoval], ephemeral: true });
                        })
                        await id.timeout(null);
                    }
                        break;
                }
            }
                break;
        }
    }
}