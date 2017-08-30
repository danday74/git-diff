'use strict'

var readfilego = require('readfilego')

module.exports = Object.freeze({
  lineDiffVim: readfilego(__dirname + '/lineDiffVim.txt', {throw: true, save: true}),
  shortstatReal: readfilego(__dirname + '/shortstatReal.txt'),
  str1: readfilego(__dirname + '/str1.txt'),
  str2: readfilego(__dirname + '/str2.txt'),
  wordDiffFake: readfilego(__dirname + '/wordDiffFake.txt'),
  wordDiffReal: readfilego(__dirname + '/wordDiffReal.txt')
})
