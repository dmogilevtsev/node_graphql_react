import { config } from 'dotenv'

config({
	path: `../${ process.env.NODE_ENV === 'development' ? '' : '.' + process.env.NODE_ENV }.env`,
})

const {
	NODE_ENV, SERVER_PORT, SERVER_PROTOCOL_HTTP, SERVER_HOST, GRAPHQL_URL, CLIENT_PORT,
	CLIENT_PROTOCOL_HTTP, CLIENT_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_TYPE,
} = process.env


export const configuration = {
	server: {
		port: Number(SERVER_PORT),
		protocol_http: SERVER_PROTOCOL_HTTP,
		host: SERVER_HOST,
		graphql: GRAPHQL_URL,
	},
	client: {
		port: Number(CLIENT_PORT),
		protocol_http: CLIENT_PROTOCOL_HTTP,
		host: CLIENT_HOST,
	},
	db: {
		database: DB_NAME,
		username: DB_USER,
		password: DB_PASSWORD,
		options: {
			host: DB_HOST,
			port: Number(DB_PORT),
			dialect: DB_TYPE,
			protocol: DB_TYPE,
			log: NODE_ENV === 'development',
		},
	},
}