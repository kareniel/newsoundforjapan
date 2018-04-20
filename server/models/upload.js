const bookshelf = require('../bookshelf')
const User = require('./user')

module.exports = bookshelf.Model.extend({
  hasTimestamps: true,
  tableName: 'uploads'
})

