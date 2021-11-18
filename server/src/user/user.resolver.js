import { UserService } from './user.service'

export class UserResolver {
	constructor(
		userService = new UserService(),
	) {
		this.userService = userService
	}

	async createUser(userDto) {
		return await this.userService.createUser(userDto)
	}

	async removeUser(id) {
		return this.userService.removeUser(id)
	}

	async getAllUsers() {
		return await this.userService.getAllUsers()
	}

	async getUserByEmail(email) {
		return await this.userService.getUserByEmail(email)
	}

	async getUserById(id) {
		return await this.userService.getUserById(id)
	}

	async updateUser(user) {
		return await this.userService.updateUser(user)
	}

}