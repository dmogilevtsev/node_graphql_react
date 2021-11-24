import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'

import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { sequelize } from './config/db'
import { configuration } from './config/index'

const PORT = configuration.server.port || 4000
const app = express()
const httpServer = createServer(app)
const schema = makeExecutableSchema({ typeDefs, resolvers })

const subscriptionServer = SubscriptionServer.create({
	schema,
	execute,
	subscribe,
}, {
	server: httpServer,
	path: '/graphql',
})
const server = new ApolloServer({
	schema,
	plugins: [ {
		async serverWillStart() {
			return {
				async drainServer() {
					subscriptionServer.close()
				},
			}
		},
	} ],
})

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
	} catch ( error ) {
		console.warn('Server error', error)
	}
	await server.start()
	server.applyMiddleware({ app })

	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${ PORT }/graphql`),
	)
}

start()
