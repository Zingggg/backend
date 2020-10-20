const { checkEditRequest } = require('../../helpers/editUserHelper.js')
const ZingggError = require('../../utils/zingggError.js')

describe('Testing checkEditRequest', () => {
  it('will throw ZingggError if request body does not have mobile attribute', () => {
    const reqBody = {
      body: {
        test: 123
      }
    }
    expect(() => { checkEditRequest(reqBody) }).toThrowError(ZingggError)
  })
})
