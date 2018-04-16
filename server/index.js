const { Nuxt, Builder } = require('nuxt')
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'

// Rely on global availability of web3 on server-side. On client side, its provided by metamask.
const Web3 = require('web3')
//global.web3  =  new Web3(new Web3.providers.WebsocketProvider('wss://' + (config.env.network == 'main' ? 'mainnet' : config.env.network) + '.infura.io/ws'))
global.web3 = new Web3('https://' + (config.env.network == 'main' ? 'mainnet' : config.env.network) + '.infura.io/a8P3vVW9XGIEVuyoYp1I')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

const app = require('./app')

// Install Apache-like logging middleware
// app.use(require('morgan')('combined'))

// Install Nuxt middleware
app.use(nuxt.render)

// Start listening
app.listen(port, host)

console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
