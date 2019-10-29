const Todo = require('./todo')

Todo.methods(['get', 'post', 'put', 'delete']) //api rest

Todo.updateOptions({new: true, runValidators: true}) // new(return data update), runValidators(update validators, required)


module.exports = Todo