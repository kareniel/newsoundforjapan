exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments()
    table.timestamps()
    
    table.string('eth_address')
    table.index('eth_address')
    table.unique('eth_address')

    table.string('reputation')
    table.string('email')
    table.string('display_name')
    table.string('website')
    table.integer('image_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};