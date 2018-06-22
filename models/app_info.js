/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('app_info', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		version_number: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		update_date: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		package_size: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		support_system: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		version_features: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		download_url: {
			type: DataTypes.STRING(100),
			allowNull: true
		}
	}, {
		tableName: 'app_info'
	});
};
