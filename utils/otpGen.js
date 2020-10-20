/**
 * Moule for generating random otp
 * @category utils
 * @module otpGen
 */

/**
 * Generates a random number from [0,max)
 * @function getRandomInt
 * @param {number} max - maximum digit to which to generate random number from 0
 * @returns {number} - random number
 */
function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

/**
 * Generates a 6 digit random otp
 * @function genOtp
 * @param {void}
 * @returns {string} - random 6 digit otp
 * @static
 */

function genOtp () {
  const nums = []
  for (let i = 0; i < 4; i++) {
    nums.push(getRandomInt(10))
  }
  return nums.join('')
}

module.exports = genOtp
