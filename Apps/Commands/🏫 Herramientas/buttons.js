const {
    SlashCommandBuilder,
    ButtonStyle,
    ChannelType,
    EmbedBuilder,
    CommandInteraction,
    Client
} = require("discord.js");
const Discord = require("discord.js");
const chalk = require("chalk");
module.exports = {
    botpermisos: [
        "SendMessages",
        "EmbedLinks",
        "ManageMessages",
    ],
    permisos: [
        "SendMessages",
        "ManageMessages",
        "EmbedLinks",
    ],
    data: new SlashCommandBuilder()
        .setName("buttons")
        .setDescription("🏫 Crea un webhook custom en uno de los canales del servidor")
        .addSubcommand((options) => 
            options
                .setName("create")
                .setDescription("🏫 Crea tu propio webhook de discord custom")
                .addStringOption((option) => 
                    option
                        .setName("id")
                        .setDescription("agrega la id del mensaje del bot a editar")
                        .setRequired(true)
                    )
                .addStringOption((option) => 
                    option  
                        .setName("label")
                        .setDescription("agrega el texto del boton")
                        .setRequired(true)
                        .setMaxLength(20)
                    )
                .addStringOption((option) => 
                    option
                        .setName("url")
                        .setDescription("agrega la url del boton")
                        .setRequired(true)
                    )
                ),
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * 
     */
    async execute(interaction, client) {
        try {
            const subcommand = interaction.options.getSubcommand();
            switch (subcommand) {
                case "create": {
                    const mensaje = interaction.options.getString("id");
                    const label = interaction.options.getString("label");
                    const url = interaction.options.getString("url");

                    let regex = /(https?:\/\/[^\s]+)/g;
                    if (!regex.test(url)) return interaction.reply({ 
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setColor("Red")
                                .setTitle("Error Botones! 🟡")
                                .setDescription([
                                    `\`•\` Estado: Error`,
                                    `\`•\` Motivo: El link puesto no es valido`,
                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                ])
                        ],
                        ephemeral: true 
                    }).catch((error) => {});
                    if (label > 10) return interaction.reply({ 
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setColor("Red")
                                .setTitle("Error Botones! 🟡")
                                .setDescription([
                                    `\`•\` Estado: Error`,
                                    `\`•\` Motivo: El texto puesto no puede sobrepasar los 10 caracteres`,
                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                ])
                        ],                        
                        ephemeral: true 
                    }).catch((error) => {});

                    try {
                        if (interaction.channel.type == ChannelType.DM)
                            return interaction.reply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setColor("Red")
                                        .setTitle("Error Botones! 🟡")
                                        .setDescription([
                                            `\`•\` Estado: Error`,
                                            `\`•\` Motivo: No son validos mensajes directos`,
                                            `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                            `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                        ])
                                ],                             
                                ephemeral: true,
                            }).catch((error) => {});
                        if (
                            !client.channels.cache
                                .get(interaction.channelId)
                                .messages.cache.get(mensaje)
                        )
                            return interaction.reply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setColor("Red")
                                        .setTitle("Error Botones! 🟡")
                                        .setDescription([
                                            `\`•\` Estado: Error`,
                                            `\`•\` Motivo: Nose encontro en el servidor el mensaje`,
                                            `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                            `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                        ])
                                ],
                                ephemeral: true,
                            }).catch((error) => {});
                        if (
                            !client.channels.cache
                                .get(interaction.channelId)
                                .messages.cache.get(mensaje).embeds
                        )
                            return interaction.reply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setColor("Red")
                                        .setTitle("Error Botones! 🟡")
                                        .setDescription([
                                            `\`•\` Estado: Error`,
                                            `\`•\` Motivo: El mensaje no es un embed para editar`,
                                            `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                            `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                        ])
                                ],
                                ephemeral: true,
                            }).catch((error) => {});
                        if (
                            client.channels.cache
                                .get(interaction.channelId)
                                .messages.cache.get(mensaje).author.id != client.user.id
                        )
                            return interaction.reply({
                                embeds: [
                                    new Discord.EmbedBuilder()
                                        .setColor("Red")
                                        .setTitle("Error Botones! 🟡")
                                        .setDescription([
                                            `\`•\` Estado: Error`,
                                            `\`•\` Motivo: El mensaje no es mio en el servidor`,
                                            `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                            `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                        ])
                                ],
                                ephemeral: true,
                            }).catch((error) => {});
                        if (
                            client.channels.cache
                                .get(interaction.channelId)
                                .messages.cache.get(mensaje)
                        ) {
                            const embed = client.channels.cache
                                .get(interaction.channelId)
                                .messages.cache.get(mensaje).embeds[0];
                            const button = new Discord.ButtonBuilder()
                                .setStyle(ButtonStyle.Link)
                                .setLabel(label)
                                .setURL(url);
                            const row = new Discord.ActionRowBuilder().addComponents(
                                button
                            );
                            client.channels.cache
                                .get(interaction.channelId)
                                .messages.fetch(mensaje)
                                .then((message) => {
                                    message.edit({ 
                                        embeds: [embed], 
                                        components: [row] 
                                    }).catch((error) => {});
                                    interaction.reply({
                                        embeds: [
                                            new Discord.EmbedBuilder()
                                                .setColor("Red")
                                                .setTitle("Error Botones! 🟢")
                                                .setDescription([
                                                    `\`•\` Estado: Correcto`,
                                                    `\`•\` Motivo: El boton se a agregado correctamente`,
                                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}\n`,
                                                    `\`•\` Nombre: ${label}`,
                                                    `\`•\` Url: ${url}`,
                                                ])
                                        ],
                                        ephemeral: true,
                                    });
                                });
                        }
                    } catch (e) {
                        interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle(`New Status Error! 🔴`)
                                    .setDescription(`\`\`\`yml\n${e}\`\`\``)
                                    .setColor("Random")
                                    .setFooter({ text: `Error en el comando tools`, iconURL: client.user.avatarURL() }),
                            ],
                            ephemeral: true,
                        });
                    }
                }
                    break;
            }
        } catch (e) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`New Status Error! 🔴`)
                        .setDescription(`\`\`\`yml\n${e}\`\`\``)
                        .setColor("Random")
                        .setFooter({ text: `Error en el comando webhook`, iconURL: client.user.avatarURL() }),
                ],
                ephemeral: true,
            });
        }
    }
}