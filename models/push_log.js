/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('push_log', {
		video_id: {
			type: DataTypes.STRING(16),
			allowNull: true,
			unique: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'push_log'
	});
};
