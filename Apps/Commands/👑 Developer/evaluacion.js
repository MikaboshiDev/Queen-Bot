const { inspect } = require('util');
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    creador: true,
    botpermisos: [
        "SendMessages", 
        "EmbedLinks"
      ],
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("👑 Evalua codigos en la consola del bot de discord")
        .addStringOption((option) =>
            option
                .setName("codigo")
                .setDescription("Codigo que evaluare en mi consola")
                .setRequired(true)
        ),
    async execute(interaction, client) {
        const evaluar = interaction.options.getString("codigo")
        try {
            const evaluado = await eval(evaluar);
            const truncado = truncar(inspect(evaluado), 2045);

            interaction.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setTitle(`Evaluacion Realizada! 🟢`)
                    .setFields(
                        { name: "\`•\` Entrada", value: `\`\`\`js\n${evaluar}\`\`\`` },
                        { name: "\`•\` Salida", value: `\`\`\`js\n${truncado}\`\`\`` },
                        { name: "\`•\` Tiempo", value: `\`\`\`js\n${Date.now() - interaction.createdTimestamp}ms\`\`\`` },
                    )
                    .setColor("Random")
                    .setTimestamp()
                    .setFooter({text:`${client.user.username} | Evaluar`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                ]
            })
        } catch (e) {
            interaction.reply({
                embeds: [new Discord.EmbedBuilder()
                    .setTitle(`Evaluacion Realizada! 🟢`)
                    .setFields(
                        { name: "\`•\` Entrada", value: `\`\`\`js\n${evaluar}\`\`\`` },
                        { name: "\`•\` Salida", value: `\`\`\`js\n${e.toString().substring(0, 2048)}\`\`\`` },
                        { name: "\`•\` Tiempo", value: `\`\`\`js\n${Date.now() - interaction.createdTimestamp}ms\`\`\`` },
                        { name: "\`•\` Fixed", value: `\`\`\`js\n${e.toString().substring(0, 2048).replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))}\`\`\`` },
                    )
                    .setColor("FF0000")
                    .setTimestamp()
                    .setFooter({text:`${client.user.username} | Evaluar`, iconURL: client.user.displayAvatarURL({dynamic: true})})
                ]
            })
        }
    }
}

function truncar(texto, n) {
    if (texto.length > n) {
        return texto.substring(0, n) + "..."
    } else {
        return texto;
    }
}