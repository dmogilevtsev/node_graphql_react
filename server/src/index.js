import { ApolloServer } from 'apollo-server'

import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { sequelize } from './config/db'
import { configuration } from './config/index'

const PORT = configuration.server.port || 4000

const app = new ApolloServer({
  typeDefs,
  resolvers,
})

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
  } catch (error) {
    console.warn('Server error', error)
  }
  app.listen(PORT).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`) // env variables aren't displaying IDK why
  })
}

start()
