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

function addNewUser(username, password, callback) {
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

module.exports = {
	addUser: addNewUser,
};
