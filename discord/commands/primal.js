import { getPrimalRequests } from '../requestHandler';
import { RichEmbed } from 'discord.js';
import moment from 'moment';

export default {
	name: 'primal',
	description: 'Get first 8 requests for Primal Datacenter',
	async execute(client, message, args) {
		let pRequests = await getPrimalRequests();
		let primalEmbed = new RichEmbed()
			.setTitle("Primal Requests")
			.setDescription("The following twitch viewers have requested help")
			.setTimestamp()
			.setColor('#6B29F1')
			.setURL("http://www.twitch.tv/mtqcapture");
		Object.values(pRequests).slice(0,8).map(primal => {
			primalEmbed.addField(
				`${primal.firstName} ${primal.lastName}`, `${primal.twitch} requested ${primal.request} on ${moment.unix(primal.timestamp._seconds).format("MMMM Do YYYY, h:mma")}`
			);
		});
		message.channel.send(primalEmbed);
	}
}