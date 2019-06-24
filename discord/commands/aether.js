import { getAetherRequests } from '../requestHandler';
import { RichEmbed } from 'discord.js';
import moment from 'moment';

export default {
	name: 'aether',
	description: 'Get first 8 requests for Aether Datacenter',
	async execute(client, message, args) {
		let aRequests = await getAetherRequests();
		let aetherEmbed = new RichEmbed()
			.setTitle("Aether Requests")
			.setDescription("The following twitch viewers have requested help")
			.setTimestamp()
			.setColor('#6B29F1')
			.setURL("http://www.twitch.tv/mtqcapture");
		Object.values(aRequests).slice(0,8).map(aether => {				
			aetherEmbed.addField(
				`${aether.firstName} ${aether.lastName}`, `${aether.twitch} requested ${aether.request} on ${moment.unix(aether.timestamp._seconds).format("MMMM Do YYYY, h:mma")}`
			);
		});
		message.channel.send(aetherEmbed);
	}
}