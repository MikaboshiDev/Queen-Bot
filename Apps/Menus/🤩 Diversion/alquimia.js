const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonStyle } = require("discord.js");
const Discord = require(`discord.js`)
const chalk = require("chalk");
const Imagenes = require("../../../Tools/Settings/imagenes.json");
module.exports = {
  id: "Alquimia",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  execute(interaction) {
    if (interaction.values.includes('first_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que son las posiones de minecraft")
          .setDescription("*Las pociones son una forma de curación y mejora de **estadísticas** que se pueden preparar en una mesa de alquimia. Las **pociones** se pueden beber para obtener sus efectos. Las pociones se pueden preparar con ingredientes que se pueden encontrar en el mundo de **Minecraft**, o con ingredientes que se pueden cultivar en un jardín.*")
          .setColor("Random")
          .setImage(Imagenes["alquimia"]["posiones"])
          .setFooter({ text: "Minecraft Wiki" })
        ], components: [new ActionRowBuilder().addComponents([
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Minecraft Wiki")
            .setURL("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Alquimia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('second_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Barriles en Minecraft")
          .setDescription("Los barriles son un nuevo tipo de bloque que se pueden encontrar en el mundo de Minecraft. Los barriles se pueden usar para almacenar objetos, como por ejemplo, objetos de cocina, objetos de decoración, objetos de construcción, etc. Los barriles se pueden encontrar en las aldeas, en las granjas, en las minas, en los templos, en las fortalezas, en los castillos, en las mansiones, en las iglesias, en las casas, en los pueblos, en las ciudades")
          .setColor("Random")
          .setFooter({ text: "Minecraft Wiki" })
        ], components: [new ActionRowBuilder().addComponents([
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Minecraft Wiki")
            .setURL("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Alquimia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('third_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que son los explosivos")
          .setDescription("Los explosivos en minecraft son usados para destruir bloques, minar, y para hacer daño a los enemigos. Los explosivos se pueden encontrar en el mundo de Minecraft, o se pueden fabricar en una mesa de alquimia. Su crafteo de uno como la dinamita es muy sencillo, los explocivos tienen gran importancia en el juego")
          .setColor("Random")
          .setImage(Imagenes["alquimia"]["exposivos"])
          .setFooter({ text: "Minecraft Wiki" })
        ], components: [new ActionRowBuilder().addComponents([
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Minecraft Wiki")
            .setURL("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Alquimia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('fourth_option')) {
      const api = "https://minecraft.fandom.com/api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=";
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que es la pocion de agua")
          .setDescription("Las pociones persistentes se lanzan, como las pociones arrojables, mediante usar. En el impacto con una superficie o pared explotan, creando una nube. La nube está compuesta de las partículas de poción correspondientes a la poción que se arrojó.")
          .setImage(Imagenes["alquimia"]["agua"])
          .setColor("Random")
          .setFooter({ text: "Minecraft Wiki" })
        ], components: [new ActionRowBuilder().addComponents([
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Minecraft Wiki")
            .setURL("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Alquimia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('fifth_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que es la pocion de inifuga")
          .setDescription("anula la mayor parte del daño basado en el fuego. Cuerpo ignífugo es un efecto de estado que no cambia su poder a medida que cambia su potencia. El cuerpo ignífugo no se puede aplicar a los jugadores, pero se puede aplicar a los animales y a los monstruos.")
          .setImage(Imagenes["alquimia"]["inifuga"])
          .setColor("Random")
          .setFooter({ text: "Minecraft Wiki" })
        ], components: [new ActionRowBuilder().addComponents([
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Minecraft Wiki")
            .setURL("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Alquimia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('sixth_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que es la pocion de invisibilidad")
          .setDescription("La invisibilidad es un estado que hace que el jugador sea invisible para los jugadores y los monstruos. El jugador no puede ser atacado por los monstruos mientras está en estado de invisibilidad. La invisibilidad es una de las pociones más útiles en el juego, ya que permite al jugador moverse libremente sin ser atacado por los monstruos.")
          .setImage(Imagenes["alquimia"]["invisibilidad"])
          .setColor("Random")
          .setFooter({ text: "Minecraft Wiki" })
        ], components: [new ActionRowBuilder().addComponents([
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Minecraft Wiki")
            .setURL("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Alquimia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('seventh_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que es la pocion de salto")
          .setDescription("La poción de salto es una poción que aumenta la altura de salto del jugador. La poción de salto se puede fabricar en una mesa de alquimia. La poción de salto se puede fabricar con una poción de regeneración, una poción de fuerza y una poción de velocidad.")
          .setImage(Imagenes["alquimia"]["salto"])
          .setColor("Random")
          .setFooter({ text: "Minecraft Wiki" })
        ], components: [new ActionRowBuilder().addComponents([
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Minecraft Wiki")
            .setURL("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Alquimia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('eighth_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que es la pocion de velocidad")
          .setDescription("La poción de velocidad es una poción que aumenta la velocidad del jugador. La poción de velocidad se puede fabricar en una mesa de alquimia. La poción de velocidad se puede fabricar con una poción de regeneración, una poción de fuerza y una poción de salto.")
          .setImage(Imagenes["alquimia"]["velocidad"])
          .setColor("Random")
          .setFooter({ text: "Minecraft Wiki" })
        ], components: [new ActionRowBuilder().addComponents([
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Minecraft Wiki")
            .setURL("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Alquimia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('ninth_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que es la pocion de regeneracion")
          .setDescription("Regeneración es un efecto de estado que restablece la salud del jugador (o de la criatura) con el tiempo.")
          .setImage(Imagenes["alquimia"]["regeneracion"])
          .setColor("Random")
          .setFooter({ text: "Minecraft Wiki" })
        ], components: [new ActionRowBuilder().addComponents([
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Minecraft Wiki")
            .setURL("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Alquimia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('tenth_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Que es la pocion de fuerza")
          .setDescription("La poción de fuerza es un brebaje para Minecraft que nos otorga un 130% más de daño a nuestros ataques, lo que es ideal para acabar con nuestros enemigos más rápidamente durante los 3 minutos que dura el efecto.")
          .setImage(Imagenes["alquimia"]["fuerza"])
          .setColor("Random")
          .setFooter({ text: "Minecraft Wiki" })
        ], components: [new ActionRowBuilder().addComponents([
          new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Minecraft Wiki")
            .setURL("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        ])], ephemeral: true
      }).catch((error) =>
      console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Alquimia] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    }
  },
};