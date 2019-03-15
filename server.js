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
    .then(song => {
      if (song[0]) res.status(200).json(song[0])
      else res.status(404).json('Selected song does not exist')
    })
    .catch(error => res.status(500).json({ error }))
})

app.get('/api/v1/covers/:id', (req, res) => {
  const { id } = req.params;

  database('covers').where('id', id).select()
    .then(cover => {
      if (cover[0]) res.status(200).json(cover[0])
      else res.status(404).json('Selected cover does not exist')
    })
    .catch(error => res.status(500).json({ error }))
})

app.post('/api/v1/songs', (req, res) => {
  const { song, original_artist, release_year } = req.body;
  
  for (let reqParam of ['song', 'original_artist', 'release_year']) {
    if (!req.body[reqParam]) {
      return res.status(422).send({
        error: `Expected format: { song: <String>, original_artist: <String>, release_year: <Integer> }. You're missing a "${reqParam}" property.`
      });
    }
  }

  database('songs').insert({ song, original_artist, release_year }, 'id')
    .then(song => {
      if (song[0]) res.status(200).json({ id: song[0], ...req.body })
      else res.status(404).json('Selected song does not exist')
    })
    .catch(error => res.status(500).json({ error }))
})

app.post('/api/v1/covers', (req, res) => {
  const { song_id, cover_artist, release_year } = req.body;

  for (let reqParam of ['song_id', 'cover_artist', 'release_year']) {
    if (!req.body[reqParam]) {
      return res.status(422).send({
        error: `Expected format: { song_id: <Integer>, cover_artist: <String>, release_year: <Integer> }. You're missing a "${reqParam}" property.`
      });
    }
  }

  database('covers').insert({ song_id, cover_artist, release_year }, 'id')
    .then(cover => {
      if (cover[0]) res.status(200).json({id: cover[0], ...req.body})
      else res.status(404).json('Selected cover does not exist')
    })
    .catch(error => res.status(500).json({ error }))
})

app.delete('/api/v1/:db/:id', (req, res) => {
  const { db, id } = req.params;
  const category = db === 'songs' ? "Song" : "Cover"
  
  database(`${db}`).where('id', id).select().del()
    .then(id => res.status(203).json(`${category} ${req.params.id} removed`))
    .catch(error => res.status(500).json({ error }))
})