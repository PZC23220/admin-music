/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('category_soundcloud', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(16),
			allowNull: false,
			defaultValue: ''
		},
		description: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		icon: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		position: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		original_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		original_name: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		create_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'category_soundcloud'
	});
};
