'use strict'

function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

function toBoolean(bool) {
  if (bool === 'false') bool = false
  return !!bool
}

function normaliseOptions(options) {

  var DEFAULTS = require('../_shared/defaultOptions')

  if (options == null) {

    options = {}

  } else {

    if (!isObject(options)) {
      options = {}
    }

    if (options.color) {
      options.color = toBoolean(options.color)
    }

    if (options.flags && typeof options.flags !== 'string') {
      options.flags = DEFAULTS.flags
    }

    if (options.forceFake) {
      options.forceFake = toBoolean(options.forceFake)
    }

    if (options.save) {
      options.save = toBoolean(options.save)
    }

    if (options.wordDiff) {
      options.wordDiff = toBoolean(options.wordDiff)
    }
  }

  options = Object.assign({}, DEFAULTS, options)

  if (options.flags != null) {
    options.flags = options.flags.trim()
  }

  if (options.save) {
    DEFAULTS.color = options.color
    DEFAULTS.flags = options.flags
    DEFAULTS.forceFake = options.forceFake
    DEFAULTS.wordDiff = options.wordDiff
  }

  return options
}

module.exports = normaliseOptions
