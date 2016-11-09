import faker from 'faker'
import _ from 'lodash'

export const getTricks = (req, res) => {
  res.send( _.times(100, function(n) {
    return {
      id: n,
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      tags: _.times(3, () => {
        return faker.lorem.word()
      })
    }
  }))
}

export const getRandomTrick = (req, res) => {
  res.send({title: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    tags: _.times(3, () => {
      return faker.lorem.word()
    })
  })
}
