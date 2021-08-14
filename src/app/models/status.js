const mongoose = require('../../database')

const StatusSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
})

const Status = mongoose.model('Status', StatusSchema)

module.exports = Status