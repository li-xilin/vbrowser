const fs = require('fs');
const express = require('express');
const controller = require('./controller');
const config = require('./config');
const parser = require('minimist');

const args = parser(process.argv.splice(2))

const http = express();

function usage() {
	process.stdout.write(`
Usage: node vbrowserd.js [OPTIONS]
OPTIONS:
  --data     specify the data storage directory
  --port     the port to listen, default is 8091
  --help     show this text
`.trimLeft());
}

if (args['help']) {
	usage();
	process.exit(0);
}

const root = args['data'];
if (root === undefined) {
	process.stderr.write('Error: data storage directory is not specified.\n');
	usage();
	process.exit(1);
}

const port = args['port'] || 8091;

http.get('/preview', (req, res) => {
	controller.preview(req, res);
});

http.get('/list', (req, res) => {
	controller.list(req, res);
});

http.listen(port, () => {

}).on('error', (err) => {
	console.log(err.message);
});
