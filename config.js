'use strict'

var config = {
  testing: process.env.NODE_ENV === 'test',
  gitDiffOptionsUrl: 'https://git-scm.com/docs/git-diff#_options'
}

module.exports = config
