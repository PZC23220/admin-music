/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('backup_play_history', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		video_id: {
			type: DataTypes.STRING(16),
			allowNull: true
		},
		title: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		artist: {
			type: DataTypes.STRING(32),
			allowNull: true
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
		tableName: 'backup_play_history'
	});
};
