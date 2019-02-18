const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            if (users) {
                res.status(200).json({ success: true, users })
            } else {
                res.status(500).json({
                    success: false,
                    message: 'There was an error while saving the user to the database'
                })
            }
        })
        .catch(({ code, message }) => {
            res.status(code).json({
                success: false,
                message,
            });
        });
});

server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
});
