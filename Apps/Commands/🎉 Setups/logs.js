const mongoose = require("mongoose");
const Discord = require("discord.js");
const {
    EmbedBuilder,
    ActionRowBuilder,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType } = require('discord.js');
const loggerSchema = require("../../../Model/servidor/logs");
const { readdirSync } = require('fs');
module.exports = {
    botpermisos: [
        "Administrator"
    ],
    permisos: [
        "Administrator"
    ],
    data: new SlashCommandBuilder()
        .setName('logger')
        .setDescription('🎉 Configura los logs del servidor.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('🎉 Configura los logs del servidor a tu gusto.')
                .addChannelOption(option =>
                    option.setName('canal')
                        .setDescription('El canal donde se enviaran los logs.')
                        .addChannelTypes(Discord.ChannelType.GuildText)
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('info')
                .setDescription('🎉 Muestra la informacion de los logs del servidor.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('🎉 Elimina los logs del servidor.')),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case 'set': {
                const canal = interaction.options.getChannel('canal');

                const data = await loggerSchema.findOne({ guildID: interaction.guild.id });
                if (data) {
                    await loggerSchema.findOneAndDelete({ guildID: interaction.guild.id });
                    const newData = new loggerSchema({
                        guildID: interaction.guild.id,
                        channelID: canal.id
                    });
                    newData.save();
                    const response = new EmbedBuilder()
                        .setTitle('Logs Configurados! 🟢')
                        .setDescription([
                            `\`•\` Estado: \`Configurado\``,
                            `\`•\` Canal: ${canal}`,
                            `\`•\` ID: \`${canal.id}\``,
                            `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                            `\`•\` Hora: ${new Date().toLocaleTimeString()}`
                        ].join('\n'))
                        .setColor('Random')
                        .setTimestamp();
                    interaction.reply({ embeds: [response], ephemeral: true });
                } else {
                    const newDatas = new loggerSchema({
                        guildID: interaction.guild.id,
                        channelID: canal.id
                    });
                    newDatas.save();
                    const response = new EmbedBuilder()
                        .setTitle('Logs Configurados! 🟢')
                        .setDescription([
                            `\`•\` Estado: \`Configurado\``,
                            `\`•\` Canal: ${canal}`,
                            `\`•\` ID: \`${canal.id}\``,
                            `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                            `\`•\` Hora: ${new Date().toLocaleTimeString()}`
                        ].join('\n'))
                        .setColor('Random')
                        .setTimestamp();
                    interaction.reply({ embeds: [response], ephemeral: true });
                }
            }
                break;
            case 'info': {
                const data = await loggerSchema.findOne({ guildID: interaction.guild.id });
                if (!data) return;

                const datas = new EmbedBuilder()
                    .setTitle('Logs del Servidor Datos! 🟡')
                    .setDescription([
                        `\`•\` Estado: \`Configurado\``,
                        `\`•\` Canal: <#${data.channelID}>`,
                        `\`•\` ID: \`${data.channelID}\``,
                        `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                        `\`•\` Hora: ${new Date().toLocaleTimeString()}`
                    ].join('\n'))
                    .setTimestamp()
                    .setColor('Random');

                interaction.reply({ embeds: [datas], ephemeral: true });
            }
                break;
            case 'remove': {
                const data = await loggerSchema.findOne({ guildID: interaction.guild.id });
                if (!data) return;

                await loggerSchema.findOneAndDelete({ guildID: interaction.guild.id });

                const response = new EmbedBuilder()
                    .setTitle('Logs Eliminados! 🟢')
                    .setDescription([
                        `\`•\` Estado: \`Eliminado\``,
                        `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                        `\`•\` Hora: ${new Date().toLocaleTimeString()}`
                    ].join('\n'))
                    .setColor('Random')
                    .setTimestamp();

                interaction.reply({ embeds: [response], ephemeral: true });

            }
                break;
        }
    }
}