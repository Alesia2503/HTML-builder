const fs = require('fs');
const path = require('path');

const readline = require('readline');
const { stdin: input, stdout: output} = require('process');
let writeableStream = fs.createWriteStream(__dirname + '/writeme.txt');
const rl = readline.createInterface({input, output});

rl.question('\nВВЕДИТЕ ДАННЫЕ\n\n', (answer) => {
	if (answer != 'exit') {
		writeableStream.write(answer + "\n");
  } else {
    rl.close();
    console.log("\nBYE BYE !!!");
  }
	rl.on('line', (line) => {
    if (line != 'exit') {
			writeableStream.write(line + "\n");
    } else {
      rl.close();
      console.log("\nBYE BYE !!!");
    }
  });
	rl.on("close", function() {
		console.log("\nBYE BYE !!!")
		process.exit(0)
	});
});
