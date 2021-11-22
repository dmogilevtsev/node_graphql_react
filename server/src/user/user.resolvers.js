import { UserService } from './user.service'

export const userResolvers = {
	Query: {
		async getAllUsers() {
			return await UserService.getAllUsers()
		},
		async getUserById(_, id) {
			return await UserService.getUserById(id)
		},
		async getUserByEmail(_, email) {
			return await UserService.getUserByEmail(email)
		},
	},
	Mutation: {
		async createUser(_, user) {
			return await UserService.createUser(user)
		},
		async removeUser(_, id) {
			return await UserService.removeUser(id)
		},
	},
}