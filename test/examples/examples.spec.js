'use strict'

var imp = require('../_js/testImports')

describe('examples', function() {

  var sandbox

  before(function() {
    if (!imp.keepIt.real() && !imp.keepIt.realNoRepo()) this.skip()
  })

  beforeEach(function() {
    delete require.cache[require.resolve('../../js/_shared/defaultOptions')]
    require('../../js/_shared/defaultOptions')
    sandbox = imp.sinon.sandbox.create()
    sandbox.spy(imp.color, 'add')
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('usage - string diff', function() {
    var gitDiff = require('../../sync')
    var oldStr = 'fred\nis\nfunny\n'
    var newStr = 'paul\nis\nfunny\n'
    var diff = gitDiff(oldStr, newStr)

    var assert = require('assert')
    assert.equal(diff, '@@ -1,3 +1,3 @@\n-fred\n+paul\n is\n funny\n')

    imp.expect(diff).to.equal('@@ -1,3 +1,3 @@\n-fred\n+paul\n is\n funny\n')
    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('usage - file diff', function() {
    var gitDiff = require('../../sync')
    var readFileGo = require('readfile-go') // or your preferred file reader
    var oldStr = readFileGo(__dirname + '/oldStr.txt')
    var newStr = readFileGo(__dirname + '/newStr.txt')
    var diff = gitDiff(oldStr, newStr)

    // no assert here

    imp.expect(diff).to.equal(imp.data.lineDiffReal)
    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('flags', function() {
    var gitDiff = require('../../sync')
    var oldStr = 'fred\n   is   \nfunny\n'
    var newStr = 'paul\nis\n   funny   \n'
    var diff = gitDiff(oldStr, newStr, {flags: '--diff-algorithm=minimal --ignore-all-space'})

    var assert = require('assert')
    assert.equal(diff, '@@ -1,3 +1,3 @@\n-fred\n+paul\n is\n    funny   \n')

    imp.expect(diff).to.equal('@@ -1,3 +1,3 @@\n-fred\n+paul\n is\n    funny   \n')
    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('forceFake', function() {
    var gitDiff = require('../../sync')
    var oldStr = 'fred\nis\nfunny\n'
    var newStr = 'paul\nis\nfunny\n'
    var diff = gitDiff(oldStr, newStr, {forceFake: true})

    var assert = require('assert')
    assert.equal(diff, '-fred\n+paul\n is\n funny\n')

    imp.expect(diff).to.equal('-fred\n+paul\n is\n funny\n')
    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('save', function() {
    var gitDiff = require('../../sync')
    var oldStr = 'fred\nis\nfunny\n'
    var newStr = 'paul\nis\nfunny\n'
    var diff1 = gitDiff(oldStr, newStr, {save: true, wordDiff: true})
    var diff2 = gitDiff(oldStr, newStr)

    var assert = require('assert')
    assert.equal(diff1, '@@ -1,3 +1,3 @@\n[-fred-]{+paul+}\nis\nfunny\n')
    assert.equal(diff2, '@@ -1,3 +1,3 @@\n[-fred-]{+paul+}\nis\nfunny\n')

    imp.expect(diff1).to.equal('@@ -1,3 +1,3 @@\n[-fred-]{+paul+}\nis\nfunny\n')
    imp.expect(diff2).to.equal('@@ -1,3 +1,3 @@\n[-fred-]{+paul+}\nis\nfunny\n')
    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('async', function(done) {
    var gitDiff = require('../../async')
    var oldStr = 'fred\nis\nfunny\n'
    var newStr = 'paul\nis\nfunny\n'
    gitDiff(oldStr, newStr).then(function(diff) {
      var assert = require('assert')
      assert.equal(diff, '@@ -1,3 +1,3 @@\n-fred\n+paul\n is\n funny\n')

      imp.expect(diff).to.equal('@@ -1,3 +1,3 @@\n-fred\n+paul\n is\n funny\n')
      imp.expect(imp.color.add).to.have.not.been.called
      done()
    })
  })
})
