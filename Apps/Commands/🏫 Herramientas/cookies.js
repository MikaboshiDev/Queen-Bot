const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const DB = require("../../../Model/economia/cookies");

module.exports = {
    botpermisos: [
        "EmbedLinks",
        "UseExternalEmojis",
        "AddReactions",
        "SendMessages",
    ],
    data: new SlashCommandBuilder()
        .setName("cookies")
        .setDescription("🏫 Mira tus cookies o las de otro usuario.")
        .addUserOption(option => option.setName("usuario").setDescription("El usuario del que quieres ver las cookies.").setRequired(false)),
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const Target = interaction.options.getMember("usuario") || interaction.member;
        const UserCookies = await DB.findOne({ GuildID: interaction.guild.id, UserID: Target.id });

        if (!UserCookies) {
            return interaction.reply({ content: `<a:error:1030716002259980318> El usuario no tiene cookies prueba buscando en otro usuario o servidor`, ephemeral: true });
        } else {
            return interaction.reply({
                embeds: [new EmbedBuilder().setColor("Orange")
                    .setDescription(`**User**: ${Target.displayName}\n**Cookies**: \`${UserCookies.Cookies}\``)
                    .setThumbnail(Target.displayAvatarURL({ dynamic: true, size: 512 })).setTitle("🍪 __**Cookies**__ 🍪")]
            });
        }
    }
}