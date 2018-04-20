const bookshelf = require('../bookshelf')
const Upload = require('./upload')

module.exports = bookshelf.Model.extend({
  hasTimestamps: true,
  tableName: 'users',
  image: function() {
    return this.belongsTo(Upload, 'image_id')
  }
})

