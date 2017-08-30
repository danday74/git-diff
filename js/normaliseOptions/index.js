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

    if (options.fake) {
      options.fake = toBoolean(options.fake)
    }

    if (options.flags && typeof options.flags !== 'string') {
      options.flags = DEFAULTS.flags
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
    DEFAULTS.fake = options.fake
    DEFAULTS.flags = options.flags
    DEFAULTS.wordDiff = options.wordDiff
  }

  return options
}

module.exports = normaliseOptions
