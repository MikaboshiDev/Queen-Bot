const {
    EmbedBuilder,
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ButtonStyle,
    TextInputBuilder,
    ActionRowBuilder,
    TextInputStyle,
    ChannelType,
    ModalBuilder,
} = require("discord.js");
const Discord = require(`discord.js`);
const chalk = require("chalk");
module.exports = {
    botpermisos: [
        "SendMessages", 
        "EmbedLinks",
        "AttachFiles",
        "ManageChannels",
        "ManageMessages",
    ],
    permisos: [
        "SendMessages",
        "EmbedLinks",
        "AttachFiles",
        "ManageChannels",
        "ManageMessages",
    ],
    data: new SlashCommandBuilder()
        .setName("crear")
        .setDescription("🤬 Crea anuncios y embeds personalizados con estos comandos de utilidad")
        .addSubcommand((options) =>
            options
                .setName("anuncio")
                .setDescription("🤬 Crea un anuncio apartir de una interfaz mas dinamica")
        )
        .addSubcommand((options) =>
            options
                .setName("embeds")
                .setDescription("🤬 Crea un embed con las siguientes opciones cutom que tenemos gratuitas")
                .addStringOption((option) =>
                    option
                        .setName("titulo")
                        .setDescription("coloca el titulo del mensaje que tendra")
                        .setRequired(true)
                        .setMaxLength(60)
                )
                .addStringOption((option) =>
                    option
                        .setName("descripcion")
                        .setDescription("coloca la descripcion del embed")
                        .setRequired(true)
                        .setMaxLength(1024)
                )
                .addStringOption((option) =>
                    option
                        .setName("name")
                        .setDescription("coloca el valor del field que va tener en el embed")
                        .setRequired(true)
                        .setMaxLength(60)
                )
                .addStringOption((option) =>
                    option
                        .setName("value")
                        .setDescription("valor del fields que va tener en el mensaje embed")
                        .setRequired(true)
                        .setMaxLength(1024)
                )
                .addStringOption((option) =>
                    option
                        .setName("boton")
                        .setDescription("elije el nombre que tendra el boton del embed")
                        .setRequired(true)
                        .setMaxLength(10)
                )
                .addStringOption((option) =>
                    option
                        .setName("link")
                        .setDescription("menciona el link al que seran difigidos en el boton")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName("color")
                        .setDescription("coloca el color del embed que desees tener")
                        .setRequired(true)
                        .addChoices(
                            { name: "Rojo", value: "Red" },
                            { name: "Azul", value: "Blue" },
                            { name: "Verde", value: "Green" },
                            { name: "Amarillo", value: "Yellow" },
                            { name: "Random", value: "Random" }
                        )
                )
        ),
    async execute(interaction, client) {
        const subcommands = interaction.options.getSubcommand()
        switch (subcommands) {
            case "anuncio": {
                const InputField = new TextInputBuilder()
                    .setCustomId("Autor")
                    .setLabel("Ingresa el Autor")
                    .setPlaceholder("Autor que tendra el anuncio del embed")
                    .setMaxLength(60)
                    .setMinLength(5)
                    .setRequired(false)
                    .setStyle(TextInputStyle.Paragraph);

                const InputField1 = new TextInputBuilder()
                    .setCustomId("Titulo")
                    .setLabel("Ingresa el Titulo")
                    .setPlaceholder("Titulo que tendra el anuncio del embed")
                    .setMaxLength(100)
                    .setMinLength(5)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);

                const InputField2 = new TextInputBuilder()
                    .setCustomId("Descripcion")
                    .setLabel("Ingresa la Descripcion")
                    .setPlaceholder("Descripcion que tendra el anuncio del embed")
                    .setMaxLength(500)
                    .setMinLength(5)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);

                const InputField4 = new TextInputBuilder()
                    .setCustomId("Fields2")
                    .setLabel("Ingresa el Valor")
                    .setPlaceholder("Valor Fields que tendra el anuncio del embed")
                    .setMaxLength(250)
                    .setMinLength(5)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);

                const InputField5 = new TextInputBuilder()
                    .setCustomId("Fields1")
                    .setLabel("Ingresa el Nombre")
                    .setPlaceholder("Nombre del Fields del anuncio de discord")
                    .setMaxLength(50)
                    .setMinLength(10)
                    .setRequired(true)
                    .setStyle(TextInputStyle.Paragraph);

                const TestModalTextModalInputRow = new ActionRowBuilder().addComponents(
                    InputField
                );
                const TestModalTextModalInputRow1 = new ActionRowBuilder().addComponents(
                    InputField1
                );
                const TestModalTextModalInputRow2 = new ActionRowBuilder().addComponents(
                    InputField2
                );
                const TestModalTextModalInputRow4 = new ActionRowBuilder().addComponents(
                    InputField4
                );
                const TestModalTextModalInputRow5 = new ActionRowBuilder().addComponents(
                    InputField5
                );

                const anuncio = new ModalBuilder()
                    .setCustomId("Embed")
                    .setTitle("Anuncio Embed Custom")
                    .addComponents(TestModalTextModalInputRow)
                    .addComponents(TestModalTextModalInputRow1)
                    .addComponents(TestModalTextModalInputRow2)
                    .addComponents(TestModalTextModalInputRow5)
                    .addComponents(TestModalTextModalInputRow4);

                await interaction.showModal(anuncio).catch((error) => {});
            }
                break;
            case "embeds": {
                const titulo = interaction.options.getString("titulo");
                const descripcion = interaction.options.getString("descripcion");
                const nombre = interaction.options.getString("name");
                const valor = interaction.options.getString("value");
                const boton = interaction.options.getString("boton");
                const link = interaction.options.getString("link");
                const color = interaction.options.getString("color");

                let regex = /(https?:\/\/[^\s]+)/g;
                if (!regex.test(link))
                    return interaction.reply({
                        content: `<:VS_cancel:1006609599199186974> el link que has puesto no es valido`,
                        ephemeral: true,
                    });

                const row = new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("enviar")
                        .setLabel("Enviar")
                        .setEmoji(`✅`)
                        .setStyle(ButtonStyle.Danger),
                    new Discord.ButtonBuilder()
                        .setCustomId("cancel")
                        .setEmoji(`🛑`)
                        .setLabel("Cancelar")
                        .setStyle(ButtonStyle.Secondary)
                );

                await interaction.reply({
                    content: `<:panda_gift:1007529203119439882> Asi sera mandado tu anuncio en el servidor ${interaction.guild.name} tu boton extra sera agregado al embed cuando lo mandes de forma oficial`,
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(titulo)
                            .setDescription(descripcion)
                            .addFields({ name: nombre, value: valor })
                            .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                            .setColor(color)
                            .setFooter({
                                text: `Anuncio enviado por ${interaction.user.username}`,
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                            })
                            .setTimestamp(),
                    ],
                    components: [row],
                    ephemeral: true,
                }).catch((error) => {});
                const filter = (button) => button.user.id === interaction.user.id;
                const collector = interaction.channel.createMessageComponentCollector({
                    filter,
                    time: 15000,
                });
                collector.on("collect", async (button) => {
                    if (button.customId === "enviar") {
                        const e = new EmbedBuilder()
                            .setTitle(titulo)
                            .setDescription(descripcion)
                            .addFields({ name: nombre, value: valor })
                            .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                            .setColor(color)
                            .setFooter({
                                text: `Anuncio enviado por ${interaction.user.username}`,
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                            })
                            .setTimestamp();

                        const i = new Discord.ButtonBuilder()
                            .setURL(link)
                            .setLabel(boton)
                            .setStyle(ButtonStyle.Link);

                        const o = new Discord.ActionRowBuilder().addComponents(i);

                        interaction.channel.send({ embeds: [e], components: [o] }).catch((error) => {});
                        button.update({ embeds: [], components: [] }).catch((error) => { });
                    }
                    if (button.customId === "cancel") {
                        const embed = new EmbedBuilder()
                            .setTitle(titulo)
                            .setDescription(descripcion)
                            .addFields({ name: nombre, value: valor })
                            .setThumbnail(interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL({ dynamic: true }))
                            .setColor(color)
                            .setFooter({
                                text: `Anuncio enviado por ${interaction.user.username}`,
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
                            })
                            .setTimestamp();
                        button.update({ embeds: [embed], components: [] });
                        interaction.channel.send({
                            content: `✅ Cancelado el anuncio por ${interaction.user.username}`,
                            ephemeral: true,
                        }).catch((error) => {});
                    }
                });
            }
                break;
        }
    }
}