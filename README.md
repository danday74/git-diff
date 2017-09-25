# git-diff

<br>[![Linux Build](https://img.shields.io/travis/danday74/git-diff/master.svg?label=linux)](https://travis-ci.org/danday74/git-diff)
[![Windows Build](https://img.shields.io/appveyor/ci/danday74/git-diff/master.svg?label=windows)](https://ci.appveyor.com/project/danday74/git-diff)
[![Coverage Status](https://coveralls.io/repos/github/danday74/git-diff/badge.svg)](https://coveralls.io/github/danday74/git-diff)
<br>[![npm](https://img.shields.io/npm/v/git-diff.svg)](https://www.npmjs.com/package/git-diff)
[![Dependencies Status](https://david-dm.org/danday74/git-diff/status.svg)](https://david-dm.org/danday74/git-diff)
[![npm](https://img.shields.io/npm/dm/git-diff.svg)](https://www.npmjs.com/package/git-diff)
[![node](https://img.shields.io/node/v/git-diff.svg)](https://www.npmjs.com/package/git-diff)

**Returns the git diff of two strings**



<br>

## Usage

`npm install --save git-diff`

git-diff takes 3 arguments, the **first string to diff**, the **second string to diff** and optionally a **color flag (boolean)**

git-diff returns a string containing the difference
 
The color flag (defaults to false) indicates whether you want the return value to be colorized with [chalk](https://www.npmjs.com/package/chalk)

Examples to demonstrate usage follow.
 
With color:

```javascript 1.5
var gitDiff = require('git-diff')
var actual = gitDiff('a\nb\n', 'a\nc\n', true)
expect(actual).to.equal('a\n-b\n+c\n')
```

Without color:

```javascript 1.5
var gitDiff = require('git-diff')
var actual = gitDiff('a\nb\n', 'a\nc\n')
expect(actual).to.equal('a\n-b\n+c\n')
```



<br>

## Author says

What's the **difference** between how God treats the righteous and the wicked?

> And God saw that the light was good. And God separated the light from the darkness. [Genesis 1:4 ESV](https://www.biblegateway.com/passage/?search=Genesis+1%3A4&version=ESV)

And He will do it again:

> Let both grow together until the harvest, and at harvest time I will tell the reapers, “Gather the weeds first and bind them in bundles to be burned, but gather the wheat into my barn.” [Matthew 13:30 ESV](https://www.biblegateway.com/passage/?search=matthew+13%3A30&version=ESV)

Much love :D

<br><br><br><br><br>
