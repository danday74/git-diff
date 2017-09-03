'use strict'

function mostCommonLineEnding(str1, str2) {

  var str1Windows = str1.match(/\r\n/g)
  var str2Windows = str2.match(/\r\n/g)
  var str1Linux = str1.match(/\n/g)
  var str2Linux = str2.match(/\n/g)

  var str1WindowsCount = (str1Windows) ? str1Windows.length : 0
  var str2WindowsCount = (str2Windows) ? str2Windows.length : 0
  var str1LinuxCount = (str1Linux) ? str1Linux.length : 0
  var str2LinuxCount = (str2Linux) ? str2Linux.length : 0

  var windowsCount = str1WindowsCount + str2WindowsCount
  var linuxCount = str1LinuxCount + str2LinuxCount - windowsCount

  return (windowsCount > linuxCount) ? '\r\n' : '\n'
}

module.exports = mostCommonLineEnding
