const { UserInputError } = require('apollo-server')
const Category = require('../../models/category')
const Album = require('../../models/album')


const CategoryResolver = {
  Query: {
    categories: () => Category.find({}),
    category: (root, args) => Category.findById({ _id: args.id }),
    categoryBySlug: (root, args) => Category.findOne({ slug: args.slug })
  },
  Category: {
    albums: (parent) => {
      console.log(parent)
      return parent.albums.map(pa => Album.findOne({ _id: pa }) )
    }
  },

  //*** MUTATIONS */
  Mutation: {

    //*** add Album to category */
    addAlbumToCategory: async (root, args) => {
      const category = await Category.findOne({ _id: args.id })
      if (!category) throw new Error('Category not found!')
      if (category.albums.includes(args.album)) throw new Error('Album already exists!')

      try {
        category.albums = category.albums.concat(args.album)
        return await category.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    //*** create Category  */
    createCategory: async (root, args) => {
      try {
        const category = new Category(args.category)
        return await category.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    //*** update Category  */
    updateCategory: async (root, args) => {
      const category = await Category.findOne({ _id: args.id })
      console.log(args)
      if (!category) throw new Error('Category not found!')
      Object.assign(category, args.category)
      await category.save()
      return category
    },

    //*** delete Category  */
    deleteCategory: async (root, args) => {
      const category = await Category.deleteOne({ _id: args.id })
      if (!category) throw new Error('Category not found!')
      return true
    }
  }
}

module.exports = CategoryResolver