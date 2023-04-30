const { ChatInputCommandInteraction, EmbedBuilder, Client, Guild, SlashCommandBuilder, ChannelType } = require("discord.js");
const mongodb = require("../../../Model/bienvenidas/joinsDB");
module.exports = {
    permisos: [
        "Administrator"
      ],
      botpermisos: [
        "ManageGuild",
        "AttachFiles",
        "ManageChannels",
        "SendMessages",
        "EmbedLinks",
      ],
    data: new SlashCommandBuilder()
        .setName("bienvenidas")
        .setDescription("🎉 Sistema de bienvenida en mensaje")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("activar")
                .setDescription("🎉 configura el sistema de bienvenidas")
                .addChannelOption(option =>
                    option
                        .setName("canal")
                        .setDescription("Seleccione el canal de bienvenida")
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("personalizar")
                .setDescription("🎉 personaliza el sistema de bienvenidas")
                .addStringOption(option =>
                    option
                        .setName("mensaje")
                        .setDescription("proporciona un mensaje personalizado")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName("imagen")
                        .setDescription("proporciona una imagen personalizada")
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option
                        .setName("rol")
                        .setDescription("agrega un rol a los nuevos usuarios")
                        .setRequired(false)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("desactivar")
                .setDescription("🎉 desactiva el sistema de bienvenidas")
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        const { guild, options, channel, user } = interaction

        await interaction.deferReply({ ephemeral: true })

        const opciones = options.getSubcommand()

        let datos = await mongodb.findOne({ ServidorID: guild.id }).catch(err => { })

        try {

            switch (opciones) {

                case "activar": {

                    const canal = options.getChannel("canal") || channel

                    if (!datos) {

                        datos = new mongodb({

                            ServidorID: guild.id,
                            ServidorNombre: guild.name,
                            CanalID: canal.id,
                            CanalNombre: canal.name,
                            RolID: undefined,
                            RolNombre: undefined

                        })

                        await datos.save()

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Random")
                                    .setTitle(`Sistema de Bienvenidas! 🟢`)
                                    .setDescription([
                                        `- Estado: \`Activado\``,
                                        `- Canal: ${canal}`,
                                        `- Fecha: ${new Date().toLocaleDateString()}`,
                                        `- Hora: ${new Date().toLocaleTimeString()}`,
                                    ].join("\n"))
                            ]
                        })

                    } else {

                        datos.CanalID = canal.id
                        datos.CanalNombre = canal.name

                        await datos.save()

                        interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Random")
                                    .setTitle(`Sistema de Bienvenidas! 🟢`)
                                    .setDescription([
                                        `- Estado: \`Activado\``,
                                        `- Canal: ${canal}`,
                                        `- Fecha: ${new Date().toLocaleDateString()}`,
                                        `- Hora: ${new Date().toLocaleTimeString()}`,
                                    ].join("\n"))
                            ]
                        })

                    }

                }
                    break;

                case "personalizar": {

                    const rol = options.getRole("rol")
                    const mensaje = options.getString("mensaje").split("+n+").join("\n")
                    const imagen = options.getString("imagen")

                    if (!datos || !datos.CanalID) {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Random")
                                    .setTitle(`Sistema de Bienvenidas! 🔴`)
                                    .setDescription([
                                        `- Estado: ❌ | Desactivado`,
                                        `- Canal: No definido`,
                                        `- Motivo: No se ha activado el sistema de bienvenidas!`,
                                        `- Fecha: ${new Date().toLocaleDateString()}`,
                                        `- Hora: ${new Date().toLocaleTimeString()}`,
                                    ].join("\n"))
                            ]
                        })
                    }

                    if (rol) {

                        datos.RolID = rol.id
                        datos.RolNombre = rol.name
                        datos.Mensaje = mensaje
                        datos.Imagen = imagen


                        await datos.save()

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Random")
                                    .setTitle(`Sistema de Bienvenidas! 🟢`)
                                    .setDescription([
                                        `- Estado: \`Activado\``,
                                        `- Accion: \`Personalizado\``,
                                        `- Fecha: ${new Date().toLocaleDateString()}`,
                                        `- Hora: ${new Date().toLocaleTimeString()}`,
                                    ].join("\n"))
                            ]
                        })

                    } else {

                        datos.Mensaje = mensaje
                        datos.Imagen = imagen

                        await datos.save()

                        interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Random")
                                    .setTitle(`Sistema de Bienvenidas! 🟢`)
                                    .setDescription([
                                        `- Estado: \`Activado\``,
                                        `- Accion: \`Personalizado\``,
                                        `- Fecha: ${new Date().toLocaleDateString()}`,
                                        `- Hora: ${new Date().toLocaleTimeString()}`,
                                    ].join("\n"))
                            ]
                        })

                    }

                }
                    break;

                case "desactivar": {

                    if (!datos || !datos.CanalID) {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Random")
                                    .setTitle(`Sistema de Bienvenidas! 🔴`)
                                    .setDescription([
                                        `- Estado: ❌ | Desactivado`,
                                        `- Canal: No definido`,
                                        `- Motivo: No se ha activado el sistema de bienvenidas!`,
                                        `- Fecha: ${new Date().toLocaleDateString()}`,
                                        `- Hora: ${new Date().toLocaleTimeString()}`,
                                    ].join("\n"))
                            ]
                        })

                    } else {

                        datos.CanalID = undefined
                        datos.CanalNombre = undefined
                        datos.RolID = undefined
                        datos.RolNombre = undefined
                        datos.Mensaje = datos.Mensaje
                        datos.Imagen = datos.Imagen

                        await datos.save()

                        interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Random")
                                    .setTitle(`Sistema de Bienvenidas! 🟢`)
                                    .setDescription([
                                        `- Estado: \`Desactivado\``,
                                        `- Fecha: ${new Date().toLocaleDateString()}`,
                                        `- Hora: ${new Date().toLocaleTimeString()}`,
                                    ].join("\n"))
                            ]
                        })

                    }

                }
                    break;

            }

        } catch (error) {
            console.log(error)
        }

    }

}