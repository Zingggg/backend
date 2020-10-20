const crypto = require("crypto")

class CustomError extends Error {
  constructor (message,status) {
    super(message)
    this.status = status
  }
}

function test () {
  try {
    console.log('hello')
    console.log('how')
    console.log('are')
    throw new CustomError('fuckkkkkk',500)
  } catch (e) {
    console.log('from test = ', JSON.stringify(e))
    throw new CustomError(e.message,e.status)
  }
}

function exec () {
  try {
    test()
  } catch (e) {
    console.log('from exec= ', e.message, e.status)
  }
}

var rand = function() {
  return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function() {
  return rand()+rand(); // to make it longer
};

var id = crypto.randomBytes(16).toString('hex');
console.log(id)



