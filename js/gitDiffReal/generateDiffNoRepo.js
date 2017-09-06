'use strict'

var shell = require('shelljs')
var generateDiff = require('./generateDiff')

function generateDiffNoRepo(str1, str2, options) {

  var tempDirObj = shell.exec('mktemp -d', {silent: true})

  /* istanbul ignore else */
  if (tempDirObj.code === 0) {

    var tempDir = tempDirObj.stdout.replace(CR, '')
    var gitInitObj = shell.exec('git init ' + tempDir, {silent: true})

    /* istanbul ignore else */
    if (gitInitObj.code === 0) {

      return generateDiff(str1, str2, options, tempDir + '/.git')
    }
  }
  /* istanbul ignore next */
  return undefined
}

module.exports = generateDiffNoRepo
