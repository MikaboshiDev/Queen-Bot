const chalk = require("chalk");
const { Client, EmbedBuilder, SelectMenuInteraction } = require("discord.js");
const Discord = require("discord.js");
const Imagenes = require("../../../Tools/Settings/imagenes.json");
module.exports = {
    id: "Geyser",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.values.includes('first_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Informacion acerca de Geyser")
                    .setDescription("*Geyser es un servidor de Minecraft Bedrock Edition que permite a los jugadores de Minecraft Java Edition conectarse a servidores de Minecraft Bedrock Edition.*")
                    .setTimestamp()
                    .setImage(Imagenes["croosplay"]["geyser"])
                    .setColor("Random")
                    .addFields(
                        { name: `\`•\` Informacion Basica`, value: `Geyser es un middleware que traduce todos los paquetes entrantes y salientes. Dicho esto, Geyser funciona como un proxy independiente, lo que significa que puede usarlo para unirse a cualquier servidor Java moderno de Minecraft. Geyser también se puede instalar en su servidor como un complemento.` },
                        { name: `\`•\` ¿Como funciona?`, value: `Geyser funciona como un proxy independiente, lo que significa que puede usarlo para unirse a cualquier servidor Java moderno de Minecraft. Geyser también se puede instalar en su servidor como un complemento, por lo que puede hacer que su servidor sea compatible fácilmente con Minecraft: Bedrock Edition.` },
                        { name: `\`•\` ¿Que es Floodgate?`, value: `Floodgate es un complemento de Geyser que permite a los jugadores de Minecraft: Bedrock Edition usar su cuenta de Minecraft: Java Edition para iniciar sesión en su servidor.` },
                    )
                    .setThumbnail(client.user.avatarURL())
                    .setFooter({ text: `Geyser Minecraft Croosplay Bedrock y Java` })
                ], components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setLabel("Geyser Guide")
                                .setStyle(Discord.ButtonStyle.Link)
                                .setURL("https://geysermc.org/"),
                        )
                ], ephemeral: true
            })
        } else if (interaction.values.includes('second_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Informacion acerca de Floodgate")
                    .setDescription("*Floodgate es un complemento de modo híbrido que permite que las cuentas de Minecraft: Bedrock se unan a los servidores de Minecraft: Java Edition sin necesidad de una cuenta de Minecraft: Java Edition. Esto es algo que instalas además de Geyser. A diferencia de Geyser, Floodgate solo se puede instalar como complemento en Spigot (incluidos Paper y forks).*")
                    .setTimestamp()
                    .setColor("Random")
                    .setImage(Imagenes["croosplay"]["floogdate"])
                    .addFields(
                        { name: `\`•\` Informacion Basica`, value: `Floodgate es un complemento de Geyser que permite a los jugadores de Minecraft: Bedrock Edition usar su cuenta de Minecraft: Java Edition para iniciar sesión en su servidor.` },
                        { name: `\`•\` ¿Como funciona?`, value: `Floodgate funciona como un complemento de Geyser, lo que significa que debe tener Geyser instalado para usar Floodgate.` },
                        { name: `\`•\` ¿Que es Geyser?`, value: `Geyser es un servidor de Minecraft Bedrock Edition que permite a los jugadores de Minecraft Java Edition conectarse a servidores de Minecraft Bedrock Edition.` },
                    )
                    .setThumbnail(client.user.avatarURL())
                    .setFooter({ text: `Floodgate Minecraft Croosplay Bedrock y Java`, })
                ], components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setLabel("Floodgate Guide")
                                .setStyle(Discord.ButtonStyle.Link)
                                .setURL("https://wiki.geysermc.org/floodgate/"),
                        )
                ], ephemeral: true
            })
        } else if (interaction.values.includes(`third_option`)) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Informacion acerca de Velocity")
                    .setDescription("*Velocity es un proxy de Minecraft de próxima generación centrado en la escalabilidad y la flexibilidad. Permite a los propietarios de servidores vincular varios servidores de Minecraft para que puedan aparecer como uno solo.*")
                    .setTimestamp()
                    .setImage(Imagenes["croosplay"]["velocity"])
                    .setColor("Random")
                    .addFields(
                        { name: `\`•\` Informacion Basica`, value: `La velocidad es ultrarrápida. Inicios de sesión rápidos, cambios de servidor rápidos, optimizaciones para aprovechar al máximo el hardware de su servidor y un enfoque en la seguridad significa que finalmente puede tener complementos.` },
                        { name: `\`•\` Siempre para Ty`, value: `Velocity impulsa algunas de las redes de Minecraft más grandes del mundo junto con numerosas redes pequeñas. Velocity puede escalar a miles de jugadores por instancia de proxy. Lo mejor de todo es que funciona con Paper, Sponge, Forge, Fabric y todas las versiones de Minecraft desde la 1.7.2 hasta la 1.19.2.` }
                    )
                    .setThumbnail(client.user.avatarURL())
                    .setFooter({ text: `Velocity Minecraft Croosplay Bedrock y Java` })
                ], components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setLabel("Velocity Guide")
                                .setStyle(Discord.ButtonStyle.Link)
                                .setURL("https://velocitypowered.com/"),
                        )
                ], ephemeral: true
            })
        } else if (interaction.values.includes('fourth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Informacion acerca de Bungeecord")
                    .setDescription("*BungeeCord es un proxy sofisticado y una API diseñada principalmente para teletransportar jugadores entre múltiples servidores de Minecraft. Es la última encarnación de un software similar escrito por el autor desde 2011 hasta el presente.*")
                    .setTimestamp()
                    .setImage(Imagenes["croosplay"]["bungecord"])
                    .setColor("Random")
                    .addFields(
                        { name: `\`•\` Informacion Basica`, value: `Como sus servidores de Minecraft deben ejecutarse sin autenticación (modo en línea = falso) para que BungeeCord funcione, esto representa un nuevo riesgo de seguridad. Los usuarios pueden conectarse a sus servidores directamente, bajo cualquier nombre de usuario que deseen utilizar.` },
                        { name: `\`•\` ¿Como funciona?`, value: `BungeeCord funciona como un proxy de red, lo que significa que puede usarlo para unirse a cualquier servidor Java moderno de Minecraft. BungeeCord también se puede instalar en su servidor como un complemento, por lo que puede hacer que su servidor sea compatible fácilmente con Minecraft: Bedrock Edition.` },
                    )
                    .setThumbnail(client.user.avatarURL())
                    .setFooter({ text: `Bungeecord Minecraft Croosplay Bedrock y Java` })
                ], components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setLabel("Bungeecord Guide")
                                .setStyle(Discord.ButtonStyle.Link)
                                .setURL("https://github.com/SpigotMC/BungeeCord/"),
                        )
                ], ephemeral: true
            })
        }
    }
}