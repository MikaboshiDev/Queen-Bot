const profile = require('../../../Model/servidor/badges');
const userBLK = require("../../../Model/blacklist/userBlacklist");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, ChatInputCommandInteraction, AttachmentBuilder } = require('discord.js')
module.exports = {
    botpermisos: [
        "SendMessages",
        "EmbedLinks",
        "UseExternalEmojis",
    ],
    data: new SlashCommandBuilder()
        .setName("perfil")
        .setDescription("🏫 Mira el perfil de un usuario o el tuyo")
        .addUserOption(option =>
            option
                .setName("usuario")
                .setDescription("Usuario a ver perfil")
                .setRequired(false)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     *  
     */
    async execute(interaction, client) {

        let member = interaction.options.getMember("usuario") || interaction.member;
        await member.fetch();

        const globalban = await userBLK.findOne({ userid: member.id });
        const data = await profile.findOne({ id: member.id })
        if (!data) {
            await profile.create({ id: member.id })
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Random")
                        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
                        .setAuthor({
                            name: `Perfiles de ${member.user.tag}`,
                            iconURL: member.displayAvatarURL({ dynamic: true })
                        })
                        .addFields(
                            { name: "__Insignias__", value: `> No tienes insignias registradas` },
                            { name: "Creacion de la Cuenta", value: `> <t:${parseInt(member.user.createdTimestamp / 1000)}:R>`, inline: true },
                            { name: "Global Ban:", value: `> ${globalban ? `<a:yes:1028005786112245770> Actualmente Globalbaneado` : `<a:error:1030716002259980318> Sin Baneo Registrado`}`, inline: true },
                            { name: "Razón:", value: `> ${globalban ? globalban.reason : `<a:error:1030716002259980318> No hay razon presente en la base de datos`}` },
                            { name: "Roles", value: `> ${member.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || `<a:error:1030716002259980318> No hay roles registrados`}` }
                        )
                        .setFooter({
                            text: `Perfil solicitado por ${interaction.member.user.tag}`,
                            iconURL: interaction.member.user.displayAvatarURL({ dynamic: true })
                        })
                ]
            })
        }


        let badge
        if (data.badges.length === 0) badge = `No tienes insignias`
        else badge = data.badges.join(' ')
            .replace('owner', "<:corona:1008443384228216873>")
            .replace('dev', "<:developing:1001191985207595018>")
            .replace("staff", "<:building:1005884832569626694>")
            .replace("supporter", "<:icd_bunnyangel:1010617992729604127> ")
            .replace("bug", "<:bot:1001191742789390417>")
            .replace('premium', "<:mongoose:1026467988372738048>")
            .replace("alianzas", "<:panda_gift:1007529203119439882>")

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setThumbnail(member.displayAvatarURL({ dynamic: true }))
            .setAuthor({
                name: `Perfiles de ${member.user.tag}`,
                iconURL: member.displayAvatarURL({ dynamic: true })
            })
            .addFields(
                { name: "__Insignias__", value: `> ${badge}` },
                { name: "Ingreso al Servidor", value: `> <t:${parseInt(member.user.createdTimestamp / 1000)}:R>`, inline: true },
                { name: "Global Ban:", value: `> ${globalban ? `<a:yes:1028005786112245770> Actualmente Globalbaneado` : `<a:error:1030716002259980318> Sin Baneo Registrado`}`, inline: true },
                { name: "Razón:", value: `> ${globalban ? globalban.reason : `<a:error:1030716002259980318> No hay razon presente en la base de datos`}` },
                { name: "Roles", value: `> ${member.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || `<a:error:1030716002259980318> No hay roles registrados`}` },
            )
            .setFooter({
                text: `Perfil solicitado por ${interaction.member.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });
        interaction.reply({ embeds: [embed] }).catch(() => { });
    },
};
