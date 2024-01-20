const fs = require('fs');
const path = require('path');

fs.mkdir(__dirname + '/files-copy', {recursive: true}, err => {
  if (err) return console.log(err);

  fs.readdir(__dirname + '/files-copy', (error, files) => {
    if (error) return console.log(error);
    for (let file of files) {
      fs.unlink(__dirname + '/files-copy' + `/${file}`, err => {
        if(err) throw err;
      });
    }
  });

  fs.readdir(__dirname + '/files', (error, files) => {
    if (error) return console.log(error);
    for (let file of files) {
      fs.copyFile(__dirname + '/files' + `/${file}`, __dirname + '/files-copy' + `/${file}`, err => {
        if(err) throw err;
      });
    }
  });
}); 