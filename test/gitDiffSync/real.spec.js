'use strict'

var gitDiffSync = require('../../sync')
var imp = require('../_js/testImports')

var GREEN = '\u001b[32m'
var RED = '\u001b[31m'

var str1 = imp.data.str1
var str2 = imp.data.str2

describe('gitDiffSync real', function() {

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

        before(function(testObj) {
          if (!testObj.stub) {
            if (!imp.keepIt.real()) this.skip()
          } else {
            if (!imp.keepIt.realNoRepo()) this.skip()
          }
        })

        it('{testPrefix} color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, 'not an object')
          imp.expect(actual).to.include(RED)
          imp.expect(actual).to.include(GREEN)
        })

        it('{testPrefix} no color', function(testObj) {
          if (testObj.stub) stub()
          var expected = imp.data.lineDiffReal
          var actual = gitDiffSync(str1, str2, {color: false})
          imp.expect(actual).to.equal(expected)
          imp.expect(actual).to.not.include(RED)
          imp.expect(actual).to.not.include(GREEN)
        })

        it('{testPrefix} one liner', function(testObj) {
          if (testObj.stub) stub()
          var expected = imp.data.oneLinerLineDiffReal
          var actual = gitDiffSync('my first string', 'my second string', {color: false})
          imp.expect(actual).to.equal(expected)
        })

        it('{testPrefix} no difference', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync('', '')
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
          var actual = gitDiffSync(str1, str2, {wordDiff: true})
          imp.expect(actual).to.include(RED)
          imp.expect(actual).to.include(GREEN)
        })

        it('{testPrefix} no color', function(testObj) {
          if (testObj.stub) stub()
          var expected = imp.data.wordDiffReal
          var actual = gitDiffSync(str1, str2, {color: false, wordDiff: true})
          imp.expect(actual).to.equal(expected)
          imp.expect(actual).to.not.include(RED)
          imp.expect(actual).to.not.include(GREEN)
        })

        it('{testPrefix} one liner', function(testObj) {
          if (testObj.stub) stub()
          var expected = imp.data.oneLinerWordDiffReal
          var actual = gitDiffSync('my first string', 'my second string', {color: false, wordDiff: true})
          imp.expect(actual).to.equal(expected)
        })

        it('{testPrefix} no difference', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync('', '', {wordDiff: true})
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
          var expected = imp.data.shortstatReal
          var actual = gitDiffSync(str1, str2, {color: false, flags: '--shortstat'})
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.loglevel.warn).to.have.not.been.called
          imp.expect(imp.loglevel.info).to.have.not.been.called
        })

        it('{testPrefix} not a string', function(testObj) {
          if (testObj.stub) stub()
          var expected = imp.data.lineDiffReal
          var actual = gitDiffSync(str1, str2, {color: false, flags: 9})
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.loglevel.warn).to.have.not.been.called
          imp.expect(imp.loglevel.info).to.have.not.been.called
        })

        it('{testPrefix} invalid', function(testObj) {
          if (testObj.stub) stub()
          var expected = imp.data.lineDiffReal
          var actual = gitDiffSync(str1, str2, {color: false, flags: '--oops'})
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
        })

        it('{testPrefix} invalid with valid default', function(testObj) {
          if (testObj.stub) stub()
          DEFAULTS.flags = '--shortstat'
          var expected = imp.data.shortstatReal
          var actual = gitDiffSync(str1, str2, {color: false, flags: '--oops'})
          imp.expect(actual).to.equal(expected)
          imp.expect(DEFAULTS.flags).to.equal('--shortstat')
          imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('Using default git diff options: --shortstat')
        })

        it('{testPrefix} invalid with invalid default', function(testObj) {
          if (testObj.stub) stub()
          DEFAULTS.flags = '--oops'
          var expected = imp.data.lineDiffReal
          var actual = gitDiffSync(str1, str2, {color: false, flags: '--oops'})
          imp.expect(actual).to.equal(expected)
          imp.expect(DEFAULTS.flags).to.equal(null)
          imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
          imp.expect(imp.loglevel.info).to.not.have.been.calledWithMatch(/Using default git diff options/)
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
          var actual = gitDiffSync(str1, str2, {color: false, noHeaders: false})
          imp.expect(actual).to.startWith('@@')
        })

        it('{testPrefix} no headers', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, {color: false, noHeaders: true})
          imp.expect(actual).to.not.startWith('@@')
        })
      })
    })
  })
})
