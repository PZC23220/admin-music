var express = require('express');
var router = express.Router();
var models = require('../models');
router.get('/api/app_info/list', function(req, res, next){
    var page = req.query.page || 1;
    var pageNum = req.query.pageNum || 10;
    models.app_info.findAndCountAll({
        limit: Number(pageNum),
        offset: (pageNum * page) - pageNum,
        row: true,
        order: [["id", 'DESC']],
    }).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
        return false;
    });
});
//修改版本
router.post('/api/app_info/edit', function(req, res, next){
    var data = req.body;
    var id = data.id?data.id: '';
    if(id !== undefined && id !== ''){
        // 编辑
        models.app_info.update(data, {where: {id: id}, validate: false}).then(function(result){
            res.send({'success': true})
        });
    }else{
        // 新增
        models.app_info.create(data).then(function(result){
            res.send({'success': true})
        });
    }
});
module.exports = router;
