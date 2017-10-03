'use strict'

var gitDiffSync = require('../../sync')
var imp = require('../_js/testImports')

var str1 = imp.data.str1
var str2 = imp.data.str2

describe('gitDiffSync fake', function() {

  var sandbox

  var testObjs = [{
    testPrefix: 'unavailable -',
    stub: true,
    options: {}
  }, {
    testPrefix: 'force fake -',
    stub: false,
    options: {forceFake: true}
  }]

  imp.using(testObjs, function() {

    function stub() {
      sandbox.stub(imp.keepIt, 'real').returns(false)
      sandbox.stub(imp.keepIt, 'realNoRepo').returns(false)
    }

    describe('real is unavailable', function() {

      beforeEach(function() {
        delete require.cache[require.resolve('../../js/_shared/defaultOptions')]
        require('../../js/_shared/defaultOptions')
        sandbox = imp.sinon.sandbox.create()
        sandbox.spy(imp.color, 'add')
      })

      afterEach(function() {
        sandbox.restore()
      })

      describe('line difference', function() {

        var expected = imp.data.lineDiffFake

        it('{testPrefix} color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, testObj.options)
          imp.expect(actual).to.equal(expected)
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
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
})
