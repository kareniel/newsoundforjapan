const knexfile = require('./knexfile')

// Initialize the database
db = require('knex')(knexfile[process.env.NODE_ENV || 'development'])
  
// Initialize bookshelf ORM
bookshelf = require('bookshelf')(db)

module.exports = bookshelf