const client = require("../index.js");
const { MessageEmbed } = require("discord.js");
const fs = require('fs');

client.on("modalSubmit", async (i) => {
    const stockdata = JSON.parse(fs.readFileSync('./db/stock.json', 'utf8'));
    const productname = i.getTextInputValue("addstock-name");
    const nitrourl = i.getTextInputValue("addstock-nitro-url");
    const info = i.getTextInputValue("addstock-info")
    const price = i.getTextInputValue("addstock-price");
    const img = i.getTextInputValue("addstock-img");
    const id = Math.floor(Math.random() * 9999).toString();
    if(i.customId === "addstock-id") {
        if(isNaN(price)) return i.reply({ content: `\`${price}\` ไม่ใช่ตัวเลข` });
        const addstocksuccess = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`SUCCESS`)
        .setDescription(`เพิ่มสินค้าสำเร็จ\nID: \`${id}\`\nชื่อสินค้า: \`${productname}\`\nราคา: \`${price}\``)
        .setFooter({ text: "/stock add" })
        .setTimestamp();
        stockdata[id] = {
            status: "พร้อมจำหน่าย 🟢",
            emoji: "🟢",
            name: productname,
            nitro_url: nitrourl,
            info: info,
            price: price,
            img: img
        }
        i.reply({ embeds: [addstocksuccess] });
        fs.writeFileSync('./db/stock.json', JSON.stringify(stockdata, null, '\t'));
    }
})