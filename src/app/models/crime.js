const mongoose = require('../../database')

const CrimeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  penalty: {
    type: Number,
    required: true
  },
  prisonTime: {
    type: Number,
    required: true
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
    required: true
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  updateDate: {
    type: Date,
    required: false
  },
  createUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updateUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
})

const Crime = mongoose.model('Crime', CrimeSchema)

module.exports = Crime