'use strict'

var SHA_REGEX = /[0-9a-zA-Z]+/
var shell = require('shelljs')

// returns the same as:
// git diff $(printf 'my first string' | git hash-object -w --stdin) $(printf 'my second string' | git hash-object -w --stdin) --word-diff
// git diff $(printf 'This is a test for my diff tool\nIt is a big test\n\nNo diff here\n\nBut there might be here\nBut not here\n\nOr here\n' | git hash-object -w --stdin) $(printf 'This is a test for my difference tool\nIt is a small test\n\nNo diff here\n\nBut there might be here!\nBut not here\n\nOr here\n' | git hash-object -w --stdin) --word-diff

var realGitDiff = function(str1, str2) {

  if (shell.which('git')) {

    var stringify1 = JSON.stringify(str1).replace('"', '').replace(/"$/, '')
    var stringify2 = JSON.stringify(str2).replace('"', '').replace(/"$/, '')

    // Single quotes is needed here to avoid .. event not found
    var gitHashCmd1 = 'printf \'' + stringify1 + '\' | git hash-object -w --stdin'
    var gitHashCmd2 = 'printf \'' + stringify2 + '\' | git hash-object -w --stdin'

    // TODO: pattern match stdout to make sure it is a git hash

    var gitHashObj1 = shell.exec(gitHashCmd1, {silent: true})
    var gitHashObj2 = shell.exec(gitHashCmd2, {silent: true})

    if (!gitHashObj1.code && !gitHashObj2.code) {

      var gitHash1 = gitHashObj1.stdout.match(SHA_REGEX)
      var gitHash2 = gitHashObj2.stdout.match(SHA_REGEX)

      var newCommand = 'git diff ' + gitHash1 + ' ' + gitHash2 + ' --word-diff --color=always'

      var trueDiffObj = shell.exec(newCommand, {silent: false})

      if (!trueDiffObj.code) {

        var trueDiff = trueDiffObj.stdout
        trueDiff = trueDiff.substring(trueDiff.indexOf('@@'))
        console.log(trueDiff)
      }
    }
  }
}

module.exports = realGitDiff
