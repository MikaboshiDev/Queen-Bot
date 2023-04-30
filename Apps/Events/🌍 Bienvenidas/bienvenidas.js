const { EmbedBuilder, GuilMember, Client, AttachmentBuilder } = require("discord.js");
const canvacord = require("canvacord")
const bienvenidaDB = require("../../../Model/bienvenidas/joinsDB");
const chalk = require("chalk");
module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuilMember} member
     * @param {Client} client
     */
    async execute(member, client) {
    const { user, guild } = member
    try {
            if (!member.guild.members.me.permissions.has("SendMessages")) return;
            if (!member.guild.members.me.permissions.has("EmbedLinks")) return;
            if (!member.guild.members.me.permissions.has("AttachFiles")) return;
            
            let datos = await bienvenidaDB.findOne({ ServidorID: guild.id }).catch(err => { })
            if (!datos) return
            if (!datos.CanalID) return
            const imagen = datos.Imagen
            const bienvenida = new canvacord.Welcomer()
                .setUsername(`${member.user.username}`)
                .setDiscriminator(`${member.user.discriminator}`)
                .setMemberCount(`${member.guild.memberCount}`)
                .setGuildName(`${member.guild.name}`)
                .setAvatar(`${member.user.displayAvatarURL({ dynamic: false, format: "png" })}`)
                .setBackground(imagen)
                .setColor("title", "#2f35e0")
                .setColor("title-border", "#ffffff")
                .setColor("avatar", "#2f35e0")
                .setColor("username", "#000000")
                .setColor("username-box", "#c6e2ff")
                .setColor("hashtag", "#faebd7")
                .setColor("discriminator", "#000000")
                .setColor("discriminator-box", "#2f35e0")
                .setColor("message", "#faebd7")
                .setColor("message-box", "#2f35e0")
                .setColor("member-count", "#fefede")
                .setColor("background", "#2f35e0")
                .setColor("border", "#faebd7")

            if (datos.CanalID) {

                const mensaje = datos.Mensaje.replace("{user}", member).replace("{server}", guild.name)
                const canalid = datos.CanalID
                const canal = client.channels.cache.get(canalid)
                const rolid = datos.RolID
                const rol = guild.roles.cache.get(rolid)

                if (rol) {

                    await member.roles.add(rol)
                    bienvenida.build().then(async data => {
                        const attachment = new AttachmentBuilder(data, "welcomer.png")
                        await canal.send({ content: mensaje, files: [attachment] }).catch((error) => {})
                        member.send({ content: mensaje, files: [attachment] }).catch((error) => {})

                    }).catch((error) => { })
                } else {
                    bienvenida.build().then(async data => {
                        const attachment = new AttachmentBuilder(data, "welcomer.png")
                        await canal.send({ content: mensaje, files: [attachment] }).catch((error) => {})
                        member.send({ content: mensaje, files: [attachment] }).catch((error) => {})
                    }).catch(error => { })
                }
            }
        } catch (error) { console.log(error) }
    }
}