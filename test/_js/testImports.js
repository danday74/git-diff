'use strict'

// expect sinon

var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

// others
var loglevel = require('loglevel')

// custom
var color = require('../../js/gitDiffFake/color')
var data = require('../data')
var keepIt = require('../../js/gitDiffReal/keepIt')

var testImports = {
  expect: expect,
  sinon: sinon,
  loglevel: loglevel,
  color: color,
  data: data,
  keepIt: keepIt
}

module.exports = testImports
