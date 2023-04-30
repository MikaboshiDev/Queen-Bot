const { EmbedBuilder, CommandInteraction, PermissionFlagsBits, ChatInputCommandInteraction } = require("discord.js");
const modalDB = require("../../../Model/report/reportDB");
const clases = require("../../../Tools/Settings/channels");
const chalk = require("chalk");
module.exports = {
    id: "reporte",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const { type, customId, guild, user, fields } = interaction
        try {
            let datos = await modalDB.findOne({ ServidorID: guild.id })

            if (!datos) {

                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setFooter({
                                text: "My Queen https://discord.gg/4Z7QZ7Y",
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                            })
                            .setDescription(`❌ | Lo siento ${user} el sistema de reportes esta desactivado!`)
                    ],
                    ephemeral: true
                })
            }

            const canal = client.channels.cache.get(datos.CanalID)
            const rol = datos.RolMencionID

            const nombre = fields.getTextInputValue("nombre")
            const nick = fields.getTextInputValue("nick")
            const texto = fields.getTextInputValue("texto")

            if (nombre && nick && texto) {

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setFooter({
                                text: "My Queen https://discord.gg/4Z7QZ7Y",
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                            })
                            .setDescription(`✅ | Bien hecho ${user} tu mensaje a sido enviado con éxito!`)
                    ],
                    ephemeral: true
                })

            }

            if (!rol) {

                canal.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL()}`, url: `https://discord.gg/AkFZVDdePF` })
                            .setTitle(`Reporte enviado por ${user.tag}`)
                            .setURL(`https://discord.gg/AkFZVDdePF`)
                            .setDescription(`**Nombre:** \`${nombre}\`\n**Nick:** \`${nick}\`\n\n**Texto:**\n${texto}`)
                            .setTimestamp()
                            .setFooter({
                                text: "My Queen https://discord.gg/4Z7QZ7Y",
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                            })
                    ]
                })

            } else {

                canal.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setAuthor({ name: `${client.user.tag}`, iconURL: `${client.user.displayAvatarURL()}`, url: `https://discord.gg/AkFZVDdePF` })
                            .setTitle(`Nuevo reporte enviado por ${user.username}`)
                            .setDescription(`**Nombre:** \`${nombre}\`\n**Nick:** \`${nick}\`\n\n**Texto:**\n${texto}`)
                            .setTimestamp()
                            .setFooter({
                                text: "My Queen https://discord.gg/4Z7QZ7Y",
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                            })
                    ],
                    content: `<@&${rol}> Nuevo reporte enviado!`
                })

            }

        } catch (error) {

            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Random")
                        .setFooter({
                            text: "My Queen https://discord.gg/4Z7QZ7Y",
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        })
                        .setDescription(`❌ | Se produjo un error al ejecutar el comando!`)
                ],
                ephemeral: true
            })
        }
    }
}