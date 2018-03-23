/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user_playlist_item', {
		playlist_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		user_id: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		track_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'mfm_track',
				key: 'id'
			}
		}
	}, {
		tableName: 'user_playlist_item'
	});
};
