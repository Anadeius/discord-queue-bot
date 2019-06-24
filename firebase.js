import admin from 'firebase-admin';
import globals from './globals';

const serviceAccount = require('./serviceAccount.json');

const connect = async () => {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://mtqniversity.firebaseio.com"
	});

	const store = admin.firestore();
	console.log(`Firebase Connected to MTQniversity`);

	let aetherCache = {};
	let primalCache = {};

	const aetherCollection = store.collection('aether');
	const fetchedAether = await aetherCollection.orderBy('timestamp', 'asc').get().then((snapshot) => {
		snapshot.forEach(doc => {
			aetherCache[doc.id] = doc.data();
		});
	});

	const primalCollection = store.collection('primal');
	const fetchedPrimal = await primalCollection.orderBy('timestamp', 'asc').get().then((snapshot) => {
		snapshot.forEach(doc => {
			primalCache[doc.id] = doc.data();
		});
	});

	globals.store = store;
	globals.aetherCache = aetherCache;
	globals.primalCache = primalCache;

	console.log(`Cached Aether Requests: \n`);
	console.log(aetherCache);
	console.log(`Cached Primal Requests: \n`);
	console.log(primalCache);

	return store;
}

export default async () => {
	await connect();
}