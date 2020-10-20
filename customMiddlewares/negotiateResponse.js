const ZingggError = require('../utils/zingggError.js')

/**
 * Moule for generating random otp
 * @category Middlewares
 * @module negotiateResponse
 */

/**
  * Negotiates response as per data and error
  * @param {Object} data - response body
  * @param {Error} err - ZingggError
  * @returns {void}
  * @static
  */
function negotiate (data, err = null) {
  if (data) {
    this.status(data.status)
    this.send({
      body: {
        success: true,
        ...data.body
      }
    })
  } else if (err instanceof ZingggError) {
    this.status(err.status)
    this.send({
      body: {
        success: false,
        message: err.message
      }
    })
  }
}

module.exports = negotiate
