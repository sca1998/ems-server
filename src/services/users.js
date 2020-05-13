const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/users')

const { ResponseError } = require('../utils')

class UserService {

  getUser = async decoded => {
    const user = await User 
      .findById(decoded._id)
      .select('-password')
      .lean()
    if (!user) throw new ResponseError(404, 'user not found')
    return user
  }

  loginUser = async (email, password) => {
    const user = await User
      .findOne({ email })
      .select()
      .lean()
    if (!user) throw new ResponseError(401, 'user not registered')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new ResponseError(401, 'unauthorized access')

    const token = this._issueToken(user._id, user.name, user.email)
    delete user.password
    return { user, token }
  }

  registerUser = async (name, alias, email, password) => {
    let user = await User
      .findOne({ email })
      .select('')
      .lean()
    if (user) throw new ResponseError(400, 'duplicated users\' email address')

    user = new User({ name, alias, email, password })
    await user.save()

    const token = this._issueToken(user._id, name, email)
    // remove password field before send
    user = { _id: user._id, name, alias, email }
    return { user, token }
  }

  _issueToken (_id, name, email) {
    const payload = { _id, name, email }
    const options = { expiresIn: '7d', issuer: 'COMP3322 Project 2' }
    const secret = process.env.JWT_SECRET

    return jwt.sign(payload, secret, options)
  }

}

module.exports = new UserService()
