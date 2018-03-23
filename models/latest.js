/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('latest', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		track_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'mfm_track',
				key: 'id'
			},
			unique: true
		},
		type: {
			type: DataTypes.ENUM('Europe','Japan','Korea'),
			allowNull: false
		},
		updated_at: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		created_at: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'latest'
	});
};
