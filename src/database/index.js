const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://omni:omni@apartamentos.fignu.mongodb.net/CDA?retryWrites=true&w=majority', 
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
mongoose.Promise = global.Promise

module.exports = mongoose