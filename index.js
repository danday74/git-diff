'use strict'

function toBoolean(bool) {
  if (bool === 'false') bool = false
  return !!bool
}

var gitDiff = function(str1, str2, color) {
  color = toBoolean(color)
  return '' + str1 + str2 + color
}

module.exports = gitDiff
