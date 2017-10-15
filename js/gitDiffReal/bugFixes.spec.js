'use strict'

var gitDiffReal = require('./index')
var imp = require('../../test/_js/testImports')

describe('gitDiffReal', function() {

  beforeEach(function() {
    delete require.cache[require.resolve('../_shared/defaultOptions')]
    require('../_shared/defaultOptions')
  })

  describe('bug fixes', function() {

    before(function() {
      if (!imp.keepIt.real() && !imp.keepIt.realNoRepo()) this.skip()
    })

    it('Use of < in a string does not give cannot find the file specified', function() {
      var expected = '@@ -1 +1 @@\n[-<a>-]{+<b>+}\n'
      var actual = gitDiffReal('<a>', '<b>', {color: false, wordDiff: true})
      imp.expect(actual).to.equal(expected)
    })
  })
})
