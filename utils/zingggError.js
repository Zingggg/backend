/**
 * Moule for generating errors
 * @category utils
 * @module ZingggError
 */

/** Class Representing Custom Error */
class ZingggError extends Error {
  /**
   * @param {string} message 
   * @param {number} status 
   * @param {Error} error 
   */
  constructor (message, status, error = null) {
    super(message)
    /**
     * @property {message} message Error message
     */
    this.message = message
    /**
     * @property {number} status Status Code
     */
    this.status = status
    /**
     * @property {string} name Name of error class ZingggError
     */
    this.name = 'ZingggError'
    if (error && error instanceof Error) {
      // log error
    }
  }
}

module.exports = ZingggError
