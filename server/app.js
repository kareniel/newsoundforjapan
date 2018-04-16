const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = require('express')()

app.use(cors())

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', require('./api'))

module.exports = app
