const express = require("express");
const app = express();

app.get("/api", (req, res) => {
	res.json({
		foo: 1,
	});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
