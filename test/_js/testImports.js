'use strict'

// expect sinon

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

// others
var readfilego = require('readfilego')

// custom

var testImports = {
  expect: expect,
  sinon: sinon,
  readfilego: readfilego
}

module.exports = testImports
