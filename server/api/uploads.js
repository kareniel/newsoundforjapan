const fs = require('fs')
const multer = require('multer')
const express = require('express')
const router = express.Router()

const Upload = require('../models/upload')

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let dir = './storage/uploads/' + req.user.address
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    callback(null, dir)
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, String(new Date().getTime()) + '_' + file.originalname)
  }
});
const upload = multer({storage: storage}).array('file', 5);

module.exports = function(req, res, next) {
  if (!req.user) return next()

  upload(req, res, async function(err) {
    if (err) {
      console.log('Error Occured' + err);
      return res.status(500).end();
    }
    ids = []
    for (let index = 0; index < req.files.length; index++) {
      const file = req.files[index];
      let upload = await Upload.forge({uploader_id: req.user.id, path: file.path, mimetype: file.mimetype, size: file.size}).save()
      ids.push(upload.id)
    }
    res.send(ids).end();
  })
}