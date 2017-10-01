'use strict'

var exec = require('shelljs.exec')
var generateDiff = require('../generateDiff')

function generateDiffNoRepo(str1, str2, options) {

  var tempDirObj = exec('mktemp -d', {silent: true})

  /* istanbul ignore else */
  if (tempDirObj.code === 0) {

    var tempDir = tempDirObj.stdout.replace(CR, '')
    var gitInitObj = exec('git init ' + tempDir, {silent: true})

    /* istanbul ignore else */
    if (gitInitObj.code === 0) {

      return generateDiff(str1, str2, options, tempDir + '/.git')
    }
  }

  /* istanbul ignore next */
  return undefined
}

module.exports = generateDiffNoRepo
