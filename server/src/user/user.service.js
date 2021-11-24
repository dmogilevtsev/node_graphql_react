import { genSalt, hash } from 'bcrypt'
import { User } from './User'
import { ApiError } from '../error/ApiError'

export class UserService {
	static async createUser(user) {
		const { email, password } = user
		const _user = await User.findOne({ where: { email } })
		if ( _user ) {
			throw ApiError.badRequest('User already exist')
		}
		const salt = await genSalt(12)
		const hashedPassword = await hash(password, salt)
		return await User.create({
			email,
			password: hashedPassword,
		})
	}

	static async removeUser(id) {
		const _user = await User.findByPk(id)
		if ( !_user ) {
			throw ApiError.badRequest('This user does not exist')
		}
		await _user.destroy()
		return 'User removed'
	}

	static async getAllUsers() {
		return await User.findAll()
	}

	static async getUserByEmail(email) {
		const _user = await User.findOne({ where: { email } })
		if ( !_user ) {
			throw ApiError.badRequest(`User with email "${ email }" does not exist`)
		}
		return _user
	}

	static async getUserById(id) {
		const _user = await User.findByPk(id)
		if ( !_user ) {
			throw ApiError.badRequest(`This user does not exist`)
		}
		return _user
	}

	static async updateUser(user) {
		let hashedPassword
		if ( user.password ) {
			const salt = await genSalt(12)
			hashedPassword = await hash(user.password, salt)
			await User.update(
				{ ...user, password: hashedPassword },
				{ where: { email: user.email } },
			)
		} else {
			await User.update({ ...user }, { where: { email: user.email } })
		}
	}
}
