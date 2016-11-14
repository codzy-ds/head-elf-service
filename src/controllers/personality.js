import personalities from '../models/personality.model'

export const getPersonalities = (req, res) => {
  personalities.find().then((result) => {
    let personalitiesList = result.map((personality) => {return {type: personality.type}})
    res.send(personalitiesList)
  })
}

export const getTagsForPersonality = (type, next) => {
  personalities.findOne({type: type}).then((res) => {
    next(res.tags)
  })
}
