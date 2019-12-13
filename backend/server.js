const express = require("express"); // Library for organize API and work with requests
const bodyParser = require("body-parser"); //Module for parsing JSON
const fs = require("fs"); //Module for work with File System (FS). We use it for scan directory
const cors = require("cors"); // Module for work with cross-domain request
const multer = require("multer"); // Library for work with storage
const apiSrv = require("./authServer");

const ROOT_FILE_PATH = "/var/www/html/files"; //Root path for storage

const app = express(); // Init server-application

// Configure app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Configure service for work with storage
let storage = multer.diskStorage({
	destination: (req, file, callback) => {
		const extension = file.originalname.split(".").pop().toLowerCase();
		let typeFile;

		switch (extension) {
			case "jpg":
			case "png":
			case "gif":
			case "jpeg":
				typeFile = "photo";
				break;

			case "mov":
			case "mpeg":
			case "mp4":
			case "flv":
			case "wav":
				typeFile = "video";
				break;

			default:
				typeFile = "docs";
		}
		callback(null, `${ROOT_FILE_PATH}/users/${req.headers.id}/${typeFile}`)
	},
	filename: (req, file, callback) => {
		callback(null, `${Date.now()}-${file.originalname}`);
	}
});

// Function for get all filenames in selected directory
// For example: docs/ photo/ video/
function getNamesOfFiles(fileType, userId) {
	const docsFolder = `${ROOT_FILE_PATH}/users/${userId}`;
	const myFiles = [];

	let index = 0;

	fs.readdirSync(`${docsFolder}/${fileType}`).forEach((file) => {
		myFiles.push({id: index, text: file, ref: `files/users/${userId}/${fileType}/${file}`, fileType: fileType});
		index += 1;
	});

	return myFiles;
}

// @apiRequest GET for get all filenames by type of files from user directory
app.get("/files/:fileType/:id", (req, res) => {
	return res.json(getNamesOfFiles(req.params.fileType, req.params.id))
});

// @apiRequest POST for upload file to server in user storage
app.post("/upload", (req, res) => {
	const upload = multer({ storage : storage}).single("my-file");

	upload(req, res, (err) => {
		if (err) {
			return res.end("Error uploading file.");
		}
		return res.end("File is uploaded");
	});
});

// @apiRequest DELETE for delete file from user storage in server
app.delete("/deleteFile/:fileType/:id/:fileName", (req, res) => {
	fs.stat(`${ROOT_FILE_PATH}/users/${req.params.id}/${req.params.fileType}/${req.params.fileName}`, (err) => {
		if (err) {
			return console.error(err);
		}

		fs.unlink(`${ROOT_FILE_PATH}/users/${req.params.id}/${req.params.fileType}/${req.params.fileName}`, (err) => {
			if (err) {
				return console.error(err);
			}

			return res.json({ status: "Ok" });
		});
	});
});

// @apiRequest GET for download file from server
app.get("/files/users/:id/:type/:filename", (req, res) => {
	const {id, type, filename} = req.params;

	return res.download(`${ROOT_FILE_PATH}/users/${id}/${type}/${filename}`);
});

// Start server on 3333 port, with callback, witch say that server was started
app.listen(3333, () => {
	console.log("Server app started");
});
