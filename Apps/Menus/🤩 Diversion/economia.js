const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ecoSchema = require(`${process.cwd()}/Model/economia/economia.js`);
const Discord = require("discord.js");
const chalk = require("chalk");
var medallas = {
    1: "🥇",
    2: "🥈",
    3: "🥉",
    4: ":chart_with_upwards_trend:",
    5: ":chart_with_upwards_trend:"
}
const { asegurar_todo } = require(`${process.cwd()}/Tools/funciones.js`);
const duration = require('humanize-duration');
var trabajos = ["Empresario/a", "desarrollador/a", "Mecánico/a", "Taxista", "Médico", "Obrero/a", "Profesor/a", "Ejecutivo", "Investigador/a del crimen", "Inmobiliario/a"];
module.exports = {
    id: "Economia",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        if (interaction.values.includes('first_option')) {
            let data = await ecoSchema.findOne({ userID: interaction.user.id });
            let tiempo_ms = 3 * 60 * 60 * 1000 // 10800000 ms
            let recompensa = Math.floor(Math.random() * 1200) + 300;
            let trabajo = trabajos[Math.floor(Math.random() * trabajos.length)];
            if (tiempo_ms - (Date.now() - data.work) > 0) {
                let tiempo_restante = duration(Date.now() - data.work - tiempo_ms,
                    {
                        language: "es",
                        units: ["h", "m", "s"],
                        round: true,
                    })
                return interaction.reply({
                    embeds: [new Discord.EmbedBuilder()
                        .setDescription(`:watch: Has trabajado demasiado hoy, debes esperar \`${tiempo_restante}\`  para volver a trabajar`)
                        .setColor("Random")]
                })
            }
            await ecoSchema.findOneAndUpdate({ userID: interaction.user.id }, {
                $inc: {
                    dinero: recompensa
                },
                work: Date.now()
            })
            return interaction.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setDescription(`*Información sobre tu trabajo de hoy*`)
                    .addFields(
                        { name: `:page_with_curl: Trabajo`, value: `\`${trabajo}\`` },
                        { name: `:coin: Sueldo de hoy`, value: `\`${recompensa} en efectivo\`` })
                    .setColor("Random")
                    .setFooter({ text: `¡Trabajos! | Powered by: ${client.user.username}` })
                    .setTimestamp()]
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Economia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('second_option')) {
            let data = await ecoSchema.findOne({ userID: interaction.user.id });
            let tiempo_ms = 24 * 60 * 60 * 1000
            let recompensa = 800;
            if (tiempo_ms - (Date.now() - data.daily) > 0) {
                let tiempo_restante = duration(Date.now() - data.daily - tiempo_ms,
                    {
                        language: "es",
                        units: ["h", "m", "s"],
                        round: true,
                    })
                return interaction.reply({ content: `🕑 | Tienes que esperar \`${tiempo_restante}\` para volver a reclamar tu pension diaria` })
            }
            await ecoSchema.findOneAndUpdate({ userID: interaction.user.id }, {
                $inc: {
                    dinero: recompensa
                },
                daily: Date.now()
            })
            return interaction.reply({ content: `Has reclamado tu pension diaria de \`${recompensa} monedas\`` }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Economia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('third_option')) {
            const user = interaction.user;
            if (user.bot) return interaction.reply({ content: `❌ | Los bots no pueden tener dinero` });
            const data = await ecoSchema.findOne({ userID: user.id });
            if (!data) return interaction.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setDescription(`❌ | Este usuario no tiene una cuenta bancaria creada`)
                    .setColor("Random")
                    .setFooter({ text: `¡Cuenta de banco! | Powered by ${client.user.username}` })]
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Economia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
            await asegurar_todo(null, user.id);

            interaction.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setTitle(`:moneybag: › ¡Panel bancario!`)
                    .setDescription(`¡Hola, este es el estado de cuenta de ${user}!`)
                    .addFields(
                        {
                            name: `:dollar: › Efectivo`, value: `\`${data.dinero} en efectivo\``
                        },
                        {
                            name: `:bank: › Banco`, value: `\`${data.banco} en banco\``
                        }
                    )
                    .setFooter({ text: `¡Estado de cuenta! | Powered by: ${client.user.username}` })
                    .setColor("Random")
                ]
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Economia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('fourth_option')) {
            const total = await ecoSchema.find();
            await interaction.guild.members.fetch();
            const ordenado = total.filter(member => interaction.guild.members.cache.get(member.userID)).sort((a, b) => Number((b.dinero + b.banco) - (a.dinero + a.banco)));
            const texto = ordenado.map((miembro, index) => `${medallas[index + 1] ?? ""} \`${index + 1}\` - <@${miembro.userID}> *\`${interaction.guild.members.cache.get(miembro.userID).user.tag}\`*\n**Efectivo:** \`${miembro.dinero}\`\n**Banco:** \`${miembro.banco}\`\n\n`)

            var elementos_por_pagina = 5
            var dividido = elementos_por_pagina
            for (let i = 0; i < texto.length; i += dividido) {
                let desc = texto.slice(i, elementos_por_pagina);
                elementos_por_pagina += dividido;
                return interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(":moneybag: | Top con mas dinero en el servidor")
                            .setDescription(desc.join(" "))
                            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                            .setFooter({ text: `¡Top de la economia! | Powered by: ${client.user.username}` })
                            .setColor("Aqua")
                    ]
                }).catch((error) =>
                console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Economia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
            }
        }
    }
}