'use strict'

// expect sinon
var chai = require('chai')
var chaiString = require('chai-string')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(chaiString)
chai.use(sinonChai)

// others
var loglevel = require('loglevel')
var using = require('data-driven')

// custom
var color = require('../../js/gitDiffFake/color')
var data = require('../data')
var keepIt = require('../../js/gitDiffReal/keepIt')

var testImports = {
  expect: expect,
  sinon: sinon,
  loglevel: loglevel,
  using: using,
  color: color,
  data: data,
  keepIt: keepIt
}

module.exports = testImports
