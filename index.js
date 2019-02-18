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
        .catch(() => {
            res.status(500).json({ error: 'The users information could not be retrieved.' })
        })
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db
        .findById(id)
        .then(user => {
            if (user) {
                res.status(200).json({ success: true, user })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'The user information could not be retrieved.' })
        })
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);

    if (!userInfo.name || !userInfo.bio) return res.status(400).json({
        success: false,
        errorMessage: 'Please provide name and bio for the user.'
    })

    db
        .insert(userInfo)
        .then(user => {
            res.status(201).json({ success: true, user })
        })
        .catch(() => {
            res.status(500).json({
                success: false,
                error: 'There was an error while saving the user to the database.'
            })
        })
});

server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
});
