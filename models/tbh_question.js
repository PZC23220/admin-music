/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbh_question', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		dimension: {
			type: DataTypes.ENUM('school','grade','clazz'),
			allowNull: false
		},
		language: {
			type: DataTypes.ENUM('cn','en'),
			allowNull: false
		},
		title: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		content: {
			type: DataTypes.STRING(256),
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
		tableName: 'tbh_question'
	});
};
