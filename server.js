const express = require("express");
const app = express();
require("dotenv").config();
const sessions = require("client-sessions");

const dbUtils = require("./db");

app.use(express.json());
app.use(
	sessions({
		cookieName: "cookie",
		secret: process.env.SECRET_KEY,
		duration: 7 * 24 * 60 * 60 * 1000, // cookie lasts for a week
	})
);

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
	dbUtils.validateUserCreds(username, password, (success) => {
		// console.log(`${username} logged in at ${formatDate(Date.now())}`);
		res.json({ success });
	});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

// function formatDate(date) {
// 	const d = new Date(date);
// 	let month = "" + (d.getMonth() + 1),
// 		day = "" + d.getDate(),
// 		year = d.getFullYear();

// 	if (month.length < 2) month = "0" + month;
// 	if (day.length < 2) day = "0" + day;

// 	return [year, month, day].join("-");
// }
