const express = require('express');
const postsRouter = require('./posts/postsRouter');
const server = express();

server.use(express.json())
server.use(postsRouter);

server.listen(1115, () => {
    console.log('server is running at http://localhost:1115')
})