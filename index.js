'use strict'

var config = require('./config')
var jsDiff = require('diff')
var chalk = require('chalk')
var pkg = require('./package.json')

function toBoolean(bool) {
  if (bool === 'false') bool = false
  return !!bool
}

function replaceAllButLast(str, pOld, pNew) {
  str = str.replace(new RegExp(pOld, 'g'), pNew)
  str = str.replace(new RegExp(pNew + '$'), pOld)
  return str
}

var gitDiff = function(str1, str2, color) {

  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw TypeError('Both inputs to ' + pkg.name + ' must be strings')
  }
  color = toBoolean(color)

  var diff = jsDiff.diffLines(str1, str2)

  var isDiff = diff.some(function(item) {
    return item.added || item.removed
  })

  var accumulatedDiff = ''

  if (isDiff) {
    diff.forEach(function(part) {
      var color, prefix
      if (part.added) {
        color = 'green'
        prefix = '+'
        part.value = replaceAllButLast(part.value, '\n', '\n ')
      } else if (part.removed) {
        color = 'red'
        prefix = '-'
        part.value = replaceAllButLast(part.value, '\n', '\n ')
      } else {
        color = 'grey'
        prefix = ''
      }
      part.diff = prefix + part.value
      /* istanbul ignore next */
      if (!config.testing && color) part.diff = chalk[color](part.diff)
      accumulatedDiff += part.diff
    })
    return (accumulatedDiff)

  } else {
    var noDiff = 'no difference'
    /* istanbul ignore next */
    if (!config.testing && color) noDiff = chalk.grey(noDiff)
    return (noDiff)
  }
}

module.exports = gitDiff
