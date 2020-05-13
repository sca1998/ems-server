const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  alias: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// encrypt password before initial save
userSchema.pre('save', function (next) {
  const user = this
  if(!user.isModified || !user.isNew) return next()
  
  const saltRounds = parseInt(process.env.SALT_ROUNDS)
  bcrypt.hash(user.password, saltRounds, function(err, hash) {
    if (err) {
      console.log('Error hashing password for user', user.username)
      next(err)
    } else {
      user.password = hash
      next()
    }
  })
})

module.exports = mongoose.model('User', userSchema)