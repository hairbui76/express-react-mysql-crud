const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const db = require("../models");
const { Blob } = require("buffer");
const Image = db.image;
const ImageInfo = db.imageInfo;

const routes = (app) => {
	app.get("/", (req, res) => res.send("Hello, world!"));

	app.get("/files", async (req, res) => {
		const images = await Image.findAll();
		const imageInfos = await ImageInfo.findAll();
		const files = [];
		for (let i = 0; i < images.length; i++) {
			files.push({
				id: images[i].id,
				name: imageInfos[i].name,
				description: imageInfos[i].description,
			});
		}
		res.send(files);
	});

	app.post("/upload", upload.single("image"), async (req, res) => {
		const image = await Image.create({
			data: req.file.buffer,
		});

		const imageInfo = await ImageInfo.create({
			imageId: image.id,
			type: req.file.mimetype,
			name: req.file.originalname,
			description: req.body.description,
		});

		res.send("Image uploaded successfully.");
	});

	app.get("/_file/:filename", async (req, res) => {
		const imageInfo = await ImageInfo.findOne({
			where: { name: req.params.filename },
		});

		const image = await Image.findByPk(imageInfo.imageId);

		res.setHeader("Content-Type", imageInfo.type);
		return res.send(Buffer.from(image.data, "binary"));
	});

	app.get("/file/:id", async (req, res) => {
		const image = await Image.findByPk(req.params.id);
		if (!image) return res.send("Image not found.");
		const imageInfo = await ImageInfo.findOne({
			where: { imageId: req.params.id },
		});
		res.setHeader("Content-Type", imageInfo.type);
		return res.send(Buffer.from(image.data, "binary"));
	});

	app.get("/info/:id", async (req, res) => {
		const imageInfo = await ImageInfo.findByPk(req.params.id);
		if (!imageInfo) return res.send("Image info not found.");
		res.send(imageInfo);
	});
};

module.exports = routes;
