'use strict'

var imp = require('../_js/testImports')
var gitDiffSync = require('../../index').sync
var pkg = require('../../package.json')

var GREEN = '\u001b[32m'
var RED = '\u001b[31m'
var str1 = imp.data.str1
var str2 = imp.data.str2

describe('gitDiffSync', function() {

  var DEFAULTS, sandbox

  describe('real is available', function() {

    before(function() {
      imp.loglevel.setLevel('silent')
    })

    beforeEach(function() {
      delete require.cache[require.resolve('../../js/_shared/defaultOptions')]
      DEFAULTS = require('../../js/_shared/defaultOptions')
      sandbox = imp.sinon.sandbox.create()
      sandbox.spy(imp.loglevel, 'info')
      sandbox.spy(imp.loglevel, 'warn')
    })

    afterEach(function() {
      sandbox.restore()
    })

    describe('line difference', function() {

      before(function() {
        if (!imp.keepIt.real()) this.skip()
      })

      it('color', function() {

        var actual = gitDiffSync(str1, str2, 'not an object')
        imp.expect(actual).to.include(RED)
        imp.expect(actual).to.include(GREEN)
      })

      it('no color', function() {

        var expected = imp.data.lineDiffRealVim
        var actual = gitDiffSync(str1, str2, {color: false})
        imp.expect(actual).to.equal(expected)
        imp.expect(actual).to.not.include(RED)
        imp.expect(actual).to.not.include(GREEN)
      })

      it('one liner', function() {
        var expected = imp.data.oneLinerLineDiffReal
        var actual = gitDiffSync('my first string', 'my second string', {color: false})
        imp.expect(actual).to.equal(expected)
      })

      it('no difference', function() {
        var actual = gitDiffSync('', '')
        imp.expect(actual).to.be.undefined
      })
    })

    describe('word difference', function() {

      before(function() {
        if (!imp.keepIt.real()) this.skip()
      })

      it('color', function() {
        var actual = gitDiffSync(str1, str2, {wordDiff: true})
        imp.expect(actual).to.include(RED)
        imp.expect(actual).to.include(GREEN)
      })

      it('no color', function() {
        var expected = imp.data.wordDiffReal
        var actual = gitDiffSync(str1, str2, {color: false, wordDiff: true})
        imp.expect(actual).to.equal(expected)
        imp.expect(actual).to.not.include(RED)
        imp.expect(actual).to.not.include(GREEN)
      })

      it('one liner', function() {
        var expected = imp.data.oneLinerWordDiffReal
        var actual = gitDiffSync('my first string', 'my second string', {color: false, wordDiff: true})
        imp.expect(actual).to.equal(expected)
      })

      it('no difference', function() {
        var actual = gitDiffSync('', '', {wordDiff: true})
        imp.expect(actual).to.be.undefined
      })
    })

    describe('flags', function() {

      before(function() {
        if (!imp.keepIt.real()) this.skip()
      })

      it('valid', function() {
        var expected = imp.data.shortstatReal
        var actual = gitDiffSync(str1, str2, {color: false, flags: '--shortstat'})
        imp.expect(actual).to.equal(expected)
        imp.expect(imp.loglevel.warn).to.have.not.been.called
        imp.expect(imp.loglevel.info).to.have.not.been.called
      })

      it('not a string', function() {
        var expected = imp.data.lineDiffRealVim
        var actual = gitDiffSync(str1, str2, {color: false, flags: 9})
        imp.expect(actual).to.equal(expected)
        imp.expect(imp.loglevel.warn).to.have.not.been.called
        imp.expect(imp.loglevel.info).to.have.not.been.called
      })

      it('invalid', function() {
        var expected = imp.data.lineDiffRealVim
        var actual = gitDiffSync(str1, str2, {color: false, flags: '--oops'})
        imp.expect(actual).to.equal(expected)
        imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
        imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
      })

      it('invalid with valid default', function() {
        DEFAULTS.flags = '--shortstat'
        var expected = imp.data.shortstatReal
        var actual = gitDiffSync(str1, str2, {color: false, flags: '--oops'})
        imp.expect(actual).to.equal(expected)
        imp.expect(DEFAULTS.flags).to.equal('--shortstat')
        imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
        imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
        imp.expect(imp.loglevel.info).to.have.been.calledWith('Using default git diff options: --shortstat')
      })

      it('invalid with invalid default', function() {
        DEFAULTS.flags = '--oops'
        var expected = imp.data.lineDiffRealVim
        var actual = gitDiffSync(str1, str2, {color: false, flags: '--oops'})
        imp.expect(actual).to.equal(expected)
        imp.expect(DEFAULTS.flags).to.equal(null)
        imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
        imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
        imp.expect(imp.loglevel.info).to.not.have.been.calledWithMatch(/Using default git diff options/)
      })
    })
  })

  var testObjs = [{
    testPrefix: 'unavailable -',
    stub: true,
    options: {}
  }, {
    testPrefix: 'force fake -',
    stub: false,
    options: {forceFake: true}
  }]

  describe('real is unavailable', function() {

    beforeEach(function() {
      delete require.cache[require.resolve('../../js/_shared/defaultOptions')]
      DEFAULTS = require('../../js/_shared/defaultOptions')
      sandbox = imp.sinon.sandbox.create()
      sandbox.spy(imp.color, 'add')
    })

    afterEach(function() {
      sandbox.restore()
    })

    imp.using(testObjs, function() {

      function stub() {
        sandbox.stub(imp.keepIt, 'real').returns(false)
        sandbox.stub(imp.keepIt, 'realNoRepo').returns(false)
      }

      describe('line difference', function() {

        var expected = imp.data.lineDiffFakeVim

        it('{testPrefix} color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, testObj.options)
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'reset')
        })

        it('{testPrefix} no color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, Object.assign({color: false}, testObj.options))
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.color.add).to.have.not.been.called
        })

        it('{testPrefix} one liner', function(testObj) {
          if (testObj.stub) stub()
          var expected = imp.data.oneLinerLineDiffFake
          var actual = gitDiffSync('my first string', 'my second string', Object.assign({color: false}, testObj.options))
          imp.expect(actual).to.equal(expected)
        })

        it('{testPrefix} no difference', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync('', '', testObj.options)
          imp.expect(actual).to.be.undefined
          imp.expect(imp.color.add).to.have.not.been.called
        })

        it('{testPrefix} line endings', function(testObj) {
          if (testObj.stub) stub()
          var expected, actual

          expected = imp.data.endingsLinuxLineDiff
          actual = gitDiffSync('my first\nstring', 'my second\nstring', Object.assign({
            color: false,
            wordDiff: false
          }, testObj.options))
          imp.expect(actual).to.equal(expected)

          expected = imp.data.endingsWindowsLineDiff
          actual = gitDiffSync('my first\r\nstring', 'my second\r\nstring', Object.assign({
            color: false,
            wordDiff: false
          }, testObj.options))
          imp.expect(actual).to.equal(expected)
        })
      })

      describe('word difference', function() {

        var expected = imp.data.wordDiffFake

        it('{testPrefix} color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, Object.assign({wordDiff: true}, testObj.options))
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'reset')
        })

        it('{testPrefix} no color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, Object.assign({color: false, wordDiff: true}, testObj.options))
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.color.add).to.have.not.been.called
        })

        it('{testPrefix} one liner', function(testObj) {
          if (testObj.stub) stub()
          var expected = imp.data.oneLinerWordDiffFake
          var actual = gitDiffSync('my first string', 'my second string', Object.assign({
            color: false,
            wordDiff: true
          }, testObj.options))
          imp.expect(actual).to.equal(expected)
        })

        it('{testPrefix} no difference', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync('', '', Object.assign({wordDiff: true}, testObj.options))
          imp.expect(actual).to.be.undefined
          imp.expect(imp.color.add).to.have.not.been.called
        })

        it('{testPrefix} line endings', function(testObj) {
          if (testObj.stub) stub()
          var expected, actual

          expected = imp.data.endingsLinuxWordDiff
          actual = gitDiffSync('my first\nstring', 'my second\nstring', Object.assign({
            color: false,
            wordDiff: true
          }, testObj.options))
          imp.expect(actual).to.equal(expected)

          expected = imp.data.endingsWindowsWordDiff
          actual = gitDiffSync('my first\r\nstring', 'my second\r\nstring', Object.assign({
            color: false,
            wordDiff: true
          }, testObj.options))
          imp.expect(actual).to.equal(expected)
        })
      })
    })
  })

  describe('validate', function() {

    it('str1 not a string', function() {
      imp.expect(function() {
        gitDiffSync(9, '')
      }).to.throw(TypeError, 'Both inputs to ' + pkg.name + ' must be strings')
    })

    it('str2 not a string', function() {
      imp.expect(function() {
        gitDiffSync('', {})
      }).to.throw(TypeError, 'Both inputs to ' + pkg.name + ' must be strings')
    })
  })

  describe('save', function() {

    it('save', function() {

      var actual

      var lineDiffFake = imp.data.lineDiffFakeVim
      var wordDiffFake = imp.data.wordDiffFake

      actual = gitDiffSync(str1, str2, {forceFake: true})
      imp.expect(actual).to.equal(lineDiffFake)

      imp.expect(DEFAULTS.forceFake).to.be.false
      imp.expect(DEFAULTS.save).to.be.false
      imp.expect(DEFAULTS.wordDiff).to.be.false

      actual = gitDiffSync(str1, str2, {forceFake: true, save: true, wordDiff: true})
      imp.expect(actual).to.equal(wordDiffFake)
      imp.expect(DEFAULTS.forceFake).to.be.true
      imp.expect(DEFAULTS.save).to.be.false
      imp.expect(DEFAULTS.wordDiff).to.be.true

      actual = gitDiffSync(str1, str2)
      imp.expect(actual).to.equal(wordDiffFake)
      imp.expect(DEFAULTS.forceFake).to.be.true
      imp.expect(DEFAULTS.save).to.be.false
      imp.expect(DEFAULTS.wordDiff).to.be.true
    })
  })
})
