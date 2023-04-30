const mongoose = require("mongoose");
const Discord = require("discord.js");
const {
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType } = require('discord.js');
const loggerSchema = require("../../../Model/servidor/joinvc");
const { readdirSync } = require('fs');
module.exports = {
    botpermisos: [
        "Administrator"
    ],
    permisos: [
        "Administrator"
    ],
    data: new SlashCommandBuilder()
        .setName('joinvc')
        .setDescription('🎉 Configura el sistema de canal de soporte del servidor de discord')
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('🎉 Configura el canal de soporte a su gusto.')
                .addChannelOption(option =>
                    option.setName('canal')
                        .setDescription('El canal que sera el grupo de soporte a registrar.')
                        .addChannelTypes(Discord.ChannelType.GuildVoice)
                        .setRequired(true)
                )
                .addChannelOption(option =>
                    option.setName('logs')
                        .setDescription('Canal al que se enviaran los logs de entrada del canal.')
                        .addChannelTypes(Discord.ChannelType.GuildText)
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option.setName('mensaje')
                        .setDescription('Mensaje que se enviara al entrar a un canal de soporte.')
                        .setRequired(true)
                )
            )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('🎉 Elimina El sistema de canal de soporte del servidor.')),
    async execute(interaction, client) {
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case 'set': {
                const canal = interaction.options.getChannel('canal');
                const logs = interaction.options.getChannel('logs');
                const mensaje = interaction.options.getString('mensaje');

                const data = await loggerSchema.findOne({ guildID: interaction.guild.id });
                if (data) {
                    await loggerSchema.findOneAndDelete({ guildID: interaction.guild.id });
                    const newData = new loggerSchema({
                        guildID: interaction.guild.id,
                        voziD: canal.id,
                        textoID: logs.id,
                        mensaje: mensaje
                    });
                    newData.save();
                    const response = new EmbedBuilder()
                        .setTitle('Join Vc Configurados! 🟢')
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
                        voziD: canal.id,
                        textoID: logs.id,
                        mensaje: mensaje
                    });
                    newDatas.save();
                    const response = new EmbedBuilder()
                        .setTitle('Join Vc Configurados! 🟢')
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
            case 'remove': {
                const data = await loggerSchema.findOne({ guildID: interaction.guild.id });
                if (!data) return;

                await loggerSchema.findOneAndDelete({ guildID: interaction.guild.id });

                const response = new EmbedBuilder()
                    .setTitle('Join Vc Configurados! 🟢')
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