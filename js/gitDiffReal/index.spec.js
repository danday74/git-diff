'use strict'

var DEFAULTS = require('../_shared/defaultOptions')
var imp = require('../../test/_js/testImports')
var gitDiffReal = require('./index')

var GREEN = '\u001b[32m'
var RED = '\u001b[31m'
var str1 = imp.readfilego(__dirname + '/../_shared/str1.txt', {throw: true, save: true})
var str2 = imp.readfilego(__dirname + '/../_shared/str2.txt')

describe('gitDiffReal', function() {

  it('line difference with color', function() {
    var actual = gitDiffReal(str1, str2, {color: true, wordDiff: false})
    imp.expect(actual).to.include(RED)
    imp.expect(actual).to.include(GREEN)
  })

  it('line difference without color', function() {
    var expected = imp.readfilego(__dirname + '/../_shared/lineDiffVim.txt')
    var actual = gitDiffReal(str1, str2, {color: false, wordDiff: false})
    imp.expect(actual).to.not.include(RED)
    imp.expect(actual).to.not.include(GREEN)
    imp.expect(actual).to.equal(expected)
  })

  it('word difference with color', function() {
    var actual = gitDiffReal(str1, str2, {color: true, wordDiff: true})
    imp.expect(actual).to.include(RED)
    imp.expect(actual).to.include(GREEN)
  })

  it('word difference without color', function() {
    var expected = imp.readfilego(__dirname + '/../_shared/wordDiffReal.txt')
    var actual = gitDiffReal(str1, str2, {color: false, wordDiff: true})
    imp.expect(actual).to.not.include(RED)
    imp.expect(actual).to.not.include(GREEN)
    imp.expect(actual).to.equal(expected)
  })

  it('no difference', function() {
    var actual = gitDiffReal('', '', {color: DEFAULTS.color})
    imp.expect(actual).to.be.undefined
  })
})
