import Discord from 'discord.js';
const client = new Discord.Client();
import requestHandler from './request.js';

const prefix = '!';
const secret = require('./secret.json');

client.on('ready', () => {
    console.log('Bot is ready');
    client.user.setActivity('MTQniversity is on Break :)');
});

client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
client.on('debug', (e) => console.info(e));

client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

    console.log(`Command: ${command} with values: ${args}`);

    switch(command){
        case 'ping':
            const m = message.channel.send('Ping?');
            m.edit(`Pong! Latency is ${m.createdTimeStamp - message.createdTimeStamp}ms. API Latency is ${Math.round(client.ping)}ms`);
            break;
        case 'aether':
			requestHandler.request(message, args, 'aether');
            //TODO: Implement aetherQueue() logic, adding character information and requested content assistance to DB
            break;
        case 'primal':
            requestHandler.request(message, args, 'primal')
            //TODO: Implement primalQueue() logic, adding character information and requested content assistance to DB
            break;
        case 'crystal':
            message.channel.send('Crystal is for ERP, not raiding mizzLUL');
            //TODO: Implement crystalQueue() logic, adding character information and requested content assistance to DB
			break;
		case 'aetherrequests':
			let aRequests = await requestHandler.getAetherRequests();
			let aetherEmbed = new Discord.RichEmbed()
				.setTitle("Aether Requests")
				.setDescription("The following twitch viewers have requested help")
				.setTimestamp()
				.setColor('#6B29F1')
				.setURL("http://www.twitch.tv/mtqcapture");
			aRequests.map(aether => {
				aetherEmbed.addField(
					`${aether.firstName} ${aether.lastName}`, `${aether.twitch} is requesting ${aether.request}`
				);
			});
			message.channel.send(aetherEmbed);

			break;
		case 'primalrequests':
			let pRequests = await requestHandler.getPrimalRequests();
			let primalEmbed = new Discord.RichEmbed()
				.setTitle("Primal Requests")
				.setDescription("The following twitch viewers have requested help")
				.setTimestamp()
				.setColor('#6B29F1')
				.setURL("http://www.twitch.tv/mtqcapture");
			pRequests.map(primal => {
				primalEmbed.addField(
					`${primal.firstName} ${primal.lastName}`, `${primal.twitch} is requesting ${primal.request}`
				);
			});
			message.channel.send(primalEmbed);
			break;
		case 'crystalrequests':
			message.channel.send('Crystal Requests not currently supported');
			break;
		case 'remove':
			requestHandler.remove(message, args);
			break;
    }
});

client.login(secret.token);