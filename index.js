const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { Player } = require('discord-player');
const Koa = require('koa');

// Initialize dotenv
const dotenv = require('dotenv');
dotenv.config();

// Koa server definition for keep alive
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'We are alive';
});

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

// Create a new Player (you don't need any API Key)
const player = new Player(client);

// Add commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// When the client is ready, run this code
client.once('ready', () => {
  // Start Koa server
  app.listen(process.env.PORT || 3000);
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, player);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client.on('error', (error) => {
  console.log('Discord bot encountered an error');
  throw new Error(error);
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
