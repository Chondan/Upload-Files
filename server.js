const express = require('express');
const app = express();
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

app.get('/index.js', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.js'));
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const middleware = (req, res, next) => {
	req.headers['X-Content-Type-Options'] = 'nosniff';
	next();
}

app.post('/fileupload', (req, res) => {
	const form = formidable({ multiples: true });
    // Parse the Uploaded File
    // When the file is uploaded and parsed, it gets placed on temporary folder on your computer.
    form.parse(req, (err, fields, files) => {
   	  const filesname = Object.keys(files);
   	  filesname.forEach(filename => {
        // To move the file to the destination folder
   	  	const oldpath = files[filename].path;
   	  	const newpath = path.join(__dirname, 'uploaded-file', files[filename].name);
   	  	fs.rename(oldpath, newpath, function(err) {
   	  		if (err) throw err;
   	  		res.write("File uploaded and moved!");
   	  		res.end();
   	  	});
   	  });
    });
});

app.get('/file', (req, res) => {
  fs.readFile(path.join(__dirname, 'uploaded-file', 'sample.text'), (err, data) => {
    res.end(data);
  });
});

app.listen(3000, () => console.log("Server started: Listening at port 3000"));