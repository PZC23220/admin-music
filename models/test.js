/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('test', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		test: {
			type: DataTypes.STRING(16),
			allowNull: true
		}
	}, {
		tableName: 'test'
	});
};
