const { UserInputError } = require('apollo-server')
const Picture = require('../../models/picture')

const PictureResolver = {
  Query: {
    pictures: () => Picture.find({}),
    picture: (root, args) => Picture.findById({ _id: args.id })
  },
  //*** MUTATIONS */
  Mutation: {
    //*** create Picture  */
    createPicture: async(_, args) => {
      console.log(args.picture)
      const { title, image } = args.picture
      const picture = new Picture({
        title: title ? title : image,
        image
      })
      try {
        return picture.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    //*** update Picture  */
    updatePicture: async (_, args) => {
      const picture = await Picture.findOne({ _id: args.id })
      console.log(args)
      if (!picture) throw new Error('Picture not found!')
      Object.assign(picture, args.picture)
      await picture.save()
      return picture
    },

    //*** delete Picture  */
    deletePicture: async (root, args) => {
      const picture = await Picture.deleteOne({ _id: args.id })
      if (!picture) throw new Error('Picture not found!')
      return true
    }
  }
}

module.exports = PictureResolver