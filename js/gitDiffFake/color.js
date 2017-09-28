'use strict'

var chalk = require('chalk')
var config = require('../../config')

function Color() {
  this.add = function(str, color) {
    /* istanbul ignore next */
    if (!config.testing) str = chalk[color](str)
    return str
  }
}

module.exports = new Color()
