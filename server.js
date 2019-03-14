const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express');

const app = express()
app.use(express.json())
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}.`);
});

app.get('/api/v1/songs', (req, res) => {
  database('songs').select()
    .then(songs => res.status(200).json(songs))
    .catch(error => res.status(500).json({ error }))
})

app.get('/api/v1/covers', (req, res) => {
  database('covers').select()
    .then(covers => res.status(200).json(covers))
    .catch(error => res.status(500).json({ error }))
})

app.get('/api/v1/songs/:id', (req, res) => {
  const { id } = req.params;
  database('songs').where('id', id).select()
    .then(song => res.status(200).json(song[0]))
    .catch(error => res.status(500).json({ error }))
})

app.get('/api/v1/covers/:id', (req, res) => {
  const { id } = req.params;
  database('covers').where('id', id).select()
    .then(cover => res.status(200).json(cover[0]))
    .catch(error => res.status(500).json({ error }))
})

app.post('/api/v1/songs', (req, res) => {
  const { song, original_artist, release_year } = req.body;
  database('songs').insert({ song, original_artist, release_year }, 'id')
    .then(song => res.status(201).json({ id: song[0] }))
    .catch(error => res.status(500).json({ error }))
})

app.post('/api/v1/covers', (req, res) => {
  const { song_id, cover_artist, release_year } = req.body;
  database('covers').insert({ song_id, cover_artist, release_year }, 'id')
    .then(cover => res.status(201).json({ id: cover[0] }))
    .catch(error => res.status(500).json({ error }))
})

app.delete('/api/v1/:db/:id', (req, res) => {
  const { db, id } = req.params;
  database(`${db}`).where('id', id).select().del()
    .then(id => res.status(203).json(`Song ${req.params.id} removed`))
    .catch(error => res.status(500).json({ error }))
})