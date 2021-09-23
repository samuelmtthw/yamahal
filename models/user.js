'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.hasOne(models.InfoUser, { foreignKey: 'UserId' });
			User.hasMany(models.Product, { foreignKey: 'UserId' });
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Username can't be empty",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "E-mail can't be empty",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Password can't be empty",
					},
				},
			},
			role: {
				type: DataTypes.STRING,
			},
		},
		{
			hooks: {
				beforeCreate: (instance, options) => {
					instance.role = 'user';
				},
			},
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
