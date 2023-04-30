const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js");
const chalk = require('chalk');
module.exports = {
  buttons_permisos: [
    "Administrator"
  ],
  id: "Invitacion",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  async execute(interaction, client) {
    try {
      let Channel = interaction.channel;
      await Channel.createInvite().then(invite => {
        if (invite.error) {
          let e = invite.error;
          return interaction.reply({
            embeds: [new Discord.EmbedBuilder()
              .setColor("Random")
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })              
              .setTitle(client.la["common"]["erroroccur"])
              .setDescription(`\`\`\`${e.message ? e.message : e.stack ? String(e.stack).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
            ]
          });
        }
        interaction.reply({
          embeds: [
            new Discord.EmbedBuilder()
              .setColor("Random")
              .setFooter({ 
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setTitle("Invitacion Generada")
              .setDescription(`**Invitacion**: *https://discord.gg/${invite.code}*`)
          ], ephemeral: true
        });
      }).catch(e => {
        return interaction.reply({
          embeds: [new Discord.EmbedBuilder()
            .setColor("Random")
            .setFooter({
              text: "My Queen https://discord.gg/4Z7QZ7Y",
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })       
            .setTitle(client.la["common"]["erroroccur"])
            .setDescription(`\`\`\`${e.message ? e.message : e.stack ? String(e.stack).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
          ]
        });
      })
    } catch (e) {
      return interaction.reply({
        embeds: [new Discord.EmbedBuilder()
          .setColor("Random")
          .setFooter({
            text: "My Queen https://discord.gg/4Z7QZ7Y",
            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
          })
          .setTitle(client.la["common"]["erroroccur"])
          .setDescription(`\`\`\`${e.message ? e.message : e.stack ? String(e.stack).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]
      });
    }
  }
}