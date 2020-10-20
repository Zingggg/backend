const { checkLoginRequest, createTempUser, generateOtp } = require('../helpers/loginHelper.js')
const ZingggError = require('../utils/zingggError.js')

/**
  * loginController module
  * @category controllers
  * @module loginController
  * @memberof helper
  */

/**
 * creates otp and sends otp to user's mobile number for login
 * @function loginController
 * @param {Object} req - Http Request Object
 * @param {Object} res - Http Response Object
 * @returns {void}
 * @throws {ZingggError} missing request with error code 500 for any internal error
 * @static
 */

async function loginController (req, res) {
  try {
    console.log('login')
    checkLoginRequest(req)
    const tempUser = await generateOtp(req)
    await createTempUser(tempUser)
    return res.negotiate({
      status: 201,
      body: {
        message: 'otp generated successfully'
      }
    })
  } catch (err) {
    if (err instanceof ZingggError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new ZingggError(err.message, 500))
  }
}

module.exports = loginController
