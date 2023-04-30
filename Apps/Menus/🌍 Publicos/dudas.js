const { EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  id: "Dudas",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  execute(interaction) {
    if (interaction.values.includes('first_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`🎮 Node y Replit`)
          .setDescription(`*Como tener un bot de discord en replit apartir de express actualizacion de informacion*`)
          .addFields(
            { name: '📌 Informacion', value: 'En este informe te mostrare como tener un bot de discord en replit apartir de express actualizacion de informacion' },
            { name: `Detalles`, value: `Replit para tener un bot 24/7 es una buena opcion, pero no es la mejor, ya que replit tiene un limite de 5 horas de actividad, y si no estas en el servidor de replit, el bot se apagara, para evitar esto, puedes usar uptimerobot, que es un servicio que te permite tener tu bot 24/7, pero no es gratis, y tiene un limite de 100 peticiones por dia, si quieres saber mas sobre uptimerobot, puedes ver este video: https://www.youtube.com/watch?v=JvXZxvYQ3o8` },
            { name: `📚 Codigo`, value: `const express = require('express')` },
            { name: `Instrucciones`, value: `Para el trabajo necesitamos instalar express para el uso de uptime robot lo que haremos es instalar express desde el apartado de paquetes de replit una vez instalado proseguimos al siguiente paso` },
            { name: `Codigo a Utilizar`, value: `\`\`\`js\nconst express = require('express')\nconst app = express()\nconst port = 3000\n\napp.get('/', (req, res) => res.send('Hello World!'))\n\napp.listen(port, () => console.log(\`Example app listening at http://localhost:\${port}\`))\n\`\`\`` },
            { name: `Errores Posibles`, value: `Si al momento de ejecutar el codigo te sale un error de que no se encuentra el modulo express, lo que debes hacer es instalarlo desde el apartado de paquetes de replit` },
            { name: `📌 Informacion`, value: `Si tienes alguna duda, puedes unirte a mi servidor de soporte, donde podras resolver tus dudas` },
          )
          .setThumbnail(interaction.client.user.displayAvatarURL())
          .setFooter({ text: `Solicitado por ${interaction.user.tag}` })
          .setColor("Random")
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Node.js")
            .setURL("https://nodejs.org/api/process.html"),
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Replit")
            .setURL("https://www.freecodecamp.org/news/how-to-use-replit/")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Dudas] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('second_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`⚡ Token Discord`)
          .setDescription(`*Errores en los token de discord*`)
          .addFields(
            { name: `Que es un Token`, value: `Un token es un codigo que te da discord para que puedas usarlo en tu bot, este token es unico y no se puede compartir con nadie, ya que si lo haces, tu bot podria ser hackeado` },
            { name: `Errores en los token`, value: `Si al momento de ejecutar tu bot te sale un error de que el token es invalido, lo que debes hacer es revisar que el token que estas usando sea el correcto, si no es el correcto, debes generar uno nuevo en la pagina de discord developers` },
            { name: `Como ejecutar un token en un bot`, value: `\`\`\`js\nconst { Client } = require('discord.js');\nconst client = new Client();\n\nclient.on('ready', () => {\n  console.log(\`Logged in as \${client.user.tag}!\`);\n});\n\nclient.login('token');\n\`\`\`` },
          )
          .setThumbnail(interaction.client.user.displayAvatarURL())
          .setFooter({ text: `Solicitado por ${interaction.user.tag}` })
          .setColor("Random")
        ], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Dudas] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('third_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(" 🎶 Sintaxis ")
          .setDescription(`*Errores en la sintaxis de discord.js*`)
          .addFields(
            { name: `Que es la sintaxis`, value: `La sintaxis es la forma en la que se escribe un codigo, si no escribes bien el codigo, este no funcionara` },
            { name: `Errores en la sintaxis`, value: `Si al momento de ejecutar tu bot te sale un error de que la sintaxis es incorrecta, lo que debes hacer es revisar que el codigo que estas usando sea el correcto, si no es el correcto, debes revisar que el codigo este bien escrito` },
            { name: `Editores de codigo`, value: `Si no sabes como escribir codigo, te recomiendo que uses un editor de codigo, ya que estos te ayudaran a escribir codigo de una forma mas facil, te recomiendo que uses Visual Studio Code, ya que es uno de los mejores editores de codigo` },
            { name: `Extenciones en VSC`, value: `Si quieres que tu editor de codigo te ayude a escribir codigo, te recomiendo que uses extenciones, ya que estas te ayudaran a escribir codigo de una forma mas facil, te recomiendo que uses la extencion de discord.js, ya que esta te ayudara a escribir codigo de una forma mas facil` },
          )
          .setThumbnail(interaction.client.user.displayAvatarURL())
          .setFooter({ text: `Solicitado por ${interaction.user.tag}` })
          .setColor("Random")
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Extencion")
            .setEmoji("1026467696453357658")
            .setURL("https://github.com/ChristianKohler/PathIntellisense")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Dudas] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    }
  },
};