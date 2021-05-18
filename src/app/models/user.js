const mongoose = require('../../database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
})

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User