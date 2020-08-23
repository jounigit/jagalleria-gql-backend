const Category = require('../../models/category')
const Album = require('../../models/album')


const AlbumResolver = {
  Query: {
    albums: () => Album.find({}),
  },
  Album: {
    category: async (root) => {
      const category = await Category.findOne({ _id: root.category })
      return category
    }
  },
}

module.exports = AlbumResolver