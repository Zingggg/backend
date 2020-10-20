const express = require('express')
const loginAuthController = require('../controllers/loginAuthController.js')
const loginController = require('../controllers/loginController.js')
const editUserController = require('../controllers/editUserController.js')

/**
 * @module userRoute
 * @description
 * ## Module for user routes
 * ### 1. login route 
 * **POST**   
 * **Path** : /user/login   
 * **Content-Type** : json  
 * **Body**:
 * ```
 * {
 *    mobile:"+91xxxxxxxxxx"
 * }
 * ```
 * **Response**:  
 * a. Success
 * ```
 * {
 *    success: true,
 *    message: "otp generated successfully"
 * }
 * ```
 * b. Failure
 * ```
 * {
 *    success: false,
 *    message: "error message"
 * }
 * ```
 * ### 2. login auth route 
 * **POST**   
 * **Path** : /user/auth  
 * **Content-Type** : json  
 * **Body**:
 * ```
 * {
 *    mobile: "+91xxxxxxxxxx",
 *    otp: "xxxxxx"
 * } 
 * ```
 *  **Response**:  
 *  a. Success  
 *  - If already a Zinggg user
 * ```
 * {
 *    success: true, 
 *    isFirst: false,
 *    name: "user name",
 *    mobile: "mobile num"
 *    ...
 * }
 * ```
 * **See** {@link module:userModel} for more user details 
 *  - If first time login 
 * ```
 * {
 *    success: true, 
 *    isFirst: true
 * }
 * ```
 *  b. Failure
 * ```
 * {
 *    success: false,
 *    message: "error message"
 * }
 * ```
 * ### 3. edit user route 
 * **POST**   
 * **Path** : /user/edit   
 * **Content-Type** : json  
 * **Body**:
 * ```
 * {
 *    mobile: "+91xxxxxxxxxx",
 *    name: "xxxx",
 *    ...
 * } 
 * ```
 * **See** {@link module:userModel} for more user details to edit  
 * **Response**:  
 * a. Success
 * ```
 * {
 *    success: true,
 *    message: "user edited successfully"
 *    name: "user name",
 *    mobile: "mobile number",
 *    ...
 * }
 * ```
 * b. Failure
 * ```
 * {
 *    success: false,
 *    message: "error message"
 * }
 * ```
 */

const userRouter = express.Router()

/** 
 * login route
 * /user/login
 */

userRouter.post('/login', loginController)

/**
 * login auth route
 * /user/auth
 */
userRouter.post('/auth', loginAuthController)

/**
 * edit user info route
 * /user/edit
 */
userRouter.post('/edit', editUserController)

/**
 * exports userRouter
 */
module.exports = userRouter
