exports.up = function (knex) {
  return knex.schema
    .createTable('emails', function (table) {
      table.increments('id').primary();
      table.string('to', 100);
      table.string('cc', 100);
      table.string('bcc', 100);
      table.string('subject', 300);
      table.text('body');
      table.timestamps({useCamelCase: true});

      console.info('Table emails created');
    })
};

exports.down = function (knex) {
  return knex.schema.dropTable('emails')
};

exports.config = {transaction: false};
