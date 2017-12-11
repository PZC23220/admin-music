/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mfm_track', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		cid: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: true
		},
		original_id: {
			type: DataTypes.STRING(128),
			allowNull: true,
			unique: true
		},
		playlist_id: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		artwork_url: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		artwork_big_url: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		title: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		duration: {
			type: DataTypes.STRING(11),
			allowNull: true
		},
		duration_in_seconds: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		tag: {
			type: DataTypes.STRING(1024),
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		user_name: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		stream_url: {
			type: DataTypes.STRING(1024),
			allowNull: true
		},
		preview_url: {
			type: DataTypes.STRING(1024),
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
			defaultValue: '1'
		}
	}, {
		tableName: 'mfm_track'
	});
};
