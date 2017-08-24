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

  describe('gitDiff', function() {

    it('gitDiff', function() {
      var actual = gitDiff('', '')
      imp.expect(actual).to.equal('')
    })
  })
})
