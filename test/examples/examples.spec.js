'use strict'

var imp = require('../_js/testImports')
var gitDiff = require('../../index')

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

    var actual = gitDiff('a\nb\n', 'a\nc\n', true)

    imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
    imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
    imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'grey')
    imp.expect(actual).to.equal('a\n-b\n+c\n')
  })

  it('no color', function() {

    var actual = gitDiff('a\nb\n', 'a\nc\n')

    imp.expect(imp.color.add).to.have.not.been.called
    imp.expect(actual).to.equal('a\n-b\n+c\n')
  })
})
