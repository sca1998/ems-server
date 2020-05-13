const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const { ResponseError } = require('../../utils')

module.exports = (authIsOptional = false) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      if (authIsOptional) return next()
      throw new ResponseError(401, 'authentication token required')
    }

    const token = authHeader.split(' ')[1] // Bearer <token>
    const options = { expiresIn: '7d', issuer: 'COMP3322 Project 2' }
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET, options)
      user.id = mongoose.Types.ObjectId(user.id)
      req.user = user
      next()
    } catch (err) {
      throw err
    }
  }
}