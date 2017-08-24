'use strict'

var imp = require('../_js/testImports')
var gitDiff = require('../../index')
var pkg = require('../../package.json')

describe('gitDiff', function() {

  it('difference', function() {
    const str1 = imp.readfilego(__dirname + '/str1.txt', {throw: true, save: true})
    const str2 = imp.readfilego(__dirname + '/str2.txt')
    const expected = imp.readfilego(__dirname + '/gitDiff.txt')
    var actual = gitDiff(str1, str2)
    imp.expect(actual).to.equal(expected)
  })

  it('no difference', function() {
    var actual = gitDiff('', '')
    imp.expect(actual).to.equal('no difference')
  })

  it('type error', function() {
    imp.expect(function() {
      gitDiff(undefined, '')
    }).to.throw('Both inputs to ' + pkg.name + ' must be strings')

    imp.expect(function() {
      gitDiff('', undefined)
    }).to.throw('Both inputs to ' + pkg.name + ' must be strings')
  })
})
