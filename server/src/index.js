import { createServer } from 'http'
import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'

import { configuration } from './config'
import { utils } from './utils'
import { sequelize } from './config/db'
import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'

const ws = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})

const app = express()
	.use(cors({
		credentials: true,
		origin: utils.client_uri(),
	}))
	.use(express.json())
	.use(`/${ configuration.server.graphql }`, graphqlHTTP({
		graphiql: true,
		schema,
	}))

const server = createServer(app)
const wsServer = new ws.Server({
	server,
	path: `/${ configuration.server.graphql }`,
})

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
	} catch ( e ) {
		console.warn(`Server error`, e)
	}
	server.listen(configuration.server.port, () => {
		useServer({ schema, roots: resolvers }, wsServer)
		console.info(`Server start on ${ utils.uri() }`)
		console.info(`Graphql start on ${ utils.uri() }/${ configuration.server.graphql }`)
	})
}

start()