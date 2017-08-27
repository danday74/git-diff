'use strict'

var pkg = require('../../package.json')

function validate(str1, str2) {

  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw TypeError('Both inputs to ' + pkg.name + ' must be strings')
  }

}

module.exports = validate
