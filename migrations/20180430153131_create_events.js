exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table) {
    table.increments()
    table.timestamps()
    
    table.string('name')
    table.string('main_organizer_eth')
    table.text('desc_html')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
};
