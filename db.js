const firebase = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");

const bcrypt = require("bcrypt");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const pastes = db.collection("pastes");
const users = db.collection("users");

function addUser(username, password, callback) {
	const doc = users.doc(username);

	let userAdded = true;

	doc.get().then((snapshot) => {
		if (snapshot.exists) {
			userAdded = false;
		} else {
			bcrypt.hash(password, 0, (_, hash) => {
				doc.set({ username, hashed_password: hash });
			});
		}
	});

	if (callback) callback(userAdded);
}

async function validateUserCreds(username, password, callback) {
	try {
		const doc = await users.doc(username).get();
		if (!doc.exists) return callback(false); // if user doesn't exist, then pretend the creds are invalid
		const userdata = doc.data();

		bcrypt.compare(password, userdata.hashed_password, (err, result) => {
			if (err) throw err;
			callback(result);
		});
	} catch (e) {
		callback(false);
	}
}

function getPasteById(pasteId, callback) {
	const docRef = pastes.doc(pasteId);

	docRef.get().then((pasteSnapshot) => {
		if (!pasteSnapshot.exists) return callback(false, null);
		callback(true, pasteSnapshot.data());
	});
}

function addPaste(paste, callback) {
	pastes
		.add(paste)
		.then((ref) => {
			callback(true, ref.id);
		})
		.catch(() => callback(false, null));
}

module.exports = {
	addUser,
	addPaste,
	validateUserCreds,
	getPasteById,
};
