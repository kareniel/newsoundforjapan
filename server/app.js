const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const express = require('express')

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api', require('./api'))
app.use('/storage/uploads', express.static('./storage/uploads'))

module.exports = app
