const express = require('express')
const router = express.Router()
const sigUtil = require('eth-sig-util')
const fs = require('fs')
const terms = fs.readFileSync('./terms.txt').toString('hex')
const Mailchimp = require('mailchimp-api-v3')
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY)

const User = require('./../models/user')

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
      let user = await User.where('eth_address', address).fetch()
      if (!user) user = User.forge('eth_address', address).save()
      req.user = user
    }
    catch (e) {
      console.error(e)
      res.clearCookie('s')
    }
  }
  next()
})


router.get('/users/:address', async function(req, res) {
  let user = await User.where('eth_address', req.params.address).fetch()
  delete user.attributes.email
  res.send(req.user.attributes)
})


router.get('/user', async function(req, res) {
  if (!req.user) return res.send({})
  res.send(req.user.attributes)
})


router.put('/user', async function(req, res) {
  if (!req.user) throw "Not authorized"

  // remove values that the user is not allowed to change
  delete req.body.user.eth_address

  let u = await req.user.save(req.body.user)
  
  res.send(u.attributes)
})

router.delete('/session', function(req, res) {
  res.clearCookie('s').end('Good bye')
})


module.exports = router