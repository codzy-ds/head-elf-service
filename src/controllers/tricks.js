import tricks from '../models/tricks.model'
import { getTagsForPersonality } from './personality'
import _ from 'lodash'
import mongoose from 'mongoose'

export const getTricks = (req, res) => {
  queryBuilder(req.query, (query) => {
    tricks.find(query).then((result) => {
      res.send(result)
    })
  })
}

export const getTrickById = (req, res) => {
  tricks.findById(req.params.trickId).then((result) => {
    res.send(result)
  })
}

export const createTrick = (req, res) => {
  let newTrick = new tricks(req.body)
  newTrick.save((err) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.location('/api/tricks/' + newTrick._id)
      res.status(201).send()
    }
  })
}

export const getRandomTrick = (req, res) => {
  tricks.count().exec((err, count) => {
    // Get a random entry
    var random = Math.floor(Math.random() * count)

    tricks.findOne().skip(random).exec(
      (err, result) => {
        res.send(result)
      })
    })
  }

  const queryBuilder = (params, next) => {
    let title
    let tagParam

    let query

    if(params.title) {
      title = {title: new RegExp(params.title, "i")}
    }

    getTagList(params, (tagList) => {
      if(tagList.length == 1) {
        tagParam = {tags: tagList[0]}
      } else if (tagList.length > 1) {
        tagParam = {$or: tagList.map((tag) => {return {tags: tag}})}
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
