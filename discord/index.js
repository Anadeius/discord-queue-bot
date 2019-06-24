import Discord from 'discord.js';
import fs from 'fs';

const client = new Discord.Client();
const prefix = '!';
const secret = require('./secret.json');
client.commands = new Discord.Collection();

const runDiscord = async () => {
	client.on('ready', () => {
		console.log('Bot is ready');
		client.user.setActivity('MTQniversity is on Break :)');
	});

	client.on('error', (e) => console.error(e));
	client.on('warn', (e) => console.warn(e));
	client.on('debug', (e) => console.info(e));

	const commands = fs.readdirSync('./discord/commands').filter(file => file.endsWith('.js'));

	commands.forEach(file => {
		const command = require(`./commands/${file}`).default;
		client.commands.set(command.name, command);
	});

	client.on('message', async message => {
		if(!message.content.startsWith(prefix) || message.author.bot) return;

		message.content = message.content.substring(prefix.length);
		const [commandName, ...args] = message.content.split(/ +/g);
		//const args = message.content.slice(prefix.length).trim().split(/ +/g);
		//const commandName = args.shift().toLowerCase();

		console.log(`Command: ${commandName} with values: ${args}`);

		const command = client.commands.get(commandName.toLowerCase());

		try {
			command.execute(client, message, args);
		}
		catch (err) {
			console.log(`Problem executing command ${commandName}: ${err}`)
		}
	});

	client.login(secret.token);

	return client;
}

export default async () => {
	await runDiscord();
}