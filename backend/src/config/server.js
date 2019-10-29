const port = 3003

const bodyParser = require('body-parser') //parser json
const express = require('express')
const server = express() //instância do express
const allowCors = require('./cors')


//middleaware submit form, extend(vários formatos)
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json()) //transformer json
server.use(allowCors) 

server.listen(port, function() {
    console.log(`Backend is running on port ${port}`)
})

module.exports = server