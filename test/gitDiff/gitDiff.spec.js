'use strict'

var imp = require('../_js/testImports')
var gitDiff = require('../../index')

describe('gitDiff', function() {

  // var DEFAULTS, sandbox
  //
  // before(function() {
  //   imp.logger.setLevel('silent')
  // })
  //
  // beforeEach(function() {
  //   delete require.cache[require.resolve('../../js/normaliseOptions/defaultOptions')]
  //   DEFAULTS = require('../../js/normaliseOptions/defaultOptions')
  //   sandbox = imp.sinon.sandbox.create()
  //   sandbox.spy(imp.logger, 'info')
  //   sandbox.stub(DEFAULTS, 'logFunc')
  // })
  //
  // afterEach(function() {
  //   sandbox.restore()
  // })

  it('gitDiff', function() {
    var actual = gitDiff('', '', 'false')
    imp.expect(actual).to.equal('false')
  })

  it('gitDiff', function() {
    var actual = gitDiff('', '', true)
    imp.expect(actual).to.equal('true')
  })
})
