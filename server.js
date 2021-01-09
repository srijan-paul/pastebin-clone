const express = require("express");
const app = express();

const dbUtils = require("./db");

app.use(express.json());

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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
