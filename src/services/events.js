const { ResponseError } = require('../utils')

const Event = require('../models/events')

class EventService {

  getEvents = async (user = {}) => {
    const events = await Event
      .find({ $or: [ { type: 'public' }, { creator: user._id } ] })
      .select('title startsAt location type creator attenders')
      .populate('creator', 'alias')
      .lean()
    
    events.forEach(e => e.attenders = e.attenders.length)
    return events
  }

  createEvent = async (title, type, startsAt, endsAt, location, description, user) => {
    const event = new Event({
      title, 
      type,
      startsAt,
      endsAt,
      location,
      description,
      attenders: [ user._id ],
      creator: user._id
    })

    await event.save()
    return event
  }

  getEvent = async (_id, user) => {
    const event = await Event
      .findById(_id)
      .populate('creator', 'alias')
      .lean()
    
    if (user && user._id) {
      const joinedByUser = !!event.attenders.find(a => a.equals(user._id))
      event.joined = joinedByUser
      delete event.attenders
    }

    return event
  }

  deleteEvent = async (_id, user) => {
    const event = await Event
      .findById(_id)
      .select('creator')
      .lean()
    if (!event) throw new ResponseError(404, 'event not found')
    if (!event.creator.equals(user._id)) throw new ResponseError(403, 'delete forbidden')

    await Event.deleteOne({ _id: event._id })
  }

  updateEvent = async (_id, user, updates) => {
    const event = await Event.findById(_id)
    if (!event) throw new ResponseError(404, 'event not found')
    if (!event.creator.equals(user._id)) throw new ResponseError(403, 'update forbidden')

    event.set(updates)
    await event.save()
  }

  toggleJoinEvent = async (_id, user) => {
    const event = await Event.findById(_id)
    if (!event) throw new ResponseError(404, 'event not found')

    const eventIsPrivate = event.type === 'private'
    const userIsCreator = event.creator.equals(user._id)
    if (eventIsPrivate && !userIsCreator) throw new ResponseError(403, 'private event')

    let attenderIndex = -1
    for (let i = 0; i < event.attenders.length; i++) {
      if (event.attenders[i].equals(user._id)) {
        attenderIndex = i
        break
      }
    }

    attenderIndex === -1
      ? event.attenders.push(user._id)
      : event.attenders.splice(attenderIndex, 1)

    await event.save()
  }

}

module.exports = new EventService()