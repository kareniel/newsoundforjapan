const bookshelf = require('../bookshelf')
const Upload = require('./upload')

module.exports = bookshelf.Model.extend({
  hasTimestamps: true,
  tableName: 'events',
  images: function() {
    return this.morphMany(Upload, 'uploadable')
  }
})


// Whorthwhile companies to collaborate:
// BINANCE
// GIGWELL
