export default {
	name: 'ping',
	description: ':thinking:',
	async execute(client, message) {
		const m = await message.channel.send('Ping?');
        m.edit(`Pong! Latency is ${m.createdTimeStamp - message.createdTimeStamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	}
}