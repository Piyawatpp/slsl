const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Admin only")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("User")
        .setRequired(true)
    ),
    async execute(client, interaction) {
        const user_id = interaction.user.id;
        const user = interaction.options.getUser("user");
        if(!client.config.ownerID.includes(user_id)) return interaction.reply({ content: "คุณไม่มีสิทธิ์ใช้คำสั่งนี้",ephemeral: true });
        const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));
        if(!accdata[user.id]) return interaction.reply({ content: `<@${user.id}> ยังไม่ลงทะเบียนสมาชิก`,ephemeral: true });
        const embed = new MessageEmbed()
        .setColor("#00ff00")
        .setTitle(`ข้อมูลสมาชิก ${user.tag}`)
        .addFields(
            {
                name: "ชื่อ-นามสกุล",
                value: `\`${accdata[user.id].name}\` ${accdata[user.id].surname}`,
            },
            {
                name: "ยอดเงินคงเหลือ",
                value: `\`${accdata[user.id].point}\` บาท`,
            },
            {
                name: "ยอดเติมเงินสะสม",
                value: `\`${accdata[user.id].pointall}\` บาท`,
            }
        )
        .setFooter({ text: "/profile" })
        .setThumbnail(user.avatarURL())
        .setTimestamp();

        interaction.reply({ embeds: [embed],ephemeral: true });
    }
}