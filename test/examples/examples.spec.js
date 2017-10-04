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
    var actual = gitDiff('fred\nis\nfunny\n', 'bob\nis\nfunny\n', {color: false})
    imp.expect(actual).to.equal('@@ -1,3 +1,3 @@\n-fred\n+bob\n is\n funny\n')

    imp.expect(imp.color.add).to.have.not.been.called
  })
})
