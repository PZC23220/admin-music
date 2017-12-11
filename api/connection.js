var MySQLUtil = require('./MySQLUtil');
var mySQLUtil = new MySQLUtil();

// 根据参数配置环境变量env和端口号
var environment = process.env.NODE_ENV || 'product';

// 数据库连接
if(environment === 'product'){
    var connection = mySQLUtil.getConnectionProd();
}else{
    var connection = mySQLUtil.getConnectionTest();
}

// 执行数据库操作
var select = function(sql, request, response, arr) {
    try{
        connection.query(sql, arr, function(err, rows, fields) {
            var s = sql.split(" ");
            var action = s[0];
            var result = 'Unknown';
            try {
                //处理你的结果
                if (err) {
                    result = 'fail';
                    console.log('error msg:', err);
                    // return Promise.reject(err.response)
                    response.send(err.response);
                    response.end();
                }else {
                    // console.log(rows);
                    result = 'success';
                    response.send(rows);
                    response.end();
                }
            } catch (e) {
                result = 'fail';
                return;
            }
        });
    }catch(e){
        console.log('数据库catch', e);
    }
}
module.exports = select;
