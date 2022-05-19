const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("ดูคำสั่งทั้งหมด"),
    async execute(client, interaction) {
      const exampleEmbed = new MessageEmbed()
	    .setColor('#0099ff')
      .setDescription("📜 ดูคำสั่งทั้งหมด 📜")
      .addFields(
                {
                    name: `/reg`,
                    value: `\`\`\`สมัครบัญชีเพื่อใช้งาน และ สมาชิกซื้อสินค้าในร้านได้\`\`\``,
                    inline: false
                },
                {
                    name: `/buy`,
                    value: `\`\`\`ดูสินค้าในร้าน\`\`\``
                },
                {
                    name: `/balance`,
                    value: `\`\`\`ดูยอดเงินในบัญชี\`\`\``
                },
                {
                    name: `/topup`,
                    value: `\`\`\`เติมเงินเข้าบัญชี\`\`\``,
                    inline: false
                }           
             )
       .setFooter({ text: `/help` })
       .setTimestamp()
      interaction.reply({ embeds: [exampleEmbed], ephemeral: true });
    }
  }
