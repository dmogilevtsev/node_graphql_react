import { Sequelize } from 'sequelize'
import { configuration } from './index'

console.log('configuration.db', configuration.db)

export const sequelize = new Sequelize(
	configuration.db.database,
	configuration.db.username,
	configuration.db.password,
	configuration.db.options,
)