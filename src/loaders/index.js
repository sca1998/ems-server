const database = require('./database')
const express = require('./express')

module.exports = async app => {
  await Promise.all([
    database(),
    express(app)
  ])
}