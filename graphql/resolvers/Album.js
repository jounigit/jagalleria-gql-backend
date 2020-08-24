const { UserInputError } = require('apollo-server')
const Album = require('../../models/album')
const Category = require('../../models/category')


const AlbumResolver = {
  Query: {
    albums: () => Album.find({}),
    album: (root, args) => Album.findById({ _id: args.id }),
    albumBySlug: (root, args) => Album.findOne({ slug: args.slug })
  },
  Album: {
    category: async (root) => {
      const category = await Category.findOne({ _id: root.category })
      return category
    }
  },

  //*** MUTATIONS */
  Mutation: {
    //*** create Album  */
    createAlbum: async (root, args) => {
      try {
        const album = new Album(args.album)
        return await album.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    //*** update Album  */
    updateAlbum: async (root, args) => {
      const album = await Album.findOne({ _id: args.id })
      console.log(args)
      if (!album) throw new Error('Album not found!')
      Object.assign(album, args.album)
      await album.save()
      return album
    },

    //*** delete Album  */
    deleteAlbum: async (root, args) => {
      const album = await Album.deleteOne({ _id: args.id })
      if (!album) throw new Error('Album not found!')
      return true
    }

  }
}

module.exports = AlbumResolver