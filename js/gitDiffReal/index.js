'use strict'

var generateDiff = require('./generateDiff')
var generateDiffNoRepo = require('./generateDiffNoRepo')
var keepIt = require('./keepIt')

var gitDiffReal = function(str1, str2, options) {
  if (keepIt.real()) {
    return generateDiff(str1, str2, options)
  } else if (keepIt.realNoRepo()) {
    return generateDiffNoRepo(str1, str2, options)
  }
  return undefined
}

module.exports = gitDiffReal
