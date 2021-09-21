const express = require('express')
const path = require('path')
const cors = require('cors')

const server = express()

server.use(cors())
server.use(express.static(path.join(__dirname, '..', 'dist')));
server.use(express.json());

server.all("*", (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '..', 'dist', "index.html"))
})

server.listen(5051);
