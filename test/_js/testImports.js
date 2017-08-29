'use strict'

// expect sinon

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

// others
var loglevel = require('loglevel')
var readfilego = require('readfilego')

// custom
var color = require('../../js/gitDiffFake/color')
var keepIt = require('../../js/gitDiffReal/keepIt')

var testImports = {
  expect: expect,
  sinon: sinon,
  loglevel: loglevel,
  readfilego: readfilego,
  color: color,
  keepIt: keepIt
}

module.exports = testImports
