const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const routes = require('./src/routes.js')
const negotiate = require('./customMiddlewares/negotiateResponse.js')

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use((req, res, next) => {
  res.negotiate = negotiate
  next()
})

// Db
mongoose.connect(process.env.DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
const db = mongoose.connection
db.once('open', () => {
  console.log('DB connected')
  app.listen(port, () => console.log(`Listening on localhost:${port}`))
})

// api routes
routes(app)
