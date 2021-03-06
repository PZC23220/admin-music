/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('search_keywords', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		app_name: {
			type: DataTypes.STRING(16),
			allowNull: false,
			defaultValue: ''
		},
		keyword: {
			type: DataTypes.STRING(128),
			allowNull: true,
			unique: true
		},
		icon: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(16),
			allowNull: true
		},
		position: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		active: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		sum: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			defaultValue: '0'
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		update_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'search_keywords'
	});
};
