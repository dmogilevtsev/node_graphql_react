import { config } from 'dotenv'

config({
	path: `../.${ process.env.NODE_ENV }.env`,
})

export default {
	server: {
		port: Number(process.env.SERVER_PORT),
		protocol_http: process.env.SERVER_PROTOCOL_HTTP,
		host: process.env.SERVER_HOST,
	},
	client: {
		port: Number(process.env.CLIENT_PORT),
		protocol_http: process.env.CLIENT_PROTOCOL_HTTP,
		host: process.env.CLIENT_HOST,
	},
	db: {

	}
}