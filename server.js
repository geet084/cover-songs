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