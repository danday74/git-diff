'use strict'

var gitDiffFake = require('./index')
var imp = require('../../test/_js/testImports')

describe('gitDiffFake', function() {

  it('line difference', function() {
    var expected = imp.data.lineDiffFake
    var actual = gitDiffFake(imp.data.str1, imp.data.str2, {color: false, wordDiff: false})
    imp.expect(actual).to.equal(expected)
  })

  it('word difference', function() {
    var expected = imp.data.wordDiffFake
    var actual = gitDiffFake(imp.data.str1, imp.data.str2, {color: false, wordDiff: true})
    imp.expect(actual).to.equal(expected)
  })
})
