import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { configuration } from './config'
import utils from './utils'
import { schema } from './schema'
import { sequelize } from './config/db'
import { UserResolver } from './user/user.resolver'

const app = express()

app.use(cors({
	credentials: true,
	origin: utils.client_uri(),
}))
app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema,
	rootValue: new UserResolver(),
}))
app.use(express.json())

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
	} catch ( e ) {
		console.warn(`Server error`, e)
	}
	app.listen(configuration.server.port, (err) => {
		if ( err ) {
			console.warn(`Server error`, err)
		}
		console.log(`Server start on ${ utils.uri() }`)
		console.log(`Graphql start on ${ utils.uri() }/graphql`)
	})
}

start()