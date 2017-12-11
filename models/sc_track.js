/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sc_track', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		artwork_url: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		artwork_big_url: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		duration: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		genre: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		tag: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		sc_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			unique: true
		},
		title: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		playlist_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		},
		score: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		user_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'sc_user',
				key: 'id'
			}
		},
		stream_url: {
			type: DataTypes.STRING(1024),
			allowNull: true
		},
		preview_url: {
			type: DataTypes.STRING(1024),
			allowNull: true
		},
		update_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'sc_track'
	});
};
