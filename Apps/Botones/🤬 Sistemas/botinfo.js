const Discord = require("discord.js");
const { ChatInputCommandInteraction } = require("discord.js")
const os = require("os");
const versiones = require('../../../package.json');
module.exports = {
    buttons_permisos: [
        "SendMessages",
        "EmbedLinks",
    ],
    id: "config_botinfo",
    /**
     * 
     * @param { ChatInputCommandInteraction } interaction 
     * 
     */
    async execute(interaction, client) {

        /* ----------[CPU Usage]---------- */
        const cpus = os.cpus();
        const cpu = cpus[0];

        // Accumulate every CPU times values
        const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);

        // Calculate the CPU usage
        const usage = process.cpuUsage();
        const currentCPUUsage = (usage.user + usage.system) * 1000;
        const perc = (currentCPUUsage / total) * 100;

        /* ----------[RAM Usage]---------- */

        /**Get the process memory usage (in MB) */
        async function getMemoryUsage() {
            return process.memoryUsage().heapUsed / (1024 * 1024).toFixed(2);
        }

        const startUsage = process.cpuUsage();
        const now = Date.now();
        while (Date.now() - now < 500);
        let userUsage = process.cpuUsage(startUsage).user / 1000;
        let sysUsage = process.cpuUsage(startUsage).system / 1000 || 0;
        const totalGuilds = client.guilds.cache.size;
        const totalMembers = client.users.cache.size;
        const totalChannel = client.channels.cache.size;

        const e = new Discord.EmbedBuilder()
            .setAuthor({ 
                name: client.user.tag + " Information", 
                iconURL: client.user.displayAvatarURL() 
            })
            .setDescription(`\`\`\`yml\nName: ${client.user.tag} [${client.user.id}]\nApi Latency: ${Math.round(client.ws.ping)}ms\nSystems: ${sysUsage}\nUser Usage: ${userUsage} MB\`\`\``)
            .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setColor("Random")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "🤖 Comandos", value: `\`\`\`yml\nServidores: ${totalGuilds}\nUsuarios: ${totalMembers}\nCanales: ${totalChannel}\`\`\``, inline: true },
                { name: `<a:Dashbord:1005732715112443974> Bot - Estadisticas`, value: `\`\`\`yml\nNode.js: ${process.version}\nDiscord.js: v${versiones.version}\nEnmap: v5.8.4\`\`\``, inline: true },
                { name: `<a:config:1026467696453357658> Sistema - Estadisticas`, value: `\`\`\`yml\nOS: ${process.platform}\nCpu: ${(perc / 1000).toFixed(1)}%\nRam: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}%\nUptime: ${convertTime()}\`\`\`` },
                { name: `<:topggAngry:1026468391709577226> Desarrollador`, value: `\`\`\`yml\nName: Qin Shi Huang#6966\nID: [442355791412854784]\`\`\`` },
                { name: `<:panda_gift:1007529203119439882> Probador - Co-Owner`, value: `\`\`\`yml\nName: א Dust Killer א#1493\nID: [960012567747637259]\`\`\`` },
                { name: `<a:InLove:1006999906969469019> Links Importantes`, value: `[**・Invitacion del Bot**](https://discord.com/api/oauth2/authorize?client_id=1001243010031423518&permissions=4398046511095&scope=bot%20applications.commands) [**・ Invitacion a Soporte**](https://discord.gg/EFz39MyDZn) [**・ Pagina Web Oficial**](https://studiodeveloper.online/)` }
            );

        interaction.reply({ embeds: [e], ephemeral: true }).catch((error) => {});

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
    }
}