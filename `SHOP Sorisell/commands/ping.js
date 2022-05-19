const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("เช็คปิง"),
    async execute(client, interaction) {
      const ping = new MessageEmbed()
	    .setColor('#0099ff')
      .setDescription(`Ping!, ${calTimeSnowflake(interaction.id)}ms`)
      interaction.reply({ embeds: [ping], ephemeral: true });
        }
      }

function calTimeSnowflake(snowflake) {
    const milliseconds = BigInt(snowflake) >> 22n
    return Math.abs(new Date() - new Date(Number(milliseconds) + 1420070400000).getTime())
}
      /**
     * ${calTimeSnowflake(interaction.id)}
     * @param {import("discord.js").Client} client 
     * @param {import("discord.js").Interaction} interaction
     */