'use strict'

var exec = require('shelljs.exec')
var shell = require('shelljs')

function isGit() {
  var git = shell.which('git')
  return !!(git && git.code === 0)
}

function isGitDir() {
  return exec('git rev-parse --is-inside-work-tree', {silent: true}).code === 0
}

function isMkTemp() {
  var mktemp = shell.which('mktemp')
  return !!(mktemp && mktemp.code === 0)
}

function isPrintf() {
  var printf = shell.which('printf')
  return !!(printf && printf.code === 0)
}

function KeepIt() {

  this.git = this.git || isGit()
  this.mktemp = this.mktemp || isMkTemp()
  this.printf = this.printf || isPrintf()

  this.real = function() {
    return this.printf && this.git && isGitDir()
  }

  this.realNoRepo = function() {
    return this.printf && this.git && this.mktemp
  }
}

module.exports = new KeepIt()
