const genOtp = require('../utils/otpGen.js')
const { UserAuthModel } = require('../models/userModel.js')
const twilio = require('twilio')
const ZingggError = require('../utils/zingggError.js')

/**
  * loginHelper module
  * @category helpers
  * @module loginHelper
  * @memberof helper
  */

/**
 * Checks if the request has required input fields in its body
 * @function checkLoginRequest
 * @param {Object} req - Http Request Object
 * @returns {void}
 * @throws {ZingggError} missing request with error code 400 if request body is missing
 * @static
 */

function checkLoginRequest (req) {
  const reqBody = req.body
  if (!(reqBody && reqBody.mobile)) {
    throw new ZingggError('Missing Request', 400)
  }
}

/**
 * Generates otp by calling external function genOtp @see {@link module:otpGen}
 * @function generateOtp
 * @param {Object} req - Http Request Object
 * @returns {AuthUser} tempUser
 * @throws {ZingggError} missing request with error code 500 if any internal error occurs
 * @static
 */

async function generateOtp (req) {
  try {
    const reqBody = req.body
    await UserAuthModel.findOneAndRemove({ mobile: reqBody.mobile }).exec()
    const otp = genOtp()
    const tempUser = {
      mobile: reqBody.mobile,
      otp: otp
    }
    return tempUser
  } catch (err) {
    if (err instanceof ZingggError) {
      throw err
    }
    throw new ZingggError(err.message, 500, err)
  }
}

/**
 * Adds the auth user with otp to the database and sends otp to the requested mobile number
 * @function createTempUser
 * @param {AuthUser} tempUser - An object with mobile and otp
 * @returns {Object} dbUser - The saved auth user
 * @throws {ZingggError} missing request with error code 500 if any internal error occurs
 * @static
 */

async function createTempUser (tempUser) {
  try {
    const dbUser = await UserAuthModel.create(tempUser)
    if (!dbUser) {
      throw new ZingggError('db error in creating auth user', 500)
    }
    const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN)
    const msg = await client.messages
      .create({
        body: `Your zinggg otp is ${dbUser.otp}`,
        from: process.env.MOB_NUMBER,
        to: dbUser.mobile
      })
    console.log(msg.sid)
    return dbUser
  } catch (err) {
    if (err instanceof ZingggError) {
      throw err
    }
    throw new ZingggError(err.message, 500)
  }
}

module.exports = {
  checkLoginRequest,
  generateOtp,
  createTempUser
}
