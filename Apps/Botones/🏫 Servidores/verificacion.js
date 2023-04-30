const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js");
const { default: mongoose } = require("mongoose");
const roleSchema = require("../../../Model/verificacion/verificationSchema");
const randomString = require("randomized-string");
module.exports = {
    id: "verifyMember",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const verifyRoleId = await roleSchema.findOne({ guildId: interaction.guild.id });

        if(!interaction.guild.members.me.permissions.has("ManageRoles")) return;
        if (!interaction.guild.members.me.permissions.has("SendMessages")) return;
        if (!interaction.guild.members.me.permissions.has("ManageChannels")) return;

        if (!verifyRoleId) return interaction.reply({   
            content:`<a:error:1030716002259980318> ¡Aún no ha establecido un rol de verificación! ¡Use \`/setup\` role para configurar uno!`, 
            ephemeral: true 
        }).catch((error) => {});

        const randomToken = randomString.generate({ length: 8, charset: "hex" }).toUpperCase();
        if ( interaction.member.roles.cache.some((role) => role.id === verifyRoleId.roleId)) return interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setDescription(`<a:error:1030716002259980318> Ya has comprobado que no eres un robot!`)
                    .setFooter({
                        text: "My Queen https://discord.gg/4Z7QZ7Y",
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                    .setColor("Blue")], ephemeral: true,
            }).catch((error) => {});

        const modal = new Discord.ModalBuilder()
            .setCustomId("verifyUserModal")
            .setTitle(`Verificacion Codigo: ${randomToken}`)
            .setComponents(
                new Discord.ActionRowBuilder()
                .setComponents(
                    new Discord.TextInputBuilder()
                        .setCustomId("veryUserInput")
                        .setLabel("Código de verificación en el título:")
                        .setStyle(Discord.TextInputStyle.Short)
                        .setRequired(true)
                        .setMaxLength(8))); 

        await interaction.showModal(modal).catch((error) => {});
        const modalSubmitInt = await interaction.awaitModalSubmit({filter: (i) => { return true }, time: 600000,}).catch((error) => {});

        if (modalSubmitInt.fields.getTextInputValue("veryUserInput").toUpperCase() === randomToken) {
            const role = interaction.guild.roles.cache.get(verifyRoleId.roleId);
            if (!role)  return interaction.reply({content: `<a:error:1030716002259980318> No existe un Rol Asignado!`,  ephemeral: true }).catch((error) => {});
            await interaction.member.roles.add(role).then((m) => {
                interaction.followUp({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setTitle("Verification Successful!")
                                .setTimestamp()
                                .setDescription(`<a:yes:1028005786112245770> Ha sido verificado y se le ha dado la ${role} role!`)
                                .setAuthor({
                                    name: `Sistema de Verificacion`,
                                    iconURL: interaction.guild.iconURL({ dynamic: true })
                                })
                                .setFooter({
                                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                                })
                                .setColor("Green")], ephemeral: true  }).catch((error) => {});
                        })}

        if (modalSubmitInt.fields.getTextInputValue("veryUserInput").toUpperCase() !== randomToken) {
            interaction.followUp({
                content: `<a:error:1030716002259980318> Ha introducido el código incorrecto en el formato de verificacion!`,
                ephemeral: true,
            }).catch((error) => {});
    }}
}