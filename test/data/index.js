'use strict'

var readfilego = require('readfilego')

module.exports = Object.freeze({
  lineDiffFakeVim: readfilego(__dirname + '/lineDiffVim.txt', {throw: true, save: true}).replace(/^@@.+@@(?:\r?\n|\r)/, ''),
  lineDiffRealVim: readfilego(__dirname + '/lineDiffVim.txt'),
  oneLinerLineDiffFake: '-my first string\n+my second string\n',
  oneLinerLineDiffReal: '@@ -1 +1 @@\n-my first string\n\\ No newline at end of file\n+my second string\n\\ No newline at end of file\n',
  oneLinerWordDiffFake: 'my [-first-]{+second+} string\n',
  oneLinerWordDiffReal: '@@ -1 +1 @@\nmy [-first-]{+second+} string\n',
  shortstatReal: readfilego(__dirname + '/shortstatReal.txt'),
  str1: readfilego(__dirname + '/str1.txt'),
  str2: readfilego(__dirname + '/str2.txt'),
  wordDiffFake: readfilego(__dirname + '/wordDiffFake.txt').replace(/^@@.+@@(?:\r?\n|\r)/, ''),
  wordDiffReal: readfilego(__dirname + '/wordDiffReal.txt')
})
