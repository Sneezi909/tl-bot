const fs = require("fs")
const path = require("path")
const { Client, Events, GatewayIntentBits, Collection, InteractionCollector } = require('discord.js');
require("dotenv").config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

cmdFolderPath = path.join(__dirname, "commands");
for (const folder of fs.readdirSync(cmdFolderPath)) {
    const commandGroupPath = path.join(cmdFolderPath, folder);
    for (const cmdFile of fs.readdirSync(commandGroupPath).filter(f => f.endsWith(".js"))) {
        const cmdFilePath = path.join(commandGroupPath, cmdFile);
        const cmd = require(cmdFilePath);
        if ("data" in cmd && "execute" in cmd) {
            console.log(`successfully registered command at ${cmdFilePath}`)
            client.commands.set(cmd.data.name, cmd);
        } else {
            console.log(`failed to register command at ${cmdFilePath}, missing required fields`)
        }
    }
}

client.on(Events.InteractionCreate, async i => {
    if (!i.isChatInputCommand()) {
        return;
    }
    
    const c = i.client.commands.get(i.commandName);
    if (!c) {
        console.error(`No command matching ${i.commandName} found`);
        return;
    }
    try {
        await c.execute(i);
    } catch (e) {
        console.error(e)
        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
})

client.login(process.env.DISCORD_TOKEN);