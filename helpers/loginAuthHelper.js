const { UserModel, UserAuthModel } = require('../models/userModel.js')
const ZingggError = require('../utils/zingggError.js')

/**
  * loginAuthHelper module
  * @category helpers
  * @module loginAuthHelper
  */

/**
 * Checks if the request has required input fields in its body
 * @function checkAuthRequest
 * @param {Object} req - Http Request Object
 * @returns {void}
 * @throws {ZingggError} missing request with error code 400 if request body is missing
 * @static
 */

function checkAuthRequest (req) {
  const reqBody = req.body
  if (!(reqBody && (reqBody.mobile && reqBody.otp))) {
    throw new ZingggError('missing request', 400)
  }
}

/**
 * Verifies the requested otp with the stored otp if the Auth User is found
 * @function verifyOtp
 * @param {Object} req - Http Request Object
 * @returns {Object} tempUser - Object containing the verified mobile number and otp
 * @throws {ZingggError} with error code 512 if otp expires
 * @throws {ZingggError} with error code 513 if otp not matched
 * @throws {ZingggError} with error code 500 if any internal error occurs
 * @static
 */

async function verifyOtp (req) {
  try {
    const reqBody = req.body
    const tempUser = await UserAuthModel.findOne({ mobile: reqBody.mobile }).exec()
    if (!tempUser) {
      throw new ZingggError('otp expired', 512)
    }
    if (tempUser.otp === reqBody.otp) {
      return tempUser
    } else {
      throw new ZingggError('otp not matched', 513)
    }
  } catch (err) {
    if (err instanceof ZingggError) {
      throw err
    }
    throw new ZingggError(err.message, 500)
  }
}

/**
 * Checks if user logged in first time or is already a Zinggg user
 * @function checkIfFirstTime
 * @param {Object} tempUser - Auth User object containing verified mobile number and otp
 * @returns {Object} Object containing property isFirst and and verified user
 * @throws {ZingggError} with error code 500 if any internal error occurs
 * @static
 */

async function checkIfFirstTime (tempUser) {
  try {
    const permUser = await UserModel.findOne({ mobile: tempUser.mobile }).exec()
    if (permUser) {
      return { permUser: permUser._doc, isFirst: false }
    }
    return { permUser: null, isFirst: true }
  } catch (err) {
    if (err instanceof ZingggError) {
      throw err
    }
    throw new ZingggError(err.message, 500)
  }
}

module.exports = {
  checkAuthRequest,
  checkIfFirstTime,
  verifyOtp
}
