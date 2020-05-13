const users = require('./routes/users')
const events = require('./routes/events')

module.exports = router => {
  [users, events]
    .forEach(f => f(router))
  
    return router
}