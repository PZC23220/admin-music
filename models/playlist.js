/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('playlist', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		description: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(16),
			allowNull: true
		},
		img: {
			type: DataTypes.STRING(512),
			allowNull: true
		},
		position: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		original_id: {
			type: DataTypes.STRING(64),
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
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		TAG: {
			type: DataTypes.STRING(16),
			allowNull: false,
			defaultValue: ''
		}
	}, {
		tableName: 'playlist'
	});
};
