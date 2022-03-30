var fs = require('fs');  
var path = require('path');  
var config = require('./config');
var mime = require('./mime');
  
function full_path(where) {
	var filepath = path.normalize(config.root + '/' + where);
	if (!filepath.startsWith(config.root))
		throw 'Permission denied';
	return filepath;
}
  
function list_dir(pathname){  
	var list = [];
	files = fs.readdirSync(pathname);

	files.forEach((filename) => {
		if (filename[0] === '.')
			return;
		var filepath = path.join(pathname, filename);
		try {
			var filestat = fs.statSync(filepath);
			var mimeType = '';
			var is_dir = true;
			if (!filestat.isDirectory()) {
				is_dir = false;
				mimeType = mime.find(filename);
			}
			list.push({ name: filename, is_dir: is_dir, mime: mimeType, size: filestat.size, time: filestat.ctime });
		} catch (e) {
		}
	});
	return list;
}

exports.preview = (req, res) => {
	if (req.query.where === undefined) {
		res.status(400).json('Bad request');
		return;
	}
	var filename = req.query.where;
	try {
		filename = full_path(filename);
	} catch(e) {
		res.status(403).json(e.message);
		return;
	}

	var mimeType = mime.find(filename);

	let stat;
	try {
		stat = fs.statSync(filename);
	} catch (e) {
		res.status(404).json(e.message);
		return;
	}
	let fileSize = stat.size;
	let range = req.headers.range;

	if (range) {
		let parts = range.replace(/bytes=/, '').split('-');
		let start = parseInt(parts[0], 10);
		let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;

		end = end > fileSize - 1 ? fileSize - 1 : end;

		let chunksize = (end - start) + 1;
		let file = fs.createReadStream(filename, { start, end });
		let head = {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': mimeType,
		};
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		let head = {
			'Content-Length': fileSize,
			'Content-Type': mimeType,
		};
		res.writeHead(200, head);
		fs.createReadStream(filename).pipe(res);
	}
}

exports.list = (req, res) => {
	if (req.query.where === undefined) {
		res.status(404).json('Not Found');
		return;
	}
	var dirname;
	var list;
	try {
		dirname = full_path(req.query.where);
		list = list_dir(dirname);
	} catch(e) {
		res.status(403).json(e.message);
		return;
	}

	var dir = dirname.substring(config.root.length);
	dir = dir.replace(/\\/g, '/');
	if (dir.at(0) == '/')
		dir = dir.substring(1);
	dir = dir.split('/');
	res.status(200).json({dir: dir, files: list});
}
