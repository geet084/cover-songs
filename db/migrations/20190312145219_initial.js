
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('songs', table => {
      table.increments('id').primary();
      table.string('song');
      table.string('original_artist');
      table.integer('release_year');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('covers', table => {
      table.increments('id').primary();
      table.integer('song_id').unsigned()
      table.foreign('song_id')
        .references('songs.id');
      table.string('cover_artist');
      table.integer('release_year');
      table.timestamps(true, true);
    })
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('covers'),
    knex.schema.dropTable('songs')
  ]);
};
