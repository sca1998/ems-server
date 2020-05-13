const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
  type: {
    type: String,
    required: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true
  },
  startsAt: {
    type: Date,
    required: true
  },
  endsAt: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  attenders: [{
    type: Schema.Types.ObjectId,
    unique: false,
    ref: 'User'
  }],
  description: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: false,
    ref: 'User'
  }
})

module.exports = mongoose.model('Event', eventSchema)