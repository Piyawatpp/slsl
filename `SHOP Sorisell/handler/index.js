const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const rest = new REST({ version: '9' }).setToken(client.config.token);
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }
    (async () => {
        try {
            await rest.put(
                Routes.applicationGuildCommands(client.slash.botID, client.slash.serverID), 
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    })();

    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    eventFiles.map((value) => require(`../events/${value}`));
    console.log(`[Event] ${eventFiles.length} loaded!`);

    client.on("interactionCreate", async (interaction) => {
        if(!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if(!command) return;
        try {
            await command.execute(client, interaction);
        } catch(err) {
            if (err) console.error(err);
            await interaction.reply({ embeds: [new MessageEmbed().setTitle('สถานะ: ผิดพลาด').setDescription(`\`\`\`มีบางอย่างผิดพลาด\`\`\``).setColor('#ff0000')], ephemeral: true });
        }
    });
}