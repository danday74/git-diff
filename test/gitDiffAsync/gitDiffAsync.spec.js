'use strict'

var gitDiffAsync = require('../../async')
var imp = require('../_js/testImports')
var pkg = require('../../package.json')

var str1 = imp.data.str1
var str2 = imp.data.str2

describe('gitDiffAsync', function() {

  var sandbox

  describe('real is unavailable', function() {

    beforeEach(function() {
      delete require.cache[require.resolve('../../js/_shared/defaultOptions')]
      require('../../js/_shared/defaultOptions')
      sandbox = imp.sinon.sandbox.create()
      sandbox.spy(imp.color, 'add')
    })

    afterEach(function() {
      sandbox.restore()
    })

    describe('line difference', function() {

      it('force fake - color', function(done) {
        gitDiffAsync(str1, str2, {color: true, forceFake: true}).then(function(actual) {
          imp.expect(actual).to.equal(imp.data.lineDiffFake)
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
          imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
          done()
        })
      })
    })
  })

  describe('validate', function() {

    it('str1 not a string', function(done) {
      gitDiffAsync(9, '').catch(function(err) {
        imp.expect(err).to.be.an.instanceof(TypeError)
        imp.expect(err.message).to.equal(pkg.name + ' requires two strings')
        done()
      })
    })
  })
})
