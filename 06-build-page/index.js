const { error } = require('console');
const fs = require('fs');
const path = require('path');

const option = {
  withFileTypes: true
}

// создаю папку project-dist
fs.mkdir(__dirname + '/project-dist', {recursive: true}, err => {
  if (err) return console.log(err);
});  


// удаляю файл index.html
fs.open(__dirname + '/project-dist' + '/index.html', 'w', (err) => {
  if(err) throw err;
  fs.truncate(__dirname + '/project-dist' + '/index.html', err => {
    if(err) throw err;
  });
});
// удаляю файл style.css
fs.open(__dirname + '/project-dist' + '/style.css', 'w', (err) => {
  if(err) throw err;
  fs.truncate(__dirname + '/project-dist' + '/style.css', err => {
    if(err) throw err;
  });
});


//удаляю папку assets
fs.stat(__dirname + '/project-dist' + '/assets', (error) => {
  if (!error) {
    fs.rm(__dirname + '/project-dist' + '/assets', {recursive: true}, err => {
    if (err) return console.log(err);
    fs.mkdir(__dirname + '/project-dist' + '/assets', {recursive: true}, err => {
      if(err) throw err;
      fs.readdir(__dirname + '/assets', option, (error, files) => {
        if (error) return console.log(error);
        for (let file of files) {
          fs.mkdir(__dirname + '/project-dist' + '/assets' +  `/${file.name}`, {recursive: true},(error, files) => {
            if (error) return console.log(error);
          });
          fs.readdir(__dirname + '/assets' + `/${file.name}`, option, (error, files) => {
            if (error) return console.log(error);
            for (let file1 of files) {
              fs.copyFile(__dirname + '/assets' + `/${file.name}` + `/${file1.name}`, __dirname + '/project-dist' + '/assets' + `/${file.name}` + `/${file1.name}`, err => {
                if(err) throw err;
              });
            }
          });              
        }
      });
    });
  });
  } else {
    return;
  }
}); 


// добавляю в папку project-dist папку assets со всеми папками и файлами внутри
fs.mkdir(__dirname + '/project-dist' + '/assets', {recursive: true}, err => {
  if(err) throw err;
  fs.readdir(__dirname + '/assets', option, (error, files) => {
    if (error) return console.log(error);
    for (let file of files) {
      fs.mkdir(__dirname + '/project-dist' + '/assets' +  `/${file.name}`, {recursive: true},(error, files) => {
        if (error) return console.log(error);
      })
      fs.readdir(__dirname + '/assets' + `/${file.name}`, option, (error, files) => {
        if (error) return console.log(error);
        for (let file1 of files) {
          fs.copyFile(__dirname + '/assets' + `/${file.name}` + `/${file1.name}`, __dirname + '/project-dist' + '/assets' + `/${file.name}` + `/${file1.name}`, err => {
            if(err) throw err;
          });
        }
      });              
    }
  });
});

// добавляю в папку project-dist файл style.css скомпилированный из трех
fs.readdir(__dirname + '/styles', option, (error, files) => {
    if (error) return console.log(error);
    for (let file of files) {
      if (file.isFile() === true) {
        if (path.extname(file.name) === '.css') {
          fs.readFile(__dirname + '/styles' + `/${file.name}`, function(error, data) {
            if(error) {
              return console.log(error);
            }
            fs.appendFile(__dirname + '/project-dist' + '/style.css', data.toString(), (err) => {
              if(err) throw err;
            });
          });
        }
      }
    }
  });

// добавляю в папку project-dist файл index.html
  fs.readFile(__dirname + '/template.html', option, (error, data) => {
    if (error) return console.log(error);
    fs.appendFile(__dirname + '/project-dist' + '/index.html', data.toString(), (err) => {
      if(err) throw err;
    });
 });

//заменяю теги 
fs.readFile(__dirname + '/components' + '/header.html', option, (error, data) => {
  let = header = data.toString();
  if (error) return console.log(error);
  fs.readFile(__dirname + '/template.html', option, (error, data) => {
    let template = data.toString();
    if (error) return console.log(error);
    let a = template.replace('{{header}}', header)
    fs.readFile(__dirname + '/components' + '/articles.html', option, (error, data) => {
      let articles = data.toString();
      if (error) return console.log(error);
      let b = a.replace('{{articles}}', articles)
      fs.readFile(__dirname + '/components' + '/footer.html', option, (error, data) => {
        let footer = data.toString();
        if (error) return console.log(error);
        let c = b.replace('{{footer}}', footer);
        fs.writeFile(__dirname + '/project-dist' + '/index.html', c, (err) => {
          if(err) throw err;
        });
      });
    });
  });
});
