/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('switch_app_update', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		force_update: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		app_platform: {
			type: DataTypes.ENUM('ios','android'),
			allowNull: false,
			defaultValue: 'ios'
		},
		app_name: {
			type: DataTypes.ENUM('soundcloud'),
			allowNull: false,
			defaultValue: 'soundcloud'
		},
		app_version: {
			type: DataTypes.STRING(8),
			allowNull: false,
			defaultValue: '1.0.0'
		},
		update_desc: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'switch_app_update'
	});
};
