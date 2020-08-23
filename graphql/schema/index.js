const { gql } = require('apollo-server')

const typeDefs = gql`
 type Category {
     _id: ID!
     title: String!
     content: String
    albums: [Album]
 }

 type Album {
    _id: ID!
    title: String!
    content: String
    category: Category
}

type Query {
    categories: [Category!]
    albums: [Album!]
}
`

// const typeDefs = gql`




// # type Query {
// #     categories: [Category!]
// #     category(id:ID!): Category
// #     albums: [Album!]
// #     album(id:ID!): Album
// # }
// `
module.exports = typeDefs