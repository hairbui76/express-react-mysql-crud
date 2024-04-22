const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const db = require("./models");

const app = express();

app.use(
	cors({
		origin: true,
		credential: true,
	})
);

app.use(express.urlencoded({ extended: true }));

db.fileSequelize.sync().then(() => {
	console.log("Drop and re-sync db.");
});

db.sequelize.sync().then(() => {
	console.log("Drop and re-sync db.");
});

routes(app);

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
