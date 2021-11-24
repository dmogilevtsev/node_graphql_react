import { UserService } from './user.service'
import { pubSub } from '../graphql/pubSub'

const NEW_USER = 'NEW_USER'

export const userResolvers = {
	Query: {
		async getAllUsers() {
			return await UserService.getAllUsers()
		},
		async getUserById(_, { id }) {
			return await UserService.getUserById(id)
		},
		async getUserByEmail(_, { email }) {
			return await UserService.getUserByEmail(email)
		},
	},
	Mutation: {
		async createUser(_, { user }) {
			const newUser = await UserService.createUser(user)
			pubSub.publish(NEW_USER, { newUser })
			return newUser
		},
		async removeUser(_, { id }) {
			return await UserService.removeUser(id)
		},
	},
	Subscription: {
		newUser: {
			subscribe: () => pubSub.asyncIterator([ NEW_USER ]),
		},
	},
}
