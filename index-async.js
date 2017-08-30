'use strict'

var normaliseOptions = require('./js/normaliseOptions')
var gitDiffFake = require('./js/gitDiffFake')
var gitDiffReal = require('./js/gitDiffReal')
var validate = require('./js/validate')

var gitDiffAsync = function(str1, str2, options) {

  return new Promise(function(resolve) {

    validate(str1, str2)
    options = normaliseOptions(options)

    if (str1 === str2) resolve(undefined)

    if (options.forceFake) {
      resolve(gitDiffFake(str1, str2, options))
    } else {
      resolve(gitDiffReal(str1, str2, options) || gitDiffFake(str1, str2, options))
    }
  })
}

module.exports = gitDiffAsync
