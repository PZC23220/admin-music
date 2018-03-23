/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('config_ad', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		platform: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		placement: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		type: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		ab_type: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: '0'
		},
		percentage: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'config_ad'
	});
};
