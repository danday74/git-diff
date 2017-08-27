// 'use strict'
//
// var imp = require('../../test/_js/testImports')
// var gitDiffFake = require('./index')
//
// var str1 = imp.readfilego(__dirname + '/../_shared/str1.txt', {throw: true, save: true})
// var str2 = imp.readfilego(__dirname + '/../_shared/str2.txt')
// var expected = imp.readfilego(__dirname + '/../_shared/gitDiff.txt')
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
//   describe('color', function() {
//
//     it('difference', function() {
//       var actual = gitDiffFake(str1, str2, {color: true})
//       imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'green')
//       imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'red')
//       imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'grey')
//       imp.expect(actual).to.equal(expected)
//     })
//
//     it('no difference', function() {
//       var actual = gitDiffFake('', '', {color: true})
//       imp.expect(imp.color.add).to.have.not.been.calledWith(imp.sinon.match.any, 'green')
//       imp.expect(imp.color.add).to.have.not.been.calledWith(imp.sinon.match.any, 'red')
//       imp.expect(imp.color.add).to.have.been.calledWith(imp.sinon.match.any, 'grey')
//       imp.expect(actual).to.equal('no difference')
//     })
//   })
//
//   describe('no color', function() {
//
//     it('difference', function() {
//       var actual = gitDiffFake(str1, str2, {color: false})
//       imp.expect(imp.color.add).to.have.not.been.called
//       imp.expect(actual).to.equal(expected)
//     })
//
//     it('no difference', function() {
//       var actual = gitDiffFake('', '', {color: false})
//       imp.expect(imp.color.add).to.have.not.been.called
//       imp.expect(actual).to.equal('no difference')
//     })
//   })
// })
