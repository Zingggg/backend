const userRouter = require('../routers/userRoute.js')

/**
 * @module routes
 * @description
 * Module for routes   
 * - **Route** : /user  
 * **See** {@link module:userRoute}
 */

/**
 * A function that defines all parent routes
 * @param {Express} app - express object
 * @returns {void}
 * @static
 */

const routes = (app) => {
  /** 
   * root route 
   */
  app.get('/', (req, res) => {
    console.log('/ route')
    return res.status(200).send('hello world')
  })

  /**
   * @description
   * User based routes -:
   * @see {@link module:userRoute} for more details on /user routes
   */
  app.use('/user', userRouter)
}

module.exports = routes
