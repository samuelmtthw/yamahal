'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.belongsTo(models.User, { foreignKey: 'UserId' });
			Product.belongsTo(models.Category, { foreignKey: 'CategoryId' });
		}

		get updatedAtFormatted() {
			return new Date(this.updatedAt).toISOString().split('T')[0];
		}

		get createdAtFormatted() {
			return new Date(this.createdAt).toISOString().split('T')[0];
		}
	}
	Product.init(
		{
			name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Product name can't be empty",
					},
				},
			},
			description: {
				type: DataTypes.TEXT,
				validate: {
					notEmpty: {
						msg: "Description can't be empty",
					},
				},
			},
			price: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: "Price can't be empty",
					},
				},
			},
			imageUrl: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						msg: "Image can't be empty",
					},
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
			},
			CategoryId: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: {
						msg: "Category can't be empty",
					},
				},
			},
		},
		{
			hooks: {
				beforeCreate: (instance, options) => {
					instance.UserId = null;
				},
			},
			sequelize,
			modelName: 'Product',
		}
	);
	return Product;
};
