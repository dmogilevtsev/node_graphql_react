import { sequelize } from '../config/db'
import { DataTypes } from 'sequelize'

export const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, require: true, allowNull: false },
	password: { type: DataTypes.STRING, require: true, allowNull: false },
})
