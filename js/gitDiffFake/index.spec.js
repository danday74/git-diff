'use strict'

var gitDiffFake = require('./index')
var imp = require('../../test/_js/testImports')

var str1 = imp.data.str1
var str2 = imp.data.str2

describe('gitDiffFake', function() {

  var sandbox

  beforeEach(function() {
    sandbox = imp.sinon.sandbox.create()
    sandbox.spy(imp.color, 'add')
  })

  afterEach(function() {
    sandbox.restore()
  })

  var testObjs = [{
    testPrefix: 'line difference -',
    wordDiff: false,
    expected: imp.data.lineDiffFake,
    oneLinerExpected: imp.data.oneLinerLineDiffFake,
    endingsLinuxExpected: imp.data.endingsLinuxLineDiff,
    endingsWindowsExpected: imp.data.endingsWindowsLineDiff
  }, {
    testPrefix: 'word difference -',
    wordDiff: true,
    expected: imp.data.wordDiffFake,
    oneLinerExpected: imp.data.oneLinerWordDiffFake,
    endingsLinuxExpected: imp.data.endingsLinuxWordDiff,
    endingsWindowsExpected: imp.data.endingsWindowsWordDiff
  }]

  imp.using(testObjs, function() {

    it('{testPrefix} color', function(testObj) {
      var actual = gitDiffFake(str1, str2, {color: true, wordDiff: testObj.wordDiff})
      imp.expect(actual).to.equal(testObj.expected)
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
    })

    it('{testPrefix} no color', function(testObj) {
      var actual = gitDiffFake(str1, str2, {color: false, wordDiff: testObj.wordDiff})
      imp.expect(actual).to.equal(testObj.expected)
      imp.expect(imp.color.add).to.have.not.been.called
    })

    it('{testPrefix} one liner', function(testObj) {
      var actual = gitDiffFake('my first string', 'my second string', {color: false, wordDiff: testObj.wordDiff})
      imp.expect(actual).to.equal(testObj.oneLinerExpected)
    })

    it('{testPrefix} no difference', function(testObj) {
      var actual = gitDiffFake('', '', {color: true, wordDiff: testObj.wordDiff})
      imp.expect(actual).to.be.undefined
      imp.expect(imp.color.add).to.have.not.been.called
    })

    it('{testPrefix} line endings', function(testObj) {
      var actual

      actual = gitDiffFake('my first\nstring', 'my second\nstring', {color: false, wordDiff: testObj.wordDiff})
      imp.expect(actual).to.equal(testObj.endingsLinuxExpected)

      actual = gitDiffFake('my first\r\nstring', 'my second\r\nstring', {color: false, wordDiff: testObj.wordDiff})
      imp.expect(actual).to.equal(testObj.endingsWindowsExpected)
    })
  })
})
