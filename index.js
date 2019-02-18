const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch( () => {
            res.status(500).json({ error: 'The users information could not be retrieved.' })
        })
});



server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
});
