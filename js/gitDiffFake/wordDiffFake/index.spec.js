'use strict'

var imp = require('../../../test/_js/testImports')
var wordDiffFake = require('./index')

var str1 = imp.data.str1
var str2 = imp.data.str2

describe('gitDiffFake - word difference', function() {

  var sandbox

  beforeEach(function() {
    sandbox = imp.sinon.sandbox.create()
    sandbox.spy(imp.color, 'add')
  })

  afterEach(function() {
    sandbox.restore()
  })

  var expected = imp.data.wordDiffFake

  it('color', function() {
    var actual = wordDiffFake(str1, str2, {color: true})
    imp.expect(actual).to.equal(expected)
    imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
    imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
    imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'reset')
  })

  it('no color', function() {
    var actual = wordDiffFake(str1, str2, {color: false})
    imp.expect(actual).to.equal(expected)
    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('one liner', function() {
    var expected = imp.data.oneLinerWordDiffFake
    var actual = wordDiffFake('my first string', 'my second string', {color: false})
    imp.expect(actual).to.equal(expected)
  })

  it('no difference', function() {
    var actual = wordDiffFake('', '', {color: true})
    imp.expect(actual).to.be.undefined
    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('line endings', function() {
    var actual, expected

    expected = imp.data.endingsLinuxWordDiff
    actual = wordDiffFake('my first\nstring', 'my second\nstring', {color: false})
    imp.expect(actual).to.equal(expected)

    expected = imp.data.endingsWindowsWordDiff
    actual = wordDiffFake('my first\r\nstring', 'my second\r\nstring', {color: false})
    imp.expect(actual).to.equal(expected)
  })
})
