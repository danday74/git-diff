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

## Introduction

git-diff will use ```git``` (if installed) and ```printf``` (if available) to get the real git diff of two strings.

If either is unavailable, git-diff instead returns a very good fake git diff.



<br>

## Usage

`npm install --save git-diff`

git-diff takes 3 arguments, the **old string** to diff, the **new string** to diff and optionally an [options object](#options-object)

git-diff returns the git diff or `undefined` where there is no difference.

An example to demonstrate usage:

```javascript 1.5
var gitDiff = require('git-diff')
var actual = gitDiff('fred\nis\nfunny\n', 'bob\nis\nfunny\n', {color: false})
expect(actual).to.equal('@@ -1,3 +1,3 @@\n-fred\n+bob\n is\n funny\n')
```



<br>

## Options object

Available options are:

color | flags | forceFake | noHeaders | save | wordDiff

Default options are:

```javascript 1.5
var options = {
  color: true,       // Add color to the diff returned?
  flags: null,       // A space separated string of git diff flags from https://git-scm.com/docs/git-diff#_options
  forceFake: false,  // Do not try and get a real git diff, just get me a fake? Faster but may not be 100% accurate
  noHeaders: false,  // Remove the ugly @@ -1,3 +1,3 @@ header?
  save: false,       // Remember the options for next time?
  wordDiff: false    // Get a word diff instead of a line diff?
}
```

Where options are not self explanatory, further assistance is given below.



<br>

#### **color** (boolean) [![top](top.png)](#options-object)













<br>

## Author says

What's the **difference** between how God treats the righteous and the wicked?

> And God saw that the light was good. And God separated the light from the darkness. [Genesis 1:4 ESV](https://www.biblegateway.com/passage/?search=Genesis+1%3A4&version=ESV)

And He will do it again:

> Let both grow together until the harvest, and at harvest time I will tell the reapers, “Gather the weeds first and bind them in bundles to be burned, but gather the wheat into my barn.” [Matthew 13:30 ESV](https://www.biblegateway.com/passage/?search=matthew+13%3A30&version=ESV)

Much love :D



<br><br><br><br><br>
