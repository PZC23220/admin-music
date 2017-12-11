var mysql = require('mysql');

function MySQLUtil() {
    var connectionProd = mysql.createConnection({
        host: 'rm-6we4s4curvn4vz583o.mysql.japan.rds.aliyuncs.com',
        user: 'groupy',
        password: 'Groupy@2017',
        database: 'misc',
        useConnectionPooling: true
    });
    var connectionTest = mysql.createConnection({
        host: 'rm-uf608ociz94s1hck2o.mysql.rds.aliyuncs.com',
        user: 'groupy',
        password: 'GroupyTest2017',
        database: 'misc',
        useConnectionPooling: true
    });
    this.getConnectionProd = function() {
        return connectionProd;
    }
    this.getConnectionTest = function() {
        return connectionTest;
    }
};

module.exports = MySQLUtil;
