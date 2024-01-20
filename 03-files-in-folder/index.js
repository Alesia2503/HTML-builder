const fs = require('fs');
const path = require('path');

const option = {
  withFileTypes: true
}

fs.readdir(__dirname + '/secret-folder', option, (error, files) => {
  if (error) return console.log(error);
  for (let file of files) {
    if (file.isFile() === true) {
      fs.stat(__dirname + '/secret-folder/' + `${file.name}`, function(err, stats) {
        console.log(path.basename(file.name, path.extname(file.name)) + ' - ' + (path.extname(file.name)).slice(1) + ' - ' +  (stats.size) / 1000 + 'kb')
      });
    }
  }
});
