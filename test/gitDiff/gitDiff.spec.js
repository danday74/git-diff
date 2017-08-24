'use strict'

var imp = require('../_js/testImports')
var gitDiff = require('../../index')
var pkg = require('../../package.json')

describe('gitDiff', function() {

  var sandbox

  beforeEach(function() {
    sandbox = imp.sinon.sandbox.create()
    sandbox.spy(imp.color, 'add')
  })

  afterEach(function() {
    sandbox.restore()
  })

  describe('color', function() {

    it('difference', function() {
      var str1 = imp.readfilego(__dirname + '/str1.txt', {throw: true, save: true})
      var str2 = imp.readfilego(__dirname + '/str2.txt')
      var expected = imp.readfilego(__dirname + '/gitDiff.txt')
      var actual = gitDiff(str1, str2, true)
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'grey')
      imp.expect(actual).to.equal(expected)
    })

    it('no difference', function() {
      var actual = gitDiff('', '', true)
      imp.expect(imp.color.add).to.have.not.been.calledWith(imp.sinon.match.any, 'green')
      imp.expect(imp.color.add).to.have.not.been.calledWith(imp.sinon.match.any, 'red')
      imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'grey')
      imp.expect(actual).to.equal('no difference')
    })
  })

  describe('no color', function() {

    it('difference', function() {
      var str1 = imp.readfilego(__dirname + '/str1.txt', {throw: true, save: true})
      var str2 = imp.readfilego(__dirname + '/str2.txt')
      var expected = imp.readfilego(__dirname + '/gitDiff.txt')
      var actual = gitDiff(str1, str2)
      imp.expect(imp.color.add).to.have.not.been.called
      imp.expect(actual).to.equal(expected)
    })

    it('no difference', function() {
      var actual = gitDiff('', '')
      imp.expect(imp.color.add).to.have.not.been.called
      imp.expect(actual).to.equal('no difference')
    })
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
