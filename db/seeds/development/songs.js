const songData = require('../../../songData');

const createSong = (knex, song) => {
  return knex('songs').insert({
    song: song.song,
    original_artist: song.original_artist,
    release_year: song.release_year
  }, 'id')
    .then(songId => {
      let coversPromises = [];
      song.covers.forEach(cover => {
        coversPromises.push(
          createCover(knex, {
            cover_artist: cover.cover_artist,
            release_year: cover.release_year,
            song_id: songId[0]
          })
        )
      });
      return Promise.all(coversPromises);
    })
}

const createCover = (knex, cover) => {
  return knex('covers').insert(cover);
};

exports.seed = (knex, Promise) => {
  return knex('covers').del()
    .then(() => knex('songs').del())
    .then(() => {
      let songPromises = [];
      songData.forEach(song => {
        songPromises.push(createSong(knex, song));
      });
      return Promise.all(songPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
