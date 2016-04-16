var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');

var syllablesArray = [];
  for(var i = 0; i < 20; i++){
    syllablesArray[i] = [];
  }

function readCmudictFile(file){
	return fs.readFileSync(file).toString();
}

function formatData(data){    
   var lines = data.toString().split("\n"),
       lineSplit
   lines.forEach(function(line){    

     lineSplit = line.split("  ");    
 //    console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]); 
    lineSplit[1] = lineSplit[1].replace(/[^0-9]/g,"").length;
    Array.prototype.push.call(syllablesArray[lineSplit[1]],lineSplit[0]);
  });   
}

function pickWord (numSyllables) {
  var rando = Math.floor(Math.random()*syllablesArray[numSyllables].length);
  return syllablesArray[numSyllables][rando];
}

formatData(cmudictFile);

function createHaiku(structure){
  var re = /(\d+)/g;
  var arr =  structure.toString().match(re);
  var str = "";

  var counter = 0;
  for (var i = 0; i < arr.length; i++) {
    nums = arr[i].match(re);
    for (j=0;j<nums.length;j++){
      str += pickWord(parseInt(nums[j])) + " ";
      counter += parseInt(nums[j]);
    }
    if (counter===5||counter===12||counter===17) {
      str += '\n';  
    }
  }
  return str;
}

module.exports = {
	createHaiku: createHaiku,
};