const express = require("express");
const app = express();
require("dotenv").config();
const sessions = require("client-sessions");

const dbUtils = require("./db");

app.use(
	sessions({
		cookieName: "cookie",
		secret: process.env.SECRET_KEY,
		duration: 7 * 24 * 60 * 60 * 1000, // cookie lasts for a week
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
	res.json({
		foo: 1,
	});
});

app.post("/register", (req, res) => {
	const { username, password } = req.body;
	dbUtils.addUser(username, password, (success) => {
		if (success) {
			res.json({ success });
		} else {
			res.json({ success: false, status: "username taken." });
		}
	});
});

app.post("/login", (req, res) => {
	const { username, password } = req.body;
	// console.log(req.body, res.body);
	dbUtils.validateUserCreds(username, password, (success) => {
		// console.log(`${username} logged in at ${formatDate(Date.now())}`);
		res.json({ success });
	});
});

app.get("/pastes/:id", (req, res) => {
	dbUtils.getPasteById(req.params.id, (success, paste) => {
		res.json({ success, paste });
	});
});

app.post("/paste", (req, res) => {
	dbUtils.addPaste(req.body, (success, id) => {
		res.json({ success, id });
	});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
