/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sc_user', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		avatar_url: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		sc_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			unique: true
		},
		username: {
			type: DataTypes.STRING(128),
			allowNull: true
		},
		update_time: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'sc_user'
	});
};
