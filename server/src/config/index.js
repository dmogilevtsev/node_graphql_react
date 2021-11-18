import { config } from 'dotenv'

config({
	path: `../${ process.env.NODE_ENV === 'development' ? '' : '.' + process.env.NODE_ENV }.env`,
})

export const configuration = {
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
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		options: {
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			dialect: process.env.DB_TYPE,
			protocol: process.env.DB_TYPE,
			log: process.env.NODE_ENV === 'development',
		},
	},
}