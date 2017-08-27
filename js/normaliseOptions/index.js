'use strict'

function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

function toBoolean(bool) {
  if (bool === 'false') bool = false
  return !!bool
}

function normaliseOptions(options) {

  var DEFAULTS = require('./defaultOptions')

  if (options == null) {

    options = {}

  } else {

    if (!isObject(options)) {
      options = {}
    }

    if (options.color) {
      options.color = toBoolean(options.color)
    }

    if (options.fake) {
      options.fake = toBoolean(options.fake)
    }

    if (options.save) {
      options.save = toBoolean(options.save)
    }

    if (options.wordDiff) {
      options.wordDiff = toBoolean(options.wordDiff)
    }
  }

  options = Object.assign({}, DEFAULTS, options)

  if (options.save) {
    DEFAULTS.color = options.color
    DEFAULTS.fake = options.fake
    DEFAULTS.wordDiff = options.wordDiff
  }

  return options
}

module.exports = normaliseOptions
