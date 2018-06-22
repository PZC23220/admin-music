/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('download_track', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		original_id: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		file_name: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		file_size: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
			defaultValue: '0'
		},
		source: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0'
		},
		status: {
			type: DataTypes.INTEGER(1).UNSIGNED,
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
		tableName: 'download_track'
	});
};
