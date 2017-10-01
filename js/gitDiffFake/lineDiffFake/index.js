'use strict'

var jsDiff = require('diff')
var color = require('../color')
var mostCommonLineEnding = require('../mostCommonLineEnding')

function appendAllButLast(str, regex, append) {
  var reg = new RegExp(regex, 'g')
  return str.replace(reg, function(match, offset, str) {
    var follow = str.slice(offset)
    var isLast = follow.match(reg).length === 1
    return (isLast) ? match : match + append
  })
}

function lineDiffFake(str1, str2, options) {

  var diff, isDiff, accumulatedDiff = ''

  if (!CRE.test(str1) || !CRE.test(str2)) {
    var mcle = mostCommonLineEnding(str1, str2)
    str1 += mcle
    str2 += mcle
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
        culla = null
        prefix = ' '
      }
      part.value = appendAllButLast(part.value, CRS, prefix)
      part.diff = prefix + part.value
      if (options.color && culla) part.diff = color.add(part.diff, culla)
      accumulatedDiff += part.diff
    })
    return accumulatedDiff
  }

  return undefined
}

module.exports = lineDiffFake
