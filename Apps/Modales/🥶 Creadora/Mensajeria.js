const { EmbedBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js");
const ee = require("../../../Tools/Settings/channels.json");
const chalk = require("chalk");
module.exports = {
    developer: true,
    id: "Interactuar",
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const server = interaction.fields.getTextInputValue("id_server");
        const channel = interaction.fields.getTextInputValue("id_channel");
        const message = interaction.fields.getTextInputValue("id_mensaje");
        const count = interaction.fields.getTextInputValue("id_cantidad");
try {
        const guild = client.guilds.cache.get(server);
        const channel2 = guild.channels.cache.get(channel);

        if (!server)  return interaction.reply(ee["comandos"]["modales"]["estructura"]["mensajeria"]["!server"]);
        if (!channel) return interaction.reply(ee["comandos"]["modales"]["estructura"]["mensajeria"]["!channel"]);
        for (let i = 0; i < count; i++) {
            channel2.send(message).catch((error) => {})
        }
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(ee["comandos"]["modales"]["estructura"]["mensajeria"]["titulo"])
                    .setDescription(`\`\`\`yml\n${message}\`\`\``)
                    .setColor(ee["comandos"]["modales"]["estructura"]["mensajeria"]["color"])
                    .setFooter({
                        text: ee["comandos"]["modales"]["estructura"]["mensajeria"]["footer"],
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    }),
            ],
            ephemeral: true,
        }).catch((error) => {})
    } catch(e) {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(ee["comandos"]["modales"]["estructura"]["mensajeria"]["error"]["titulo"])
                    .setDescription(`\`\`\`yml\n${e}\`\`\``)
                    .setColor(ee["comandos"]["modales"]["estructura"]["mensajeria"]["error"]["color"])
                    .setFooter({
                        text: ee["comandos"]["modales"]["estructura"]["mensajeria"]["error"]["footer"],
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    }),
            ],
            ephemeral: true,
        });
    }
    }
}