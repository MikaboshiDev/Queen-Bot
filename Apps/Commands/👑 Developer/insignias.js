const profile = require('../../../Model/servidor/badges');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, ChatInputCommandInteraction, Client } = require('discord.js')
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("insignias")
        .setDescription("👑 Da una insignia a un usuario del servidor de discord")
        .addSubcommand(subcommand =>
            subcommand
                .setName('añadir')
                .setDescription('🤩 Añadir una insignia a algun usuario')
                .addUserOption(option =>
                    option.setName("usuario")
                        .setDescription("Elije a el usuario al que le daras la insignia")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("insignia")
                        .setDescription("Insignia a otrogar al usuario del servidor")
                        .setRequired(true)
                        .addChoices(
                            { name: "Dueño", value: "owner" },
                            { name: "Developer", value: "dev" },
                            { name: "Staff", value: "staff" },
                            { name: "Cazador", value: "alianzas" },
                            { name: "Partidario", value: "supporter" },
                            { name: "Bug Hunter", value: "bug" },
                            { name: "Premium", value: "premium" },
                        )
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remover')
                .setDescription(`👑 Remover una insignia a algun usuario del servidor`)
                .addUserOption(option =>
                    option.setName("usuario")
                        .setDescription("Usuario a el que se le removera la insignia")
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName("insignia")
                        .setDescription("Insignia a quitar al usuario de discord")
                        .setRequired(true)
                        .addChoices(
                            { name: "Dueño", value: "owner" },
                            { name: "Developer", value: "dev" },
                            { name: "Staff", value: "staff" },
                            { name: "Cazador", value: "alianzas" },
                            { name: "Partidario", value: "supporter" },
                            { name: "Bug Hunter", value: "bug" },
                            { name: "Premium", value: "premium" }
                        )
                )
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     *  
     */
    async execute(interaction, client) {

        const subcommand = interaction.options.getSubcommand()
        const badge = interaction.options.getString('insignia')
        const member = interaction.options.getUser('usuario')
        const data = await profile.findOne({ id: member.id })
        if (!data) await profile.create({ id: member.id })

        if (subcommand === "añadir") {
            if (badge === "owner") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("owner")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Dueño`,
                                `\`📁\` Motivo: El usuario ya cuenta con esta insignia`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.push('owner')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Dueño`,
                                `\`📁\` Motivo: Se le añadio la insignia **Dueño** al perfil de ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "dev") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("dev")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Developer`,
                                `\`📁\` Motivo: El usuario ya cuenta con esta insignia`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.push('dev')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Developer`,
                                `\`📁\` Motivo: Se le añadio la insignia **Developer** al perfil de ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "staff") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("staff")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Staff`,
                                `\`📁\` Motivo: El usuario ya cuenta con esta insignia`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.push('staff')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Staff`,
                                `\`📁\` Motivo: Se le añadio la insignia **Staff** al perfil de ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "premium") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("premium")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Premium`,
                                `\`📁\` Motivo: El usuario ya cuenta con esta insignia`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.push('premium')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Premium`,
                                `\`📁\` Motivo: Se le añadio la insignia **Premium** al perfil de ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "supporter") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("supporter")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Partidiario Inicial`,
                                `\`📁\` Motivo: El usuario ya cuenta con esta insignia`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.push('supporter')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Partidiario Inicial`,
                                `\`📁\` Motivo: Se le añadio la insignia **Partidiario Inicial** al perfil de ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "alianzas") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("alianzas")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: alianzas`,
                                `\`📁\` Motivo: El usuario ya cuenta con esta insignia`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.push('alianzas')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: alianzas`,
                                `\`📁\` Motivo: Se le añadio la insignia **alianzas** al perfil de ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "bug") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("bug")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: bug`,
                                `\`📁\` Motivo: El usuario ya cuenta con esta insignia`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.push('bug')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: bug`,
                                `\`📁\` Motivo: Se le añadio la insignia **bug** al perfil de ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
        }

        if (subcommand === "remover") {
            if (badge === "owner") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("owner")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Dueño`,
                                `\`📁\` Motivo: El usuario ya cuenta con esta insignia`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.remove('owner')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Dueño`,
                                `\`📁\` Motivo: Se removio la insignia de dueño el perfil ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "dev") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("dev")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Developer`,
                                `\`📁\` Motivo: Este usuario no tiene esa insignia en el perfil`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.remove('dev')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Developer`,
                                `\`📁\` Motivo: Se removio la insignia de developer de el perfil ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "staff") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("staff")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Staff`,
                                `\`📁\` Motivo: Este usuario no tiene esa insignia en el perfil`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.remove('staff')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Staff`,
                                `\`📁\` Motivo: Se removio la insignia de staff de el perfil ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "premium") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("premium")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Premium`,
                                `\`📁\` Motivo: Este usuario no tiene esa insignia en el perfil`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.remove('premium')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Premium`,
                                `\`📁\` Motivo: Se removio la insignia de premium de el perfil ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "supporter") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("supporter")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Partidiario Inicial`,
                                `\`📁\` Motivo: Este usuario no tiene esa insignia en el perfil`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.remove('supporter')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: Partidiario Inicial`,
                                `\`📁\` Motivo: Se removio la insignia de partidiario inicial de el perfil ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "alianzas") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("alianzas")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: alianzas`,
                                `\`📁\` Motivo: Este usuario no tiene esa insignia en el perfil`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.remove('alianzas')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: alianzas`,
                                `\`📁\` Motivo: Se removio la insignia de alianzas de el perfil ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
            if (badge === "bug") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("bug")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: bug`,
                                `\`📁\` Motivo: Este usuario no tiene esa insignia en el perfil`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
                await data.badges.remove('bug')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor("Random")
                            .setTitle("Sistema de Insignias! 🟢")
                            .setDescription([
                                `\`📝\` Estado: Insignia Entregada`,
                                `\`👤\` Usuario: ${member}`,
                                `\`📜\` Insignia: bug`,
                                `\`📁\` Motivo: Se removio la insignia de bug de el perfil ${member}`,
                                `\`🌐\` Fecha: ${new Date().toLocaleDateString()}`,
                                `\`⭐\` Hora: ${new Date().toLocaleTimeString()}`,
                            ].join("\n"))
                    ], ephemeral: true
                })
            }
        }

    }
}
