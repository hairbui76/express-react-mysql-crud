module.exports = (sequelize, DataTypes) => {
	const Image = sequelize.define("image", {
		data: {
			type: DataTypes.BLOB("long"),
		},
	});

	return Image;
};
