const { EmbedBuilder, PermissionFlagsBits, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder, UserFlags, Client, version, ChatInputCommandInteraction } = require("discord.js");
const versiones = require('../../../package.json');
const { readdirSync } = require('fs');
const Discord = require('discord.js');
const { connection } = require("mongoose");
const os = require("os");
const chalk = require("chalk");
module.exports = {
  id: "Informacion",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * @param {Client} client 
   */
  async execute(interaction, client) {
    if (interaction.values.includes('first_option')) {

      const { guild } = interaction;
      const { createdTimestamp, ownerId, description, members, emojis, stickers, channels, memberCount } = guild;

      const Roles = interaction.guild.roles.cache.size;
      const Embed = new EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: guild.name, iconURL: guild.iconURL({ dynamic: true }) })
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
          {
            name: `📝 Generales`,
            value: [
              ` **\`•\` Name**: ${guild.name}`,
              ` **\`•\` Created**: <t:${parseInt(createdTimestamp / 1000)}:R>`,
              ` **\`•\` Owner**: <@${ownerId}>`,
              ` **\`•\` Description**: ${description || "None"}`,
            ].join("\n")
          },
          {
            name: `👥 Miembros`,
            value: [
              ` **\`•\` Members**: ${members.cache.filter((m) => !m.user.bot).size}`,
              ` **\`•\` Bots**: ${members.cache.filter((m) => m.user.bot).size}`,
              ` **\`•\` Total**: ${interaction.guild.memberCount}`,
            ].join("\n")
          },
          {
            name: `💬 Canales`,
            value: [
              ` **\`•\` Text**: ${channels.cache.filter((c) => c.type === ChannelType.GuildText).size}`,
              ` **\`•\` Voice**: ${channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size}`,
              ` **\`•\` Threads**: ${channels.cache.filter((c) => c.type === ChannelType.GuildText && ChannelType.GuildPrivateThread && ChannelType.GuildPublicThread).size}`,
              ` **\`•\` Categories**: ${channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size}`,
              ` **\`•\` Stages**: ${channels.cache.filter((c) => c.type === ChannelType.GuildStageVoice).size}`,
              ` **\`•\` News**: ${channels.cache.filter((c) => c.type === ChannelType.GuildNews).size}`,
              ` **\`•\` Total**: ${channels.cache.size}`,
            ].join("\n")
          },
          {
            name: `🛠️ Emojis & Stickers`,
            value: [
              ` **\`•\` Animated**: ${emojis.cache.filter((e) => e.animated).size}`,
              ` **\`•\` Static**: ${emojis.cache.filter((e) => !e.animated).size}`,
              ` **\`•\` Stickers**: ${stickers.cache.size}`,
              ` **\`•\` Total**: ${stickers.cache.size + emojis.cache.size}`,
            ].join("\n")
          },
          {
            name: `🍪 Dates Extras & Notes`,
            value: [
              ` **\`•\` roles**: ${Roles}`,
              ` **\`•\` Date of creation**: ${guild.createdAt.toDateString()}`,
            ].join("\n")
          }
        )
        .setFooter({ text: "Estadisticas del Servidor:" }).setTimestamp();

      interaction.reply({
        embeds: [Embed], components: [new Discord.ActionRowBuilder().addComponents(
          [
            new Discord.ButtonBuilder().setStyle(ButtonStyle.Primary).setEmoji(`1010617992729604127`).setCustomId("Roles").setLabel("Roles Servidor"),
            new Discord.ButtonBuilder().setStyle(ButtonStyle.Primary).setEmoji("1007529203119439882").setCustomId("Owner").setLabel("Owner Servidor")
          ]
        )], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('second_option')) {

      const startUsage = process.cpuUsage();
      const now = Date.now();
      while (Date.now() - now < 500);
      let userUsage = process.cpuUsage(startUsage).user / 1000;
      let sysUsage = process.cpuUsage(startUsage).system / 1000 || 0;

      const embed = new EmbedBuilder()
        .setAuthor({ name: `${client.user.tag}'s Information`, iconURL: `https://cdn.discordapp.com/attachments/992251291214545026/998974029614567515/d9cb1a809bcc4b1b915f40c784e9b365.png` })
        .setDescription(`**Prefix:** \`/\``)
        .setThumbnail(`https://cdn.discordapp.com/attachments/992251291214545026/998974029614567515/d9cb1a809bcc4b1b915f40c784e9b365.png`)
        .setColor('Random')
        .setTimestamp()
        .setFooter({ text: `Pedido por ${interaction.user.tag}` })
        .addFields(
          { name: `\`•\` Total Server(s): [${client.guilds.cache.size}]`, value: `\`\`\`yml\nNames: ${client.user.tag}\`\`\``, inline: true },
          { name: `\`•\` Version:`, value: `\`\`\`yml\n${versiones.version}\`\`\``, inline: true },
          { name: `\`•\` Node Version:`, value: `\`\`\`yml\n${process.version}\`\`\``, inline: true },
          { name: `\`•\` Total User(s): [${client.users.cache.size}]`, value: `\`\`\`yml\n${client.users.cache.size}\`\`\``, inline: true },
          { name: `\`•\` Total Channel(s): [${client.channels.cache.size}]`, value: `\`\`\`yml\n${client.channels.cache.size}\`\`\``, inline: true },
          { name: `\`•\` Total Command(s): [${client.commands.size}]`, value: `\`\`\`yml\n${client.commands.size}\`\`\``, inline: true },
          { name: `\`•\` Total Category(s): [${readdirSync('./Commands/').length}]`, value: `\`\`\`yml\n${readdirSync('./Commands/').length}\`\`\``, inline: true },
          { name: `\`•\` Total Role(s): [${client.guilds.cache.reduce((a, g) => a + g.roles.cache.size, 0)}]`, value: `\`\`\`yml\n${client.guilds.cache.reduce((a, g) => a + g.roles.cache.size, 0)}\`\`\``, inline: true },
          { name: `\`•\` Total Bot(s): [${client.guilds.cache.reduce((a, g) => a + g.members.cache.filter(m => m.user.bot).size, 0)}]`, value: `\`\`\`yml\n${client.guilds.cache.reduce((a, g) => a + g.members.cache.filter(m => m.user.bot).size, 0)}\`\`\``, inline: true },
          { name: `\`•\` Total Member(s): [${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}]`, value: `\`\`\`yml\n${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`\`\``, inline: true },
          { name: `\`•\` Total Human(s): [${client.guilds.cache.reduce((a, g) => a + g.members.cache.filter(m => !m.user.bot).size, 0)}]`, value: `\`\`\`yml\n${client.guilds.cache.reduce((a, g) => a + g.members.cache.filter(m => !m.user.bot).size, 0)}\`\`\``, inline: true },
          { name: `\`•\` Platform`, value: `\`\`\`yml\n${process.platform}\`\`\`` },
          { name: `\`•\` CPU Usage:`, value: `\`\`\`yml\nUser: ${userUsage} MB\nSystem: ${sysUsage} MB\`\`\`` },
          { name: `\`•\` Uptime:`, value: `\`\`\`yml\n${convertTime()}\`\`\`` },
        );
      interaction.reply({ embeds: [embed], ephemeral: true }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

      function convertTime() {
        var uptime = process.uptime();
        console.log('Tiempo de Proceso:', uptime);
        const date = new Date(uptime * 1000);
        const days = date.getUTCDate() - 1,
          hours = date.getUTCHours(),
          minutes = date.getUTCMinutes(),
          seconds = date.getUTCSeconds();

        let time = [];

        if (days > 0) time.push(days + ' day' + (days == 1 ? '' : 's'));
        if (hours > 0) time.push(hours + ' h' + (hours == 1 ? '' : 's'));
        if (minutes > 0) time.push(minutes + ' mn' + (minutes == 1 ? '' : 's'));
        if (seconds > 0) time.push(seconds + ' s'); // + (seconds == 1 ? '' : 's'));
        const dateString = time.join(', ');
        console.log('Fecha del Registro: ' + dateString);
        return dateString;
      }

    } else if (interaction.values.includes('third_option')) {
      const ownerId = interaction.guild.ownerId;
      const embed = new EmbedBuilder()
        .setTitle(`Informacion del Creador del Servidor`)
        .setDescription(`**Nombre:** ${client.users.cache.get(ownerId).tag}\n**ID:** ${ownerId}`)
        .addFields(
          { name: `\`•\` Nombre:`, value: `${client.users.cache.get(ownerId).tag}` },
          { name: `\`•\` ID:`, value: `${ownerId}` },
          { name: `\`•\` Fecha de Creacion:`, value: `${client.users.cache.get(ownerId).createdAt}` },
          { name: `\`•\` Bot:`, value: `${client.users.cache.get(ownerId).bot}` })
        .setThumbnail(client.users.cache.get(ownerId).displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp()
        .setColor('Random')
        .setFooter({ text: `Solicitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true, size: 512 }) });
      interaction.reply({ embeds: [embed], ephemeral: true });
    } else if (interaction.values.includes('fourth_option')) {
      const embed = new EmbedBuilder()
        .setTitle("Development & Diseño Electromecanico 🎮")
        .setColor("Random")
        .setTimestamp()
        .setFooter({ text: "Si tienes dudas o preguntas mi DMS esta abierto" })
        .setThumbnail(interaction.user.displayAvatarURL())
        .setDescription(`*Hola soy Qin un developer en el area de **juegos, windows, software, web, vulnerabilidades** me especializo mas en el area de **windows y software**.\n\nHago codigos y asesorias para el apoyo de usuarios de **discord y externos** informate!.*`)

      const Row = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
          .setCustomId("Development")
          .setLabel("Qin Shi Huang")
          .setStyle(ButtonStyle.Primary)
          .setEmoji(`🛠️`))
        .addComponents(new ButtonBuilder()
          .setCustomId("Dates")
          .setLabel("Asesorias & Clases")
          .setStyle(ButtonStyle.Primary)
          .setEmoji(`🌍`))

      interaction.reply({ embeds: [embed], components: [Row], ephemeral: true }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('fifth_option')) {
      const svicon = new Discord.EmbedBuilder()
        .setAuthor({ name: "Icono del Servidor", iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setImage(interaction.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
        .setColor("Random")
        .setFooter({ text: `Pedido por: ${interaction.user}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()

      interaction.reply({ embeds: [svicon], content: `**__Icono del servidor__ ( \`${interaction.guild.name}\` )**` }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
      console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(` Se ha usado el comando avatar servidor en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
    } else if (interaction.values.includes('sixth_option')) {
      try {
        interaction.reply('You can view the bot\'s privacy policy at https://bin.birdflop.com/ohopawewok.txt.').catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        console.log(chalk.yellowBright(`[Comandos]`) + chalk.whiteBright(` Se ha usado el comando privacidad en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
      } catch (e) {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
            .setDescription(`\`\`\`yml\n${e}\`\`\``)
            .setColor("Random")
            .setFooter({ text: `Error en el comando privacidad` })], ephemeral: true
        })
        console.log(chalk.redBright(`[Error]`) + chalk.whiteBright(` Se ha usado el comando privacidad en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
      }
    } else if (interaction.values.includes(`seventh_option`)) {
      try {
        let dias = Math.floor(client.uptime / 86400000)
        let horas = Math.floor(client.uptime / 3600000) % 24
        let minutos = Math.floor(client.uptime / 60000) % 60
        let segundos = Math.floor(client.uptime / 1000) % 60

        const uptime = new Discord.EmbedBuilder()
          .setTitle("Uptime Robot" + client.user.username)
          .setDescription(`*Robot online for next information:*`)
          .addFields(
            { name: `\`•\` Days`, value: `\`\`\`prolog\n${dias} dias\`\`\``, inline: true },
            { name: `\`•\` Hours`, value: `\`\`\`prolog\n${horas} horas\`\`\``, inline: true },
            { name: `\`•\` Minutes`, value: `\`\`\`prolog\n${minutos} minutos\`\`\``, inline: true },
            { name: `\`•\` Seconds`, value: `\`\`\`prolog\n${segundos} segundos\`\`\``, inline: true }
          )
          .setColor("Random")
          .setFooter({ text: `Cualquier duda es atendida en mi servidor de soporte de discord` })
          .setTimestamp()

        const controls = new ActionRowBuilder()
          .addComponents(new ButtonBuilder()
            .setCustomId("Avatar")
            .setLabel("Avatar")
            .setStyle(ButtonStyle.Primary)
            .setEmoji(`📸`))

        interaction.reply({ embeds: [uptime], components: [controls], ephemeral: true }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(` Se ha usado el comando uptime en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
      } catch (e) {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
            .setDescription(`\`\`\`yml\n${e}\`\`\``)
            .setColor("Random")
            .setFooter({ text: `Error en el comando uptime` })], ephemeral: true
        })
        console.log(chalk.redBright(`[Error]`) + chalk.whiteBright(` Se ha usado el comando uptime en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
      }
    } else if (interaction.values.includes(`eighth_option`)) {
      const user = interaction.user;
      let inviteEmbed = new EmbedBuilder()
        .setTitle("Hola este es mi modulo de **INVITACIONES**")
        .setDescription(`<a:Dashbord:997754372496830534> Da click en cualquiera de los botones segun tu necesidad!.`)
        .addFields(
          { name: `\`•\` 001`, value: "```" + `Invite Link` + "```", inline: true },
          { name: `\`•\` 002`, value: "```" + `Moderation Server` + "```", inline: true },
          { name: `\`•\` 003`, value: "```" + `Support Web` + "```", inline: true }
        )
        .setFooter({ text: "My invite links ID 000381" })
        .setThumbnail(`https://cdn.discordapp.com/attachments/992251291214545026/998974029614567515/d9cb1a809bcc4b1b915f40c784e9b365.png`)
        .setColor("#e100ff")
        .setTimestamp()

      let inviteEmbedBtn = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Invitame")
            .setURL("https://discord.com/api/oauth2/authorize?client_id=1001243010031423518&permissions=4398046511095&scope=bot%20applications.commands"),
        )
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Servidor Soporter")
            .setURL("https://discord.gg/2RrqhNg52a"),
        )
        .addComponents(
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Web Soporte")
            .setURL("https://studiodeveloper.online/"),
        )
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setDescription(`*Invitacion Generada de manera exitosa en ${interaction.guild}*`)
          .setColor("Random")
          .setFooter({ text: `Update invite module next` })], components: [new ActionRowBuilder().addComponents(
            [
              new ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji("☢️").setLabel("Link Creado").setURL(`https://discord.gg/2RrqhNg52a`),
            ]
          )]
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
      try {
        user.send({ embeds: [inviteEmbed], components: [inviteEmbedBtn] }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
      } catch (e) {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
            .setDescription(`\`\`\`yml\n${e}\`\`\``)
            .setColor("Random")
            .setFooter({ text: `Error en el comando invites` })], ephemeral: true
        })
        console.log(chalk.redBright(`[Error]`) + chalk.whiteBright(` Se ha usado el comando invite en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
      }
    } else if (interaction.values.includes(`ninth_option`)) {
      try {
        const PingEmbed = new EmbedBuilder()
          .setColor('Random')
          .setTitle('🌍 Ping Creadora Ilimitada!')
          .addFields(
            { name: `\`•\` Message Latency`, value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
            { name: `\`•\` API Latency`, value: `${client.ws.ping}ms`, inline: true },
          )
          .setFooter({ text:`Mas comandos muy pronto nueva actualizacion` })
          .setColor("Random")
          .setTimestamp()
          .setThumbnail(interaction.user.avatarURL());
        const row = new ActionRowBuilder()
          .addComponents([
            new ButtonBuilder()
              .setCustomId('ping_again')
              .setLabel('Reload')
              .setEmoji("1026467687649513563")
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setLabel('Soporte')
              .setEmoji("1008444437057241198")
              .setStyle(ButtonStyle.Link)
              .setURL("https://discord.gg/2RrqhNg52a")
          ]);

        const pingmsg = await interaction.reply({ embeds: [PingEmbed], components: [row], ephemeral: true }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

        const filter = (button) => button.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on("collect", async (button) => {
          if (button.customId === "ping_again") {
            const PingEmbed = new EmbedBuilder()
              .setColor('Random')
              .setTitle('Pong!')
              .addFields(
                { name: `\`•\` Message Latency`, value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
                { name: `\`•\` API Latency`, value: `${client.ws.ping}ms`, inline: true },
              )
              .setFooter({ text: `Mas comandos muy pronto nueva actualizacion` })
              .setTimestamp()
              .setThumbnail(interaction.user.avatarURL());
            const row = new ActionRowBuilder()
              .addComponents([
                new ButtonBuilder()
                  .setCustomId('ping_again')
                  .setLabel('Ping Again')
                  .setStyle(ButtonStyle.Secondary),
              ]);
            button.update({ embeds: [PingEmbed], components: [], ephemeral: true }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
          }
        });
      }
      catch (e) {
        console.log(chalk.redBright(`[Error]`) + chalk.whiteBright(`Se ha usado el comando ping en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
      }
    } else if (interaction.values.includes(`tenth_option`)) {
      const status = [
        "Disconnected",
        "Connected",
        "Connecting",
        "Disconnecting"
      ];

      await client.user.fetch();
      await client.application.fetch();

      const getChannelTypeSize = type => client.channels.cache.filter(channel => type.includes(channel.type)).size;

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Random")
            .setTitle(`🤖 ${client.user.username} Status`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(client.application.description || null)
            .addFields(
              { name: "👩🏻‍🔧 Client", value: client.user.tag, inline: true },
              { name: "📆 Created", value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`, inline: true },
              { name: "☑ Verified", value: client.user.flags & UserFlags.VerifiedBot ? "Yes" : "No", inline: true },
              { name: "👩🏻‍💻 Owner", value: `${client.application.owner.tag || "None"}`, inline: true },
              { name: "📚 Database", value: status[connection.readyState], inline: true },
              { name: "🖥 System", value: os.type().replace("Windows_NT", "Windows").replace("Darwin", "macOS"), inline: true },
              { name: "🧠 CPU Model", value: `${os.cpus()[0].model}`, inline: true },
              { name: "💾 CPU Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, inline: true },
              { name: "⏰ Up Since", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
              { name: "👩🏻‍🔧 Node.js", value: process.version, inline: true },
              { name: "🛠 Discord.js", value: version, inline: true },
              { name: "🏓 Ping", value: `${client.ws.ping}ms`, inline: true },
              { name: "🤹🏻‍♀️ Commands", value: `${client.commands.size}`, inline: true },
              { name: "🌍 Servers", value: `${client.guilds.cache.size}`, inline: true },
              { name: "👨‍👩‍👧‍👦 Users", value: `${client.users.cache.size}`, inline: true },
              { name: "💬 Text Channels", value: `${getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildNews])}`, inline: true },
              { name: "🎤 Voice Channels", value: `${getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice])}`, inline: true },
              { name: "🧵 Threads", value: `${getChannelTypeSize([ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread])}`, inline: true }
            )
        ], components: [new Discord.ActionRowBuilder().addComponents(
          [
            new Discord.ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji("1003455758786101288").setLabel("Web").setURL(`https://studiodeveloper.online/`),
            new Discord.ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji("1026467687649513563").setLabel("Servidor").setURL(`https://discord.gg/2RrqhNg52a`),
            new Discord.ButtonBuilder().setStyle(ButtonStyle.Link).setEmoji("1028005783134294138").setLabel("Invitacion").setURL(`https://discord.com/api/oauth2/authorize?client_id=1001243010031423518&permissions=4398046511095&scope=bot%20applications.commands`),
          ]
        )], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Informacion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
      console.log(chalk.yellowBright("[Comando]") + chalk.whiteBright(`Se ha usado el comando estado en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`))
    }
  },
};