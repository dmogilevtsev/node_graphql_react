import { buildSchema } from 'graphql'

const schema = buildSchema(`
	scalar Date
	
	type User {
		id: ID
		email: String
		password: String
		posts: [Post]
		createdAt: Date
		updatedAt: Date
	}
	
	type Post {
		id: ID
		title: String
		content: String
		createdAt: Date
		updatedAt: Date
	}
	
	input UserInput {
		email: String!
		password: String!
	}
	
	input PostInput {
		title: String
		content: String
	}
	
	type Query {
		getAllUsers: [User]
		getUserById(id: ID): User
	}
`)

export { schema }