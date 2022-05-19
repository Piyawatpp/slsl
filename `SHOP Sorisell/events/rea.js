const client = require("../index.js");
const { MessageEmbed } = require("discord.js");
const fs = require('fs');

client.on("modalSubmit", async (i) => {
    const user_id = i.user.id;
    const name = i.getTextInputValue("reg-name");
    const surname = i.getTextInputValue("reg-surname");
    const password = i.getTextInputValue("reg-password");
    const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));
    if(i.customId === "reg-id") {
        if(accdata[user_id]) return i.reply({ content: `ผิดพลาด : คุณมีบัญชีแล้ว <a:b5:901051139410239559>` });
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`SUCCESS`)
        .setDescription(`ลงทะเบียนสำเร็จ\nชื่อผู้ใช้: \`${name}\``)
        .setFooter({ text: "สมัครเสร็จสิ้น" })
        .setThumbnail(i.user.avatarURL())
        .setTimestamp();
        
        i.reply({ embeds: [embed] });
        
        accdata[user_id] = {
            name: name,
            surname: surname,

            password: password,
            point: 0,
            pointall: 0
        }
        fs.writeFileSync('./db/acc.json', JSON.stringify(accdata, null, '\t'));
    }
});