const Sequelize = require("sequelize");
const fileSequelize = new Sequelize("filedb", "root", "mryasuo", {
	host: "localhost",
	dialect: "mysql",

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

const sequelize = new Sequelize("testdb", "root", "mryasuo", {
	host: "localhost",
	dialect: "mysql",

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.fileSequelize = fileSequelize;
db.sequelize = sequelize;

db.image = require("./image.model.js")(fileSequelize, Sequelize);
db.imageInfo = require("./imageInfo.model.js")(sequelize, Sequelize);

module.exports = db;
