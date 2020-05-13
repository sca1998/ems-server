const UserService = require('../../services/users')
const auth = require('..//middleware/auth')

module.exports = router => {

  router.route('/user').get(auth(), async(req, res) => {
    const user = await UserService.getUser(req.user)
    res.status(200).send({ user })
  })

  router.route('/users/signin').post(async (req, res) => {
    const { email, password } = req.body
    const { user, token } = await UserService.loginUser(email, password)
    res.status(200).send({ user, token })
  })

  router.route('/users/register').post(async (req, res) => {
    const { name, alias, email, password } = req.body
    const { user, token } = await UserService.registerUser(name, alias, email, password)
    res.status(201).send({ user, token })
  })

}