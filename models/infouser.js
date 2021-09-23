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
			name: DataTypes.STRING,
			address: DataTypes.STRING,
			phone: DataTypes.INTEGER,
			UserId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'InfoUser',
		}
	);
	return InfoUser;
};
