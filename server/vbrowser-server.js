const fs = require('fs');
const express = require('express');
const controller = require('./controller');
const config = require('./config');

const http = express();

http.get("/preview", (req, res) => {
	controller.preview(req, res);
});

http.get("/list", (req, res) => {
	controller.list(req, res);
});

http.listen(config.port, () => {
	console.log("Listen on port %d, and root directory is %s. See config.js for detail.", config.port, config.root);
})
