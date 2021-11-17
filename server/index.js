const express = require('express')
const cors = require('cors')
const { uri, client_uri } = require('./utils')
const { port } = require('./config/index').server

const app = express()

app.use(cors({
	credentials: true,
	origin: client_uri(),
}))
app.use(express.json())

app.listen(port, (err) => {
	if ( err ) {
		console.warn(`Server error`, err)
	}
	console.log(`Server start on ${ uri() }`)
})