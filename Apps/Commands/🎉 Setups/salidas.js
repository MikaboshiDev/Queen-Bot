const { ChatInputCommandInteraction, EmbedBuilder, Client, Guild, SlashCommandBuilder, ChannelType } = require("discord.js");
const mongodb = require("../../../Model/bienvenidas/leaveDB");
module.exports = {
    permisos: [
        "Administrator"
      ],
      botpermisos: [
        "ManageGuild",
        "ManageChannels",
        "AttachFiles",
        "SendMessages",
        "EmbedLinks",
      ],
    data: new SlashCommandBuilder()
        .setName("despedidas")
        .setDescription("🎉 Sistema de despedidas en mensaje")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("activar")
                .setDescription("🎉 configura el sistema de despedidas")
                .addChannelOption(option =>
                    option
                        .setName("canal")
                        .setDescription("Seleccione el canal de despedidas")
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("personalizar")
                .setDescription("🎉 personaliza el sistema de despedidas")
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
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("desactivar")
                .setDescription("🎉 desactiva el sistema de despedidas")
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
                            CanalNombre: canal.name

                        })

                        await datos.save()

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Random")
                                    .setTitle(`Sistema de Despedidas! 🟢`)
                                    .setDescription([
                                        `- Estado: ✅ | Activado`,
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
                                    .setTitle(`Sistema de Despedidas! 🟢`)
                                    .setColor("Random")
                                    .setDescription([
                                        `\`•\` Estado: ✅ | Activado`,
                                        `\`•\` Canal: ${canal}`,
                                        `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                                        `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                    ].join("\n"))
                            ]
                        })

                    }

                }
                    break;

                case "personalizar": {

                    const mensaje = options.getString("mensaje").split("+n+").join("\n")
                    const imagen = options.getString("imagen")

                    if (!datos.CanalID) {

                        return interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Random")
                                    .setTitle(`Sistema de Despedidas! 🔴`)
                                    .setDescription([
                                        `- Estado: ❌ | Desactivado`,
                                        `- Canal: No definido`,
                                        `- Motivo: No se ha activado el sistema de despedidas!`,
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
                                    .setTitle(`Sistema de Despedidas! 🟢`)
                                    .setDescription([
                                        `- Estado: ✅ | Activado`,
                                        `- Canal: ${datos.CanalNombre}`,
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
                                    .setTitle(`Sistema de Despedidas! 🔴`)
                                    .setDescription([
                                        `- Estado: ❌ | Desactivado`,
                                        `- Canal: No definido`,
                                        `- Motivo: No se ha activado el sistema de despedidas!`,
                                        `- Fecha: ${new Date().toLocaleDateString()}`,
                                        `- Hora: ${new Date().toLocaleTimeString()}`,
                                    ].join("\n"))
                            ]
                        })

                    } else {

                        datos.CanalID = undefined
                        datos.CanalNombre = undefined
                        datos.Mensaje = datos.Mensaje
                        datos.Imagen = datos.Imagen

                        await datos.save()

                        interaction.editReply({
                            embeds: [
                                new EmbedBuilder()
                                    .setColor("Random")
                                    .setTitle(`Sistema de Despedidas! 🟢`)
                                    .setDescription([
                                        `- Estado: ✅ | Desactivado`,
                                        `- Canal: No definido`,
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