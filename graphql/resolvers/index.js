// export { default as CategoryResolver } from './Category'
const Album = require('../../models/album')
const Category = require('../../models/category')

const resolvers = {
  //****** QUERIES  *********/
  Query: {
    albums: () => Album.find({}),
    categories: () => Category.find({}),
  },
  Album: {
    category: async (root) => {
      const category = await Category.findOne({ _id: root.category })
      return category
    }
  },

}

module.exports = resolvers