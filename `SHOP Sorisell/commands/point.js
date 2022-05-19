const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("point")
    .setDescription("เสก point")
    .addSubcommand(subcoomad =>
        subcoomad
        .setName("add")
        .setDescription("เพิ่มเงิน")
        .addUserOption(option =>
            option
            .setName("user")
            .setDescription("ผู้ใช้")
            .setRequired(true)
        )
        .addNumberOption(option =>
            option
            .setName("point")
            .setDescription("จำนวนเงิน")
            .setRequired(true)
        )
    )
    .addSubcommand(subcoomad =>
        subcoomad
        .setName("remove")
        .setDescription("ลบเงิน")
        .addUserOption(option =>
            option
            .setName("user")
            .setDescription("ผู้ใช้")
            .setRequired(true)
        )
        .addNumberOption(option =>
            option
            .setName("point")
            .setDescription("จำนวนเงิน")
            .setRequired(true)
        )
    ),
    async execute(client, interaction) {
        const user_id = interaction.user.id;
        if(!client.config.ownerID.includes(user_id)) return interaction.reply({ content: "คุณไม่มีสิทธิ์ใช้คำสั่งนี้", ephemeral: true });
        const member = interaction.options.getUser("user");
        const point = interaction.options.getNumber("point");
        const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));

        if(interaction.options.getSubcommand() === "add") {
            if(!accdata[member.id]) return interaction.reply({ content: `<@${member.id}> ยังไม่ลงทะเบียนสมาชิก`,ephemeral: true });

            accdata[member.id].point += point;
            accdata[member.id].pointall += point;
    
            interaction.reply({ content: `เพิ่ม \`${point}\` บาทให้ <@${member.id}> เรียบร้อย`,ephemeral: true });
            fs.writeFileSync('./db/acc.json', JSON.stringify(accdata, null, 4));
        } else if(interaction.options.getSubcommand() === "remove") {
            if(!accdata[member.id]) return interaction.reply({ content: `<@${member.id}> ยังไม่ลงทะเบียนสมาชิก`,ephemeral: true });
            if(accdata[member.id].point < point) return interaction.reply({ content: `<@${member.id}> ไม่มีเงินเพียงพอที่จะลบ`,ephemeral: true });

            accdata[member.id].point -= point;

            interaction.reply({ content: `ลบ \`${point}\` บาทของ <@${member.id}> เรียบร้อย`,ephemeral: true });
            fs.writeFileSync('./db/acc.json', JSON.stringify(accdata, null, 4));
        }
    }
          }