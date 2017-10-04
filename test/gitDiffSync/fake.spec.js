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
        sandbox = imp.sinon.sandbox.create()
        sandbox.spy(imp.color, 'add')
      })

      afterEach(function() {
        sandbox.restore()
      })

      describe('line difference', function() {

        it('{testPrefix} color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, Object.assign({color: true}, testObj.options))
          imp.expect(actual).to.equal(imp.data.lineDiffFake)
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
        })

        it('{testPrefix} no color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, testObj.options)
          imp.expect(actual).to.equal(imp.data.lineDiffFake)
          imp.expect(imp.color.add).to.have.not.been.called
        })

        it('{testPrefix} one liner', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync('my first string', 'my second string', testObj.options)
          imp.expect(actual).to.equal(imp.data.oneLinerLineDiffFake)
        })

        it('{testPrefix} no difference', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync('', '', Object.assign({color: true}, testObj.options))
          imp.expect(actual).to.be.undefined
          imp.expect(imp.color.add).to.have.not.been.called
        })

        it('{testPrefix} line endings', function(testObj) {
          if (testObj.stub) stub()
          var actual

          actual = gitDiffSync('my first\nstring', 'my second\nstring', testObj.options)
          imp.expect(actual).to.equal(imp.data.endingsLinuxLineDiff)

          actual = gitDiffSync('my first\r\nstring', 'my second\r\nstring', testObj.options)
          imp.expect(actual).to.equal(imp.data.endingsWindowsLineDiff)
        })
      })

      describe('word difference', function() {

        it('{testPrefix} color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, Object.assign({color: true, wordDiff: true}, testObj.options))
          imp.expect(actual).to.equal(imp.data.wordDiffFake)
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
        })

        it('{testPrefix} no color', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync(str1, str2, Object.assign({wordDiff: true}, testObj.options))
          imp.expect(actual).to.equal(imp.data.wordDiffFake)
          imp.expect(imp.color.add).to.have.not.been.called
        })

        it('{testPrefix} one liner', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync('my first string', 'my second string', Object.assign({wordDiff: true}, testObj.options))
          imp.expect(actual).to.equal(imp.data.oneLinerWordDiffFake)
        })

        it('{testPrefix} no difference', function(testObj) {
          if (testObj.stub) stub()
          var actual = gitDiffSync('', '', Object.assign({color: true, wordDiff: true}, testObj.options))
          imp.expect(actual).to.be.undefined
          imp.expect(imp.color.add).to.have.not.been.called
        })

        it('{testPrefix} line endings', function(testObj) {
          if (testObj.stub) stub()
          var actual

          actual = gitDiffSync('my first\nstring', 'my second\nstring', Object.assign({wordDiff: true}, testObj.options))
          imp.expect(actual).to.equal(imp.data.endingsLinuxWordDiff)

          actual = gitDiffSync('my first\r\nstring', 'my second\r\nstring', Object.assign({wordDiff: true}, testObj.options))
          imp.expect(actual).to.equal(imp.data.endingsWindowsWordDiff)
        })
      })
    })
  })
})
