'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class InfoUser extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			InfoUser.belongsTo(models.User, { foreignKey: 'UserId' });
		}
	}
	InfoUser.init(
		{
			name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Name can't be empty",
					},
				},
			},
			address: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Address can't be empty",
					},
				},
			},
			phone: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: "Phone number can't be empty",
					},
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: "UserId can't be empty",
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'InfoUser',
		}
	);
	return InfoUser;
};
