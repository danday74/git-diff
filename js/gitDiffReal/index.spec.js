'use strict'

var config = require('../../config')
var gitDiffReal = require('./index')
var imp = require('../../test/_js/testImports')

var GREEN = '\u001b[32m'
var RED = '\u001b[31m'

var str1 = imp.data.str1
var str2 = imp.data.str2

describe('gitDiffReal', function() {

  var DEFAULTS, sandbox

  var testObjs = [{
    testPrefix: 'real -',
    stub: false
  }, {
    testPrefix: 'realNoRepo -',
    stub: true
  }]

  imp.using(testObjs, function() {

    function stub() {
      sandbox.stub(imp.keepIt, 'real').returns(false)
    }

    describe('real is available', function() {

      before(function() {
        imp.loglevel.setLevel('silent')
      })

      beforeEach(function() {
        delete require.cache[require.resolve('../_shared/defaultOptions')]
        DEFAULTS = require('../_shared/defaultOptions')
        sandbox = imp.sinon.sandbox.create()
        sandbox.spy(imp.loglevel, 'info')
        sandbox.spy(imp.loglevel, 'warn')
      })

      afterEach(function() {
        sandbox.restore()
      })

      describe('line difference', function() {

        before(function(testObj) {
          if (!testObj.stub) {
            if (!imp.keepIt.real()) this.skip()
          } else {
            if (!imp.keepIt.realNoRepo()) this.skip()
          }
        })

        it('{testPrefix} color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal(str1, str2, {color: true, wordDiff: false})
          imp.expect(actual).to.include(GREEN)
          imp.expect(actual).to.include(RED)
        })

        it('{testPrefix} no color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal(str1, str2, {color: false, wordDiff: false})
          imp.expect(actual).to.equal(imp.data.lineDiffReal)
          imp.expect(actual).to.not.include(GREEN)
          imp.expect(actual).to.not.include(RED)
        })

        it('{testPrefix} one liner', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal('my first string', 'my second string', {color: false, wordDiff: false})
          imp.expect(actual).to.equal(imp.data.oneLinerLineDiffReal)
        })

        it('{testPrefix} no difference', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal('', '', {color: true, wordDiff: false})
          imp.expect(actual).to.be.undefined
        })
      })

      describe('word difference', function() {

        before(function(testObj) {
          if (!testObj.stub) {
            if (!imp.keepIt.real()) this.skip()
          } else {
            if (!imp.keepIt.realNoRepo()) this.skip()
          }
        })

        it('{testPrefix} color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal(str1, str2, {color: true, wordDiff: true})
          imp.expect(actual).to.include(GREEN)
          imp.expect(actual).to.include(RED)
        })

        it('{testPrefix} no color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal(str1, str2, {color: false, wordDiff: true})
          imp.expect(actual).to.equal(imp.data.wordDiffReal)
          imp.expect(actual).to.not.include(GREEN)
          imp.expect(actual).to.not.include(RED)
        })

        it('{testPrefix} one liner', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal('my first string', 'my second string', {color: false, wordDiff: true})
          imp.expect(actual).to.equal(imp.data.oneLinerWordDiffReal)
        })

        it('{testPrefix} no difference', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal('', '', {color: true, wordDiff: true})
          imp.expect(actual).to.be.undefined
        })
      })

      describe('flags', function() {

        before(function(testObj) {
          if (!testObj.stub) {
            if (!imp.keepIt.real()) this.skip()
          } else {
            if (!imp.keepIt.realNoRepo()) this.skip()
          }
        })

        it('{testPrefix} valid', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal(str1, str2, {color: false, flags: '--shortstat'})
          imp.expect(actual).to.equal(imp.data.shortstatReal)
          imp.expect(imp.loglevel.warn).to.have.not.been.called
          imp.expect(imp.loglevel.info).to.have.not.been.called
        })

        it('{testPrefix} invalid', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal(str1, str2, {color: false, flags: '--oops'})
          imp.expect(actual).to.equal(imp.data.lineDiffReal)
          imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to ' + config.gitDiffOptionsUrl)
          imp.expect(imp.loglevel.info).to.have.not.been.calledWithMatch(/Using default git diff options/)
        })

        it('{testPrefix} invalid with valid default', function(testObj) {
          if (testObj.stub) stub()
          DEFAULTS.flags = '--shortstat'
          var actual = gitDiffReal(str1, str2, {color: false, flags: '--oops'})
          imp.expect(actual).to.equal(imp.data.shortstatReal)
          imp.expect(DEFAULTS.flags).to.equal('--shortstat')
          imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to ' + config.gitDiffOptionsUrl)
          imp.expect(imp.loglevel.info).to.have.been.calledWith('Using default git diff options: --shortstat')
        })

        it('{testPrefix} invalid with invalid default', function(testObj) {
          if (testObj.stub) stub()
          DEFAULTS.flags = '--oops'
          var actual = gitDiffReal(str1, str2, {color: false, flags: '--oops'})
          imp.expect(actual).to.equal(imp.data.lineDiffReal)
          imp.expect(DEFAULTS.flags).to.equal(null)
          imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to ' + config.gitDiffOptionsUrl)
          imp.expect(imp.loglevel.info).to.have.not.been.calledWithMatch(/Using default git diff options/)
        })
      })

      describe('no headers', function() {

        before(function(testObj) {
          if (!testObj.stub) {
            if (!imp.keepIt.real()) this.skip()
          } else {
            if (!imp.keepIt.realNoRepo()) this.skip()
          }
        })

        it('{testPrefix} headers', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal(str1, str2, {color: false, noHeaders: false})
          imp.expect(actual).to.startWith('@@')
        })

        it('{testPrefix} no headers', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffReal(str1, str2, {color: false, noHeaders: true})
          imp.expect(actual).to.not.startWith('@@')
        })
      })
    })
  })

  describe('real is unavailable', function() {

    beforeEach(function() {
      sandbox = imp.sinon.sandbox.create()
      sandbox.stub(imp.keepIt, 'real').returns(false)
      sandbox.stub(imp.keepIt, 'realNoRepo').returns(false)
    })

    afterEach(function() {
      sandbox.restore()
    })

    it('line difference', function() {
      var actual = gitDiffReal(str1, str2, {color: false, wordDiff: false})
      imp.expect(actual).to.be.undefined
    })

    it('word difference', function() {
      var actual = gitDiffReal(str1, str2, {color: false, wordDiff: true})
      imp.expect(actual).to.be.undefined
    })
  })
})
