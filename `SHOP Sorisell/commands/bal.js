const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("balance")
    .setDescription("ดูยอดเงินในบัญชีของคุณ"),
    async execute(client, interaction) {
      if(interaction.channel.id !== '') return interaction.reply({ content: `❌ | ไปใช้ในห้อง <#968933508800204800> นะจ๊ะ`, ephemeral: true })
        const user_id = interaction.user.id;
        const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));
    
        if(!accdata[user_id]) return interaction.reply({ content: "คุณยังไม่มีบัญชีสมัครสมาชิก | /reg", ephemeral: true });

        const bal = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`บัญชีของคุณ`)
        .setDescription(`สวัสดีคุณ: \`${accdata[user_id].name} ${accdata[user_id].name}\``)
        .setFooter({ text: `กดตัวเลือกข้างล่าง` })
        .setThumbnail(interaction.user.avatarURL())
        .setTimestamp();

        const balance = new MessageEmbed()
        .setColor("GOLD")
        .setDescription(`ยอดเงินคงเหลือ: \`${accdata[user_id].point}\` บาท`)

        const balanceall = new MessageEmbed()
        .setColor("GOLD")
        .setDescription(`ยอดเติมเงินสะสม: \`${accdata[user_id].pointall}\` บาท`)

        const sebal = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("bal-menu")
            .setOptions([
                {
                    label: "เงินคงเหลือ",
                    emoji: "901056754161446923",
                    value: "balan"
                },
                {
                    label: "เติมเงินสะสม",
                    emoji: "901048003752759357",
                    value: "balall"
                },
            ])
        )
        const msgdata = {
            embeds: [bal],
            components: [sebal],
            fetchReply: true,
            ephemeral: true
        }
        const msg = interaction.replied ? await interaction.followUp(msgdata) : await interaction.reply(msgdata);
        const col = msg.createMessageComponentCollector({
            filter: (i) => i.user.id == user_id,
            time: 300000
        });
        col.on('collect', async (i) => {
            i.deferUpdate();
            if(i.values[0] === "balan") {
                interaction.editReply({
                    embeds: [balance]
                });
            } else if (i.values[0] === "balall") {
                interaction.editReply({
                    embeds: [balanceall]                 
            });
            } else if (i.values[0] === "cancel") {
                interaction.deleteReply();
            }
        })
    }
}