import express from 'express'
import cors from 'cors'
import config from './config'
import utils from './utils'

const app = express()

app.use(cors({
	credentials: true,
	origin: utils.client_uri(),
}))
app.use(express.json())

app.listen(config.server.port, (err) => {
	if ( err ) {
		console.warn(`Server error`, err)
	}
	console.log(`Server start on ${ utils.uri() }`)
})