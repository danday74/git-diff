'use strict'

var jsDiff = require('diff')
var color = require('./color')

function replaceAllButLast(str, pOld, pNew) {
  var parts = str.split(pOld)
  if (parts.length === 1) return str
  return parts.slice(0, -1).join(pNew) + pOld + parts.slice(-1)
}

function gitDiffFake(str1, str2, options) {

  var diff, isDiff, accumulatedDiff = ''

  if (options.wordDiff) {

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

  } else {

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
  }
  return undefined
}

module.exports = gitDiffFake
