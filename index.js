'use strict'

var jsDiff = require('diff')
var color = require('./color')
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

var gitDiff = function(str1, str2, pColor) {

  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw TypeError('Both inputs to ' + pkg.name + ' must be strings')
  }
  pColor = toBoolean(pColor)

  var diff = jsDiff.diffLines(str1, str2)

  var isDiff = diff.some(function(item) {
    return item.added || item.removed
  })

  var accumulatedDiff = ''

  if (isDiff) {
    diff.forEach(function(part) {
      var culla, prefix
      if (part.added) {
        culla = 'green'
        prefix = '+'
        part.value = replaceAllButLast(part.value, '\n', '\n ')
      } else if (part.removed) {
        culla = 'red'
        prefix = '-'
        part.value = replaceAllButLast(part.value, '\n', '\n ')
      } else {
        culla = 'grey'
        prefix = ''
      }
      part.diff = prefix + part.value
      if (pColor) part.diff = color.add(part.diff, culla)
      accumulatedDiff += part.diff
    })
    return (accumulatedDiff)

  } else {
    var noDiff = 'no difference'
    if (pColor) noDiff = color.add(noDiff, 'grey')
    return (noDiff)
  }
}

module.exports = gitDiff
