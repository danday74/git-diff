'use strict'

var imp = require('../../test/_js/testImports')
var pkg = require('../../package.json')
var validate = require('./index')

describe('validate', function() {

  describe('valid', function() {

    it('both inputs are strings', function() {
      validate('', '')
    })
  })

  describe('invalid', function() {

    it('str1 not a string', function() {
      imp.expect(function() {
        validate(9, '')
      }).to.throw(TypeError, pkg.name + ' requires two strings')
    })

    it('str2 not a string', function() {
      imp.expect(function() {
        validate('')
      }).to.throw(TypeError, pkg.name + ' requires two strings')
    })
  })
})
