'use strict'

var pkg = require('../../package.json')

function validate(str1, str2) {
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw TypeError(pkg.name + ' requires two strings')
  }
}

module.exports = validate
