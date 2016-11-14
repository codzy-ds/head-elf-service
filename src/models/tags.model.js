import mongoose from 'mongoose';

/**
* User Schema
*/
const TagsSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true
  }
});

/**
* Methods
*/
TagsSchema.method({
});

/**
* Statics
*/
TagsSchema.statics = {
  /**
  * List users in descending order of 'createdAt' timestamp.
  * @param {number} skip - Number of users to be skipped.
  * @param {number} limit - Limit number of users to be returned.
  * @returns {Promise<User[]>}
  */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
    .skip(skip)
    .limit(limit)
    .exec();
  }
};

export default mongoose.model('tags', TagsSchema);
