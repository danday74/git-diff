'use strict'

var gitDiffSync = require('../../sync')
var imp = require('../_js/testImports')
var pkg = require('../../package.json')

var str1 = imp.data.str1
var str2 = imp.data.str2

describe('gitDiffSync misc', function() {

  var DEFAULTS

  describe('validate', function() {

    it('str1 not a string', function() {
      imp.expect(function() {
        gitDiffSync(9, '')
      }).to.throw(TypeError, pkg.name + ' requires two strings')
    })

    it('str2 not a string', function() {
      imp.expect(function() {
        gitDiffSync('')
      }).to.throw(TypeError, pkg.name + ' requires two strings')
    })
  })

  describe('save', function() {

    beforeEach(function() {
      delete require.cache[require.resolve('../../js/_shared/defaultOptions')]
      DEFAULTS = require('../../js/_shared/defaultOptions')
    })

    it('save', function() {

      var actual

      var lineDiffFake = imp.data.lineDiffFake
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
