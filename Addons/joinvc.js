const data = require("../Model/servidor/joinvc")
const Imagenes = require("../Tools/Settings/imagenes.json");
module.exports = client => {
    var { EmbedBuilder } = require(`discord.js`);
    let thumbs = {
        "join": Imagenes["joinVc"]["join"],
        "leave": Imagenes["joinVc"]["left"]
    }
    client.on("voiceStateUpdate", async (oldState, newState) => {
        if (!newState.guild || (newState.member && newState.member.user.bot)) return;

        const Sistema = await data.findOne({ guildID: newState.guild.id });
        if (!Sistema) return;

        const channelId = Sistema.voziD
        const textChannelId = Sistema.textoID
        const message = Sistema.mensaje


        let vcmessages = [{ channelId: channelId, textChannelId: textChannelId, message: message }]
        if ((!oldState.streaming && newState.streaming) || (oldState.streaming && !newState.streaming) || (!oldState.serverDeaf && newState.serverDeaf) || (oldState.serverDeaf && !newState.serverDeaf) || (!oldState.serverMute && newState.serverMute) || (oldState.serverMute && !newState.serverMute) || (!oldState.selfDeaf && newState.selfDeaf) || (oldState.selfDeaf && !newState.selfDeaf) || (!oldState.selfMute && newState.selfMute) || (oldState.selfMute && !newState.selfMute) || (!oldState.selfVideo && newState.selfVideo) || (oldState.selfVideo && !newState.selfVideo)) return

        if (oldState.channelId) {
            if (vcmessages.map(d => d.channelId).includes(oldState.channelId)) {
                let theData = vcmessages.find(d => d.channelId == oldState.channelId);
                if (theData) {
                    let channel = oldState.guild.channels.cache.get(theData.textChannelId)
                    if (!channel) channel = await oldState.guild.channels.fetch(theData.textChannelId).catch(() => { }) || false;
                    if (!channel) return

                    let vcMember = oldState.member;
                    if (!vcMember) vcMember = oldState.guild.members.cache.get(oldState.id);
                    if (!vcMember) vcMember = await oldState.guild.members.fetch(oldState.id).catch(() => { }) || false;
                    if (!vcMember) return
                    if (!oldState.channel.members.size) {
                        let = theMsg = channel.messages.cache.get();
                        if (!theMsg) {
                            channel.send({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("Red")
                                        .setFooter({ text: `ID: ${vcMember.id}`, iconURL: vcMember.displayAvatarURL({ dynamic: true }) })
                                        .setThumbnail(thumbs.leave)
                                        .setDescription(`<@${vcMember.id}> **(\`${vcMember.user.tag}\`) left the VC:** <#${oldState.channelId}>`)
                                ],
                                content: `**\`${vcMember.user.tag}\` Left!** *Removed the Message*`.substring(0, 2000)
                            }).catch(() => { })
                        } else {
                            theMsg.edit({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("Red")
                                        .setFooter({ text: `ID: ${vcMember.id}`, iconURL: vcMember.displayAvatarURL({ dynamic: true }) })
                                        .setThumbnail(thumbs.leave)
                                        .setDescription(`<@${vcMember.id}> **(\`${vcMember.user.tag}\`) left the VC:** <#${oldState.channelId}> **again...**`)
                                ],
                                content: `**\`${vcMember.user.tag}\` Left!** *Removed the Message*`.substring(0, 2000)
                            }).catch(() => { })
                        }
                    }
                } else {

                }
            }
        }

        if (newState.channelId) {

            if (vcmessages.map(d => d.channelId).includes(newState.channelId)) {
                let theData = vcmessages.find(d => d.channelId == newState.channelId);
                if (theData) {
                    let channel = newState.guild.channels.cache.get(theData.textChannelId)
                    if (!channel) channel = await newState.guild.channels.fetch(theData.textChannelId).catch(() => { }) || false;
                    if (!channel) return

                    let vcMember = newState.member;
                    if (!vcMember) vcMember = newState.guild.members.cache.get(newState.id);
                    if (!vcMember) vcMember = await newState.guild.members.fetch(newState.id).catch(() => { }) || false;
                    if (!vcMember) return
                    channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor("Green")
                                .setFooter({ text: `ID: ${vcMember.id}`, iconURL: vcMember.displayAvatarURL({ dynamic: true }) })
                                .setThumbnail(thumbs.join)
                                .setDescription(`<@${vcMember.id}> **(\`${vcMember.user.tag}\`) joined the VC:** <#${newState.channelId}>`)
                        ],
                        content: `${theData.message && theData.message.length > 10 ? theData.message : "*No __Valid__ Message Added*"}`.substring(0, 2000)
                    }).catch(() => { })
                } else {

                }
            }
        }
    })
}