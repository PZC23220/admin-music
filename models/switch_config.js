/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('switch_config', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		key: {
			type: DataTypes.STRING(32),
			allowNull: false,
			defaultValue: '',
			unique: true
		},
		value: {
			type: DataTypes.STRING(512),
			allowNull: false,
			defaultValue: ''
		},
		description: {
			type: DataTypes.STRING(256),
			allowNull: false,
			defaultValue: ''
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'switch_config'
	});
};
