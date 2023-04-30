const { EmbedBuilder, WebhookClient } = require("discord.js");
const { inspect } = require("util");
const chalk = require("chalk");
const ee = require("../Tools/Settings/channels.json")
const webhook = new WebhookClient({
    url: "https://discord.com/api/webhooks/1029038823113510953/oTTxvd7QgbgQmB0N9gcHigRALNZnYRhIVUl7EynJOlUBM0DPvOPDvS_CbGJDAIKHjqjR"
});

module.exports = (client) => {
    const embed = new EmbedBuilder()
        .setColor("Red");

    client.on("error", (err) => {
        console.log(err);

        embed
            .setTitle("Discord API Error")
            .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
            .setDescription(`<@&1010058606164574209> <@&1010058503307661413> <@&1010058402443051029> <@&1010058296507514912> \`\`\`js\n${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``)
            .setThumbnail(client.user.avatarURL())
            .setTimestamp();

        return webhook.send({ embeds: [embed] });
    });

    process.on("unhandledRejection", (reason, promise) => {
        console.log(reason, promise);

        embed
            .setTitle("Unhandled Rejection/Catch")
            .setURL("https://nodejs.org/api/process.html#event-unhandledrejection")
            .addFields(
                {
                    name: `<a:amarillo:1026468389675335760> Reason`,
                    value: `<@&1010058606164574209> <@&1010058503307661413> <@&1010058402443051029> <@&1010058296507514912> \`\`\`js\n${inspect(reason, { depth: 0 }).slice(0, 1000)}\`\`\``
                },
                {
                    name: `<a:amarillo:1026468389675335760> Promise`,
                    value: `<@&1010058606164574209> <@&1010058503307661413> <@&1010058402443051029> <@&1010058296507514912> \`\`\`js\n${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\``
                }
            )
            .setThumbnail(client.user.avatarURL()) 
            .setTimestamp();

        return webhook.send({ embeds: [embed] });
    });

    process.on("uncaughtException", (err, origin) => {
        console.log(err, origin);

        embed
            .setTitle("Uncaught Exception/Catch")
            .setURL("https://nodejs.org/api/process.html#event-uncaughtexception")
            .addFields(
                {
                    name: `<a:amarillo:1026468389675335760> Error`,
                    value: `<@&1010058606164574209> <@&1010058503307661413> <@&1010058402443051029> <@&1010058296507514912> \`\`\`js\n${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``
                },
                {
                    name: `<a:amarillo:1026468389675335760> Origin`,
                    value: `<@&1010058606164574209> <@&1010058503307661413> <@&1010058402443051029> <@&1010058296507514912> \`\`\`js\n${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``
                }
            )
            .setThumbnail(client.user.avatarURL())
            .setTimestamp();

        return webhook.send({ embeds: [embed] });
    });

    process.on("uncaughtExceptionMonitor", (err, origin) => {
        console.log(err, origin);

        embed
            .setTitle("Uncaught Exception Monitor")
            .setURL("https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor")
            .addFields(
                {
                    name: `<a:amarillo:1026468389675335760> Error`,
                    value: `<@&1010058606164574209> <@&1010058503307661413> <@&1010058402443051029> <@&1010058296507514912> \`\`\`js\n${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``
                },
                {
                    name: `<a:amarillo:1026468389675335760> Origin`,
                    value: `<@&1010058606164574209> <@&1010058503307661413> <@&1010058402443051029> <@&1010058296507514912> \`\`\`js\n${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``
                }
            )
            .setThumbnail(client.user.avatarURL())
            .setTimestamp();

        return webhook.send({ embeds: [embed] });
    });

    process.on("warning", (warn) => {
        console.log(warn);

        embed
            .setTitle("Uncaught Exception Monitor Warning")
            .setURL("https://nodejs.org/api/process.html#event-warning")
            .addFields(
                {
                    name: `<a:amarillo:1026468389675335760> Warning`,
                    value: `<@&1010058606164574209> <@&1010058503307661413> <@&1010058402443051029> <@&1010058296507514912> \`\`\`js\n${inspect(warn, { depth: 0 }).slice(0, 1000)}\`\`\``
                }
            )
            .setThumbnail(client.user.avatarURL())
            .setTimestamp();

        return webhook.send({ embeds: [embed] });
    });
};