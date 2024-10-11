require('dotenv').config();
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, GatewayIntentBits, ActivityType, CommandInteraction } from "discord.js";
import fs from "fs";
import path from "path";

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// TODO: add ban command, make sure it can only be used by admins.
// DEPRECATED USE UPCOMING WEB INTERFACE!

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    registerCommands();
    setBotStatus();
});

async function registerCommands(): Promise<void> {
    const commands: any[] = [];
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN as string);

    try {
        await rest.put(
            Routes.applicationCommands(client.user!.id), 
            { body: commands }
        );
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error reloading commands:', error);
    }
}

function setBotStatus(): void {
    client.user?.setPresence({
        activities: [
            {
                name: "ArcaneV4",
                type: ActivityType.Watching 
            }
        ],
        status: 'dnd'
    });
}

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    try {
        const command = require(`./commands/${interaction.commandName}.ts`);
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}:`, error);
        await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
        });
    }
});

export default function startBot(): void {
    client.login(process.env.BOT_TOKEN);
}