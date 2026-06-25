'use strict'

var exec = require('shelljs.exec')
var execFileSync = require('child_process').execFileSync
var logger = require('loglevel')
var config = require('../../../config')

var SHA_REGEX = /^[0-9a-fA-F]{5,}$/

logger.setLevel('info')

// Returns the same as:
// git diff $(printf 'my first string' | git hash-object -w --stdin) $(printf 'my second string' | git hash-object -w --stdin) --word-diff
// git diff $(printf 'This is a test for my diff tool\nIt is a big test\n\nNo diff here\n\nBut there might be here\nBut not here\n\nOr here\n' | git hash-object -w --stdin) $(printf 'This is a test for my difference tool\nIt is a small test\n\nNo diff here\n\nBut there might be here!\nBut not here\n\nOr here\n' | git hash-object -w --stdin) --word-diff

function generateDiff(str1, str2, options, gitDir) {

  var DEFAULTS = require('../../_shared/defaultOptions')

  var gitDirArgs = (typeof gitDir === 'string') ? ['--git-dir', gitDir] : []
  if (typeof gitDir === 'string') {
    gitDir = '--git-dir ' + gitDir
  } else {
    gitDir = ''
  }

  // Hash each input string by feeding it to `git hash-object` over stdin WITHOUT a
  // shell. The previous implementation interpolated the strings into a `printf "..."`
  // shell command; JSON.stringify only escapes quotes/backslashes, so payloads such as
  // `$(cmd)` or `` `cmd` `` survived inside the double quotes and executed (command
  // injection). Passing the value via the child's stdin removes the shell entirely, so
  // the content can never be parsed as a command.
  function gitHashObject(input) {
    try {
      var stdout = execFileSync('git', gitDirArgs.concat(['hash-object', '-w', '--stdin']), {
        input: input,
        encoding: 'utf8'
      })
      return {code: 0, stdout: stdout}
    } catch (err) {
      return {code: err.status || 1, stdout: '', stderr: String(err.stderr || err.message)}
    }
  }

  var gitHashObj1 = gitHashObject(str1)
  var gitHashObj2 = gitHashObject(str2)

  /* istanbul ignore else */
  if (gitHashObj1.code === 0 && gitHashObj2.code === 0) {

    var sha1 = gitHashObj1.stdout.replace(CR, '')
    var sha2 = gitHashObj2.stdout.replace(CR, '')

    var sha1Test = SHA_REGEX.test(sha1)
    var sha2Test = SHA_REGEX.test(sha2)

    /* istanbul ignore else */
    if (sha1Test && sha2Test) {

      var diffObj, repeat

      do {

        var flags = []

        if (options.wordDiff) {
          flags.push('--word-diff')
        }

        if (options.color) {
          flags.push('--color=always')
        }

        if (options.flags) {
          // Split caller-supplied flags into individual argv tokens. They are passed to
          // execFileSync as separate arguments (NOT joined into a shell command), so shell
          // metacharacters in options.flags (e.g. "; rm -rf ~") can no longer execute.
          flags.push.apply(flags, String(options.flags).trim().split(/\s+/).filter(Boolean))
        }

        // Run `git diff` WITHOUT a shell — same hardening as the hash-object step above. The
        // old `exec('git diff ' + sha1 + ' ' + sha2 + flags)` interpolated options.flags into a
        // shell command string, which was a command-injection sink.
        diffObj = (function () {
          try {
            var stdout = execFileSync('git', gitDirArgs.concat(['diff', sha1, sha2]).concat(flags), {encoding: 'utf8'})
            return {code: 0, stdout: stdout, stderr: ''}
          } catch (err) {
            return {code: err.status || 1, stdout: String(err.stdout || ''), stderr: String(err.stderr || err.message)}
          }
        })()

        if (diffObj.code === 129 && diffObj.stderr.indexOf('usage') > -1) {
          logger.warn('Ignoring invalid git diff options: ' + options.flags)
          logger.info('For valid git diff options refer to ' + config.gitDiffOptionsUrl)
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
      if (diffObj.code === 0) {

        var diff = diffObj.stdout
        var atat = ATAT_REGEX.exec(diff)

        if (atat) {
          diff = diff.substring(atat.index)
          if (options.noHeaders) {
            diff = diff.replace(ATAT_REGEX, '')
            diff = diff.replace(CR, '')
          }
        }

        return (diff !== '') ? diff : undefined
      }
    }
  }

  /* istanbul ignore next */
  return undefined
}

module.exports = generateDiff
