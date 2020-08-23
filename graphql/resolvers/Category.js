const Category = require('../../models/category')
const Album = require('../../models/album')


const CategoryResolver = {
  Query: {
    categories: () => Category.find({})
  },
  Category: {
    albums: (parent) => {
      console.log(parent)
      return parent.albums.map(pa => Album.findOne({ _id: pa }) )
    }
  },
}

module.exports = CategoryResolver