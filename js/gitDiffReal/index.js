'use strict'

var logger = require('loglevel')
var shell = require('shelljs')
var keepIt = require('./keepIt')
var SHA_REGEX = /^[0-9a-fA-F]{5,}$/

logger.setLevel('info')

// Returns the same as:
// git diff $(printf 'my first string' | git hash-object -w --stdin) $(printf 'my second string' | git hash-object -w --stdin) --word-diff
// git diff $(printf 'This is a test for my diff tool\nIt is a big test\n\nNo diff here\n\nBut there might be here\nBut not here\n\nOr here\n' | git hash-object -w --stdin) $(printf 'This is a test for my difference tool\nIt is a small test\n\nNo diff here\n\nBut there might be here!\nBut not here\n\nOr here\n' | git hash-object -w --stdin) --word-diff

var gitDiffReal = function(str1, str2, options) {

  var DEFAULTS = require('../_shared/defaultOptions')

  if (keepIt.real()) {

    var stringify1 = JSON.stringify(str1).replace(/^"/, '').replace(/"$/, '')
    var stringify2 = JSON.stringify(str2).replace(/^"/, '').replace(/"$/, '')

    // Single quotes is needed here to avoid .. event not found
    var gitHashCmd1 = 'printf \'' + stringify1 + '\' | git hash-object -w --stdin'
    var gitHashCmd2 = 'printf \'' + stringify2 + '\' | git hash-object -w --stdin'

    var gitHashObj1 = shell.exec(gitHashCmd1, {silent: true})
    var gitHashObj2 = shell.exec(gitHashCmd2, {silent: true})

    /* istanbul ignore else */
    if (!gitHashObj1.code && !gitHashObj2.code) {

      var sha1 = gitHashObj1.stdout.replace(CR, '')
      var sha2 = gitHashObj2.stdout.replace(CR, '')

      var sha1Test = SHA_REGEX.test(sha1)
      var sha2Test = SHA_REGEX.test(sha2)

      /* istanbul ignore else */
      if (sha1Test && sha2Test) {

        var trueDiffObj, repeat

        do {

          var flags = ''

          if (options.wordDiff) {
            flags += ' --word-diff'
          }

          if (options.color) {
            flags += ' --color=always'
          }

          if (options.flags) {
            flags += ' ' + options.flags
          }

          var newCommand = 'git diff ' + sha1 + ' ' + sha2 + flags

          trueDiffObj = shell.exec(newCommand, {silent: true})

          if (trueDiffObj.code === 129 && trueDiffObj.stderr.indexOf('usage') > -1) {
            logger.warn('Ignoring invalid git diff options: ' + options.flags)
            logger.info('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
            if (options.flags === DEFAULTS.flags) {
              DEFAULTS.flags = null
            }
            options.flags = DEFAULTS.flags
            if (options.flags) {
              logger.info('Using default git diff options: ' + options.flags)
            }
            repeat = true
          } else {
            repeat = false
          }
        } while (repeat)

        /* istanbul ignore else */
        if (!trueDiffObj.code) {

          var trueDiff = trueDiffObj.stdout

          trueDiff = trueDiff.substring(trueDiff.indexOf('@@'))
          return (trueDiff !== '') ? trueDiff : undefined
        }
      }
    }
  }
  return undefined
}

module.exports = gitDiffReal
