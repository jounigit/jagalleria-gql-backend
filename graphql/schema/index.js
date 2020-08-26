const { gql } = require('apollo-server')

const typeDefs = gql`
##### TYPES
type Category {
     _id: ID!
     title: String!
     slug: String
     content: String
    albums: [Album]
 }

type Album {
    _id: ID!
    title: String!
    slug: String
    content: String
    category: Category
}

type Picture {
    _id: ID!
    title: String
    slug: String
    content: String
    image: String!
}

##### QUERIES
type Query {
    albums: [Album!]
    categories: [Category!]
    pictures: [Picture!]
    album(id: String!): Album
    albumBySlug(slug: String!): Album
    category(id: String!): Category
    categoryBySlug(slug: String!): Category
    picture(id: String!): Picture 
}

##### INPUTS
input CategoryInput {
    title: String!
    content: String
    albums: String
}

input AlbumInput {
    title: String!
    content: String
    category: String
}

input PictureInput {
    title: String
    image: String!
}

input UpdateCategoryInput {
    title: String
    content: String
}

input UpdateAlbumInput {
    title: String
    content: String
    category: String
}

input UpdatePictureInput {
    title: String
    content: String
    image: String
}

##### MUTATIONS
type Mutation {
    createAlbum(album: AlbumInput): Album
    updateAlbum(
        id: String!
        album: UpdateAlbumInput
    ): Album
    deleteAlbum(id: String!): Boolean

    addAlbumToCategory(
        id: String!
        album: String!
        ): Category
    createCategory(category: CategoryInput): Category
    updateCategory(
        id: String!
        category: UpdateCategoryInput
    ): Category
    deleteCategory(id: String!): Boolean

    createPicture(picture: PictureInput): Picture
    updatePicture(
        id: String!
        picture: UpdatePictureInput
    ): Picture
    deletePicture(id: String!): Boolean
}
`

module.exports = typeDefs