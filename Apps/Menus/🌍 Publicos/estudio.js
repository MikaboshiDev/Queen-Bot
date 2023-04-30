const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  id: "CursoGuides",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  execute(interaction, client) {
    var constantes = [
      " **𝜋** = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679",
      " **𝑒** = 2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274",
      " **𝑔** = 9.80665",
      " **𝑘** = 1.38064852 x 10⁻²³",
      " **𝑚𝑒** = 9.10938356 x 10⁻³¹",
      " abogadro = **6.022140857e23**",
      " aceleracion_de_la_gravedad = 9.80665**",
      " aceleracion_de_la_gravedad_en_la_luna = **1.622**",
      " aceleracion_de_la_gravedad_en_marte = **3.711**",
      " aceleracion_de_la_gravedad_en_mercurio = **3.7**",
      " aceleracion_de_la_gravedad_en_neptuno = **11.15**",
      " aceleracion_de_la_gravedad_en_pluton = **0.58**",
      " aceleracion_de_la_gravedad_en_saturno = **10.44**",
      " aceleracion_de_la_gravedad_en_venus = **8.87**",
      " aceleracion_de_la_gravedad_en_jupiter = **24.7**",
      " aceleracion_de_la_gravedad_en_urano = **8.87**",
      " aceleracion_de_la_gravedad_en_la_tierra = **9.80665**",
      " velocidad_de_la_luz = **299792458**",
      " constante_de_stefan_boltzmann = **5.670367e-8**",
      " constante_de_stefan_boltzmann_en_unidades_de_ergios = **5.670367e-5**",
      " constante_de_stefan_boltzmann_en_unidades_de_watts = **5.670367**"
    ]

    const fisica = constantes[Math.floor(Math.random() * constantes.length)];

    if (interaction.values.includes('first_option')) {
      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(" Bedrock y sus propios **Addons**")
          .setDescription(` <a:Dashbord:997754372496830534> Los servidores de Minecraft permiten a los jugadores jugar en línea o a través de una red de área local con otras personas. Esto es muy común en Java Edition Minecraft, pero también es posible en Bedrock.`)
          .addFields({ name: `➥ Comandos`, value: `Las funciones se utilizan para agrupar varios comandos de Minecraft (como /sayo /teleport) en fragmentos (o funciones) manejables. Los comandos dentro de un archivo de función no comienzan con /.` },
            { name: `➥ Entidades`, value: `Tres estructuras principales constituyen la base de un archivo de entidad de paquete de comportamiento. Este documento explicará qué significa cada uno de ellos y cómo utilizarlos. Confundir grupos de componentes con componentes es una fuente generalizada de errores. Preste mucha atención para entender la diferencia.` },
            { name: `➥ Notas RakNet`, value: `Todas las cadenas tienen el prefijo de un breve sin firmar que representa su longitud. La identificación del mensaje fuera de línea siempre será: 00ffff00fefefefefdfdfdfd12345678 (hex) - esta serie de bytes se denominará Magic La identificación del mensaje fuera de línea se envía con mensajes no conectados, como pings y pongs no conectados. Los GUIDS utilizados por RakNet tienen una longitud de 8 bytes. El primer byte se utiliza para identificar el tipo de mensaje.` })
          .setFooter({ text: "Pequeña Guia de Bedrock" })
          .setTimestamp()
          .setColor("Random")
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://wiki.bedrock.dev/servers/server-software.html")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('second_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Constantes Físicas y Matemáticas")
          .setColor("Random")
          .setDescription(`${fisica}`)
          .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('third_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`Que es css?`)
          .setDescription(`CSS es un lenguaje de hojas de estilo en cascada que describe la presentación de documentos HTML y XML. CSS describe cómo los elementos deben ser renderizados en pantalla, en papel, en voz alta o en otros medios. CSS es independiente del lenguaje y puede ser aplicado a cualquier documento HTML. CSS es un lenguaje de estilo que se puede usar para diseñar páginas web. CSS se puede utilizar para controlar el color del texto, el estilo de la fuente, el tamaño de la fuente, el espacio entre las palabras y las letras, el color de fondo, las imágenes de fondo, el diseño de la página, los efectos de transición, etc.`)
          .setColor(`Random`)
          .setTimestamp()
          .addFields(
            { name: `Ejemplo de css`, value: `\`\`\`css\nbody {\n  background-color: lightblue;\n}\n\nh1 {\n  color: white;\n  text-align: center;\n}\n\`\`\`` },
            { name: `Que es un selector?`, value: `Un selector es un patrón que se utiliza para seleccionar los elementos que se aplicarán a una regla de estilo. Los selectores pueden ser etiquetas, clases, IDs, atributos, etc. Los selectores se utilizan para seleccionar elementos HTML para aplicar estilos CSS.` },
            { name: `Ejemplo de selector`, value: `\`\`\`css\nbody {\n  background-color: lightblue;\n}\n\`\`\`` },
            { name: `Que es una propiedad?`, value: `Una propiedad es un atributo de un elemento HTML. Por ejemplo, el color, la fuente, el tamaño, etc. Las propiedades se utilizan para aplicar estilos CSS a los elementos HTML.` },
            { name: `Ejemplos de html`, value: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<head>\n<style>\nbody {\n  background-color: lightblue;\n}\n\nh1 {\n  color: white;\n  text-align: center;\n}\n</style>\n</head>\n<body>\n\n<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n\n</body>\n</html>\n\`\`\`` },
            { name: `Que es un valor?`, value: `Un valor es el valor de una propiedad CSS. Por ejemplo, si la propiedad es color, el valor puede ser rojo, azul, verde, etc.` },
            { name: `Que es una regla de estilo?`, value: `Una regla de estilo es una combinación de un selector y una declaración. Una declaración es una combinación de una propiedad y un valor.` },
            { name: `Ejemplo de menu`, value: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<head>\n<style>\nul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  background-color: #333;\n}\n\nli {\n  float: left;\n}\n\nli a {\n  display: block;\n  color: white;\n  text-align: center;\n  padding: 14px 16px;\n  text-decoration: none;\n}\n\nli a:hover {\n  background-color: #111;\n}\n</style>\n</head>\n<body>\n\n<ul>\n  <li><a class="active" href="#home">Home</a></li>\n  <li><a href="#news">News</a></li>\n  <li><a href="#contact">Contact</a></li>\n  <li><a href="#about">About</a></li>\n</ul>\n\n<h3>Vertical Menu</h3>\n<p>A vertical menu is displayed on the left side of a web page. It is a good way to navigate a website.</p>\n\n</body>\n</html>\n\`\`\`` },
            { name: `Que es una declaración?`, value: `Una declaración es una combinación de una propiedad y un valor.` },
            { name: `Ejemplo de boton`, value: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<head>\n<style>\n.button {\n  background-color: #4CAF50; /* Green */\n  border: none;\n  color: white;\n  padding: 15px 32px;\n  text-align: center;\n  text-decoration: none;\n  display: inline-block;\n  font-size: 16px;\n  margin: 4px 2px;\n  cursor: pointer;\n}\n\n.button1 {background-color: #4CAF50;} /* Green */\n.button2 {background-color: #008CBA;} /* Blue */\n.button3 {background-color: #f44336;} /* Red */ \n.button4 {background-color: #e7e7e7; color: black;} /* Gray */ \n.button5 {background-color: #555555;} /* Black */\n</style>\n</head>\n<body>\n\n<h1>The button Element</h1>\n\n<p>The HTML button element represents a clickable button, used to submit forms or anywhere in a document for accessible, standard button functionality.</p>\n\n<button class="button button1">Button 1</button>\n<button class="button button2">Button 2</button>\n<button class="button button3">Button 3</button>\n<button class="button button4">Button 4</button>\n<button class="button button5">Button 5</button>\n\n</body>\n</html>\n\`\`\`` },
            { name: `Ejemplo de tabla`, value: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<head>\n<style>\ntable, th, td {\n  border: 1px solid black;\n  border-collapse: collapse;\n}\nth, td {\n  padding: 5px;\n  text-align: left;\n}\n</style>\n</head>\n<body>\n\n<h2>Table</h2>\n\n<table style="width:100%">\n  <tr>\n    <th>Firstname</th>\n    <th>Lastname</th> \n    <th>Age</th>\n  </tr>\n  <tr>\n    <td>Jill</td>\n    <td>Smith</td> \n    <td>50</td>\n  </tr>\n  <tr>\n    <td>Eve</td>\n    <td>Jackson</td> \n    <td>94</td>\n  </tr>\n  <tr>\n    <td>John</td>\n    <td>Doe</td> \n    <td>80</td>\n  </tr>\n</table>\n\n</body>\n</html>\n\`\`\`` },
            { name: `Ejemplo de imagen`, value: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<body>\n\n<h2>Image</h2>\n\n<img src = "https://www.w3schools.com/images/w3schools_green.jpg" alt = "W3Schools.com" width = "104" height = "142">\n\n</body>\n</html>\n\`\`\`` },
            { name: `Ejemplo de video`, value: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<body>\n\n<h2>Video</h2>\n\n<video width="320" height="240" controls>\n  <source src="movie.mp4" type="video/mp4">\n  <source src="movie.ogg" type="video/ogg">\n  Your browser does not support the video tag.\n</video>\n\n</body>\n</html>\n\`\`\`` },
            { name: `Ejemplo de audio`, value: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<body>\n\n<h2>Audio</h2>\n\n<audio controls>\n  <source src="horse.ogg" type="audio/ogg">\n  <source src="horse.mp3" type="audio/mpeg">\n  Your browser does not support the audio element.\n</audio>\n\n</body>\n</html>\n\`\`\`` },
            { name: `Ejemplo de iframe`, value: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<body>\n\n<h2>IFrame</h2>\n\n<iframe src="https://www.w3schools.com"></iframe>\n\n</body>\n</html>\n\`\`\`` },
            { name: `Ejemplo de canvas`, value: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<body>\n\n<h2>Canvas</h2>\n\n<canvas id="myCanvas" width="200" height="100" style="border:1px solid #d3d3d3;">\nYour browser does not support the HTML5 canvas tag.</canvas>\n\n<script>\nvar c = document.getElementById("myCanvas");\nvar ctx = c.getContext("2d");\nctx.font = "30px Arial";\nctx.strokeText("Hello World",10,50);\n</script>\n\n</body>\n</html>\n\`\`\`` },
          )
          .setFooter({ text: `Que es css y sus ejemplos de construccion` })
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/CSS_basics")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('fourth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(` 📓 Estudio Clases JavaScript y sus Clases`)
          .setTimestamp()
          .setDescription(`Las clases de javascript, introducidas en ECMAScript 2015, son una mejora sintáctica sobre la herencia basada en prototipos de JavaScript. La sintaxis de las clases no introduce un nuevo modelo de herencia orientada a objetos en JavaScript. Las clases de JavaScript proveen una sintaxis mucho más clara y simple para crear objetos y lidiar con la herencia.`)
          .addFields(
            { name: `\`•\` Clases`, value: `Las clases son una forma de crear objetos con propiedades y métodos.` },
            { name: ` Ejemplo de Clases`, value: `\`\`\`js\n// Definición de la clase\n class Rectangle {\n constructor(height, width) {\n this.height = height;\n this.width = width;\n }\n}\n\n// Creación de un objeto\n const cuadrado = new Rectangle(10, 10);\n\nconsole.log(cuadrado.height);\n// expected output: 10\n\`\`\`` },
            { name: `\`•\` Herencia`, value: `La herencia en JavaScript es un mecanismo por el cual un objeto puede acceder a las propiedades y métodos de otro objeto.` },
            { name: ` Ejemplo de Herencia`, value: `\`\`\`js\n// Definición de la clase\n class Animal {\n constructor(name) {\n this.name = name;\n }\n\n speak() {\n console.log(this.name + ' makes a noise.');\n }\n}\n\n// Definición de la clase\n class Dog extends Animal {\n speak() {\n console.log(this.name + ' barks.');\n }\n}\n\n// Creación de un objeto\n let d = new Dog('Mitzie');\n d.speak();\n// expected output: "Mitzie barks."\n\`\`\`` },
            { name: `\`•\` Métodos estáticos`, value: `Los métodos estáticos se definen utilizando la palabra clave static. Los métodos estáticos son llamados sin instanciar su clase y no pueden ser llamados a través de una instancia de la clase. Los métodos estáticos son a menudo utilizados para crear funciones de utilidad para una aplicación.` },
            { name: ` Ejemplo de Métodos estáticos`, value: `\`\`\`js\n// Definición de la clase\n class Punto {\n constructor(x, y) {\n this.x = x;\n this.y = y;\n }\n\n static distancia(a, b) {\n const dx = a.x - b.x;\n const dy = a.y - b.y;\n return Math.sqrt(dx*dx + dy*dy);\n }\n}\n\nconst p1 = new Punto(5, 5);\nconst p2 = new Punto(10, 10);\n\nconsole.log(Punto.distancia(p1, p2));\n// expected output: 7.0710678118654755\n\`\`\`` },
            { name: `\`•\` Getters y Setters`, value: `Los getters y setters son funciones que obtienen y establecen valores de propiedades de un objeto. Estos son accesibles mediante notación de punto.` },
            { name: ` Ejemplo de Getters y Setters`, value: `\`\`\`js\n// Definición de la clase\n class Punto {\n constructor(x, y) {\n this.x = x;\n this.y = y;\n }\n\n get distancia() {\n return Math.sqrt(this.x * this.x + this.y * this.y);\n }\n\n set distancia(value) {\n const factor = value / this.distancia;\n this.x *= factor;\n this.y *= factor;\n }\n}\n\nconst p1 = new Punto(5, 5);\n\nconsole.log(p1.distancia);\n// expected output: 7.0710678118654755\n\`\`\`` },
            { name: `\`•\` Herencia múltiple`, value: `La herencia múltiple en JavaScript es un mecanismo por el cual un objeto puede heredar las propiedades de otro objeto.` },
            { name: ` Ejemplo de Herencia múltiple`, value: `\`\`\`js\n// Definición de la clase\n class Animal {\n constructor(name) {\n this.name = name;\n }\n\n speak() {\n console.log(this.name + ' makes a noise.');\n }\n}\n\n// Definición de la clase\n class Perro {\n speak() {\n console.log(this.name + ' barks.');\n }\n}\n\n// Definición de la clase\n class Gato {\n speak() {\n console.log(this.name + ' meows.');\n }\n}\n\n// Definición de la clase\n class Loro extends Animal {\n speak() {\n super.speak();\n console.log(this.name + ' wants a cracker!');\n }\n}\n\n// Definición de la clase\n class PerroGato extends Perro, Gato {}\n\nlet d = new PerroGato('Mitzie');\nd.speak();\n// expected output: "Mitzie barks."\n\`\`\`` },
          )
          .setFooter({ text: `Ejecutado por ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://lenguajejs.com/javascript/oop/clases/")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('fifth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`📓 Documentacion de discord.js`)
          .setTimestamp()
          .setDescription(`**[Documentacion de discord.js](https://discord.js.org/#/docs/main/stable/general/welcome)**`)
          .addFields(
            { name: `Que es discord.js`, value: `Es una libreria de javascript que nos permite interactuar con la API de discord.` },
            { name: `Como instalar discord.js`, value: `Para instalar discord.js debes ejecutar el siguiente comando en tu terminal: \`npm i discord.js\`` },
            { name: `Como usar discord.js`, value: `Para usar discord.js debes importar la libreria en tu archivo de javascript, para eso debes ejecutar el siguiente codigo: \`const Discord = require("discord.js");\`` },
            { name: `Como crear un embed`, value: `Para crear un embed debes ejecutar el siguiente codigo: \`const embed = new Discord.EmbedBuilder()\` y luego puedes agregarle los campos que quieras, por ejemplo: \`embed.setTitle("Titulo del embed")\`` },
            { name: `Ejemplo de embed`, value: `\`\`\`js\nconst Discord = require("discord.js");\nconst embed = new Discord.EmbedBuilder()\n.setTitle("Titulo del embed")\n.setDescription("Descripcion del embed")\n.setTimestamp()\n.setFooter({text: "Pie del embed", iconUrl: "https://cdn.discordapp.com/avatars/852000000000000000/00000000000000000000000000000000.png?size=1024"})\n.setColor("RANDOM")\n\`\`\`` },
            { name: `Como crear un boton`, value: `Para crear un boton debes ejecutar el siguiente codigo: \`const button = new Discord.ButtonBuilder()\` y luego puedes agregarle los campos que quieras, por ejemplo: \`button.setLabel("Label del boton")\`` },
            { name: `Ejemlo de boton`, value: `\`\`\`js\nconst Discord = require("discord.js");\nconst button = new Discord.ButtonBuilder()\n.setLabel("Label del boton")\n.setStyle("PRIMARY")\n.setCustomId("custom_id_del_boton")\n\`\`\`` },
            { name: `Como usar Modals`, value: `Para usar Modals debes ejecutar el siguiente codigo: \`const modal = new Discord.ModalBuilder()\` y luego puedes agregarle los campos que quieras, por ejemplo: \`modal.setTitle("Titulo del modal")\`` },
            { name: `Ejemplo de Modal`, value: `\`\`\`js\nconst Discord = require("discord.js");\nconst modal = new Discord.ModalBuilder()\n.setTitle("Titulo del modal")\n.setDescription("Descripcion del modal")\n.setCustomId("custom_id_del_modal")\n\`\`\`` },
            { name: `Como usar Select Menus`, value: `Para usar Select Menus debes ejecutar el siguiente codigo: \`const select = new Discord.SelectMenuBuilder()\` y luego puedes agregarle los campos que quieras, por ejemplo: \`select.setLabel("Label del select")\`` },
            { name: `Ejemplo de Select Menu`, value: `\`\`\`js\nconst Discord = require("discord.js");\nconst select = new Discord.SelectMenuBuilder()\n.setLabel("Label del select")\n.setCustomId("custom_id_del_select")\n\`\`\`` },
            { name: `Como usar Mongoose DB`, value: `Para usar Mongoose DB debes ejecutar el siguiente codigo:` },
            { name: `Ejemplo de Mongoose DB`, value: `\`\`\`js\nconst mongoose = require("mongoose")\nmongoose.connect("mongodb://localhost:27017/db")\n\`\`\`` },
            { name: `Como usar Canvas`, value: `Para usar Canvas debes ejecutar el siguiente codigo:` },
            { name: `Ejemplo de Canvas`, value: `\`\`\`js\nconst Canvas = require("canvas")\nconst canvas = Canvas.createCanvas(200, 200)\nconst ctx = canvas.getContext("2d")\n\`\`\`` },
            { name: `Como usar fs`, value: `Para usar fs debes ejecutar el siguiente codigo:` },
            { name: `Ejemplo de fs`, value: `\`\`\`js\nconst fs = require("fs")\nfs.readFile("archivo.txt", "utf8", (err, data) => {\nif (err) throw err;\nconsole.log(data);\n})\n\`\`\`` },
            { name: `Como usar express`, value: `Para usar express debes ejecutar el siguiente codigo:` },
            { name: `Ejemplo de express`, value: `\`\`\`js\nconst express = require("express")\nconst app = express()\napp.get("/", (req, res) => {\nres.send("Hola mundo")\n})\napp.listen(3000)\n\`\`\`` },
            { name: `Como usar axios`, value: `Para usar axios debes ejecutar el siguiente codigo:` },
            { name: `Ejemplo de axios`, value: `\`\`\`js\nconst axios = require("axios")\naxios.get("https://api.example.com")\n.then((res) => {\nconsole.log(res.data)\n})\n.catch((err) => {\nconsole.log(err)\n})\n\`\`\`` },
          )
          .setFooter({ text: `Solicitado por ${interaction.user.tag}`, iconUrl: interaction.user.displayAvatarURL({ dynamic: true }) })
          .setColor("Random")
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://discord.js.org/#/")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('sixth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(" Config Basica Network Java & Bedrock como **EMPEZARLO**")
          .setDescription(` <a:Dashbord:997754372496830534> Una network consiste en la creacion de una serie de servidores conectados por medio de un proxi para la entrada y jugabilidad de ambas plataformas java & bedrock para su creacion se puede usar dos cosas desde velocity o spigot, bungecord ambas tienen sus ventajas y sus concecuencias sin embargo todo depende de tus propias configuraciones. Se puede hacer muchas cosas en este tipo de configuraciones desde diferentes tipos de logins, modalidades de juego, Misiones, Minijuegos y mucho mas`)
          .addFields({ name: `➥ Spigot, Bungecord`, value: `¿Qué es BungeeCord? BungeeCord permite unir varios servidores dentro de una misma conexión. Eso quiere decir que no tienes que desconectarte y cambiar de servidor para otro modo de juego o tener que correr varios modos de juego en un único servidor.` },
            { name: `➥ Velocity`, value: `Velocity is a next-generation Minecraft proxy focused on scalability and flexibility. It allows server owners to link together multiple Minecraft servers so they may appear as one.` },
            { name: `Informacion Extra`, value: `Tambien hay que recordar que es bueno dar una optimizacion a los servidores de las modalidades o lobby que realises te dare un material de ayuda para esta parte` })
          .setFooter({ text: "Pequeña Guia de Networking" })
          .setTimestamp()
          .setColor("Random")
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://paper-chan.moe/paper-optimization/")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('seventh_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle("Para que sirve **PHP**")
          .setDescription(`
         <a:Dashbord:997754372496830534> Sin duda, el PHP puede ser utilizado para un gran número diferente de aplicaciones, y es que es un lenguaje de programación de código abierto.  ¿Qué significa que sea un lenguaje de código abierto? En este contexto, un lenguaje de código abierto permite a los desarrolladores editar su estructura, y por lo tanto aplicarse en cualquier proyecto. Como ya hemos mencionado anteriormente, es un lenguaje que permite incrustar HTML y para ello, no es necesario usar muchos comandos para que se muestre el HTML. `)
          .addFields(
            { name: `Php y PocketMine`, value: `El comportamiento de PocketMine-MP está controlado por varios archivos de configuración. Puede editarlos para cambiar el comportamiento de su servidor te adjunto una guia para ello https://doc.pmmp.io/en/rtfd/configuration.html.` },
            { name: `Operadores`, value: `\`\`\`php\n<?php\n    $a = 5;\n    $b = 2;\n    $c = $a + $b;\n    $d = $a - $b;\n    $e = $a * $b;\n    $f = $a / $b;\n    $g = $a % $b;\n\`\`\`` },
            { name: `PocketMine y Plugins`, value: `Pocketmine permite modificaciones mas haya de los recursos vanilla de bedrock sin embargo no siempre encontraras lo que buscas en estos casos puedes tu mismo crear y configurar tus propios plugins a tu gusto te dejo el siguiente link: https://poggit.pmmp.io/plugins` },
            { name: `Tipos de Datos`, value: `\`\`\`php\n<?php\n    $nombre = "Pepe";\n    $edad = 18;\n    $altura = 1.80;\n    $casado = false;\n    $hijos = null;\n\`\`\`` },
            { name: `Comunidad PocketMine `, value: `Existen muchos grupos de discord apegados a lo que es Pocket Mine y su comunidad en ellas puedes encontrar creadores, servidores de mc y mas en cuanto a su comunidad pocketmine no se queda atras en ningun momento` },
            { name: `Codigo de ejemplo`, value: `\`\`\`php\n<?php\n$nombre = "Pepe";\n$edad = 18;\n$altura = 1.80;\n\nprint("Hola $nombre, tienes $edad años y mides $altura metros");\n\`\`\`` },
            { name: `Bases de Codificacion`, value: `\`\`\`php\n<?php\n   // Comentario de una linea\n    /* Comentario de varias lineas */\n    # Comentario de una linea\n\`\`\`` },
            { name: `Variables`, value: `\`\`\`php\n<?php\n    $nombre = "Pepe";\n    $edad = 18;\n    $altura = 1.80;\n\`\`\`` },
            { name: `Constantes`, value: `\`\`\`php\n<?php\n    define("PI", 3.1416);\n    define("NOMBRE", "Pepe");\n\`\`\`` },
          )
          .setFooter({ text: "PHP y PocketMine" })
          .setThumbnail("https://cdn.discordapp.com/attachments/1027458270589362257/1027464584593952778/5.jpg")
          .setColor("Random")
          .setTimestamp()
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setURL("https://www.w3schools.com/php/")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('eighth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(" Que es PocketMine y que lo **DEFERENCIA**")
          .setDescription(` <a:Dashbord:997754372496830534> PocketMine-MP (PMMP1​) es un software de servidor desarrollado en PHP originalmente por Shoghi para Minecraft-Pocket Edition (en adelante, "MCPE"). Actualmente está siendo desarrollado por PocketMine Team para Minecraft-Bedrock Edition (en adelante, "MCBE").`)
          .addFields({ name: `➥ Forums`, value: `Los nuevos foros de PMMP proporcionarán una plataforma para soporte no relacionado con errores, así como debates generales con el objetivo de fomentar las relaciones con la comunidad (y reducir el spam en el rastreador de problemas de GitHub). Es un lugar para que la comunidad interactúe entre sí y con el equipo de PMMP, así como para obtener soluciones a sus problemas. Los antiguos foros de PocketMine permanecerán abiertos para fines de referencia, sin embargo, todo el contenido nuevo relacionado con PMMP debe publicarse en los nuevos foros.` },
            { name: `➥ Plugin Support`, value: `Amplíe el juego de la manera que desee utilizando una API de complemento fácil de comprender; agregar características impresionantes.` },
            { name: `Discord`, value: `Chat en vivo con otros creadores, bueno para resolver problemas rápidos y planificar el futuro.` })
          .setFooter({ text: "Pequeña Guia de Pocketmine" })
          .setTimestamp()
          .setColor("Random")
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://help.ggservers.com/en-us/article/pocketmine-introduction-zbf6vp/")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('ninth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(" Que es PowerNukkit y que lo **DEFERENCIA**")
          .setDescription(` <a:Dashbord:997754372496830534> PowerNukkit es una versión modificada de Nukkit, un software de servidor de Minecraft Bedrock Edition hecho en Java, que agrega soporte a una gran cantidad de características como el registro de agua, todos los bloques nuevos, más eventos de complementos, ranura improvisada, corrección de errores y muchos más.`)
          .addFields({ name: `➥ Forums`, value: ` Hable con los desarrolladores y propietarios de servidores, diviértase, resuelva problemas y comparta experiencias juntos.` },
            { name: `➥ Github`, value: `El lugar perfecto para reportar problemas y hacer sugerencias usando el sistema de problemas. Hable directamente con los desarrolladores.` },
            { name: `Discord`, value: `Chat en vivo con otros creadores, bueno para resolver problemas rápidos y planificar el futuro.` })
          .setFooter({ text: "Pequeña Guia de Networking" })
          .setTimestamp()
          .setColor("Random")
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://devs.powernukkit.org/")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('tenth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`Que es go y como se trabaja actualmente`)
          .setColor("Random")
          .setTimestamp()
          .setFooter({ text: `Que es go ya lo sabias ?` })
          .setDescription(`Go es un lenguaje de programación relativamente nuevo, su lanzamiento oficial fue a finales de 2009 (aunque su primera versión estable fue en 2012), por lo que no lleva ni una década entre nosotros.`)
          .addFields(
            { name: `Caracteristicas de Go`, value: `El Lenguaje Go, al igual que C y C++, es un lenguaje compilado y concurrente, o en otras palabras: soporta canales de comunicación basados en el lenguaje CSP. Sin embargo, la concurrencia en Go es diferente a los criterios de programación basados en bloqueos como pthreads. Los creadores de Go, además, se inspiraron en la versatilidad y las cualidades de otros lenguajes como Python, C++ y Java (entre otros), para conseguir un lenguaje con las siguientes características, algunas únicas, y otras compartidas con otros lenguajes compilados.` },
            { name: `Ejemplo de codigo en Go`, value: `\`\`\`go\npackage main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}\n\`\`\`` },
            { name: `Codigo Ejemplos`, value: `\`\`\`go\nimportar «fmt»\nfunc main () {\n\nvar p * int\nv: = 42\np = & v\n\nfmt.Println («p apunta a v =», * p)\nfmt.Println («v =», v)\nfmt.Println («dirección de v =», p)\n }\n\`\`\`` },
          )
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://www.goguide.io/home")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('eleventh_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`Guia de HTML`)
          .setColor(client.color)
          .setDescription(`Html es un lenguaje de programacion que se utiliza para crear paginas web, aqui te dejo una guia de html`)
          .addFields(
            { name: "Que es HTML", value: ` Es un lenguaje de marcado que se utiliza para el desarrollo de páginas web. HTML es un acrónimo que significa HyperText Markup Language, que en español significa Lenguaje de Marcas de Hipertexto.` },
            { name: "¿Qué es un lenguaje de marcado?", value: `Un lenguaje de marcado es un lenguaje de programación que se utiliza para crear páginas web. Los lenguajes de marcado se utilizan para describir la estructura de una página web, mientras que los lenguajes de programación se utilizan para describir el comportamiento de una página web.` },
            { name: "¿Qué es un lenguaje de programación?", value: `Un lenguaje de programación es un lenguaje de programación que se utiliza para crear páginas web. Los lenguajes de programación se utilizan para describir el comportamiento de una página web, mientras que los lenguajes de marcado se utilizan para describir la estructura de una página web.` },
            { name: `Ejemplos de lenguajes de marcado`, value: `HTML, XML, XHTML, SGML, etc.` },
            { name: `Ejemplo de uso de HTML`, value: `\`\`\`html\n<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>\n</head>\n<body>\n\n<h1>This is a Heading</h1>\n<p>This is a paragraph.</p>\n\n</body>\n</html>\`\`\`` },
            { name: `Ejemplo de uso de XML`, value: `\`\`\`xml\n<?xml version="1.0" encoding="UTF-8"?>\n<note>\n<to>Tove</to>\n<from>Jani</from>\n<heading>Reminder</heading>\n<body>Don't forget me this weekend!</body>\n</note>\`\`\`` },
            { name: `Ejemplo de uso de XHTML`, value: `\`\`\`xhtml\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml">\n<head>\n<title>Page Title</title>\n</head>\n<body>\n\n<h1>This is a Heading</h1>\n<p>This is a paragraph.</p>\n\n</body>\n</html>\`\`\`` },
            { name: `Ejemplo de uso de SGML`, value: `\`\`\`sgml\n<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">\n<HTML>\n<HEAD>\n<TITLE>HTML Example</TITLE>\n</HEAD>\n<BODY>\n<H1>HTML Example</H1>\n<P>This is an example of HTML.</P>\n</BODY>\n</HTML>\`\`\`` },
          )
          .setFooter({ text: `Que es html y como usarlo GUIDES` })
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://www.w3schools.com/html/")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

    } else if (interaction.values.includes('twelfth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`Guia de C# Inicio`)
          .setColor("Random")
          .setDescription("es un lenguaje de programación multiparadigma desarrollado y estandarizado por la empresa Microsoft como parte de su plataforma .NET, que después fue aprobado como un estándar por la ECMA e ISO. C# es uno de los lenguajes de programación diseñados para la infraestructura de lenguaje común.")
          .addFields(
            { name: `Supports`, value: `C# supports strongly, implicitly typed variable declarations with the keyword var, and implicitly typed arrays with the keyword new[] followed by a collection initializer.` },
            { name: `Ejemplo de codigo en C#`, value: `\`\`\`csharp\nusing System;\n\nnamespace HelloWorld\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            Console.WriteLine("Hello World!");\n        }\n    }\n}\n\`\`\`` },
            { name: `Ejemplo de GUI`, value: `\`\`\`csharp\nusing System;\nusing System.Windows.Forms;\n\nnamespace HelloWorld\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            MessageBox.Show("Hello World!");\n        }\n    }\n}\n\`\`\`` },
            { name: `Uso de in en codigo`, value: `\`\`\`csharp\nusing System;\n\nnamespace HelloWorld\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            int i = 0;\n            for (i = 0; i < 10; i++)\n            {\n                Console.WriteLine(i);\n            }\n        }\n    }\n}\n\`\`\`` },
            { name: `Uso de foreach en codigo`, value: `\`\`\`csharp\nusing System;\n\nnamespace HelloWorld\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            int[] numbers = { 1, 2, 3, 4, 5 };\n            foreach (int i in numbers)\n            {\n                Console.WriteLine(i);\n            }\n        }\n    }\n}\n\`\`\`` },
            { name: `Uso de if en codigo`, value: `\`\`\`csharp\nusing System;\n\nnamespace HelloWorld\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            int i = 0;\n            if (i == 0)\n            {\n                Console.WriteLine("i is 0");\n            }\n        }\n    }\n}\n\`\`\`` },
            { name: `Uso de switch en codigo`, value: `\`\`\`csharp\nusing System;\n\nnamespace HelloWorld\n{\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            int i = 0;\n            switch (i)\n            {\n                case 0:\n                    Console.WriteLine("i is 0");\n                    break;\n                case 1:\n                    Console.WriteLine("i is 1");\n                    break;\n                default:\n                    Console.WriteLine("i is not 0 or 1");\n                    break;\n            }\n        }\n    }\n}\n\`\`\`` },
            { name: `Uso de estructura inmutable`, value: `\`\`\`csharp\nusing System;\n\nnamespace HelloWorld\n{\n    struct Point\n    {\n        public int x;\n        public int y;\n    }\n\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            Point p1;\n            p1.x = 7;\n            p1.y = 9;\n            Console.WriteLine("p1 is ({0}, {1})", p1.x, p1.y);\n        }\n    }\n}\n\`\`\`` },
            { name: `Uso de estructura mutable`, value: `\`\`\`csharp\nusing System;\n\nnamespace HelloWorld\n{\n    class Point\n    {\n        public int x;\n        public int y;\n    }\n\n    class Program\n    {\n        static void Main(string[] args)\n        {\n            Point p1 = new Point();\n            p1.x = 7;\n            p1.y = 9;\n            Console.WriteLine("p1 is ({0}, {1})", p1.x, p1.y);\n        }\n    }\n}\n\`\`\`` },
          )
          .setFooter({ text: `Que es C# y como usarlo GUIDES` })
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/")
        ])], ephemeral: true
      }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Estudio] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    } else if (interaction.values.includes('thirteenth_option')) {

      interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(`Redes Neuronales Basicas`)
          .setColor("Random")
          .setDescription("Las redes neuronales son modelos creados al ordenar operaciones matemáticas siguiendo una determinada estructura. La forma más común de representar la estructura de una red neuronal es mediante el uso de capas (layers), formadas a su vez por neuronas (unidades, units o neurons). Cada neurona, realiza una operación sencilla y está conectada a las neuronas de la capa anterior y de la capa siguiente mediante pesos, cuya función es regular la información que se propaga de una neurona a otra.")
          .addFields(
            { name: "La neurona", value: "La neurona es la unidad básica de una red neuronal. Cada neurona recibe una serie de entradas, las cuales son combinadas mediante una función de activación, que genera una salida. La función de activación es una función matemática que transforma la suma ponderada de las entradas en una salida. La función de activación más común es la función sigmoide, que se define como:\n\n\`\`\`csharp\nf(x) = 1 / (1 + e^-x)\n\`\`\`\n\nLa función sigmoide es una función continua, derivable y monótona creciente, que toma valores entre 0 y 1. La función sigmoide es una función de activación no lineal, lo que significa que la salida de la función sigmoide no es una combinación lineal de las entradas." },
            { name: "La capa", value: "Una capa es un conjunto de neuronas que reciben las entradas de la capa anterior y generan las salidas de la capa siguiente. Las capas se pueden clasificar en dos tipos: capas de entrada y capas ocultas. La capa de entrada es la primera capa de la red, y recibe las entradas de la red. Las capas ocultas son las capas intermedias de la red, que reciben las entradas de la capa anterior y generan las salidas de la capa siguiente. La última capa de la red es la capa de salida, que genera las salidas de la red." },
            { name: "Multiples Capas", value: "Las redes neuronales pueden tener múltiples capas. Las redes neuronales con múltiples capas se conocen como redes neuronales profundas (deep neural networks). Las redes neuronales profundas son redes neuronales que tienen más de una capa oculta. Las redes neuronales profundas son más poderosas que las redes neuronales con una sola capa, ya que pueden aprender relaciones más complejas entre las entradas y las salidas. Sin embargo, las redes neuronales profundas son más difíciles de entrenar que las redes neuronales con una sola capa, ya que el proceso de entrenamiento requiere más iteraciones." },
            { name: "Modelos de redes neuronales en Scikit-learn", value: "Scikit-learn proporciona una serie de modelos de redes neuronales, que se pueden utilizar para resolver problemas de clasificación y regresión. Los modelos de redes neuronales en Scikit-learn se basan en la librería de redes neuronales de Python Keras. Los modelos de redes neuronales en Scikit-learn son una interfaz de alto nivel para Keras, que permite a los usuarios de Scikit-learn utilizar redes neuronales sin tener que conocer Keras." },
            { name: "Librerias", value: `\`\`\`python\nimport numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.neural_network import MLPClassifier\nfrom sklearn.datasets import make_moons\nfrom sklearn.model_selection import train_test_split\n\`\`\`` },
            { name: "Ejemplo", value: `\`\`\`python\nX, y = make_moons(n_samples=100, noise=0.25, random_state=3)\nX_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, random_state=42)\nmlp = MLPClassifier(solver='lbfgs', random_state=0).fit(X_train, y_train)\n\`\`\`` },
            { name: "Ejemplo 2", value: `\`\`\`python\nfig, axes = plt.subplots(2, 4, figsize=(20, 8))\nfor axx, n_hidden_nodes in zip(axes, [10, 100]):\n    for ax, alpha in zip(axx, [0.0001, 0.01, 0.1, 1]):\n        mlp = MLPClassifier(solver='lbfgs', random_state=0,\n                            hidden_layer_sizes=[n_hidden_nodes, n_hidden_nodes],\n                            alpha=alpha)\n        mlp.fit(X_train, y_train)\n        ax.set_title("n_hidden=[{}, {}]\\nalpha={:.4f}".format(\n            n_hidden_nodes, n_hidden_nodes, alpha))\n        mglearn.plots.plot_2d_separator(mlp, X_train, fill=True, ax=ax, alpha=.3)\n        mglearn.discrete_scatter(X_train[:, 0], X_train[:, 1], y_train, ax=ax)\naxes[0, 0].legend(["Class 0", "Class 1", "Class 0", "Class 1"], ncol=4, loc=(.9, 1.2))\n\`\`\`` },
            { name: "Datos", value: `\`\`\`python\nfrom sklearn.datasets import load_breast_cancer\ncancer = load_breast_cancer()\nprint("cancer.keys():\\n{}".format(cancer.keys()))\n\`\`\`` },
            { name: "Arquitectura de Red", value: `\`\`\`python\nprint("Shape of cancer data: {}".format(cancer.data.shape))\n\`\`\`` },
            { name: "Optimizacion de Parametros", value: "En este apartado, se muestra cómo afectan al aprendizaje algunos de los hiperparámetros más influyentes. Como los 2 predictores tienen la misma escala, no es estrictamente necesarios aplicarles una normalización previo entrenamiento." }
          )
          .setFooter({
            text: `Redes Neuronales Artilificiales`,
            iconURL: interaction.user.avatarURL({ dynamic: true }),
          })
        ], components: [new ActionRowBuilder().addComponents([
          new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Documentacion")
            .setEmoji("1026467695039873064")
            .setURL("https://www.cienciadedatos.net/documentos/py35-redes-neuronales-python.html")
        ])], ephemeral: true
      })
    }
  },
};