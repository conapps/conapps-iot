var fs = require('fs');

var aux = fs.readFile(process.argv[2], (err,data) => {
    if (err) {
        return console.log(err)
    }
    const lines = data.toString().split('\n').length - 1
    console.log(lines)
});

