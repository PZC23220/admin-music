/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('device_info', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_type: {
			type: DataTypes.ENUM('default'),
			allowNull: false,
			defaultValue: 'default'
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		device_id: {
			type: DataTypes.STRING(128),
			allowNull: false,
			defaultValue: '',
			unique: true
		},
		device_token: {
			type: DataTypes.STRING(224),
			allowNull: false,
			defaultValue: ''
		},
		device_type: {
			type: DataTypes.ENUM('ios','android'),
			allowNull: false,
			defaultValue: 'ios'
		},
		app_name: {
			type: DataTypes.STRING(16),
			allowNull: false,
			defaultValue: 'soundcloud'
		},
		app_version: {
			type: DataTypes.STRING(16),
			allowNull: false,
			defaultValue: ''
		},
		app_lang: {
			type: DataTypes.STRING(16),
			allowNull: true,
			defaultValue: 'jp'
		},
		update_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'device_info'
	});
};
