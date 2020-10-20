const ZingggError = require('../utils/zingggError.js')
const { checkAuthRequest, checkIfFirstTime, verifyOtp } = require('../helpers/loginAuthHelper.js')

/**
 * Login Auth Controller Module
 * @category controllers
 * @module loginAuthController
 */

/**
  * Authorises user login by verifying stored otp with requested otp
  * @function loginAuthController
  * @param {Object} req - Http Request Object
  * @param {Object} res - Http Response Object
  * @returns {void}
  * @throws {ZingggError} with error code 500 if any internal error occurs
  */

async function loginAuthController (req, res) {
  try {
    console.log('auth')
    checkAuthRequest(req)
    const tempUser = await verifyOtp(req)
    const { permUser, isFirst } = await checkIfFirstTime(tempUser)
    if (!isFirst) {
      return res.negotiate({
        status: 200,
        body: {
          name: permUser.name,
          mobile: permUser.mobile,
          bio: permUser.bio,
          gender: permUser.gender,
          date: permUser.date,
          isFirst: isFirst,
          message: 'user authorised successfully'
        }
      })
    } else {
      return res.negotiate({
        status: 200,
        body: {
          isFirst: isFirst
        }
      })
    }
  } catch (err) {
    if (err instanceof ZingggError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new ZingggError(err.message, 500))
  }
}

module.exports = loginAuthController
