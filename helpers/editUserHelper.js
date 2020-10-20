const ZingggError = require('../utils/zingggError.js')
const { UserModel } = require('../models/userModel.js')
const crypto = require('crypto')

/**
  * editUserHelper module
  * @category helpers
  * @module editUserHelper
  * @memberof helper
  */

/**
 * Checks if the request has required input fields in its body
 * module:editUserHelper.checkEditRequest
 * @function checkEditRequest
 * @param {Object} req - Http Request Object
 * @returns {void}
 * @throws {ZingggError} missing request with error code 400 if request body is missing
 * @static
 */
function checkEditRequest (req) {
  const reqBody = req.body
  if (!(reqBody &&
    reqBody.mobile &&
    reqBody.name &&
    reqBody.gender)) {
    throw new ZingggError('Missing Request', 400)
  }
}

/**
 * Checks if the user already exists in the database
 * @param {Object} req - Http Request Object
 * @returns {boolean} - true if user already exists else false
 * @static
 */
async function checkIfUserExist (req) {
  try {
    const reqBody = req.body
    const user = await UserModel.findOne({ mobile: reqBody.mobile }).exec()
    if (!user) {
      return false
    }
    return true
  } catch (err) {
    if (err instanceof ZingggError) {
      throw err
    }
    throw new ZingggError(err.message, 500)
  }
}

/**
 * Creates a new user in the database using request body
 * @param {*} req - Http Request Object
 * @returns {User} newUser._doc - The user object that was created in database
 * @static
 */
async function createUser (req) {
  try {
    const reqBody = req.body
    const sessionId = crypto.randomBytes(16).toString('hex')
    reqBody.sessionId = sessionId
    const newUser = await UserModel.create({ reqBody })
    if (!newUser) {
      throw new ZingggError('error creating user', 500)
    }
    return newUser._doc
  } catch (err) {
    if (err instanceof ZingggError) {
      throw err
    }
    throw new ZingggError(err.message, 500)
  }
}

/**
 * Updates the data of the user in database
 * @param {*} req - Http Request Object
 * @return {User} res._doc - The object of the updated user
 * @static
 */
async function doDbUpdate (req) {
  try {
    const reqBody = req.body
    const { mobile, ...updateBody } = reqBody
    if (!updateBody) {
      throw new ZingggError('missing update body', 400)
    }
    const res = await UserModel.findOneAndUpdate({ mobile: req.body.mobile }, updateBody, { new: true })
    if (!res) {
      throw new ZingggError('unable to update user', 500)
    }
    return res._doc
  } catch (err) {
    if (err instanceof ZingggError) {
      throw err
    }
    throw new ZingggError(err.message, 500)
  }
}

module.exports = {
  checkEditRequest,
  checkIfUserExist,
  createUser,
  doDbUpdate
}
