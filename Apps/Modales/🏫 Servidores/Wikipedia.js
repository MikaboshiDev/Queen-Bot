const { EmbedBuilder, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, WebhookClient, ChatInputCommandInteraction } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const webhook = new WebhookClient({
    url: "https://discord.com/api/webhooks/1037749473851478036/t3SY42e_J0smf7za2n_DHD417lL-hqAGph500F4YruKtKzF08Sz8jChNrctlyv3uWV3-"
});
module.exports = {
    id: "Wiki",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {

        const a = interaction.fields.getTextInputValue("Informacion");
        const b = interaction.fields.getTextInputValue("Codigo");
        const c = interaction.fields.getTextInputValue("Explicacion");
        const d = interaction.fields.getTextInputValue("Link");

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("enviar")
                    .setLabel("Enviar")
                    .setEmoji(`✅`)
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId("cancel")
                    .setEmoji(`🛑`)
                    .setLabel("Cancelar")
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(`Random`)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                .setTitle(`Aporte a la Wiki`)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                .setDescription(a)
                .addFields(
                    { name: `Codigo Mandado`, value: `\`\`\`js\n${b}\`\`\`` },
                    { name: `Explicacion del Codigo`, value: c },
                    { name: `Link de la guia`, value: d || "No se agreggo Ninguna Foto, Web, o Link"}
                )
                .setFooter({
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setTimestamp()
            ], components: [row], ephemeral: true
        }).catch((error) => {})
        const filter = (button) => button.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on("collect", async (button) => {
            if (button.customId === "enviar") {
                const embed = new EmbedBuilder()
                    .setColor(`Random`)
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL({ dynamic: true }) })
                    .setTitle(`Aporte a la Wiki`)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(a)
                    .addFields(
                        { name: `Codigo Mandado`, value: `\`\`\`js\n${b}\`\`\`` },
                        { name: `Explicacion del Codigo`, value: c },
                        { name: `Link de la guia`, value: d || "No se agreggo Ninguna Foto, Web, o Link"}
                    )
                    .setFooter({
                        text: "My Queen https://discord.gg/4Z7QZ7Y",
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp();

                interaction.reply({ 
                    content: `<a:yes:1028005786112245770> Tu aporte a la wiki ha sido enviado con exito!`,
                    ephemeral: true 
                }).then(() => {
                    fs.writeFileSync(`../../../Tools/Registros/Wikipedia/wikipedia-${new Date().toLocaleDateString()}.log`, `Aporte de ${interaction.user.username} a la Wiki\n\nInformacion: ${a}\nCodigo: ${b}\nExplicacion: ${c}\nLink: ${d}`, function (err) {
                        if (err) throw err;
                        client.channels.cache.get("1051985001664745472").send({
                            content: ` Ha llegado un nuevo aporte a la wiki, revisa el archivo \`wikipedia-${new Date().toLocaleDateString()}.log\` para verlo\n\nFecha: ${new Date().toLocaleDateString()}\nHora: ${new Date().toLocaleTimeString()}\nUsuario: ${interaction.user.username}`
                        })
                    })
                })
                button.update({ 
                    embeds: [], 
                    components: [] 
                }).catch((error) => { })
                webhook.send({ 
                    embeds: [embed] 
                }).catch((error) => { })
            }
            if (button.customId === "cancel") {
                button.update({ embeds: [], components: [] }).catch((error) => { })
                interaction.reply({
                    content: `<a:error:1030716002259980318> Has cancelado el envio de tu aporte a nuestra wiki ${interaction.user.username}`,
                    ephemeral: true
                }).catch((error) => { })
            }
        });
    }
}