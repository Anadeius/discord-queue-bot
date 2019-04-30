const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('./db');

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
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    console.log(`Command: ${command} with values: ${args}`);

    switch(command){
        case 'ping':
            const m = await message.channel.send('Ping?');
            m.edit(`Pong! Latency is ${m.createdTimeStamp - message.createdTimeStamp}ms. API Latency is ${Math.round(client.ping)}ms`);
            break;
        case 'aether':
            message.channel.send('Aether scheduling will be implemented shortly :)');
            // FirstName LastName TwitchName Request
            //let [firstName, lastName, twitchName, request]

            //TODO: Implement aetherQueue() logic, adding character information and requested content assistance to FirebaseDB
            break;
        case 'primal':
            message.channel.send('Primal scheduling will be implemented shortly :)');
            //TODO: Implement primalQueue() logic, adding character information and requested content assistance to FirebaseDB
            break;
        case 'crystal':
            message.channel.send('Crystal is for ERP, not raiding mizzLUL');
            //TODO: Implement crystalQueue() logic, adding character information and requested content assistance to FirebaseDB
            break;
    }
});

client.login(secret.token);