import { DiscordAPIError } from "discord.js";

let aetherRequests = [
	{
		"firstName": "Anadeius",
		"lastName": "Etherius",
		"twitch": "anadeius",
		"request": "O12S"
	},
	{
		"firstName": "Loose",
		"lastName": "Taco",
		"twitch": "mtqcapture",
		"request": "O5S"
	},
	{
		"firstName": "Erect",
		"lastName": "Burrito",
		"twitch": "solu_9",
		"request": "O8S"
	}
];

let primalRequests = [
	{
		"firstName": "Anadeius",
		"lastName": "Etherius",
		"twitch": "anadeius",
		"request": "O11S"
	},
	{
		"firstName": "Mizzteq",
		"lastName": "Aran",
		"twitch": "mtqcapture",
		"request": "O5S"
	},
	{
		"firstName": "Harlequin",
		"lastName": "D\'ranged",
		"twitch": "solu_9",
		"request": "O8S"
	}
];

const request = (message, args, dataCenter) => {
	if(dataCenter === 'aether'){
		aetherRequest(message, args);
	} 
	else if(dataCenter === 'primal'){
		primalRequest(message, args);
	}
	else{
		return `Data Center ${dataCenter} is not valid at this current time.`;
	}
}

const aetherRequest = (message, args) => {
	let [firstName, lastName, twitchName, content] = args;
	let requestObj = {
		"firstName": firstName,
		"lastName": lastName,
		"twitch": twitchName,
		"request": content
	};
	let duplicate = aetherRequests.findIndex(request => request.twitch === requestObj.twitch) !== -1 ? true : false;

	if(!duplicate){
		aetherRequests.push(requestObj);
		
		console.log('Added to Aether Requests');
		message.channel.send(`${twitchName} successfully request ${content} for Character ${firstName} ${lastName} on Aether`);
	}
	else{
		console.log('User already requested content');
		let previousRequest = aetherRequests.find(request => request.twitch === twitchName);
		message.channel.send(`${twitchName} has already requested ${previousRequest.request} on Aether`);
	}
}

const primalRequest = (message, args) => {
	let [firstName, lastName, twitchName, content] = args;
	let requestObj = {
		"firstName": firstName,
		"lastName": lastName,
		"twitch": twitchName,
		"request": content
	};
	let duplicate = primalRequests.findIndex(request => request.twitch === requestObj.twitch) !== -1 ? true : false;

	if(!duplicate){
		primalRequests.push(requestObj);
		
		console.log('Added to Primal Requests');
		message.channel.send(`${twitchName} successfully request ${content} for Character ${firstName} ${lastName} on Primal`);
	}
	else{
		console.log('User already requested content');
		let previousRequest = aetherRequests.find(request => request.twitch === twitchName);
		message.channel.send(`${twitchName} has already requested ${previousRequest.request} on Primal`);
	}
}

const getAetherRequests = () => {
	return aetherRequests;
}

const getPrimalRequests = () => {
	return primalRequests;
}

// message = "!remove aether/primal {twitchName}"
const remove = (message, args) => {
	let [dataCenter, twitchName] = args;
	console.log(dataCenter);
	console.log(twitchName);	
	let deletedRequest;

	if(dataCenter === 'aether'){
		deletedRequest = aetherRequests.findIndex(aether => aether.twitch === twitchName);
		console.log(deletedRequest);
		aetherRequests.splice(deletedRequest, 1);
		message.channel.send(`Request from ${twitchName} of Aether was removed successfully`);
	}
	else if(dataCenter === 'primal'){
		deletedRequest = primalRequests.findIndex(aether => aether.twitch === twitchName);
		primalRequests.splice(deletedRequest, 1);
		message.channel.send(`Request from ${twitchName} of Primal was removed successfully`);
	}
	else{
		message.channel.send(`${dataCenter} is not a valid server cluster.`);
	}
}

export default {
	request,
	remove,
	getAetherRequests,
	getPrimalRequests
}