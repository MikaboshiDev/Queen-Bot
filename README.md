<h1 align="center">
  <img src="https://cdn.discordapp.com/attachments/1027458270589362257/1055591517454073876/100-beautiful-full-hd-4k-minecraft-wallpapers-picture-2-scSVR9CG2.jpg" alt="AVATAR QUEEN BOT"/><br/>QUEEN BOT<br/>
  <img src="https://img.shields.io/badge/Discord.js-v14-%2334d058?style=flat-square&logo=npm&logoColor=fff" alt="DJS Version"/>
  <img src="https://img.shields.io/badge/Node.js-v16-%2334d058?style=flat-square&logo=npm&logoColor=fff" alt="Node Version"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-%2334d058?style=flat-square&logo=npm&logoColor=fff" alt="Version"/>
  <img src="https://img.shields.io/badge/Status-Online-%2334d058?style=flat-square&logo=npm&logoColor=fff" alt="Status"/>
</h1>
<h3 align="center">

    
## 📢 Componentes
- ☑️ Slash Commands
- ☑️ Prefix Commands **[Sub Comandos]**
- ☑️ Addons Integrados **[Archivo YML]**
- ☑️ Enrutamiento Paypal **[Pagos]**
- ☑️ Estado de Minecraft **[Servidores]**
- ☑️ Funciones de AutoModeracion
- ☑️ Modmail Integrado
- ☑️ Clean UI **[Interfaz de Usuario]**
    
## 🖼️ Fotografias
Bot publico para multiples servidores de discord cuenta con gran cantidad de comandos, funciones, eventos y mas caracteristicas que te ayudaran
a tener mejor control de tu servidor de discord, el bot esta en constante actualizacion y mantenimiento para que no tengas ningun problema

<p align="center">
<img src="https://cdn.discordapp.com/attachments/1027458270589362257/1087046912722620507/image.png"/> 
<img src="https://cdn.discordapp.com/attachments/1027458270589362257/1087045852285124698/image.png"/>
</p>
    
## 🚀 Configuracion & Arranque 
- Instala las dependencias que se utilizan por medio de `npm install` en el host o editor
- Configura el archivo `config.json & botconfig.json` en la ruta `Config`
- Configura los archivos `servidor & setups` de la ruta `Model/Servidor` de la DB
- Ajuste de `fragmentos` a necesidad del dueño del *CORENEKO*
- Verifique que la conexion a la **api** sea la correcta en el archivo `index.js`
    
```js
const { ShardingManager } = require("discord.js");
const shards = new ShardingManager("./index.js", {
    token: "",
    totalShards: 1,
    respawn: true,
}); shards.spawn({ amount: shards.totalShards, delay: 5500, timeout: 30000 });
```
  
## 🗄️ Log Funcion
Contamos con un archivo funcion de log para la consola y errores presentes dentro del CORE la funcion puede ser manual o automatica
cada que se genere un error posible se creara una carpeta log con un archivo .log para que se registren los errores encontrados
el formato consta de fecha, dia, mes y motivo del error.
  
Este repositorio y su codigo fue actualizado por ultima vez el `11/12/2022` si hay errores o codigo inecesario puedes notificarlo,
muchas gracias a quien me aviso por los webhooks
```js
const { path } = require("./path");
const { Logger } = require('leekslazylogger');
module.exports = new Logger({
    debug: false,
    directory: path("./Tools/Registros/consola/"),
    keepFor: 30,
    level: {
        _logger: { format: '&f&!7{timestamp}&r [LOGGER] {text}' },
    },
    logToFile: true,
    name: 'NekoCore Bot Multipropocito | Consola',
    splitFile: true,
    timestamp: 'YYYY-MM-DD HH:mm:ss'
});
 ```
Como hacer el logueo en algun archivo no olvides visitar su pagina web [Leekslazylogger](https://logger.eartharoid.me/):
```js
//Recuerda antes llamar al archivo 
log.notice(`Unhandled Rejection/Catch: El Dia: ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`);
log.warn(`Razon: ${reason ? reason : `No hay razon disponible`}`);
log.error(`Error: ${promise ? promise : `No hay error disponible`}`);
```

## 📈 Libros de Programacion

- [Eloquent JavaScript](https://eloquentjs-es.thedojo.mx/Eloquent_JavaScript.pdf) - Marijn Haverbeke (PDF)
- [JavaScript, ¡Inspírate!](https://leanpub.com/javascript-inspirate) - Ulises Gascón (eBook)
- [JavaScript Moderno](https://es.javascript.info/) - Ilya Kantor (HTML)
- [MDN:Guía de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide) (HTML)
- [React: De aprendiz a maestro](https://raulexposito.com/assets/pdf/survivejs-react-es.pdf) - Raúl Expósito (PDF)
- [Introducción a TypeScript](https://khru.gitbooks.io/typescript/) - Emmanuel Valverde Ramos (HTML)
- [TypeScript en Profundidad](https://github.com/melissarofman/typescript-book) - Basarat Ali Syed, traducido por Melissa Rofman (HTML)
- [Introducción a TypeScript](https://mega.nz/file/TldlTZID#1A90Wn8xYloDvekX8rQewI3Yh8HMJXlufRUEWEcOzNU) - Adictos al trabajo
- [TypeScript para Principantes](https://mega.nz/file/7hdwEY6b#ESsixH9wCUFhUugkRq8BEa1uZlzFXCJX6QxHdL5Yz9Q) - Envato Tuts+
- [Manual de TypeScript](https://mega.nz/#!qwcFDZ7a!ggLXIZ4c-O1Do0OEuvK0Mz8k39LvYQwdaJ2LtKKxgsE) - Emmanuel Valverde y Pedro Hernández-Mora
- [Uso avanzado de TypeScript en un ejemplo real](https://neliosoftware.com/es/blog/uso-avanzado-de-typescript/) - Nelio Software (HTML)
- [Aprendizaje TypeScript](https://riptutorial.com/Download/typescript-es.pdf) - RipTutorial (PDF)

## 🔐 Licencias

<p align="center">
<img src="https://cdn.discordapp.com/attachments/1027458270589362257/1076699326069342219/base.gif"/> 
</p>

Distribucion de Licencias y Politicas de Servicios `MIT License`. See [`LICENSE`](https://studiodeveloper.online/) para mas informacion.

- **[MIT license](https://opensource.org/licenses/MIT)**
- **[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html)**
- **[Service & Politic Norms](https://studiodeveloper.online/view/politicas.html)**
- **[Terms of Service](https://studiodeveloper.online/view/terminos.html)**
