//import moment from 'moment';
import globals from '../globals';

// Add to the Queue, check DC Cache, !found > Add to Cache & DB, found > return current request. Provide User Feedback.

const aetherQueue = async (message, args) => {
	let aetherCache = globals.aetherCache; // Production Cache
	//let aetherCache = globals.testAetherCache; // Dev Cache Object, pre-populated
	
	let response = '';
	let storeCache = false;
	let storeDB = false;

	let [firstName, lastName, twitchName, content] = args;
	let requestObj = {
		"firstName": firstName,
		"lastName": lastName,
		"twitch": twitchName,
		"request": content,
		"timestamp": new Date(Date.now())
	}

	let duplicate = aetherCache.hasOwnProperty(twitchName);

	if(!duplicate){
		try {
			storeCache = await storeAetherCache(requestObj);
		}
		catch (err) {
			console.log(`Error updating the Aether cache: ${err}`);
		}
		try {
			storeDB = await storeAetherDatabase(requestObj);
		}
		catch (err) {
			console.log(`Error storing in the Aether Firestore Collection: ${err}`);
		}
		
		if(storeCache && storeDB) {
			console.log('Added to Aether Requests');
			response = `${twitchName} successfully request ${content} for Character ${firstName} ${lastName} on Aether`;
		}
	}
	else{
		console.log('User already requested content');
		let previousRequest = aetherCache[twitchName];
		response = `${twitchName} has already requested ${previousRequest.request} on Aether`;
	}

	return response;
};

const primalQueue = async (message, args) => {
	let primalCache = globals.primalCache; // Production Cache
	//let primalCache = globals.testPrimalCache; // Dev Cache Object, pre-populated
	
	let response = '';
	let storeCache = false;
	let storeDB = false;

	let [firstName, lastName, twitchName, content] = args;
	let requestObj = {
		"firstName": firstName,
		"lastName": lastName,
		"twitch": twitchName,
		"request": content,
		"timestamp": new Date(Date.now())
	}

	let duplicate = primalCache.hasOwnProperty(twitchName);

	if(!duplicate){
		try {
			storeCache = await storePrimalCache(requestObj);
		}
		catch (err) {
			console.log(`Error updating the Primal cache: ${err}`);
		}
		try {
			storeDB = await storePrimalDatabase(requestObj);
		}
		catch (err) {
			console.log(`Error storing in the Primal Firestore Collection: ${err}`);
		}
		
		if(storeCache && storeDB) {
			console.log('Added to Primal Requests');
			response = `${twitchName} successfully requested ${content} for Character ${firstName} ${lastName} on Primal`;
		}
	}
	else{
		console.log('User already requested content');
		let previousRequest = primalCache[twitchName];
		response = `${twitchName} has already requested ${previousRequest.request} on Primal`;
	}

	return response;
};

const storeAetherCache = async (request) => {
	let aetherCache = globals.aetherCache; // Production Cache
	//let aetherCache = globals.testAetherCache; // Dev Cache Object, pre-populated
	console.log(aetherCache);
	aetherCache[request.twitch] = request;
	console.log(aetherCache[request.twitch]);
	return true;
};

const storePrimalCache = async (request) => {
	let primalCache = globals.primalCache; // Production Cache
	//let primalCache = globals.testPrimalCache; // Dev Cache Object, pre-populated
	primalCache[request.twitch] = request;
	return true;
};

const storeAetherDatabase = async (request) => {
	let store = globals.db;
	let aetherCache = globals.aetherCache;
	let collection = store.collection('aether');
	let storedRequest = await collection.doc(`${request.twitch}`).set(request).then(writeResult => {
		aetherCache[request.twitch]['timestamp'] = writeResult.writeTime;
	}).catch((err) => {
		console.log(`Error storing request in Aether Firestore collection: ${err}`);
		return;
	});
	return true;
};

const storePrimalDatabase = async (request) => {
	let store = globals.db;
	let primalCache = globals.primalCache;
	let collection = store.collection('primal');
	let storedRequest = await collection.doc(`${request.twitch}`).set(request).then(writeResult => {
		primalCache[request.twitch]['timestamp'] = writeResult.writeTime;
	}).catch((err) => {
		console.log(`Error storing request in Primal Firestore collection: ${err}`);
		return;
	});
	return true;
};

const getAetherRequests = async () => {
	let aetherCache = globals.aetherCache;
	return aetherCache;
};

const getPrimalRequests = async () => {
	let primalCache = globals.primalCache;
	return primalCache;
};

const removeAetherRequest = async (twitch) => {
	let response = '';
	
	let store = globals.db;
	let deletedRequest = await store.collection('aether').doc(`${twitch}`).delete();
	if(!deletedRequest){
		console.log(`Error deleting request from Aether Firestore Collection: ${err}`);
		response = `Failed to remove ${twitch}'s request`;
	}
	let aetherCache = globals.aetherCache;
	delete aetherCache[twitch];
	response = `Successfully removed ${twitch}'s request on Aether`;
	return response;
};

const removePrimalRequest = async (twitch) => {
	let response = '';
	
	let store = globals.db;
	let deletedRequest = await store.collection('primal').doc(`${twitch}`).delete();
	if(!deletedRequest){
		console.log(`Error deleting request from Primal Firestore Collection: ${err}`);
		response = `Failed to remove ${twitch}'s request`;
	}
	let primalCache = globals.primalCache;
	delete primalCache[twitch];
	response = `Successfully removed ${twitch}'s request on Primal`;
	return response;
};

export {
	aetherQueue,
	primalQueue,
	getAetherRequests,
	getPrimalRequests,
	removeAetherRequest,
	removePrimalRequest
}