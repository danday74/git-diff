'use strict'

var jsDiff = require('diff')
var color = require('./color')

function replaceAllButLast(str, pOld, pNew) {
  str = str.replace(new RegExp(pOld, 'g'), pNew)
  str = str.replace(new RegExp(pNew + '$'), pOld)
  return str
}

function gitDiffFake(str1, str2, options) {

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
      if (options.color) part.diff = color.add(part.diff, culla)
      accumulatedDiff += part.diff
    })
    return (accumulatedDiff)

  } else {
    var noDiff = 'no difference'
    if (options.color) noDiff = color.add(noDiff, 'grey')
    return (noDiff)
  }

}

module.exports = gitDiffFake
