import discord from './discord';
import firebase from './firebase';

const run = async () => {
	try {
		await firebase();
		await discord();
	}
	catch (err) {
		console.log(`Error Initializing: ${err}`);
	}
};

run();