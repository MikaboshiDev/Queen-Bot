const {
  EmbedBuilder,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  ButtonStyle } = require("discord.js");
const Discord = require('discord.js');
const anime = require('anime-actions');
const borracho = Math.floor(Math.random() * 100);
let porcentajes = Math.floor(Math.random() * 100);
const chance = require('chance').Chance();
var dominios = ["xvideos@outlook.com", "domaAbuelitas02@gmail.com", "filipino2021@hotmail.com", "sexyPro2007@yahoo.com", "matachiquibeibis@pornhub.com", "123456@xnxx.com", "perrisLocas@outlook.com", "mizaeldiosamo2933mx@yahoo.com", "Sΐ𝓂p𝓈Øm#0489@pornhub.com", "furroLover12@xnxx.com", "chiquisPerrisLover@hotmail.com", "xvideos@xnxx.com", "vawetat213@altpano.com", "bapeuwapreceu-8279@yopmail.com", "pruquinnemaca-6758@yopmail.com", "puhallotritra-5416@yopmail.com", "waugabroitaxou-7683@yopmail.com", "toiwizeinnase-9430@yopmail.com"]
var direccion = ["2083 Lawrence Road Lawrenceville NJ 08648-3099", "7700 State Rd 544 Winter Haven FL 33881-9518", "One College Park Decatur IL 62521-8513", "751 WEST HUNDRED ROAD CHESTER VA 23836", "3709 N. Belt Hwy Saint Joseph MO 64506", "1420 Kings Hwy 2nd Fl Brooklyn NY 11229", "9200 University Blvd Charleston SC 29406-9121", "Road 107 Km 3.1 Bo. Borinquen Aguadilla PR 00603", "2525 N Country Club Rd Tucson AZ 85716", "1800 Bronson Blvd Fennimore WI 53809-9778", "12330 Conway Road Saint Louis MO 63141-8609", "4300-C West Bellfort Houston TX 77035-3602", "1140 Boylston St Boston MA 02215"]
let hack = dominios[Math.floor(Math.random() * dominios.length)];
let direcciones = direccion[Math.floor(Math.random() * direccion.length)];
let ip = chance.ip();
let numero = chance.phone({ country: 'us', mobile: true });
let guild = chance.guid();
let postales = chance.postal();
let cordenadas = chance.coordinates();
let contraseña = chance.word({ length: 8 });
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();
const NekoClient = require("nekos.life")
const neko = new NekoClient()
const superagent = require("superagent");
const chalk = require("chalk");
const axios = require("axios").default;
const Imagenes = require("../../../Tools/Settings/imagenes.json");
module.exports = {
  id: "Fun",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction, client) {
      if (interaction.values.includes('second_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`🍺 Porcentaje de Borracho 🍺`)
          .setDescription(`**Tu porcentaje de alcohol en vena es de ${borracho}%**`)
          .setThumbnail(`https://i.imgur.com/EMCghsj.gif`)
          .setColor('#FF0004')
          .setFooter({ text: `Bar Metrix` })], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Divercion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('third_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`La banana de **${interaction.user.tag}** mide **${porcentajes} cm**`)
          .setImage(Imagenes["diversion"]["banana"])
          .setColor("Yellow")
          .setTimestamp()], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Divercion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('fourth_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(` <:VS_cancel:1006609599199186974> Process Hacking Command User Discord `)
          .setDescription(`**${interaction.user.tag}** estos son tus datos **privados**`)
          .addFields(
            { name: "・Ip Data: ", value: ip },
            { name: "・Numero Phone: ", value: numero },
            { name: "・Correo: ", value: hack },
            { name: "・Direccion: ", value: direcciones },
            { name: "・Guilds Data: ", value: guild },
            { name: "・Postal: ", value: postales },
            { name: "・Cordenadas: ", value: cordenadas },
            { name: "・Contraseña: ", value: contraseña })
          .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
          .setColor(`Red`)], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Divercion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('fifth_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle('💞 dar o no dar UwU')
          .setColor('Random')
          .setFooter({ text: `Comandos nsfw fenix` })
          .setTimestamp()
          .setImage(await nsfw.wallpaper())], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Divercion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('sixth_option')) {
      neko.feed().then(neko => {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setTitle(`Acabas de alimentarte *${interaction.user.tag}*`)
            .setImage(neko.url)
            .setColor("Random")], ephemeral: true
        }).catch((error) =>
          console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Divercion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
      })
      function newFunction() {
        return neko.sfw.feed
      }
    } else if (interaction.values.includes('seventh_option')) {
      return interaction.reply({
        embeds: [new Discord.EmbedBuilder()
          .setTitle(`${interaction.user.username} se ha ido`)
          .setColor("Random")
          .setImage(encodeURI(`https://vacefron.nl/api/adios?user=${interaction.user.displayAvatarURL({ format: "png" })}`))]
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Divercion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('eighth_option')) {
      superagent
        .get("https://api.thecatapi.com/v1/images/search", {
          headers: {
            "x-api-key": client.config.cattoKey,
          },
        })
        .then(function (res) {
          const cattoEmbed = new EmbedBuilder()
            .setColor("Grey")
            .setAuthor({ name: "Here's a random picture of a cat!" })
            .setImage(res.body[0].url)
            .setTimestamp()
            .setFooter({
              text: "These images have been brought to you by TheCatAPI.",
            });
          return interaction.reply({ embeds: [cattoEmbed] }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Divercion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        });
    } else if (interaction.values.includes('ninth_option')) {
      try {
        const array = ['tienen una flexibilidad y agilidad impresionante',
          'pueden saltar desde más de 3 metros de altura',
          'pueden rotar sus orejas 180 grados',
          'pueden pasar hasta 14 horas dormidos',
          'debido a su naturaleza nocturna los gatos suelen ser mucho más hiperactivos en la tarde',
          'domésticos, sea cual sea su raza, son todos miembros de una misma especie, Felis catus',
          'se comunican marcando árboles, postes o muebles con sus zarpas o su orín',
          'utilizan el lenguaje corporal a la hora de comunicarse. Frotarse contra un objeto, lamer y ronronear son muestras de afecto.',
          'suelen asustarse ante objetos y situaciones desconocidas así como con los ruidos fuertes debido a su agudo sentido del oído',
          'ven los colores con menos intensidad, y esto les facilita concentrarse en el movimiento sin que nada los distraiga. Además, sus ojos son grandes para el tamaño de su cuerpo, lo cual les permite ver con poca luz',
          'no les gusta que les acaricien el pelo. No vayas a lo largo del costado del cuerpo y te pares en la cola. A algunos gatos les gusta sentir un poco más de presión justo al principio de la cola',
          ' eligen a sus dueños es una frase que se repite y que, en gran medida, es cierta, porque un gato nunca está con alguien si no quiere.',
          ' son animales nocturnos por naturaleza. Los gatos salvajes cazan durante la noche, y los gatos domésticos, han conservado esta tendencia a ser «amantes de la noche»',
          'su audición promedio es al menos cinco veces más aguda que la de un adulto humano',
          'en la raza más grande, el macho promedio pesa aproximadamente 9 kilos',
          'domésticos pasan cerca del 70 por ciento del día durmiendo, y 15 por ciento del día acicalándose.',
          'no puede ver directamente debajo de su nariz', 'tienen uno de los sistemas sensoriales más sofisticados del mundo.',
          'la mayoría no tiene pestañas.',
          'tienen cinco dedos en cada pata delantera, pero sólo cuatro en la parte posterior. Sin embargo, no es raro que los gatos tengan dedos extra. ¡El gato con la mayor cantidad de dedos conocidos tenía 32, ocho en cada pata!',
          'En el Antiguo Egipto eran adorados y el rapto o la venta de estos animales podía ser penado con la muerte, pues su labor como cazadores de ratas era muy valorado.',
          ' adulto solo maúlla para comunicarse con los seres humanos']

        interaction.reply({
          embeds: [new Discord.EmbedBuilder()
            .setTitle(`<:_:1022197353983254528> Eres una fan de los gatos ${interaction.user}:`)
            .setDescription(`*Pues sabias que los gatos *${array[(Math.floor(Math.random() * array.length))]}** ...*`)
            .setImage(Imagenes["diversion"]["gatos"])
            .setColor('FFFFFF')
          ], ephemeral: true
        }).catch((error) =>
          console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Divercion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        console.log(chalk.yellowBright(`[Comando]`) + chalk.whiteBright(` Se ha usado el comando dados en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
      } catch (e) {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
            .setDescription(`\`\`\`yml\n${e}\`\`\``)
            .setColor("Random")
            .setFooter({ text: `Error en el comando dados` })], ephemeral: true
        })
        console.log(chalk.redBright(`[Error]`) + chalk.whiteBright(` Se ha usado el comando dados en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
      }
    } else if (interaction.values.includes('tenth_option')) {
      try {
        const Row = new ActionRowBuilder()
          .addComponents(new Discord.StringSelectMenuBuilder()
            .setCustomId("Alquimia")
            .setPlaceholder("Elige Informacion de la Alquimia")
            .addOptions(
              { label: "🧪 Pociones", description: "Pociones en minecraft", value: 'first_option' },
              { label: "🪣 Barriles", description: "Barriles en minecraft", value: 'second_option' },
              { label: "🧨 Explosivos", description: "Explosivos en minecraft", value: 'third_option' },
              { label: "💧 Agua", description: "Pociones de agua en minecraft", value: 'fourth_option' },
              { label: "🔥 Inifugas", description: "Pociones de Inifugas en minecraft", value: 'fifth_option' },
              { label: "👾 Invisibilidad", value: "invisibilidad", description: "Pociones de invisibilidad en minecraft", value: 'sixth_option' },
              { label: "🦘 Salto", description: "Pociones de salto en miencraft", value: 'seventh_option' },
              { label: "🚄 Velocidad", description: "Pociones de velocidad en minecraft", value: 'eighth_option' },
              { label: "❤️ Regeneración", description: "Pociones de regeneración en minecraft", value: 'ninth_option' },
              { label: "⚔️ Fuerza", description: "Pociones de fuerza en minecraft", value: 'tenth_option' }))
        const embed = new EmbedBuilder()
          .setTitle("🧪 Alquimia 🧪")
          .setDescription("*Selecciona una opcion para ver informacion acerca sobre la alquimia de minecraft suerte*")
          .setColor("Random")
          .setImage(Imagenes["diversion"]["pociones"])

        interaction.reply({ embeds: [embed], components: [Row], ephemeral: true }).catch((error) =>
          console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Divercion] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        console.log(chalk.greenBright(`[Comando]`), chalk.whiteBright(`El usuario ${interaction.user.username} ha usado el comando alquimia en el servidor ${interaction.guild.name} con id ${interaction.guild.id}`));
      } catch (e) {
        interaction.reply({
          embeds: [new EmbedBuilder()
            .setTitle(`<:VS_cancel:1006609599199186974> New status code invalid?`)
            .setDescription(`\`\`\`yml\n${e}\`\`\``)
            .setColor("Random")
            .setFooter({ text: `Error en el comando alquimia` })], ephemeral: true
        })
        console.log(chalk.redBright(`[Error]`) + chalk.whiteBright(` Se ha usado el comando alquimia en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`));
      }
    } else if (interaction.values.includes('eleventh_option')) {

      const { profileImage } = require("discord-arts");
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`<:VS_cancel:1006609599199186974> An error occurred. Please try again later`);

      let personMentioned = interaction.user;
      const bufferImg = await profileImage(personMentioned);
      let attachment = new Discord.AttachmentBuilder(bufferImg, "profile.png");
      interaction.reply({ files: [attachment] }).catch(() => interaction.editReply({ embeds: [embed] }));

    } else if (interaction.values.includes('twelfth_option')) {

      const Canvas = require("canvas");
      const canvas = Canvas.createCanvas(400, 400);
      const ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage(
        Imagenes["diversion"]["canvas"]
      );
      ctx.drawImage(background, 0, 0, 400, 400);
      b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(
        (a, b) => 0.5 - Math.random()
      );
      i = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].sort(
        (a, b) => 0.5 - Math.random()
      );
      n = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].sort(
        (a, b) => 0.5 - Math.random()
      );
      g = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60].sort(
        (a, b) => 0.5 - Math.random()
      );
      o = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75].sort(
        (a, b) => 0.5 - Math.random()
      );
      ctx.fillStyle = "#000";
      ctx.font = "50px Arial";
      ctx.textAlign = "center";

      ctx.fillText(b[0], 70, 125);
      ctx.fillText(b[1], 70, 185);
      ctx.fillText(b[2], 70, 250);
      ctx.fillText(b[3], 70, 320);
      ctx.fillText(b[4], 70, 380);

      ctx.fillText(i[0], 135, 125);
      ctx.fillText(i[1], 135, 185);
      ctx.fillText(i[2], 135, 250);
      ctx.fillText(i[3], 135, 320);
      ctx.fillText(i[4], 135, 380);

      ctx.fillText(n[0], 200, 125);
      ctx.fillText(n[1], 200, 185);
      ctx.fillText(n[2], 200, 320);
      ctx.fillText(n[3], 200, 380);

      ctx.fillText(g[0], 265, 125);
      ctx.fillText(g[1], 265, 185);
      ctx.fillText(g[2], 265, 250);
      ctx.fillText(g[3], 265, 320);
      ctx.fillText(g[4], 265, 380);

      ctx.fillText(o[0], 330, 125);
      ctx.fillText(o[1], 330, 185);
      ctx.fillText(o[2], 330, 250);
      ctx.fillText(o[3], 330, 320);
      ctx.fillText(o[4], 330, 380);

      const attachment = new Discord.AttachmentBuilder(
        canvas.toBuffer(),
        "tablero.png"
      );
      interaction.reply({
        content: "🎮 Juega al tablero y obten tu cartelera del bingo",
        files: [attachment],
        ephemeral: true,
      }).catch((error) =>
        console.log(chalk.redBright(`[SISTEMA]`) + `Acaba de ocurrir un error grave en el comando [Tablero] en el servidor [${interaction.guild.id}]...`));
    } else if (interaction.values.includes('thirteenth_option')) {

      const { Rank } = require("canvacord");
        const User = require("../../../Model/level/user");
      
      const member = interaction.member;

      let user;

      const guildId = member.guild.id;
      const userId = member.user.id;

      user = await User.findOne({ guildId, userId });

      if (!user) {
        user = {
          level: 1,
          xp: 0,
        };
      }

      const rank = new Rank()
        .setAvatar(member.user.displayAvatarURL())
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setRank(0, 0, false)
        .setRequiredXP(user.level * 100)
        .setStatus(member.presence.status)
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator);

      rank.build().then((data) => {
        interaction.reply({
          files: [new AttachmentBuilder(data, { name: "rank.png" })],
        }).catch((error) =>
          console.log(chalk.redBright(`[SISTEMA]`) + `A ocurrido un error en el comando [Game] por el servidor [${interaction.guild.id}]...`));
      });

    } else if (interaction.values.includes('fourteenth_option')) {
      axios
      .get("https://api.popcat.xyz/car")
      .then((response) => {
        const attachment = new AttachmentBuilder(response.data.image, {
          name: "image.png",
        });
        return interaction.reply({ files: [attachment] });
      }).catch(() => interaction.reply({ 
        embeds: [new Discord.EmbedBuilder()
          .setColor("Red")
          .setDescription(`<:VS_cancel:1006609599199186974> An error occurred. Please try again later`)
        ],  ephemeral: true}));
    }
  }
};