module.exports = (sequelize, DataTypes) => {
	const ImageInfo = sequelize.define("imageInfo", {
		imageId: {
			type: DataTypes.INTEGER,
		},
		type: {
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		url: {
			type: DataTypes.STRING,
		},
	});

	return ImageInfo;
};
