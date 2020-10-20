const mongoose = require('mongoose')

/**
 * mongoose user models
 * @category models
 * @module userModel
 */

/**
 * A User Schema
 * @typedef {Object} User
 * @property {string} name - name of the user
 * @property {string} mobile - mobile number of the user
 * @property {string} [bio] - bio of the user
 * @property {string} gender - gender of the user
 * @property {date} date - date the user was created
 * @property {string} [location] - location of the user
 * @property {number} [height] - height in cms of the user
 * @property {string} [lookingFor] - what the user is looking for
 * @property {string} [religion ]- religion of the user
 * @property {string} [drinking] - drinking status of the user
 * @property {string} [smoking] - smoking status of the user
 * @property {string} [exercise] - exercise status of the user
 * @property {string} [educationalLevel] - educational lever of the user
 * @property {string} [workingProfile] - working profile of the user
 * @property {string} sessionId - session Id of the user
 */

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  bio: { type: String },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  date: { type: Date, default: Date.now() },
  location: { type: String },
  height: { type: Number },
  lookingFor: { type: String },
  religion: {
    type: String,
    enum: ['hindu', 'muslim', 'christian', 'sikh', 'atheist']
  },
  drinking: {
    type: String,
    enum: ['socially', 'frequently', 'never']
  },
  smoking: {
    type: String,
    enum: ['socially', 'frequently', 'never']
  },
  exercise: {
    type: String
  },
  educationalLevel: {
    type: String
  },
  workingProfile: {
    type: String
  },
  sessionId: {
    type: String,
    required: true,
    createdAt: { type: Date, expires: 86400, default: Date.now() }
  }
})

/**
 * Auth User Schema
 * This collection expires automatically after 5 mins
 * Useful for generating and storing otps
 * @typedef {Object} AuthUser
 * @property {string} mobile - mobile number of the user
 * @property {string} otp - the generated otp of the user
 */

const UserAuthSchema = mongoose.Schema({
  mobile: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: 600, default: Date.now() }
})

const UserAuthModel = mongoose.model('authusers', UserAuthSchema)
const UserModel = mongoose.model('users', UserSchema)

module.exports = {
  UserAuthModel,
  UserModel
}
