const { EmbedBuilder, GuilMember, Client, AttachmentBuilder } = require("discord.js");
const canvacord = require("canvacord")
const despedidaDB = require("../../../Model/bienvenidas/leaveDB");
const DB = require("../../../Model/economia/cookies");
const chalk = require("chalk");
module.exports = {
    name: "guildMemberRemove",
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

            let datos = await despedidaDB.findOne({ ServidorID: guild.id }).catch(err => { })
            if (!datos) return
            if (!datos.CanalID) return
            let imagen = datos.Imagen
            const bienvenida = new canvacord.Leaver()
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
                bienvenida.build().then(async data => {
                    const attachment = new AttachmentBuilder(data, "leaver.png")
                    await canal.send({ content: mensaje, files: [attachment] }).catch((error) => { })
                    let cookies = await DB.findOne({ GuildID: guild.id, UserID: member.user.id });
                    if (!cookies) return;
                    await DB.findOneAndUpdate({ GuildID: guild.id, UserID: member.user.id });
                }).catch(error => { })
            }
        } catch (error) { console.log(error) }
    }
}