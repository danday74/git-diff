'use strict'

var gitDiffFake = require('./index')
var imp = require('../../test/_js/testImports')

var str1 = imp.readfilego(__dirname + '/../_shared/str1.txt', {throw: true, save: true})
var str2 = imp.readfilego(__dirname + '/../_shared/str2.txt')

describe('gitDiffFake', function() {

  var sandbox

  beforeEach(function() {
    sandbox = imp.sinon.sandbox.create()
    sandbox.spy(imp.color, 'add')
  })

  afterEach(function() {
    sandbox.restore()
  })

  describe('line difference', function() {

    var expected = imp.readfilego(__dirname + '/../_shared/lineDiffVim.txt').replace(/^@@.+@@\n/, '')

    it('color', function() {
      var actual = gitDiffFake(str1, str2, {color: true, wordDiff: false})
      imp.expect(actual).to.equal(expected)
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'reset')
    })

    it('no color', function() {
      var actual = gitDiffFake(str1, str2, {color: false, wordDiff: false})
      imp.expect(actual).to.equal(expected)
      imp.expect(imp.color.add).to.have.not.been.called
    })
  })

  describe('word difference', function() {

    var expected = imp.readfilego(__dirname + '/../_shared/wordDiffFake.txt').replace(/^@@.+@@\n/, '')

    it('color', function() {
      var actual = gitDiffFake(str1, str2, {color: true, wordDiff: true})
      imp.expect(actual).to.equal(expected)
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'reset')
    })

    it('no color', function() {
      var actual = gitDiffFake(str1, str2, {color: false, wordDiff: true})
      imp.expect(actual).to.equal(expected)
      imp.expect(imp.color.add).to.have.not.been.called
    })
  })

  it('no difference', function() {
    var actual = gitDiffFake('', '', {color: true})
    imp.expect(actual).to.be.undefined
    imp.expect(imp.color.add).to.have.not.been.called
  })
})
