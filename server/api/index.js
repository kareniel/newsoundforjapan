const express = require('express')
const router = express.Router()
const sigUtil = require('eth-sig-util')
const fs = require('fs')
const terms = fs.readFileSync('./terms.txt').toString('hex')
const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)


router.post('/subscribe', async function(req, res) {
  mailchimp.post('/lists/b62e02c4c9/members', {
    email_address: req.body.email,
    language: req.body.lang,
    status: 'subscribed'
  })
  res.send({result: 'ok'})
})


router.use(async function(req, res, next) {
  const sig = req.cookies.s || req.headers.authorization
  if (sig) {
    // CSRF prevention: require authorization header on all non-get requests.
    if (req.method !== 'GET' && sig !== req.headers.authorization) {
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

router.get('/user', async function(req, res) {
  if (!req.user) return res.send({})
  res.send(req.user)
})

router.delete('/session', function(req, res) {
  res.clearCookie('s').end('Good bye')
})


module.exports = router