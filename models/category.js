const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: String,
  albums: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  }]
})

const Category = mongoose.model('Category', schema)

module.exports = Category

