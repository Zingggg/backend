## Welcome to Zinggg

This is node.js based backend for android and ios based dating app [Zinggg](https://github.com/Zingggg/Zingggg-frontend) 

## Features :
- Login
- Authorization using mobile otp
- Register
- Edit User data

  
## How to run :  
1. Create a .env file as shown in dummyenv and add it to root directory.
2. Install node and mongodb
3. Run `` npm install ``
4. Run command `` node server.js ``
5. Build the documentation using `` npm run doc ``
6. Run tests using `` npm run tests ``

## Traversing Documentation
The starting file of the app is **server.js** that contains basic setup of the app which uses further configs of **routes, middlewares and database** from **src** directory.  

The app is further divided into following directories -:
1. **controllers** -: This contains the functions that control the api logic.  
2. **helpers** -: This contains the helper functions for the controllers.
3. **models** -: This contains mongoose based schemas for the mongodb collection used in app.
4. **middlewares** -: This contains all the custom middleware functions.
5. **routes** -: This contains modules for express routers that use controllers.
6. **utils** -: All the utilities used in app are inside this directory.
7. **tests** -: All the unit and moc tests are inside this directory
8. **docs** -: The docs generated are inside this directory.
   
Check the documentation to find further details of all modules, classes, functions and objects used to create the application.



