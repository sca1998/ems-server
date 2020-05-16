const EventService = require('../../services/events')
const auth = require('..//middleware/auth')

module.exports = router => {
  
  router.route('/events').get(auth(true), async (req, res) => {
    const events = await EventService.getEvents(req.user)
    res.status(200).send({ events })
  })

  router.route('/events').post(auth(), async (req, res) => {
    const { title, type, startsAt, endsAt, location, description } = req.body
    const event = await EventService.createEvent(title, type, startsAt, endsAt, location, description, req.user)
    res.status(201).send({ event })
  })

  router.route('/events/:id').get(auth(true), async (req, res) => {
    const event = await EventService.getEvent(req.params.id, req.user)
    res.status(200).send({ event })
  })

  router.route('/events/:id').delete(auth(), async (req, res) => {
    await EventService.deleteEvent(req.params.id, req.user)
    res.status(204).send()
  })

  router.route('/events/:id').put(auth(), async (req, res) => {
    await EventService.updateEvent(req.params.id, req.user, req.body)
    res.status(204).send()
  })

  router.route('/events/:id/register').put(auth(), async (req, res) => {
    await EventService.toggleJoinEvent(req.params.id, req.user)
    res.status(204).send()
  })

}