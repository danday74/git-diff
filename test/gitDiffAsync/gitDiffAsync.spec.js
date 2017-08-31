'use strict'

var imp = require('../_js/testImports')
var gitDiffAsync = require('../../index').async
var pkg = require('../../package.json')
var DEFAULTS = require('../../js/_shared/defaultOptions')

var GREEN = '\u001b[32m'
var RED = '\u001b[31m'
var str1 = imp.data.str1
var str2 = imp.data.str2

describe('gitDiffAsync', function() {

  var sandbox

  describe('real is available', function() {

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

      before(function() {
        if (!imp.keepIt.real()) this.skip()
      })

      it('color', function(done) {

        gitDiffAsync(str1, str2, 'not an object').then(function(actual) {
          imp.expect(actual).to.include(RED)
          imp.expect(actual).to.include(GREEN)
          done()
        })
      })

      it('no color', function(done) {

        var expected = imp.data.lineDiffRealVim
        gitDiffAsync(str1, str2, {color: false}).then(function(actual) {
          imp.expect(actual).to.equal(expected)
          imp.expect(actual).to.not.include(RED)
          imp.expect(actual).to.not.include(GREEN)
          done()
        })
      })

      it('one liner', function(done) {

        var expected = imp.data.oneLinerLineDiffReal
        gitDiffAsync('my first string', 'my second string', {color: false}).then(function(actual) {
          imp.expect(actual).to.equal(expected)
          done()
        })
      })

      it('no difference', function(done) {
        gitDiffAsync('', '').then(function(actual) {
          imp.expect(actual).to.be.undefined
          done()
        })
      })
    })

    describe('word difference', function() {

      before(function() {
        if (!imp.keepIt.real()) this.skip()
      })

      it('color', function(done) {
        gitDiffAsync(str1, str2, {wordDiff: true}).then(function(actual) {
          imp.expect(actual).to.include(RED)
          imp.expect(actual).to.include(GREEN)
          done()
        })
      })

      it('no color', function(done) {
        var expected = imp.data.wordDiffReal
        gitDiffAsync(str1, str2, {color: false, wordDiff: true}).then(function(actual) {
          imp.expect(actual).to.equal(expected)
          imp.expect(actual).to.not.include(RED)
          imp.expect(actual).to.not.include(GREEN)
          done()
        })
      })

      it('one liner', function(done) {
        var expected = imp.data.oneLinerWordDiffReal
        gitDiffAsync('my first string', 'my second string', {color: false, wordDiff: true}).then(function(actual) {
          imp.expect(actual).to.equal(expected)
          done()
        })
      })

      it('no difference', function(done) {
        gitDiffAsync('', '', {wordDiff: true}).then(function(actual) {
          imp.expect(actual).to.be.undefined
          done()
        })
      })
    })

    describe('flags', function() {

      before(function() {
        if (!imp.keepIt.real()) this.skip()
      })

      it('valid', function(done) {
        var expected = imp.data.shortstatReal
        gitDiffAsync(str1, str2, {color: false, flags: '--shortstat'}).then(function(actual) {
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.loglevel.warn).to.have.not.been.called
          imp.expect(imp.loglevel.info).to.have.not.been.called
          done()
        })
      })

      it('not a string', function(done) {
        var expected = imp.data.lineDiffRealVim
        gitDiffAsync(str1, str2, {color: false, flags: 9}).then(function(actual) {
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.loglevel.warn).to.have.not.been.called
          imp.expect(imp.loglevel.info).to.have.not.been.called
          done()
        })
      })

      it('invalid', function(done) {
        var expected = imp.data.lineDiffRealVim
        gitDiffAsync(str1, str2, {color: false, flags: '--oops'}).then(function(actual) {
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
          done()
        })
      })

      it('invalid with valid default', function(done) {
        DEFAULTS.flags = '--shortstat'
        var expected = imp.data.shortstatReal
        gitDiffAsync(str1, str2, {color: false, flags: '--oops'}).then(function(actual) {
          imp.expect(actual).to.equal(expected)
          imp.expect(DEFAULTS.flags).to.equal('--shortstat')
          imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('Using default git diff options: --shortstat')
          done()
        })
      })

      it('invalid with invalid default', function(done) {
        DEFAULTS.flags = '--oops'
        var expected = imp.data.lineDiffRealVim
        gitDiffAsync(str1, str2, {color: false, flags: '--oops'}).then(function(actual) {
          imp.expect(actual).to.equal(expected)
          imp.expect(DEFAULTS.flags).to.equal(null)
          imp.expect(imp.loglevel.warn).to.have.been.calledWith('Ignoring invalid git diff options: --oops')
          imp.expect(imp.loglevel.info).to.have.been.calledWith('For valid git diff options refer to https://git-scm.com/docs/git-diff#_options')
          imp.expect(imp.loglevel.info).to.not.have.been.calledWithMatch(/Using default git diff options/)
          done()
        })
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
      sandbox = imp.sinon.sandbox.create()
      sandbox.spy(imp.color, 'add')
    })

    afterEach(function() {
      sandbox.restore()
    })

    imp.using(testObjs, function() {

      function stub() {
        sandbox.stub(imp.keepIt, 'real').returns(false)
      }

      describe('line difference', function() {

        var expected = imp.data.lineDiffFakeVim

        it('{testPrefix} color', function(testObj, done) {

          if (testObj.stub) stub()
          gitDiffAsync(str1, str2, testObj.options).then(function(actual) {
            imp.expect(actual).to.equal(expected)
            imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
            imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
            imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'reset')
            done()
          })
        })

        it('{testPrefix} no color', function(testObj, done) {
          if (testObj.stub) stub()
          gitDiffAsync(str1, str2, Object.assign({color: false}, testObj.options)).then(function(actual) {
            imp.expect(actual).to.equal(expected)
            imp.expect(imp.color.add).to.have.not.been.called
            done()
          })
        })

        it('{testPrefix} one liner', function(testObj, done) {
          if (testObj.stub) stub()
          var expected = imp.data.oneLinerLineDiffFake
          gitDiffAsync('my first string', 'my second string', Object.assign({color: false}, testObj.options)).then(function(actual) {
            imp.expect(actual).to.equal(expected)
            done()
          })
        })

        it('{testPrefix} no difference', function(testObj, done) {
          if (testObj.stub) stub()
          gitDiffAsync('', '', testObj.options).then(function(actual) {
            imp.expect(actual).to.be.undefined
            imp.expect(imp.color.add).to.have.not.been.called
            done()
          })
        })
      })

      describe('word difference', function() {

        var expected = imp.data.wordDiffFake

        it('{testPrefix} color', function(testObj, done) {
          if (testObj.stub) stub()
          gitDiffAsync(str1, str2, Object.assign({wordDiff: true}, testObj.options)).then(function(actual) {
            imp.expect(actual).to.equal(expected)
            imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
            imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
            imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'reset')
            done()
          })
        })

        it('{testPrefix} no color', function(testObj, done) {
          if (testObj.stub) stub()
          gitDiffAsync(str1, str2, Object.assign({
            color: false,
            wordDiff: true
          }, testObj.options)).then(function(actual) {
            imp.expect(actual).to.equal(expected)
            imp.expect(imp.color.add).to.have.not.been.called
            done()
          })
        })

        it('{testPrefix} one liner', function(testObj, done) {
          if (testObj.stub) stub()
          var expected = imp.data.oneLinerWordDiffFake
          gitDiffAsync('my first string', 'my second string', Object.assign({
            color: false,
            wordDiff: true
          }, testObj.options)).then(function(actual) {
            imp.expect(actual).to.equal(expected)
            done()
          })
        })

        it('{testPrefix} no difference', function(testObj, done) {
          if (testObj.stub) stub()
          gitDiffAsync('', '', Object.assign({wordDiff: true}, testObj.options)).then(function(actual) {
            imp.expect(actual).to.be.undefined
            imp.expect(imp.color.add).to.have.not.been.called
            done()
          })
        })
      })
    })
  })

  describe('validate', function() {

    it('str1 not a string', function(done) {

      gitDiffAsync(9, '').catch(function(err) {
        imp.expect(err).to.be.an.instanceof(TypeError)
        imp.expect(err.message).to.equal('Both inputs to ' + pkg.name + ' must be strings')
        done()
      })
    })

    it('str2 not a string', function(done) {

      gitDiffAsync('', {}).catch(function(err) {
        imp.expect(err).to.be.an.instanceof(TypeError)
        imp.expect(err.message).to.equal('Both inputs to ' + pkg.name + ' must be strings')
        done()
      })
    })
  })

  describe('save', function() {

    it('save', function(done) {

      var lineDiffFake = imp.data.lineDiffFakeVim
      var wordDiffFake = imp.data.wordDiffFake

      gitDiffAsync(str1, str2, {forceFake: true}).then(function(actual) {
        imp.expect(actual).to.equal(lineDiffFake)
        return gitDiffAsync(str1, str2, {forceFake: true, save: true, wordDiff: true})
      }).then(function(actual) {
        imp.expect(actual).to.equal(wordDiffFake)
        return gitDiffAsync(str1, str2)
      }).then(function(actual) {
        imp.expect(actual).to.equal(wordDiffFake)
        done()
      })
    })
  })
})
