'use strict'

require('./server.bootstrap')

var gitDiffSync = require('./sync')

var gitDiffAsync = function(str1, str2, options) {
  return new Promise(function(resolve) {
    var gitDiff = gitDiffSync(str1, str2, options)
    resolve(gitDiff)
  })
}

module.exports = gitDiffAsync
