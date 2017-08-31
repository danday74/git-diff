'use strict'

var imp = require('../_js/testImports')
var gitDiffSync = require('../../index').sync

var GREEN = '\u001b[32m'
var RED = '\u001b[31m'
var str1 = imp.data.str1
var str2 = imp.data.str2

describe('gitDiffSync', function() {

  var sandbox

  // var sandbox
  //
  // beforeEach(function() {
  //   sandbox = imp.sinon.sandbox.create()
  //   sandbox.spy(imp.color, 'add')
  // })
  //
  // afterEach(function() {
  //   sandbox.restore()
  // })

  describe('real is available', function() {

    describe('line difference', function() {

      before(function() {
        if (!imp.keepIt.real()) this.skip()
      })

      it('color', function() {

        var actual = gitDiffSync(str1, str2)
        imp.expect(actual).to.include(RED)
        imp.expect(actual).to.include(GREEN)
      })

      it('no color', function() {

        var expected = imp.data.lineDiffVim
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

        var expected = imp.data.lineDiffVim.replace(/^@@.+@@\n/, '')

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
      })

      describe('word difference', function() {

        var expected = imp.data.wordDiffFake.replace(/^@@.+@@\n/, '')

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
      })
    })
  })
})
