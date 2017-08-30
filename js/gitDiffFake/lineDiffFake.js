'use strict'

var jsDiff = require('diff')
var color = require('./color')

// endsWith polyfill from https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
/* istanbul ignore next */
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchStr, Position) {
    if (!(Position < this.length)) Position = this.length
    else Position |= 0
    return this.substr(Position - searchStr.length, searchStr.length) === searchStr
  }
}

function replaceAllButLast(str, pOld, pNew) {
  var parts = str.split(pOld)
  /* istanbul ignore if */
  if (parts.length === 1) return str
  return parts.slice(0, -1).join(pNew) + pOld + parts.slice(-1)
}

function lineDiffFake(str1, str2, options) {

  var diff, isDiff, accumulatedDiff = ''

  if (!str1.endsWith('\n') || !str2.endsWith('\n')) {
    str1 += '\n'
    str2 += '\n'
  }

  diff = jsDiff.diffLines(str1, str2)

  isDiff = diff.some(function(item) {
    return item.added || item.removed
  })

  if (isDiff) {
    diff.forEach(function(part) {
      var culla, prefix
      if (part.added) {
        culla = 'green'
        prefix = '+'
      } else if (part.removed) {
        culla = 'red'
        prefix = '-'
      } else {
        culla = 'reset'
        prefix = ' '
      }
      part.value = replaceAllButLast(part.value, '\n', '\n' + prefix)
      part.diff = prefix + part.value
      if (options.color) part.diff = color.add(part.diff, culla)
      accumulatedDiff += part.diff
    })
    return accumulatedDiff
  }

  return undefined
}

module.exports = lineDiffFake
