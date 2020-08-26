const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    slug: 'title',
    slugPaddingSize: 4,
    unique: true
  },
  content: String,
  image: {
    type: String,
    required: true,
    unique: true
  }
})

const Picture = mongoose.model('Picture', schema)

module.exports = Picture