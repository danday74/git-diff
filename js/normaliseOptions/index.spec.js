'use strict'

var imp = require('../../test/_js/testImports')
var normaliseOptions = require('./index')

describe('normaliseOptions', function() {

  var DEFAULTS, actual, expected

  beforeEach(function() {
    delete require.cache[require.resolve('../_shared/defaultOptions')]
    DEFAULTS = require('../_shared/defaultOptions')
    actual = undefined
    expected = Object.assign({}, DEFAULTS)
  })

  it('options is undefined', function() {
    actual = normaliseOptions()
    imp.expect(actual).to.eql(expected)
  })

  it('options is not an object', function() {
    actual = normaliseOptions(9)
    imp.expect(actual).to.eql(expected)
  })

  it('options is an empty object', function() {
    actual = normaliseOptions({})
    imp.expect(actual).to.eql(expected)
  })

  it('color is a boolean', function() {
    expected.color = true
    actual = normaliseOptions({color: true})
    imp.expect(actual).to.eql(expected)
  })

  it('color is not a boolean', function() {
    actual = normaliseOptions({color: 'false'})
    imp.expect(actual).to.eql(expected)
  })

  it('flags is a string', function() {
    expected.flags = 'woteva'
    actual = normaliseOptions({flags: ' woteva '})
    imp.expect(actual).to.eql(expected)
  })

  it('flags is null', function() {
    actual = normaliseOptions({flags: null})
    imp.expect(actual).to.eql(expected)
  })

  it('flags is not a string', function() {
    actual = normaliseOptions({flags: 9})
    imp.expect(actual).to.eql(expected)
  })

  it('forceFake is a boolean', function() {
    actual = normaliseOptions({forceFake: false})
    imp.expect(actual).to.eql(expected)
  })

  it('forceFake is not a boolean', function() {
    expected.forceFake = true
    actual = normaliseOptions({forceFake: 9})
    imp.expect(actual).to.eql(expected)
  })

  it('noHeaders is a boolean', function() {
    actual = normaliseOptions({noHeaders: false})
    imp.expect(actual).to.eql(expected)
  })

  it('noHeaders is not a boolean', function() {
    expected.noHeaders = true
    actual = normaliseOptions({noHeaders: 9})
    imp.expect(actual).to.eql(expected)
  })

  it('save', function() {
    var SAVE = true
    var WORD_DIFF = true
    imp.expect(DEFAULTS.save).to.equal(false)
    imp.expect(DEFAULTS.wordDiff).to.equal(false)
    expected.save = SAVE
    expected.wordDiff = WORD_DIFF
    actual = normaliseOptions({save: SAVE, wordDiff: WORD_DIFF})
    imp.expect(actual).to.eql(expected)
    imp.expect(DEFAULTS.save).to.equal(false)
    imp.expect(DEFAULTS.wordDiff).to.equal(WORD_DIFF)
  })
})
