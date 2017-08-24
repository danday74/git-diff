'use strict'

// expect sinon

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

// others

// custom

var testImports = {
  expect: expect,
  sinon: sinon
}

module.exports = testImports
