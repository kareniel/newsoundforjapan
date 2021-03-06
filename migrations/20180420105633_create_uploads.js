exports.up = function(knex, Promise) {
  return knex.schema.createTable('uploads', function(table) {
    table.increments()
    table.timestamps()
    
    table.string('uploader_id')
    table.string('path')
    table.string('mimetype')
    table.string('size')

    table.integer('uploadable_id')
    table.string('uploadable_type')

    table.index('uploadable_id')
    table.index('uploadable_type')
    table.index('uploader_id')
    table.index('path')
    table.unique('path')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('uploads')
};