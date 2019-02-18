const express = require('express');

const db = require('./data/db.js');

const server = express();

server.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n')
});
