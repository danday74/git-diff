'use strict'

var normaliseOptions = require('./js/normaliseOptions')
var gitDiffFake = require('./js/gitDiffFake')
var gitDiffReal = require('./js/gitDiffReal')
var validate = require('./js/validate')

var gitDiff = function(str1, str2, options) {
  validate(str1, str2)
  options = normaliseOptions(options)

  if (str1 === str2) return undefined

  if (options.fake) {
    return gitDiffFake(str1, str2, options)
  } else {
    return gitDiffReal(str1, str2, options) || gitDiffFake(str1, str2, options)
  }
}

module.exports = gitDiff
