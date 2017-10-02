'use strict'

var readFileGo = require('readfile-go')

module.exports = Object.freeze({

  endingsLinuxLineDiff: '-my first\n+my second\n string\n',
  endingsWindowsLineDiff: '-my first\r\n+my second\r\n string\r\n',
  endingsLinuxWordDiff: 'my [-first-]{+second+}\nstring\n',
  endingsWindowsWordDiff: 'my [-first-]{+second+}\r\nstring\r\n',

  lineDiffFake: readFileGo(__dirname + '/lineDiffVim.txt', {
    throw: true,
    save: true
  }).replace(ATAT_REGEX, '').replace(CR, ''),
  lineDiffReal: readFileGo(__dirname + '/lineDiffVim.txt'),
  wordDiffFake: readFileGo(__dirname + '/wordDiffFake.txt').replace(ATAT_REGEX, '').replace(CR, ''),
  wordDiffReal: readFileGo(__dirname + '/wordDiffReal.txt'),

  oneLinerLineDiffFake: '-my first string\n+my second string\n',
  oneLinerLineDiffReal: '@@ -1 +1 @@\n-my first string\n\\ No newline at end of file\n+my second string\n\\ No newline at end of file\n',
  oneLinerWordDiffFake: 'my [-first-]{+second+} string\n',
  oneLinerWordDiffReal: '@@ -1 +1 @@\nmy [-first-]{+second+} string\n',

  shortstatReal: readFileGo(__dirname + '/shortstatReal.txt'),

  str1: readFileGo(__dirname + '/str1.txt'),
  str2: readFileGo(__dirname + '/str2.txt')
})
