const client = require("../index.js");
const { MessageEmbed } = require("discord.js");
const tw = require('../API/truemoney.js')
const fs = require('fs');

client.on("modalSubmit", async (interaction) => {
    if(interaction.customId === "topup-id") {
        const user_id = interaction.user.id;
        const url = interaction.getTextInputValue("topup-url");
        const member = interaction.guild.members.cache.get(user_id);
        const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));

        tw.VoucherCode(client.config.wallet, url).then(async (res) => {
            switch(res.status) {
                case `SUCCESS`:
                    const topupsuccess = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("✅ | เติมเงินสำเร็จ")
                    .setDescription(`\`\`\`cs\n' คุณได้เติมเงินสำเร็จแล้ว จำนวนเงินที่เติม ${res.amount} บาท '\`\`\``)
                    .setFooter({ text: `${member.user.tag}` })
                    .setTimestamp();
                    interaction.reply({ embeds: [topupsuccess] })
                    const roleei = interaction.guild.roles.cache.find(role => role.id === '963707445220343848');
                    member.roles.add(roleei);
                    accdata[user_id].point += res.amount;
                    accdata[user_id].pointall += res.amount;
                    fs.writeFileSync('./db/acc.json', JSON.stringify(accdata, null, 4));
                break;
                case `FAIL`:
                    switch(res.reason) {
                        case `Voucher is expired.`:
                            const topupexpired = new MessageEmbed()
                            .setColor("RED")
                            .setTitle("❌ | เติมเงินไม่สำเร็จ")
                            .setDescription(`\`\`\`diff\n- คุณได้เติมเงินไม่สำเร็จ เนื่องจากลิงค์ซองอั่งเปานี้ถูกใช้ไปแล้ว\`\`\``)
                            .setFooter({ text: `Mad By xSwldasd#2845` })
                            .setTimestamp();
                            interaction.reply({ embeds: [topupexpired] })
                        break;
                        case `Voucher doesn't exist.`:
                            const topupnotexist = new MessageEmbed()
                            .setColor("RED")
                            .setTitle("❌ | เติมเงินไม่สำเร็จ")
                            .setDescription(`\`\`\`diff\n- คุณได้เติมเงินไม่สำเร็จ เนื่องจากลิงค์ซองอั่งเปาไม่ถูกต้อง\`\`\``)
                            .setFooter({ text: `${member.user.tag}` })
                            .setTimestamp();
                            interaction.reply({ embeds: [topupnotexist] })
                        break;
                        case `Voucher ticket is out of stock.`:
                            const topupoutofstock = new MessageEmbed()
                            .setColor("RED")
                            .setTitle("❌ | เติมเงินไม่สำเร็จ")
                            .setDescription(`\`\`\`diff\n- คุณได้เติมเงินไม่สำเร็จ เนื่องจากลิงค์ซองอั่งเปานี้ถูกใช้ไปแล้ว\`\`\``)
                            .setFooter({ text: `${member.user.tag}` })
                            .setTimestamp();
                            interaction.reply({ embeds: [topupoutofstock] })
                        break;
                    }
                break;
            }
        })
    }
})