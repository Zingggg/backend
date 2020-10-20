const ZingggError = require('../utils/zingggError.js')
const { checkEditRequest, createUser, checkIfUserExist, doDbUpdate } = require('../helpers/editUserHelper.js')

/**
 * Edit User Controller Module
 * @category controllers
 * @module editUserController
 */

/**
 * Edits the user data
 * @function editUserController
 * @param {Object} req - Http Request Object
 * @param {Object} res - Http Response Object
 * @returns {void}
 * @throws {ZingggError} missing request with error code 500 for any internal error
 * @static
 */
async function editUserController (req, res) {
  try {
    console.log('edit user')
    checkEditRequest(req)
    const exist = await checkIfUserExist(req)
    let dbRes = null
    if (!exist) {
      dbRes = await createUser(req)
    } else {
      dbRes = await doDbUpdate(req)
    }
    if (!dbRes) {
      throw new ZingggError('null db response', 500)
    }
    return res.negotiate({
      status: 201,
      body: {
        ...dbRes,
        message: 'user edited successfully'
      }
    })
  } catch (err) {
    if (err instanceof ZingggError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new ZingggError(err.message, 500))
  }
}

module.exports = editUserController
