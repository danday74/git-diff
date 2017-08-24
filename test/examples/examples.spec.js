'use strict'

var imp = require('../_js/testImports')

describe('examples', function() {

  var sandbox

  beforeEach(function() {
    sandbox = imp.sinon.sandbox.create()
    sandbox.spy(imp.color, 'add')
  })

  afterEach(function() {
    sandbox.restore()
  })

  it('color', function() {

    var gitDiff = require('../../index')
    var actual = gitDiff('a\nb\n', 'a\nc\n', true)
    imp.expect(actual).to.equal('a\n-b\n+c\n')

    imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
    imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
    imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'grey')
  })

  it('no color', function() {

    var gitDiff = require('../../index')
    var actual = gitDiff('a\nb\n', 'a\nc\n')
    imp.expect(actual).to.equal('a\n-b\n+c\n')

    imp.expect(imp.color.add).to.have.not.been.called
  })
})
