const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const fs = require("fs")


module.exports = {
    data: new SlashCommandBuilder()
    .setName('topup')
    .setDescription('เติมเงินเข้าบัญชี'),
    async execute(client, interaction) {
      if(interaction.channel.id !== '') return interaction.reply({ content: `❌ | ไปใช้ในห้อง <#968933508800204800> นะจ๊ะ`, ephemeral: true })
      const user_id = interaction.user.id; 
      const accdata = JSON.parse(fs.readFileSync('./db/acc.json', 'utf8'));
      if(!accdata[user_id]) return interaction.reply({ content: "คุณยังไม่มีบัญชีสมัครสมาชิก | /reg", ephemeral: true });

        const topupmodal = new Modal()
        .setCustomId('topup-id')
        .setTitle('เติมเงินผ่านระบบซองอั่งเปา')
        .addComponents(
            new TextInputComponent()
            .setCustomId('topup-url')
            .setLabel('ลิงค์ซองอั่งเปา | URL')
            .setPlaceholder('กรอกลิงค์ซองอั่งเปา | URL')
            .setStyle("SHORT")
            .setRequired(true)
        )

        await showModal(topupmodal, {
            client: client,
            interaction: interaction,
        });
    }
}