const fs = require('fs');
const path = require('path');

const option = {
  withFileTypes: true
}

fs.open(__dirname + '/project-dist' + '/bundle.css', 'w', (err) => {
  if(err) throw err;
  fs.truncate(__dirname + '/project-dist' + '/bundle.css', err => {
    if(err) throw err;
  });
})

fs.readdir(__dirname + '/styles', option, (error, files) => {
  if (error) return console.log(error);
  for (let file of files) {
    if (file.isFile() === true) {
      if (path.extname(file.name) === '.css') {
        fs.readFile(__dirname + '/styles' + `/${file.name}`, function(error, data) {
          if(error) {
            return console.log(error);
          }
          fs.appendFile(__dirname + '/project-dist' + '/bundle.css', data.toString(), (err) => {
            if(err) throw err;
          });
        });
      }
    }
  }
});