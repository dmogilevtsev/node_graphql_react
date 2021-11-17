import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import config from './config'
import utils from './utils'
import { schema } from './schema'

const app = express()

app.use(cors({
	credentials: true,
	origin: utils.client_uri(),
}))
app.use('/graphql', graphqlHTTP({
	graphiql: true,
	schema,
}))
app.use(express.json())

app.listen(config.server.port, (err) => {
	if ( err ) {
		console.warn(`Server error`, err)
	}
	console.log(`Server start on ${ utils.uri() }`)
	console.log(`Graphql start on ${ utils.uri() }/graphql`)
})