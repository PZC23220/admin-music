/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('switch_splash', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		introduce: {
			type: DataTypes.STRING(256),
			allowNull: false,
			defaultValue: 'N/A'
		},
		image2x: {
			type: DataTypes.STRING(256),
			allowNull: false,
			defaultValue: ''
		},
		image3x: {
			type: DataTypes.STRING(256),
			allowNull: false,
			defaultValue: ''
		},
		action_info: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		shareImage: {
			type: DataTypes.STRING(256),
			allowNull: true
		},
		skip: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1'
		},
		skip_duration: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '3'
		},
		validity_start: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		validity_end: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		showtimes: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1'
		},
		app_name: {
			type: DataTypes.ENUM('soundcloud'),
			allowNull: false,
			defaultValue: 'soundcloud'
		},
		platform: {
			type: DataTypes.ENUM('ios','android'),
			allowNull: false,
			defaultValue: 'ios'
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'switch_splash'
	});
};
