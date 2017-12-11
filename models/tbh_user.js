/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbh_user', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		sns_id: {
			type: DataTypes.STRING(128),
			allowNull: true,
			unique: true
		},
		name: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		gender: {
			type: DataTypes.ENUM('F','M'),
			allowNull: false
		},
		avatar: {
			type: DataTypes.STRING(1024),
			allowNull: true
		},
		province: {
			type: DataTypes.STRING(128),
			allowNull: true,
			defaultValue: ''
		},
		city: {
			type: DataTypes.STRING(128),
			allowNull: true,
			defaultValue: ''
		},
		county: {
			type: DataTypes.STRING(128),
			allowNull: true,
			defaultValue: ''
		},
		school: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		grade: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		clazz: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		created_at: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		},
		updated_at: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
		tableName: 'tbh_user'
	});
};
