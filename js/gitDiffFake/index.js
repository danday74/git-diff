'use strict'

var lineDiffFake = require('./lineDiffFake')
var wordDiffFake = require('./wordDiffFake')

function gitDiffFake(str1, str2, options) {
  return (options.wordDiff) ? wordDiffFake(str1, str2, options) : lineDiffFake(str1, str2, options)
}

module.exports = gitDiffFake
