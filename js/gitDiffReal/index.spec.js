'use strict'

var DEFAULTS = require('../_shared/defaultOptions')
var imp = require('../../test/_js/testImports')
var gitDiffReal = require('./index')

var GREEN = '\u001b[32m'
var RED = '\u001b[31m'
var str1 = imp.readfilego(__dirname + '/../_shared/str1.txt', {throw: true, save: true})
var str2 = imp.readfilego(__dirname + '/../_shared/str2.txt')

describe('gitDiffReal', function() {

  var sandbox

  before(function() {
    imp.loglevel.setLevel('silent')
  })

  beforeEach(function() {
    sandbox = imp.sinon.sandbox.create()
    sandbox.spy(imp.loglevel, 'info')
    sandbox.spy(imp.loglevel, 'warn')
  })

  afterEach(function() {
    sandbox.restore()
  })

  describe('line difference', function() {

    it('color', function() {
      var actual = gitDiffReal(str1, str2, {color: true, wordDiff: false})
      if (imp.cfg.keepItReal) {
        imp.expect(actual).to.include(RED)
        imp.expect(actual).to.include(GREEN)
      } else {
        imp.expect(actual).to.be.undefined
      }
    })

    it('no color', function() {
      var actual = gitDiffReal(str1, str2, {color: false, wordDiff: false})
      if (imp.cfg.keepItReal) {
        var expected = imp.readfilego(__dirname + '/../_shared/lineDiffVim.txt')
        imp.expect(actual).to.not.include(RED)
        imp.expect(actual).to.not.include(GREEN)
        imp.expect(actual).to.equal(expected)
      } else {
        imp.expect(actual).to.be.undefined
      }
    })
  })

  describe('word difference', function() {

    it('color', function() {
      var actual = gitDiffReal(str1, str2, {color: true, wordDiff: true})
      if (imp.cfg.keepItReal) {
        imp.expect(actual).to.include(RED)
        imp.expect(actual).to.include(GREEN)
      } else {
        imp.expect(actual).to.be.undefined
      }
    })

    it('no color', function() {
      var actual = gitDiffReal(str1, str2, {color: false, wordDiff: true})
      if (imp.cfg.keepItReal) {
        var expected = imp.readfilego(__dirname + '/../_shared/wordDiffReal.txt')
        imp.expect(actual).to.not.include(RED)
        imp.expect(actual).to.not.include(GREEN)
        imp.expect(actual).to.equal(expected)
      } else {
        imp.expect(actual).to.be.undefined
      }
    })
  })

  describe('flags', function() {

    it('valid', function() {
      var actual = gitDiffReal(str1, str2, {flags: '--shortstat'})
      if (imp.cfg.keepItReal) {
        imp.expect(imp.loglevel.warn).to.have.not.been.called
        imp.expect(imp.loglevel.info).to.have.not.been.called
        var expected = imp.readfilego(__dirname + '/../_shared/shortStatReal.txt')
        imp.expect(actual).to.equal(expected)
      } else {
        imp.expect(actual).to.be.undefined
      }
    })

    it('invalid', function() {
      var actual = gitDiffReal(str1, str2, {flags: '--oops'})
      if (imp.cfg.keepItReal) {
        imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
        imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
        var expected = imp.readfilego(__dirname + '/../_shared/lineDiffVim.txt')
        imp.expect(actual).to.equal(expected)
      } else {
        imp.expect(actual).to.be.undefined
      }
    })
  })

  it('no difference', function() {
    var actual = gitDiffReal('', '', {})
    imp.expect(actual).to.be.undefined
  })
})
