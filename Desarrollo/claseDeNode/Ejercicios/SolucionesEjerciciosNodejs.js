// Ejercicio 1

let result = 0

for (let i = 2; i < process.argv.length; i++) {
  result += Number(process.argv[i])
}

console.log(result)


// Ejercicio 2


var fs = require('fs');

var aux = fs.readFile(process.argv[2], (err,data) => {
    if (err) {
        return console.log(err)
    }
    const lines = data.toString().split('\n').length - 1
    console.log(lines)
});


// Ejercicio 3 

const fs = require('fs')
const path = require('path')

exports = module.exports = function (dir, filterStr, callback) {
  fs.readdir(dir, (err, list) => {
    if (err) {
      return callback(err)
    }

    list = list.filter( (file) => {
      return path.extname(file) === '.' + filterStr
    })

    callback(null, list)
  })
}

/*Second Module*/
const fil = require('./filter.js')
const dir = process.argv[2]
const filterStr = process.argv[3]

fil(dir, filterStr, (err, list) => {
  if (err) {
    return console.error('There was an error:', err)
  }

  list.forEach((file) => {
    console.log(file)
  })
})