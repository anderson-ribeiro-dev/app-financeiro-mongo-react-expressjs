const mongoose = require('mongoose')
mongoose.Promise = global.Promise //api the promise node

module.exports = mongoose.connect('mongodb://localhost/todo')