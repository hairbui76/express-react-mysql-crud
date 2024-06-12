const { Storage } = require("@google-cloud/storage");
const path = require("path");
const gcpStorage = new Storage({
	projectId: "21020191",
	keyFilename: path.join(__filename, "../../service_key.json"),
});

const uploadToFirebaseStorage = async (filepath, fileName, mimetype) => {
	try {
		const gcs = gcpStorage.bucket("21020191-bucket"); // Removed "gs://" from the bucket name
		const storagepath = `storage_folder/${fileName}`;
		const result = await gcs.upload(filepath, {
			destination: storagepath,
			predefinedAcl: "publicread",
			metadata: {
				contentType: mimetype, // Adjust the content type as needed
			},
		});
		return result[0].metadata.mediaLink;
	} catch (error) {
		console.log(error);
		throw new Error(error.message);
	}
};

module.exports = {
	uploadToFirebaseStorage,
};
