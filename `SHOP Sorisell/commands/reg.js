const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, showModal } = require('discord-modals')
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("reg")
    .setDescription("สมัครบัญชี"),
    async execute(client, interaction) {
      if(interaction.channel.id !== '') return interaction.reply({ content: `❌ | ไปใช้ในห้อง <#968933508800204800> นะจ๊ะ`, ephemeral: true })
        const regmodal = new Modal()
        .setCustomId("reg-id")
        .setTitle("ลงทะเบียนสมาชิก")
        .addComponents(
            new TextInputComponent()
            .setCustomId("reg-name")
            .setLabel("ใส่ชื่อ | ชื่อจริงเท่านั้น")
            .setStyle("SHORT")
            .setRequired(true),
            new TextInputComponent()
            .setCustomId("reg-surname")
            .setLabel("ใส่นามสกุล | นามสกุลจริงเท่านั้น")
            .setStyle("SHORT")
            .setRequired(true),
            new TextInputComponent()
            .setCustomId("reg-password")
            .setLabel("รหัสผ่าน | Password")
            .setStyle("SHORT")
            .setRequired(true)
        )
        await showModal(regmodal, {
            client: client,
            interaction: interaction,
        });
    }
}