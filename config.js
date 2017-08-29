var shell = require('shelljs')

var config = {
  keepItReal: shell.which('git') && shell.which('printf'),
  testing: process.env.NODE_ENV === 'test'
}

module.exports = config
