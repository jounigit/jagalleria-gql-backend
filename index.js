const { ApolloServer, gql } = require('apollo-server');
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require("mongoose")

const typeDefs = gql`
  type Query {
      hello: String
  }
`;

const resolvers = {
    Query: {
      hello: () => "hello",
    },
  };

  logger.info('connecting to', config.MONGODB_URI)

  const options = { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      autoIndex: false
 }
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
    resolvers 
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});