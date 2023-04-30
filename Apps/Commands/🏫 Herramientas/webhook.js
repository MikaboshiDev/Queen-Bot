const {
    SlashCommandBuilder,
    ButtonStyle,
    ChannelType,
    EmbedBuilder,
} = require("discord.js");
const Discord = require("discord.js");
const chalk = require("chalk");
const { error } = require("winston");
module.exports = {
    botpermisos: [
        "SendMessages",
        "EmbedLinks",
        "ManageWebhooks",
    ],
    permisos: [
        "SendMessages",
        "EmbedLinks",
        "ManageWebhooks",
    ],
    data: new SlashCommandBuilder()
        .setName("webhook")
        .setDescription("🏫 Crea un webhook custom en uno de los canales del servidor")
        .addSubcommand((options) => 
            options
                .setName("create")
                .setDescription("🏫 Crea tu propio webhook de discord custom")
                .addStringOption((option) => 
                    option
                        .setName("name")
                        .setDescription("Menciona cual va ser el nombre del webhook")
                        .setRequired(true)
                        .setMaxLength(25)
                    )
                .addStringOption((option) => 
                    option
                        .setName("avatar")
                        .setDescription("Cual va ser el avatar del webhook a crear")
                        .setRequired(true)
                    )
                .addChannelOption((option) => 
                    option
                        .setName("canal")
                        .setDescription("Menciona cual va ser el canal del webhook (opcional)")
                        .setRequired(false)
                        .addChannelTypes(ChannelType.GuildText)
                    )
                )
        .addSubcommand((option) => 
            option
                .setName("info")
                .setDescription("🏫 Obten informacion de los webhook de tu servidor")
                .addChannelOption((option) => 
                    option
                        .setName("canal")
                        .setDescription("Menciona cual va ser el canal a investigar")
                        .setRequired(false)
                        .addChannelTypes(ChannelType.GuildText)
                    )
                )
        .addSubcommand((option) => 
            option
                .setName("delete")
                .setDescription("🏫 Elimina un webhook de tu servidor")
                .addStringOption((option) => 
                    option
                        .setName("url")
                        .setDescription("Menciona cual va ser el url del webhook a eliminar")
                        .setRequired(true)
                    )
                )
        .addSubcommand((option) => 
            option
                .setName("enviar")
                .setDescription("🏫 Envia un mensaje atraves de un webhook")
                .addStringOption((option) => 
                    option
                        .setName("mensaje")
                        .setDescription("Menciona cual va ser el mensaje del webhook")
                        .setRequired(true)
                        .setMaxLength(2000)
                    )
                .addStringOption((option) => 
                    option
                        .setName("url")
                        .setDescription("Menciona el url del webhoook a utilizar en el mensaje")
                        .setRequired(true)
                    )
                ),
    async execute(interaction, client) {
        try {
            const subcommand = interaction.options.getSubcommand();
            switch (subcommand) {
                case "create": {
                    const name = interaction.options.getString("name");
                    const avatar = interaction.options.getString("avatar");
                    const canal = interaction.options.getChannel("canal") || interaction.channel;

                    let regex = /(https?:\/\/[^\s]+)/g;
                    if (!regex.test(avatar)) return interaction.reply({ 
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle("Error Webhooks! 🔴")
                                .setDescription([
                                    `\`•\` Estado: Error`,
                                    `\`•\` Motivo: El link puesto no es valido`,
                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                ].join("\n"))
                        ],
                        ephemeral: true 
                    }).catch((error) => {});

                    const webhook = await canal.createWebhook({
                        name: name,
                        avatar: avatar,
                    });

                    const embed = new Discord.EmbedBuilder()
                        .setTitle("Webhook Creado! 🟢")
                        .setDescription([
                            `\`•\` Estado: Creado`,
                            `\`•\` Motivo: Webhook Creado`,
                            `\`•\` Fecha: ${new Date().toLocaleString()}`,
                            `\`•\` Canal: ${canal}`,
                            `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                        ].join("\n"))
                        .setColor("Random")
                        .setTimestamp()
                        .setThumbnail(interaction.user.avatarURL())
                        .setFooter({ text: "Herramientas Utils Discord", iconURL: interaction.user.avatarURL() });

                    interaction.reply({ embeds: [embed], ephemeral: true }).catch((error) => {});
                }
                    break;
                case "info": {
                    const canal = interaction.options.getChannel("canal") || interaction.channel;
                    const webhooks = await canal.fetchWebhooks();

                    if (!webhooks) return interaction.reply({ 
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle("Error Webhooks! 🔴")
                                .setDescription([
                                    `\`•\` Estado: Error`,
                                    `\`•\` Motivo: No hay webhooks en el canal ${canal} intenta mencionando otro canal del gremio`,
                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                ])
                        ],
                        ephemeral: true 
                    }).catch((error) => {});

                    const embed = new Discord.EmbedBuilder()
                        .setTitle("🏫 Webhooks del Servidor")
                        .setDescription([
                            `\`•\` Estado: Encontrado`,
                            `\`•\` Motivo: Webhooks Encontrados`,
                            `\`•\` Fecha: ${new Date().toLocaleString()}`,
                            `\`•\` Hora: ${new Date().toLocaleTimeString()}\n`,
                            `\`👑\`**Servidor:** ${interaction.guild.name} (\`${interaction.guild.id}\`)`,
                            `\`🍃\`**Canal:** ${interaction.channel} (\`${interaction.channel.id}\`)`
                        ].join("\n"))
                        .addFields(
                            { name: "\`•\` Webhooks", value: `\`\`\`${webhooks.map((webhook) => webhook.name).join("\n")}\`\`\``, inline: true },
                            { name: "\`•\` ID", value: `\`\`\`${webhooks.map((webhook) => webhook.id).join("\n")}\`\`\``, inline: true },
                            { name: "\`•\` Creado", value: `\`\`\`${webhooks.map((webhook) => webhook.createdAt).join("\n")}\`\`\`` },
                            { name: "\`•\` URL", value: `\`\`\`${webhooks.map((webhook) => webhook.url).join("\n")}\`\`\`` },

                        )
                        .setColor("Random")
                        .setTimestamp()
                        .setThumbnail(interaction.user.avatarURL())
                        .setFooter({ text: "Herramientas Utils Discord", iconURL: interaction.user.avatarURL() });

                    interaction.reply({ embeds: [embed], ephemeral: true }).catch((error) => {});
                }
                    break;
                case "enviar": {
                    const mensaje = interaction.options.getString("mensaje");
                    const url = interaction.options.getString("url");

                    let regex = /(https?:\/\/[^\s]+)/g;
                    if (!regex.test(url)) return interaction.reply({ 
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle("Error Webhooks! 🔴")
                                .setDescription([
                                    `\`•\` Estado: Error`,
                                    `\`•\` Motivo: El link puesto no es valido`,
                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                ].join("\n"))
                        ],
                        ephemeral: true
                    }).catch((error) => {});

                    const webhook = new Discord.WebhookClient({ url: url });

                    if (!webhook) return interaction.reply({ 
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle("Error Webhooks! 🔴")
                                .setDescription([
                                    `\`•\` Estado: Error`,
                                    `\`•\` Motivo: No se pudo encontrar el webhook con el link que has puesto`,
                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                ].join("\n"))
                        ],
                        ephemeral: true 
                    }).catch((error) => {});

                    interaction.reply({ 
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle("Webhook Creado! 🟢")
                                .setDescription([
                                    `\`•\` Estado: Correcto`,
                                    `\`•\` Accion: El mensaje ha sido enviado con exito en el canal`,
                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                ].join("\n"))
                        ],
                        ephemeral: true 
                    }).catch((error) => {});

                    webhook.send({
                        content: mensaje,
                        username: interaction.user.username,
                        avatarURL: interaction.user.avatarURL(),
                    }).catch((error) => {});
                }
                    break;
                case "delete": {
                    const url = interaction.options.getString("url");

                    let regex = /(https?:\/\/[^\s]+)/g;
                    if (!regex.test(url)) return interaction.reply({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle("Error Webhooks! 🔴")
                                .setDescription([
                                    `\`•\` Estado: Error`,
                                    `\`•\` Motivo: El link puesto no es valido`,
                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                ].join("\n"))
                        ],
                        ephemeral: true 
                    }).catch((error) => {});

                    const webhook = new Discord.WebhookClient({ url: url });

                    if (!webhook) return interaction.reply({ 
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle("Error Webhooks! 🔴")
                                .setDescription([
                                    `\`•\` Estado: Error`,
                                    `\`•\` Motivo: No se pudo encontrar el webhook con el link que has puesto`,
                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                ].join("\n"))
                        ],
                        ephemeral: true 
                    }).catch((error) => {});

                    interaction.reply({ 
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle("Webhook Creado! 🟢")
                                .setDescription([
                                    `\`•\` Estado: Correcto`,
                                    `\`•\` Accion: El webhook ha sido eliminado con exito del servido`,
                                    `\`•\` Fecha: ${new Date().toLocaleString()}`,
                                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                                ].join("\n"))
                        ],
                        ephemeral: true 
                    }).catch((error) => {});

                    webhook.delete().catch((error) => {});

                }
                    break;
            }
        } catch (e) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(
                            `<:VS_cancel:1006609599199186974> New status code invalid?`
                        )
                        .setDescription(`\`\`\`yml\n${e}\`\`\``)
                        .setColor("Random")
                        .setFooter({ text: `Error en el comando webhook` }),
                ],
                ephemeral: true,
            });
        }
    }
}