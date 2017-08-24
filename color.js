'use strict'

var chalk = require('chalk')

function Color() {

  this.add = function(str, color) {
    str = chalk[color](str)
    return str
  }
}

module.exports = new Color()
