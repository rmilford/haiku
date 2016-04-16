var haiku = require('./haiku');
var structure = JSON.parse(process.argv[2]);
console.log(haiku.createHaiku(structure));
