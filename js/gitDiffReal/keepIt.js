'use strict'

var shell = require('shelljs')

function isPrintf() {
  var printf = shell.which('printf')
  return !!(printf && printf.code === 0)
}

function isGit() {
  var git = shell.which('git')
  return !!(git && git.code === 0)
}

function isGitDir() {
  return shell.exec('git rev-parse --is-inside-work-tree', {silent: true}).code === 0
}

function KeepIt() {
  this.real = function() {
    console.log('isPrintf', isPrintf())
    console.log('isGit', isGit())
    console.log('isGitDir', isGitDir())
    return isPrintf() && isGit() && isGitDir()
  }
}

module.exports = new KeepIt()
