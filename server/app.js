const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const ethAuth = require('./ethAuth')

module.exports = function(config) {
  const app = require('express')()
  
  app.use(cors())
  
  app.use(bodyParser.json())
  app.use(cookieParser())
  
  ethAuth(app)
  
  return app
}