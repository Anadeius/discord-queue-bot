import { aetherQueue, primalQueue } from '../requestHandler';

export default {
	name: 'request',
	description: 'Handle requests for content help',
	async execute(client, message, args) {
		// args = [dataCenter = {aether|primal}, characterFirstName, characterLastName, twitchName, contentRequest = {Alphascape O9S|10S|11S|12S || Primals {Tsukuyomi|Suzaku|Seiryu}]
		const dataCenter = args.shift();
		let response;

		if (dataCenter === 'aether') response = await aetherQueue(message, args);
		else if (dataCenter === 'primal') response = await primalQueue(message, args);
		else response = 'Invalid data center, only Primal and Aether requests accepted at this time';

		message.channel.send(response);
	}
}