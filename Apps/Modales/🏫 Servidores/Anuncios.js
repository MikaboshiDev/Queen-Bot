const { EmbedBuilder, CommandInteraction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction } = require("discord.js");
const chalk = require("chalk");
module.exports = {
    id: "Embed",
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const input = interaction.fields.getTextInputValue("Autor");
        const input1 = interaction.fields.getTextInputValue("Titulo");
        const input3 = interaction.fields.getTextInputValue("Descripcion");
        const input5 = interaction.fields.getTextInputValue("Fields2");
        const input2 = interaction.fields.getTextInputValue("Fields1");
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
            )


        await interaction.reply({
            content: `<a:yes:1028005786112245770>Asi sera mandado tu anuncio en el servidor ${interaction.guild.name}`,
            embeds: [new EmbedBuilder()
                .setColor(`Random`)
                .setAuthor({ name: input || " " })
                .setTitle(input1)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                .setDescription(input3)
                .addFields({ name: input2, value: input5, inline: true })
                .setFooter({
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setTimestamp()
            ], components: [row], ephemeral: true
        }).catch((error) => {});
        const filter = (button) => button.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on("collect", async (button) => {
            if (button.customId === "enviar") {
                const embed = new EmbedBuilder()
                    .setColor(`Random`)
                    .setAuthor({ name: input || " " })
                    .setTitle(input1)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(input3)
                    .addFields({ name: input2, value: input5, inline: true })
                    .setFooter({
                        text: "My Queen https://discord.gg/4Z7QZ7Y",
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                interaction.channel.send({ embeds: [embed] }).catch((error) => {});
                button.update({ embeds: [], components: [] }).catch((error) => {});
            }
            if (button.customId === "cancel") {
                const embed = new EmbedBuilder()
                    .setColor(`Random`)
                    .setAuthor({ name: input || " " })
                    .setTitle(input1)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(input3)
                    .addFields({ name: input2, value: input5, inline: true })
                    .setFooter({
                        text: "My Queen https://discord.gg/4Z7QZ7Y",
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                button.update({ embeds: [embed], components: [] }).catch((error) => {});
                interaction.channel.send({ content: `✅ Cancelado el anuncio por ${interaction.user.username}`, ephemeral: true }).catch((error) => {});
            }
        });
    },
};
