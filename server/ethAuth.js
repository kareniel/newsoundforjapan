const sigUtil = require('eth-sig-util')
const fs = require('fs')

function install(app) {
  let terms = fs.readFileSync('./terms.txt').toString('hex')

  /**
   * Install a global user authentication middleware to ALL backend requests.
   * It simply sets an `user` property on the request if the user has signed our Terms & Conditions with web3 personal signatures.
   */
  app.use(async function(req, res, next) {
    if (req.path.indexOf('_nuxt') !== -1) return next();
    if (req.path.indexOf('_webpack') !== -1) return next();

    const sig = req.cookies.s || req.headers.authorization
    if (sig) {
      if (req.method !== 'GET' && sig !== req.headers.authorization) {
        // All non-get requests need an authorization header to prevent csrf
        return res.status(400).end('Bad Request')
      }
      try {
        const address = sigUtil.recoverPersonalSignature({data: '0x' + terms, sig})
        res.cookie('s', sig, {httpOnly: true})
        req.user = {address}
      }
      catch (e) {
        console.error(e)
        res.clearCookie('s')
      }
    }
    next()
  })

  app.get('/api/user', async function(req, res) {
    if (!req.user) return res.status(401).end('Unauthorized')
    res.send(req.user)
  })

  app.delete('/api/session', function(req, res) {
    res.clearCookie('s').end('Good bye')
  })

}

module.exports = install