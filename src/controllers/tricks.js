import tricks from '../models/tricks.model'
import { getTagsForPersonality } from './personality'
import _ from 'lodash'

export const getTricks = (req, res) => {
  queryBuilder(req.query, (query) => {
    console.log(JSON.stringify(query))
    tricks.find(query).then((result) => {
      res.send(result)
    })
  })

}

export const getRandomTrick = (req, res) => {
  // Get the count of all users
  tricks.count().exec((err, count) => {

    // Get a random entry
    var random = Math.floor(Math.random() * count)

    // Again query all users but only fetch one offset by our random #
    tricks.findOne().skip(random).exec(
      (err, result) => {
        // Tada! random user
        res.send(result)
      })
    })
  }

const queryBuilder = (params, next) => {
  let title
  let tagParam

  let query

  if(params.title) {
    title = {title: new RegExp('^'+params.title+'$', "i")}
  }

  getTagList(params, (tagList) => {
    if(tagList.length == 1) {
      tagParam = {tags: tagList[0]}
    } else if (tagList) {
      tagParam = {$or: tagList.map((tag) => {return {tag: tag}})}
    }
    if(title && tagParam) {
      next({$and: [title, tagParam]})
    } else if (title) {
      next(title)
    } else if (tagParam) {
      next(tagParam)
    } else {
      next({})
    }
  })
}

const getTagList = (params, next) => {
  let tagList = []

  if(params.tags) {
    tagList = params.tags.split(',')
  }

  if(params.personality) {
    getTagsForPersonality(params.personality, (tags) => {
      if(tagList.length > 0) {
        next(_.union(tagList, tags))
      } else {
        next(tags)
      }
    })
  } else {
    next(tagList)
  }
}
