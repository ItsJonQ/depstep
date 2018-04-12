/**
 * Depstep.
 * A tiny utility helper.
 */

const LOG_METHODS = [
  'error',
  'info',
  'log',
  'warn'
]
const DEFAULT_LOG_METHOD = 'warn'

const DEFAULT_OPTIONS = {
  logMethod: DEFAULT_LOG_METHOD,
  once: true,
  logForDevOnly: true
}


/**
 * Class
 * Creates an instances that prints deprecation warnings in the console.
 */
class Deprecator {
  constructor (options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
    this._warnings = {}
  }

  /**
   * Determines if deprecator should warn.
   *
   * @param   {string} mesage
   * @returns {bool}
   */
  maybePrint (message) {
    const { once, logForDevOnly } = this.options

    if (!message || typeof message !== 'string') return false
    if (once && this._warnings.hasOwnProperty(message)) return false
    return true
  }

  /**
   * Console prints the message.
   *
   * @param   {string} mesage
   */
  print (message) {
    const { logMethod } = this.options
    if (!this.maybePrint(message)) return

    const echo = isValidLogMethod(logMethod) ?
      logMethod :
      DEFAULT_LOG_METHOD

    console[echo](message)
  }
}


/**
 * Checks to see if the environment is development.
 *
 * @returns {bool}
 */
const isDevEnv = () => {
  return process && process.env && process.NODE_ENV !== 'production'
}


/**
 * Checks to see of the provided method is a valid console log method.
 *
 * @param   {string} method
 * @returns {bool}
 */
const isValidLogMethod = (method) => {
  return LOG_METHODS.indexOf(method) >= 0
}


module.exports = Deprecator
