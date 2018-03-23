/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		sns_id: {
			type: DataTypes.STRING(64),
			allowNull: false,
			unique: true
		},
		avatar: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		gender: {
			type: DataTypes.ENUM('Female','Male','Unknown'),
			allowNull: false,
			defaultValue: 'Unknown'
		},
		address: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		date_of_birth: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'user'
	});
};
