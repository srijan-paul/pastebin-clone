const express = require("express");
const path = require('path');


const app = express();
require("dotenv").config();
const dbUtils = require("./db");

const content = express.static(path.join(__dirname, 'build'))

app.use(content);
app.use('/login', content);
app.use('/user/:id', content);
app.use('/paste/:id', content);
app.use('/home/:id', content);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", (req, res) => {
	const { username, password } = req.body;
	dbUtils.addUser(username, password, (success) => {
		if (success) {
			res.json({ success });
		} else {
			res.json({ success: false, status: "username taken." });
		}
	});
});

app.post("/api/login", (req, res) => {
	const { username, password } = req.body;
	dbUtils.validateUserCreds(username, password, (success, sessionId) => {
		sessionId = success ? sessionId : "";
		res.json({ success, sessionId });
	});
});

app.post("/api/users/authenticate", (req, res) => {
	const { username, sessionId } = req.body;
	dbUtils.authenticateUser(username, sessionId, (success) => {
		res.json({ success });
	});
});

app.get("/api/pastes/:id", (req, res) => {
	dbUtils.getPasteById(req.params.id, (success, paste) => {
		res.json({ success, paste });
	});
});

app.get("/api/users/:id", (req, res) => {
	dbUtils.getPublicUserData(req.params.id, (success, data) => {
		res.json({ success, data });
	});
});

app.post("/api/paste", (req, res) => {
	dbUtils.addPaste(req.body, (success, id) => {
		res.json({ success, id });
	});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
