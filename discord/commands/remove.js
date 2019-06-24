import { removeAetherRequest, removePrimalRequest } from "../requestHandler";

export default {
	name: 'remove',
	description: 'Remove request from Primal or Aether Queue',
	async execute(client, message, args) {
		// args = [datacenter = {aether|primal}, twitchName]
		const [dataCenter, twitch] = args;
		let response;

		if (dataCenter === 'aether') response = await removeAetherRequest(twitch);
		else if (dataCenter === 'primal') response = await removePrimalRequest(twitch);
		else response = 'Invalid data center, only Primal and Aether requests supported at this time';

		message.channel.send(response);
	}
}