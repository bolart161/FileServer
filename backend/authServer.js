const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const fs = require("fs");
const app = express();
let db = null;

const ROOT_FILE_PATH = "/var/www/html/files/";

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// Auth user by login/password
app.get("/users/:login/:password", (req, res) => {
	db.collection("users").findOne({ login: req.params.login}, (err, userAllInfo) => {
		if (err) {
			console.error(err);
			return res.sendStatus(404);
		}

		if (userAllInfo) {
			db.collection("usersAuthInfo").findOne({ login: userAllInfo.login}, (err2, userAuthInfo) => {
				if (err2) {
					console.error(err2);
					return res.sendStatus(404);
				}

				if (userAuthInfo) {
					if (userAuthInfo.password === req.params.password) {
						res.send(userAllInfo);
					}

					res.json({_id: null})
				}

				return res.sendStatus(404);
			});
		} else {
			return res.sendStatus(404);
		}
	})
});

// Register new user
app.post("/users", (req, res) => {
	const {login, password, name, surname} = req.body;
	if (!login || !password || !name || !surname) {
		return res.sendStatus(404);
	}
	db.collection("usersAuthInfo").findOne({ login: req.body.login}, (err, userInfo) => {
		if (err) {
			console.error(err);
			return res.sendStatus(404);
		}

		if (userInfo) {
			return res.sendStatus(409); // User already exist
		} else {
			let userBaseInfo = {login, name, surname};
			let userAuthInfo = {login, password};

			db.collection("usersAuthInfo").insertOne(userAuthInfo, (err) => {
				if (err) {
					console.error(err);
					return res.sendStatus(404);
				}
			});

			db.collection("users").insertOne(userBaseInfo, (err) => {
				if (err) {
					console.error(err);
					return res.sendStatus(404);
				}

				fs.mkdir(`${ROOT_FILE_PATH}/users/${userBaseInfo._id}/docs`, { recursive: true }, (err) => {
						if (err) {
							console.log(err);
						}
					});

				fs.mkdir(`${ROOT_FILE_PATH}/users/${userBaseInfo._id}/photo`, { recursive: true }, (err) => {
						if (err) {
							console.log(err);
						}
					});

				fs.mkdir(`${ROOT_FILE_PATH}/users/${userBaseInfo._id}/video`, { recursive: true }, (err) => {
						if (err) {
							console.log(err);
						}
					});

				res.json({ status: "Ok" });
			})
		}
	});
});

// Connect with database
MongoClient.connect("mongodb://mongo:27017/myapi", { useNewUrlParser: true }, (err, database) => {
	if (err) {
		return console.error(err);
	}

	db = database.db("myUsers1");

	app.listen(3012, function () {
		console.log("Api app started");
	})
});