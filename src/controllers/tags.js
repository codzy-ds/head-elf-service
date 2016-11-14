import tags from '../models/tagsModel'

export const getTags = (req, res) => {
  const listTags = tags.find();
  listTags.then((result) => {
    let tags = result.map((res) => {return res.tag})
    res.send(tags);
  })
}
