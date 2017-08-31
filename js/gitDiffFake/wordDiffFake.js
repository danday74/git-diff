'use strict'

var jsDiff = require('diff')
var color = require('./color')

function wordDiffFake(str1, str2, options) {

  var diff, isDiff, accumulatedDiff = ''

  if (!CRE.test(str1) || !CRE.test(str2)) {
    str1 += '\n'
    str2 += '\n'
  }

  diff = jsDiff.diffWordsWithSpace(str1, str2)

  isDiff = diff.some(function(item) {
    return item.added || item.removed
  })

  if (isDiff) {
    diff.forEach(function(part) {
      var culla
      if (part.added) {
        culla = 'green'
        part.value = '{+' + part.value + '+}'
      } else if (part.removed) {
        culla = 'red'
        part.value = '[-' + part.value + '-]'
      } else {
        culla = 'reset'
      }
      if (options.color) part.value = color.add(part.value, culla)
      accumulatedDiff += part.value
    })
    return accumulatedDiff
  }

  return undefined
}

module.exports = wordDiffFake
