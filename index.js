const { ApolloServer } = require('apollo-server')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/schema')
const AlbumResolver = require('./graphql/resolvers/Album')
const CategoryResolver = require('./graphql/resolvers/Category')

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
  })
  .then( () => {
    console.log('connected to database', config.MONGODB_URI)
  })
  .catch( err => {
    console.log(err)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers: [AlbumResolver, CategoryResolver]
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})