const { EmbedBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js");
const ee = require("../../../Tools/Settings/channels.json");
const chalk = require("chalk");
module.exports = {
    developer: true,
    id: "Abandonar",
    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction, client) {
        const server = interaction.fields.getTextInputValue("id_servidor");
        try {
            const guildid = server;
            client.guilds.cache.get(guildid).leave();
            const embed = new EmbedBuilder()
                .setTitle(ee["comandos"]["modales"]["estructura"]["abandonar"]["titulo"])
                .setDescription(ee["comandos"]["modales"]["estructura"]["abandonar"]["descripcion"])
                .setFooter({
                    text: ee["comandos"]["modales"]["estructura"]["abandonar"]["footer"],
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setColor(ee["comandos"]["modales"]["estructura"]["abandonar"]["color"]);
            interaction.reply({ embeds: [embed], ephemeral: true }).catch((error) => {})
        } catch (e) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(ee["comandos"]["modales"]["estructura"]["abandonar"]["error"]["titulo"])
                        .setDescription(`\`\`\`yml\n${e}\`\`\``)
                        .setColor(ee["comandos"]["modales"]["estructura"]["abandonar"]["error"]["color"])
                        .setFooter({
                            text: ee["comandos"]["modales"]["estructura"]["abandonar"]["error"]["footer"],
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        }),
                ],
                ephemeral: true,
            });
        }
    }
}