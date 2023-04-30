const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const chalk = require("chalk");
const Discord = require("discord.js");
module.exports = {
    permission: [ "Administrator" ],
    id: "Configuraciones_Servidor",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.values.includes('first_option')) {

            /* Hacer una lista de canales del servidor 25 maximos */
            const canales = interaction.guild.channels.cache.map((x) => x.name);
            const ids = interaction.guild.channels.cache.map((x) => x.id);
            const creacion = interaction.guild.channels.cache.map((x) => `<t:${parseInt(x.createdTimestamp / 1000)}:f>`);

            /* De los datos anteriores solo los 25 primeros por paginacion */
            const canales25 = canales.slice(0, 25);
            const ids25 = ids.slice(0, 25);

            const ids10 = ids.slice(0, 10);
            const creacion10 = creacion.slice(0, 10);

            const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: `Estado de ${client.user.username} Canales del Servidor`, iconURL: client.user.displayAvatarURL() })
                .setColor("Blurple")
                .addFields(
                    {
                        name: `__Como funciono ?__`,
                        value: `> Para ver la informacion de un canal del servidor de discord solo tienes que seleccionar el canal del menu que quieres ver y te mostrara su informacion`,
                    }
                )
                .setFooter({ text: `Lista de canales del servidor de discord`, iconURL: interaction.guild.iconURL() })
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL());

            let ArrayCanales = [];
            for (let i = 0; i < canales25.length; i++) {
                ArrayCanales.push({ label: `${canales25[i]}`, value: `${ids25[i]}`, description: `Ve la informacion del canal ${canales25[i]}` });
            }

            const menu = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId("select-canales")
                        .setPlaceholder("Selecciona un canal para ver su informacion")
                        .addOptions(ArrayCanales)
                );

            return interaction.reply({ embeds: [embed], components: [menu], ephemeral: true }).catch((err) => { });
        } else if (interaction.values.includes('second_option')) {

            const roles = interaction.guild.roles.cache.map((x) => x.name);
            const ids = interaction.guild.roles.cache.map((x) => x.id);
            const creacion = interaction.guild.roles.cache.map((x) => `<t:${parseInt(x.createdTimestamp / 1000)}:f>`);

            /* Cantidad de 25 componentes  */
            const roles25 = roles.slice(0, 25);
            const ids25 = ids.slice(0, 25);

            const ids10 = ids.slice(0, 10);
            const creacion10 = creacion.slice(0, 10);

            const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: `Estado de ${client.user.username} Roles del Servidor`, iconURL: client.user.displayAvatarURL() })
                .setColor("Blurple")
                .addFields(
                    {
                        name: `__Como funciono ?__`,
                        value: `> Para ver la informacion de un rol del servidor de discord solo tienes que seleccionar el rol del menu que quieres ver y te mostrara su informacion`,
                    }
                )
                .setFooter({ text: `Lista de roles del servidor de discord`, iconURL: interaction.guild.iconURL() })
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL());

            let ArrayRoles = [];
            for (let i = 0; i < roles25.length; i++) {
                ArrayRoles.push({ label: `${roles25[i]}`, value: `${ids25[i]}`, description: `Ve la informacion del rol ${roles25[i]} en el servidor` });
            }

            const menu = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId("select-roles")
                        .setPlaceholder("Selecciona un rol para ver su informacion")
                        .addOptions(ArrayRoles)
                );

            return interaction.reply({ embeds: [embed], components: [menu], ephemeral: true }).catch((err) => { });
        } else if (interaction.values.includes('third_option')) {

            const usuarios = interaction.guild.members.cache.map((x) => x.user.username);
            const ids = interaction.guild.members.cache.map((x) => x.user.id);
            const creacion = interaction.guild.members.cache.map((x) => `<t:${parseInt(x.user.createdTimestamp / 1000)}:f>`);

            /* Cantidad de 25 componentes  */
            const usuarios25 = usuarios.slice(0, 25);
            const ids25 = ids.slice(0, 25);

            const ids10 = ids.slice(0, 10);
            const creacion10 = creacion.slice(0, 10);

            /* Obtener la foto de perfil de cada usuario */
            const fotos = interaction.guild.members.cache.map((x) => x.user.displayAvatarURL());

            const embed = new Discord.EmbedBuilder()
                .setAuthor({ name: `Estado de ${client.user.username} Usuarios del Servidor`, iconURL: client.user.displayAvatarURL() })
                .setColor("Blurple")
                .addFields(
                    {
                        name: `__Como funciono ?__`,
                        value: `> Para ver la informacion de un usuario del servidor de discord solo tienes que seleccionar el usuario que quieres ver y te mostrara su informacion`,
                    }
                )
                .setFooter({ text: `Lista de usuarios del servidor de discord`, iconURL: interaction.guild.iconURL() })
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL());

            let ArrayUsuarios = [];
            for (let i = 0; i < usuarios25.length; i++) {
                ArrayUsuarios.push({ label: `${usuarios25[i]}`, value: `${ids25[i]}`, description: `Ve la informacion del usuario ${usuarios25[i]} en el servidor`, emoji: { name: `${fotos[i]}` } });
            }

            const menu = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId("select-usuarios")
                        .setPlaceholder("Selecciona un usuario para ver su informacion")
                        .addOptions(ArrayUsuarios)
                )

            return interaction.reply({ embeds: [embed], components: [menu], ephemeral: true })
        } else if (interaction.values.includes('fourth_option')) {
            var banlist = interaction.guild.bans.fetch();

            banlist.then(bans => {
                if (bans.size == 0) return interaction.reply(`<a:error:1030716002259980318> No hay baneados en este servidor de discord intente mas tarde`, { ephemeral: true });

                const usuarios = bans.map((x) => x.user.username);
                const ids = bans.map((x) => x.user.id);
                const motivos = bans.map((x) => x.reason || `Sin Motivo Guardado en el Servidor de Discord`);

                /* Cantidad de 25 componentes */
                const usuarios25 = usuarios.slice(0, 25);
                const ids25 = ids.slice(0, 25);
                const motivos25 = motivos.slice(0, 25);

                const embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: `Estado de ${client.user.username} Usuarios Baneados del Servidor`, iconURL: client.user.displayAvatarURL() })
                    .setColor("Blurple")
                    .addFields(
                        {
                            name: `__Como funciono ?__`,
                            value: `> Para ver la informacion de un usuario baneado del servidor de discord solo tienes que seleccionar el usuario que quieres ver y te mostrara su informacion`,
                        }
                    )
                    .setFooter({ text: `Lista de baneos del servidor de discord`, iconURL: interaction.guild.iconURL() })
                    .setTimestamp()
                    .setThumbnail(client.user.displayAvatarURL());

                let ArrayBaneados = [];
                for (let i = 0; i < usuarios25.length; i++) {
                    ArrayBaneados.push({ label: `${usuarios25[i]}`, value: `${ids25[i]}`, description: `${motivos25[i]}` });
                }

                const menu = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId("select-baneos")
                            .setPlaceholder("Selecciona un usuario para ver su informacion")
                            .addOptions(ArrayBaneados)
                    )

                return interaction.reply({ embeds: [embed], components: [menu], ephemeral: true }).catch((err) => { });
            });
        }
    }
}