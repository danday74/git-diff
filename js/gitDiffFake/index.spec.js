// 'use strict'
//
// var gitDiffFake = require('./index')
// var imp = require('../../test/_js/testImports')
//
// var str1 = imp.data.str1
// var str2 = imp.data.str2
//
// describe('gitDiffFake', function() {
//
//   var sandbox
//
//   beforeEach(function() {
//     sandbox = imp.sinon.sandbox.create()
//     sandbox.spy(imp.color, 'add')
//   })
//
//   afterEach(function() {
//     sandbox.restore()
//   })
//
//   describe('line difference', function() {
//
//     var expected = imp.data.lineDiffFakeVim
//
//     it('color', function() {
//       var actual = gitDiffFake(str1, str2, {color: true, wordDiff: false})
//       imp.expect(actual).to.equal(expected)
//       imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
//       imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
//       imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'reset')
//     })
//
//     it('no color', function() {
//       var actual = gitDiffFake(str1, str2, {color: false, wordDiff: false})
//       imp.expect(actual).to.equal(expected)
//       imp.expect(imp.color.add).to.have.not.been.called
//     })
//
//     it('one liner', function() {
//       var expected = imp.data.oneLinerLineDiffFake
//       var actual = gitDiffFake('my first string', 'my second string', {color: false, wordDiff: false})
//       imp.expect(actual).to.equal(expected)
//     })
//
//     it('no difference', function() {
//       var actual = gitDiffFake('', '', {color: true, wordDiff: false})
//       imp.expect(actual).to.be.undefined
//       imp.expect(imp.color.add).to.have.not.been.called
//     })
//   })
//
//   describe('word difference', function() {
//
//     var expected = imp.data.wordDiffFake
//
//     it('color', function() {
//       var actual = gitDiffFake(str1, str2, {color: true, wordDiff: true})
//       imp.expect(actual).to.equal(expected)
//       imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
//       imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
//       imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'reset')
//     })
//
//     it('no color', function() {
//       var actual = gitDiffFake(str1, str2, {color: false, wordDiff: true})
//       imp.expect(actual).to.equal(expected)
//       imp.expect(imp.color.add).to.have.not.been.called
//     })
//
//     it('one liner', function() {
//       var expected = imp.data.oneLinerWordDiffFake
//       var actual = gitDiffFake('my first string', 'my second string', {color: false, wordDiff: true})
//       imp.expect(actual).to.equal(expected)
//     })
//
//     it('no difference', function() {
//       var actual = gitDiffFake('', '', {color: true, wordDiff: true})
//       imp.expect(actual).to.be.undefined
//       imp.expect(imp.color.add).to.have.not.been.called
//     })
//   })
// })
