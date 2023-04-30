const chalk = require("chalk");
const { Client, EmbedBuilder, SelectMenuInteraction, ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, StringSelectMenuBuilder } = require("discord.js");
const Imagenes = require("../../../Tools/Settings/imagenes.json");
const Discord = require("discord.js");
module.exports = {
    id: "Wikipedia",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.values.includes('first_option')) {
            const Row = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("Bedrock")
                    .setPlaceholder("Selecciona alguna opcion para obtener informacion")
                    .addOptions(
                        { label: `🥶 Block Behavior File`, description: `Obten informacion acerca de los archivos de comportamiento de bloques`, value: `first_option` },
                        { label: `🤬 Block Resource File`, description: `Obten informacion acerca de los archivos de recursos de bloques`, value: `second_option` },
                        { label: `🤩 Json UI`, description: `Obten informacion acerca de los archivos Json UI`, value: `third_option` },
                        { label: `🥸 Scripting API`, description: `Obten informacion acerca de la API de scripting`, value: `fourth_option` },
                    ),

            );
            const embed = new EmbedBuilder()
                .setTitle("Informacion acerca de la version de Minecraft Bedrock")
                .setDescription("Selecciona alguna opcion para obtener informacion cualquier duda es atendida en mi servidor por parte de mis desarrolladores")
                .addFields(
                    { name: `❔ __Como Funciono__`, value: `> Selecciona algunos de los menus que se encuentran en el panel de abajo y te informacion relacionada a minecraft\n\n> Por Ejemplo: \`Json UI\` te dara informacion de las estructuras json actuales de los archivos del juevo segun paginas oficiales` },
                )
                .setTimestamp()
                .setColor("Random")
                .setImage(Imagenes["wikipedia"]["bedrock"])
                .setFooter({ text: `Minecraft Bedrock`, iconUrl: client.user.avatarURL() });

            const guia = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setLabel("Bedrock Guide")
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL("https://wiki.bedrock.dev/servers/server-software.html"),
                    new Discord.ButtonBuilder()
                        .setLabel("Minecraft Protocol")
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL("https://github.com/pmmp/BedrockProtocol/blob/master/src/ServerSettingsResponsePacket.php"),
                    new Discord.ButtonBuilder()
                        .setLabel("Gamepedia Wiki")
                        .setStyle(Discord.ButtonStyle.Link)
                        .setURL("https://minecraft.gamepedia.com/Bedrock_Edition"),
                )

            await interaction.reply({ embeds: [embed], components: [guia, Row] }).catch((error) =>
                console.log(chalk.redBright(`[SISTEMA]`) + `A ocurrido un error en el comando [Paneles] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
        } else if (interaction.values.includes('second_option')) {
            const embed = new EmbedBuilder()
                .setTitle("Informacion acerca de Minecraft Croosplay")
                .setDescription("*Minecraft Croosplay es un sistema que permite a los jugadores de Minecraft Java Edition jugar con jugadores de Minecraft Bedrock Edition en un mismo servidor.*")
                .addFields(
                    { name: `❔ __Como Funciono__`, value: `> Selecciona alguna opcion para saber acerca de los metodos principales de servidores croosplay de minecraft\n\n> Por Ejemplo: \`Geyser\` te dara informacion unica y exclusiivamente de servidores geyser de minecraft java` },
                )
                .setTimestamp()
                .setColor("Random")
                .setImage(Imagenes["wikipedia"]["croosplay"])
                .setFooter({ text: `Geyser`, iconUrl: client.user.avatarURL() });

            const menu = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("Geyser")
                        .setPlaceholder("Selecciona alguna opcion para obtener informacion")
                        .addOptions(
                            { label: `🥶 Geyser`, description: `Obten informacion acerca de Geyser Minecraft`, value: `first_option` },
                            { label: `🤬 Floodgate`, description: `Obten informacion acerca de Floodgate Minecraft`, value: `second_option` },
                            { label: `🤩 Velocity`, description: `Obten informacion acerca de Velocity Minecraft`, value: `third_option` },
                            { label: `🤪 Bungeecord`, description: `Obten informacion acerca de Bungeecord Minecraft`, value: `fourth_option` },
                        ),
                );

            await interaction.reply({ embeds: [embed], components: [menu] }).catch((error) =>
                console.log(chalk.redBright(`[SISTEMA]`) + `A ocurrido un error en el comando [Croosplay] por el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`))
        } 
    }
}