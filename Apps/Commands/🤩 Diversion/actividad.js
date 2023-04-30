const { EmbedBuilder, Client, ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("actividad")
        .setDescription("🤩 Selecciona una actividad para realizar en el servidor")
        .addStringOption(option =>
            option.setName("tipo")
                .setDescription("Selecciona el tipo de actividad")
                .setRequired(true)
                .addChoices(
                    { name: "Youtube", value: "1" },
                    { name: "Chess", value: "2" },
                    { name: "Betrayal", value: "3" },
                    { name: "Poker", value: "4" },
                    { name: "Fish", value: "5" },
                    { name: "Letter Tile", value: "6" },
                    { name: "Word Snack", value: "7" },
                    { name: "Doodle Crew", value: "8" },
                    { name: "Spell Cast", value: "9" },
                    { name: "AwkWord", value: "10" },
                    { name: "Putt Party", value: "11" },
                )
        ),
    /**
     * 
     * @param {Client} client 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {

        const { options, member } = interaction
        const choices = options.getString("tipo")

        const App = client.discordTogether

        const VC = member.voice.channel
        if (!VC) return interaction.reply({ content: `<a:error:1030716002259980318> Debes estar en un canal de voz para usar este comando`, ephemeral: true })

        await interaction.deferReply()

        switch (choices) {
            case "1": {

                App.createTogetherCode(VC.id, "youtube").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links: ${invite.code}`))


            }
                break;
            case "2": {

                App.createTogetherCode(VC.id, "chess").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links: ${invite.code}`))


            }
                break;
            case "3": {

                App.createTogetherCode(VC.id, "betrayal").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links: ${invite.code}`))


            }
                break;
            case "4": {

                App.createTogetherCode(VC.id, "poker").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links: ${invite.code}`))


            }
                break;
            case "5": {

                App.createTogetherCode(VC.id, "fish").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links: ${invite.code}`))


            }
                break;
            case "6": {

                App.createTogetherCode(VC.id, "letter tile").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links: ${invite.code}`))


            }
                break;
            case "7": {

                App.createTogetherCode(VC.id, "word snack").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links: ${invite.code}`))


            }
                break;
            case "8": {

                App.createTogetherCode(VC.id, "doodle crew").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links: ${invite.code}`))


            }
                break;
            case "9": {

                App.createTogetherCode(VC.id, "spell cast").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links: ${invite.code}`))


            }
                break;
            case "10": {

                App.createTogetherCode(VC.id, "awkword").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links:${invite.code}`))


            }
                break;
            case "11": {

                App.createTogetherCode(VC.id, "putt party").then(invite => interaction.editReply(`> Haz click aqui para unirte a la actividad\n> Links: ${invite.code}`))


            }
                break;


        }


    }
}