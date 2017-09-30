var gitDiff = require('./sync')
var imp = require('./test/_js/testImports')

var str1 = imp.data.str1
var str2 = imp.data.str2

var diff1 = gitDiff(str1, str2, {forceFake:false, wordDiff: true})
var diff2 = gitDiff(str1, str2, {forceFake:true, wordDiff: true})

console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
console.log(diff1)
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
console.log(diff2)
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
