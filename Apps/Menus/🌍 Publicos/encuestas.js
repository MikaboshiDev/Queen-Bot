const chalk = require("chalk");
const { Client, EmbedBuilder, SelectMenuInteraction } = require("discord.js");
const DB = require("../../../Model/encuesta/pollDB");
module.exports = {
    id: "poll-system",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder();

        const data = await DB.findOne({
            GuildID: interaction.guild.id,
            MessageID: interaction.message.id,
        });
        if (!data) {
            embed.setColor("Red").setDescription(`There is no data in the database`);
            return interaction.reply({ embeds: [embed], ephemeral: true }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Encuestas] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        }

        if (data.Users.includes(interaction.user.id)) {
            embed
                .setColor("Red")
                .setDescription(`You have already voted for this poll`);
            return interaction.reply({ embeds: [embed], ephemeral: true }).catch((error) =>
            console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Encuestas] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
        }

        data.Chosen[interaction.values[0]].value += 1;
        data.Users.push(interaction.user.id);
        await data.save();

        const newEmbed = EmbedBuilder.from(
            interaction.message.embeds[0]
        ).setDescription(
            "```" +
            data.Chosen.map(
                (option) => `${option.name}: ${option.value} Users Selected`
            ).join("\n\n") +
            "```"
        );

        embed.setColor("Green").setDescription(`Your answer has been given`);
        interaction.reply({ embeds: [embed], ephemeral: true }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Encuestas] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));

        interaction.message.edit({ embeds: [newEmbed] }).catch((error) =>
        console.log(chalk.yellowBright(`[Menu]`) + ` Se detecto un error en el Menu [Encuestas] por el servidor [${interaction.guild.id}] el dia [${new Date().toLocaleDateString()}] a las [${new Date().toLocaleTimeString()}]`));
    }
}