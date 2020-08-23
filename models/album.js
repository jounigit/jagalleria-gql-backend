const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  }
})

const Album = mongoose.model('Album', schema)

module.exports = Album