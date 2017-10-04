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

  it('usage', function() {
    var gitDiff = require('../../sync')
    var oldStr = 'fred\nis\nfunny\n'
    var newStr = 'paul\nis\nfunny\n'
    var actual = gitDiff(oldStr, newStr)
    imp.expect(actual).to.equal('@@ -1,3 +1,3 @@\n-fred\n+paul\n is\n funny\n')

    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('flags', function() {
    var gitDiff = require('../../sync')
    var oldStr = 'fred\n   is   \nfunny\n'
    var newStr = 'paul\nis\n   funny   \n'
    var actual = gitDiff(oldStr, newStr, {flags: '--diff-algorithm=minimal --ignore-all-space'})
    imp.expect(actual).to.equal('@@ -1,3 +1,3 @@\n-fred\n+paul\n is\n    funny   \n')

    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('forceFake', function() {
    var gitDiff = require('../../sync')
    var oldStr = 'fred\nis\nfunny\n'
    var newStr = 'paul\nis\nfunny\n'
    var actual = gitDiff(oldStr, newStr, {forceFake: true})
    imp.expect(actual).to.equal('-fred\n+paul\n is\n funny\n')

    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('save', function() {
    var gitDiff = require('../../sync')
    var oldStr = 'fred\nis\nfunny\n'
    var newStr = 'paul\nis\nfunny\n'
    var actual

    actual = gitDiff(oldStr, newStr, {save: true, wordDiff: true})
    imp.expect(actual).to.equal('@@ -1,3 +1,3 @@\n[-fred-]{+paul+}\nis\nfunny\n')
    actual = gitDiff(oldStr, newStr)
    imp.expect(actual).to.equal('@@ -1,3 +1,3 @@\n[-fred-]{+paul+}\nis\nfunny\n')

    imp.expect(imp.color.add).to.have.not.been.called
  })

  it('async', function(done) {
    var gitDiff = require('../../async')
    var oldStr = 'fred\nis\nfunny\n'
    var newStr = 'paul\nis\nfunny\n'
    gitDiff(oldStr, newStr).then(function(actual) {
      imp.expect(actual).to.equal('@@ -1,3 +1,3 @@\n-fred\n+paul\n is\n funny\n')

      imp.expect(imp.color.add).to.have.not.been.called
      done()
    })
  })
})
