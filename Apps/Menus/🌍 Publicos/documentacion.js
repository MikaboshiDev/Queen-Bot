const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const chalk = require("chalk");
module.exports = {
    id: "Documentacion",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        if (interaction.values.includes('first_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Documentación de discord.js v11.0.0")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg")
                    .setDescription("La documentación de discord.js v11.0.0 se encuentra en el siguiente enlace:")
                    .setColor("Random")
                    .setTimestamp()
                    .addFields(
                        { name: "\`•\` Enlace", value: "[Documentacion](https://discord.js.org/#/docs/main/v11/general/welcome)" },
                        { name: "\`•\` Versión", value: "11.0.0" },
                        { name: `\`•\` Discord v11.0 code`, value: `\`\`\`js\nconst Discord = require('discord.js');\nconst client = new Discord.Client();\n\nclient.on('ready', () => {\n  console.log('I am ready!');\n});\n\nclient.on('message', message => {\n  if (message.content === 'ping') {\n    message.reply('Pong!');\n  }\n});\n\n// THIS  MUST  BE  THIS  WAY\nclient.login(process.env.BOT_TOKEN);\n\`\`\`` }
                    )
                    .setFooter({ text: `Solitado por ${interaction.user.username}`, iconUrl: interaction.user.avatarURL })
                ], components: [new ActionRowBuilder().addComponents([
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Documentacion")
                        .setEmoji("1026467695039873064")
                        .setURL("https://discord.js.org/#/docs/main/v11/general/welcome")
                ])], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Documentacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('second_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Documentación de discord.js 12.5.3")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
                    .setDescription("La documentación de discord.js 12.5.3 actualmente esta no disnopible, pero puedes ver la documentación de la versión 13.0.0")
                    .setColor("Random")
                    .setTimestamp()
                    .addFields(
                        { name: "\`•\` Documentación", value: "[Documentación](https://discord.js.org/#/docs/discord.js/v12/general/welcome)" },
                        { name: "\`•\` Ejemplo de v12.5.3", value: `\`\`\`js\nconst { Client, Intents } = require('discord.js');\nconst client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });\nclient.once('ready', () => {\n    console.log('Ready!');\n});\nclient.on('interactionCreate', async interaction => {\n    if (!interaction.isCommand()) return;\n    if (interaction.commandName === 'ping') {\n        await interaction.reply('Pong!');\n    }\n});\nclient.login('your-token-goes-here');\n\`\`\`` }
                    )
                    .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
                ], components: [new ActionRowBuilder().addComponents([
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Documentacion")
                        .setEmoji("1026467695039873064")
                        .setURL("https://discord.js.org/#/docs/discord.js/v12/general/welcome")
                ])], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Documentacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('third_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Documentación de discord.js 13.0.0")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg")
                    .setDescription("Esta es la *documentacion* de discord.js v13 actulmente aun que ya fue actualizada a v14")
                    .setColor("Random")
                    .setTimestamp()
                    .addFields(
                        { name: "\`•\` Documentación", value: "[Documentación](https://discord.js.org/#/docs/discord.js/v13/general/welcome)" },
                        { name: "\`•\` Ejemplo de v13.0.0", value: `\`\`\`js\nconst { Client, Intents } = require('discord.js');\nconst client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });\nclient.once('ready', () => {\n    console.log('Ready!');\n});\nclient.on('interactionCreate', async interaction => {\n    if (!interaction.isCommand()) return;\n    if (interaction.commandName === 'ping') {\n        await interaction.reply('Pong!');\n    }\n});\nclient.login('your-token-goes-here');\n\`\`\`` }
                    )
                    .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
                ], components: [new ActionRowBuilder().addComponents([
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Documentacion")
                        .setEmoji("1026467695039873064")
                        .setURL("https://discord.js.org/#/docs/discord.js/v13/general/welcome")
                ])], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Documentacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('fourth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Documentación de discord.js 14.0.0")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg")
                    .setDescription("Esta es la *documentacion* de discord.js v14 actulmente esta con las altimas actualizaciones")
                    .setColor("Random")
                    .setTimestamp()
                    .addFields(
                        { name: "\`•\` Documentación", value: "[Documentación](https://discord.js.org/#/docs/discord.js/v14/general/welcome)" },
                        { name: "\`•\` Ejemplo de v14.0.0", value: `\`\`\`js\nconst { Client, Intents } = require('discord.js');\nconst client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });\nclient.once('ready', () => {\n    console.log('Ready!');\n});\nclient.on('interactionCreate', async interaction => {\n    if (!interaction.isCommand()) return;\n    if (interaction.commandName === 'ping') {\n        await interaction.reply('Pong!');\n    }\n});\nclient.login('your-token-goes-here');\n\`\`\`` }
                    )
                    .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
                ], components: [new ActionRowBuilder().addComponents([
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Documentacion")
                        .setEmoji("1026467695039873064")
                        .setURL("https://discord.js.org/#/docs/discord.js/v14/general/welcome")
                ])], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Documentacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('fifth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Documentación de node.js 16.0.4")
                    .setDescription("Esta es la *documentacion* de node.js")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg")
                    .setColor("Random")
                    .setTimestamp()
                    .addFields(
                        { name: "\`•\` Documentación", value: "[Documentación](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/)" },
                        { name: "\`•\` Ejemplo de node.js", value: `\`\`\`js\napp.get('/', (req, res) => {\n  res.send('Hello World!')\n})\n\`\`\`` },
                        { name: `\`•\` Segundo Ejemplo`, value: `\`\`\`js\nfunction asyncFunction() {\n  return 'hello world';\n}\n\nconst asyncArrowFunction = async () => 'hello world';\n\`\`\`` }
                    )
                    .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
                ], components: [new ActionRowBuilder().addComponents([
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Documentacion")
                        .setEmoji("1026467695039873064")
                        .setURL("https://nodejs.org/en/docs/guides/dont-block-the-event-loop/")
                ])], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Documentacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('sixth_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Documentación de node.js 18.0.0")
                    .setDescription("Esta es la *documentacion* de node.js 18.0.0")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg")
                    .setColor("Random")
                    .setTimestamp()
                    .addFields(
                        { name: "\`•\` Documentación", value: "[Documentación](https://nodejs.org/en/docs/guides/dont-block-the-event-loop/)" },
                        { name: "\`•\` Process Code", value: `\`\`\`js\nprocess.on('uncaughtException', (err) => {\n  console.error('There was an uncaught error', err)\n  process.exit(1) //mandatory (as per the Node docs)\n})\n\`\`\`` },
                        { name: `\`•\` Segundo Ejemplo`, value: `\`\`\`js\nfunction asyncFunction() {\n  return 'hello world';\n}\n\nconst asyncArrowFunction = async () => 'hello world';\n\`\`\`` }
                    )
                    .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
                ], components: [new ActionRowBuilder().addComponents([
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Documentacion")
                        .setEmoji("1026467695039873064")
                        .setURL("https://nodejs.org/en/docs/guides/dont-block-the-event-loop/")
                ])], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Documentacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        } else if (interaction.values.includes('seventh_option')) {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setTitle("Documentacion de Mongoose")
                    .setDescription("Esta es la *documentacion* de Mongoose")
                    .addFields(
                        { name: "\`•\` Documentación", value: "[Documentación](https://mongoosejs.com/docs/guide.html)" },
                        { name: "\`•\` Ejemplo de Mongoose", value: `\`\`\`js\nconst mongoose = require('mongoose');\nconst Schema = mongoose.Schema;\n\nconst userSchema = new Schema({\n  name: String,\n  age: Number\n});\n\nconst User = mongoose.model('User', userSchema);\n\`\`\`` },
                        { name: `¿Como conectar con mongoose?`, value: `\`\`\`js\nconst mongoose = require('mongoose');\n\nmongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});\n\`\`\`` },
                        { name: "¿Como crear un modelo?", value: `\`\`\`js\nconst mongoose = require('mongoose');\n\nconst Schema = mongoose.Schema;\n\nconst userSchema = new Schema({\n  name: String,\n  age: Number\n});\n\`\`\`` },
                        { name: "¿Como crear un documento?", value: `\`\`\`js\nconst mongoose = require('mongoose');\n\nconst Schema = mongoose.Schema;\n\nconst userSchema = new Schema({\n  name: String,\n  age: Number\n});\n\nconst User = mongoose.model('User', userSchema);\n\nconst user = new User({ name: 'John', age: 27 });\n\nuser.save();\n\`\`\`` },
                        { name: "Tipos de datos", value: "String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array" },
                        { name: "Usos de los tipos de datos", value: "String: para guardar texto\nNumber: para guardar numeros\nDate: para guardar fechas\nBuffer: para guardar imagenes\nBoolean: para guardar valores booleanos\nMixed: para guardar cualquier tipo de dato\nObjectId: para guardar id's\nArray: para guardar arrays" },
                        { name: "¿Como crear un documento con datos?", value: `\`\`\`js\nconst mongoose = require('mongoose');\n\nconst Schema = mongoose.Schema;\n\nconst userSchema = new Schema({\n  name: String,\n  age: Number\n});\n\nconst User = mongoose.model('User', userSchema);\n\nconst user = new User({ name: 'John', age: 27 });\n\nuser.save();\n\`\`\`` },
                    )
                    .setThumbnail("https://cdn.discordapp.com/attachments/1018701929796337714/1018721657474519090/qwqw.jpg")
                    .setColor("Random")
                    .setTimestamp()
                ], components: [new ActionRowBuilder().addComponents([
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Documentacion")
                        .setEmoji("1026467695039873064")
                        .setURL("https://mongoosejs.com/docs/guide.html")
                ])], ephemeral: true
            }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Documentacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        }
    }
}