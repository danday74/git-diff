'use strict'

var gitDiffReal = require('./index')
var imp = require('../../test/_js/testImports')

var GREEN = '\u001b[32m'
var RED = '\u001b[31m'
var str1 = imp.readfilego(__dirname + '/../_shared/str1.txt', {throw: true, save: true})
var str2 = imp.readfilego(__dirname + '/../_shared/str2.txt')

describe('gitDiffReal', function() {

  it('difference with color', function() {
    var actual = gitDiffReal(str1, str2, {color: true})
    imp.expect(actual).to.include(RED)
    imp.expect(actual).to.include(GREEN)
  })

  it('difference without color', function() {
    var expected = imp.readfilego(__dirname + '/../_shared/diffVim.txt')
    var actual = gitDiffReal(str1, str2, {color: false})
    imp.expect(actual).to.not.include(RED)
    imp.expect(actual).to.not.include(GREEN)
    imp.expect(actual).to.equal(expected)
  })

  it('no difference', function() {
    var actual = gitDiffReal('', '', {color: true})
    imp.expect(actual).to.be.undefined
  })
})
