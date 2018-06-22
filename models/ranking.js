/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ranking', {
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
			}
		},
		type: {
			type: DataTypes.ENUM('Weekly'),
			allowNull: false,
			defaultValue: 'Weekly'
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
		},
		position: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: '2147483647'
		},
		source: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	}, {
		tableName: 'ranking'
	});
};
