const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')

mongoose.plugin(slug)

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
    slug: 'title',
    slugPaddingSize: 4,
    unique: true
  },
  content: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  }
})

const Album = mongoose.model('Album', schema)

module.exports = Album